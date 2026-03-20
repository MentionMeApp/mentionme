"use client";
import { useState, useEffect, useCallback } from "react";

const API = "https://api.anthropic.com/v1/messages";
const MDL = "claude-sonnet-4-20250514";

const ENGINES = [
  { id:"chatgpt", name:"ChatGPT", icon:"◈", color:"#10a37f" },
  { id:"gemini", name:"Gemini", icon:"◇", color:"#4285f4" },
  { id:"claude", name:"Claude", icon:"◆", color:"#d4a574" },
  { id:"perplexity", name:"Perplexity", icon:"◎", color:"#20b2aa" },
  { id:"grok", name:"Grok", icon:"✦", color:"#e0e0e0" },
  { id:"aio", name:"AI Overviews", icon:"◉", color:"#ea4335" },
];

async function ask(system, user) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 90000);
  try {
    const r = await fetch(API, { method:"POST", headers:{"Content-Type":"application/json"}, signal:ctrl.signal,
      body:JSON.stringify({ model:MDL, max_tokens:4096, system, messages:[{role:"user",content:user}] }) });
    clearTimeout(t);
    if (!r.ok) { const e = await r.json().catch(()=>({})); throw new Error(e?.error?.message||`HTTP ${r.status}`); }
    const d = await r.json(); if (d.error) throw new Error(d.error.message);
    return (d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
  } catch(e) { clearTimeout(t); if (e.name==="AbortError") throw new Error("Timed out. Try again."); throw e; }
}
function pJ(raw) { try { const c=raw.replace(/```json\s*/g,"").replace(/```/g,"").trim(); const s=c.indexOf("{"); const e=c.lastIndexOf("}"); if(s>=0&&e>s) return JSON.parse(c.slice(s,e+1)); return JSON.parse(c); } catch { return null; } }

const C = { bg:"#0a0510", card:"rgba(255,255,255,.018)", border:"rgba(255,255,255,.055)", primary:"#ff3c8e", primarySoft:"rgba(255,60,142,.08)", reward:"#ffb938", rewardSoft:"rgba(255,185,56,.08)", trust:"#00d4ff", trustSoft:"rgba(0,212,255,.08)", success:"#3dff97", danger:"#ff4466", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75" };

const Dot = ({color,size=7}) => <span style={{display:"inline-block",width:size,height:size,borderRadius:"50%",background:color,animation:"mm-pulse 2s ease-in-out infinite",boxShadow:`0 0 ${size*2}px ${color}66`}} />;
const Bar = ({pct,color}) => <div style={{width:"100%",height:6,background:"rgba(255,255,255,.04)",borderRadius:3}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}bb)`,borderRadius:3,transition:"width 1.2s cubic-bezier(.34,1.56,.64,1)",boxShadow:`0 0 8px ${color}44`}} /></div>;
const Card = ({children,glow,style:sx}) => <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:24,backdropFilter:"blur(8px)",boxShadow:glow?`0 0 30px ${glow}12, inset 0 1px 0 rgba(255,255,255,.04)`:"inset 0 1px 0 rgba(255,255,255,.04)",...sx}}>{children}</div>;

const Inp = ({label,value,onChange,placeholder,multi,rows=3}) => {
  const s={width:"100%",padding:"11px 15px",borderRadius:10,background:"rgba(255,255,255,.04)",border:`1px solid ${C.border}`,color:C.text,fontSize:13.5,fontFamily:"inherit",outline:"none",transition:"all .3s"};
  return <div style={{marginBottom:15}}>{label&&<label style={{display:"block",fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6,fontFamily:"'Fira Code',monospace"}}>{label}</label>}{multi?<textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{...s,resize:"vertical"}} onFocus={e=>{e.target.style.borderColor=C.primary+"66";e.target.style.boxShadow=`0 0 16px ${C.primary}18`}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />:<input value={value} onChange={onChange} placeholder={placeholder} style={s} onFocus={e=>{e.target.style.borderColor=C.primary+"66";e.target.style.boxShadow=`0 0 16px ${C.primary}18`}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />}</div>;
};

const Btn = ({children,onClick,disabled,ghost,style:sx}) => <button onClick={onClick} disabled={disabled} style={{padding:"12px 22px",borderRadius:11,cursor:disabled?"not-allowed":"pointer",fontWeight:700,fontSize:13.5,fontFamily:"inherit",border:ghost?`1px solid ${C.border}`:"none",transition:"all .3s",display:"inline-flex",alignItems:"center",gap:8,background:ghost?"rgba(255,255,255,.03)":disabled?"rgba(255,255,255,.04)":`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:ghost?C.text:disabled?C.dim:"#fff",boxShadow:disabled||ghost?"none":`0 4px 20px ${C.primary}33`,...sx}}>{children}</button>;

function Timer({on}) {
  const [s,setS]=useState(0);
  useEffect(()=>{if(!on){setS(0);return;}const t=setInterval(()=>setS(p=>p+1),1000);return()=>clearInterval(t);},[on]);
  if(!on)return null;
  return <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",marginTop:10,borderRadius:10,background:`linear-gradient(135deg,${C.primarySoft},${C.trustSoft})`,border:`1px solid ${C.primary}18`}}>
    <span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.primary}55`,borderTopColor:C.primary,borderRadius:"50%",animation:"mm-spin .6s linear infinite"}} />
    <span style={{fontSize:12,color:C.primary,fontFamily:"'Fira Code',monospace"}}>{s}s</span>
    <span style={{fontSize:11,color:C.muted}}>{s<10?"Scanning AI engines...":s<25?"Analyzing responses...":s<50?"Building report...":"Finishing up..."}</span>
  </div>;
}

function SentimentBadge({sentiment}) {
  const map = {positive:{color:C.success,label:"Positive"},neutral:{color:C.reward,label:"Neutral"},negative:{color:C.danger,label:"Negative"},mixed:{color:"#a78bfa",label:"Mixed"},absent:{color:C.dim,label:"Not mentioned"}};
  const s = map[sentiment] || map.absent;
  return <span style={{padding:"3px 10px",borderRadius:12,background:`${s.color}12`,border:`1px solid ${s.color}22`,fontSize:10.5,fontWeight:600,color:s.color}}>{s.label}</span>;
}

export default function App() {
  const [tab,setTab]=useState("scan");
  const [ready,setReady]=useState(false);
  useEffect(()=>{setTimeout(()=>setReady(true),50);},[]);

  // Scan state
  const [brand,setBrand]=useState("");
  const [scanLoading,setScanLoading]=useState(false);
  const [scanResult,setScanResult]=useState(null);
  const [scanError,setScanError]=useState("");

  // Rivals state
  const [rival1,setRival1]=useState("");
  const [rival2,setRival2]=useState("");
  const [rivalLoading,setRivalLoading]=useState(false);
  const [rivalResult,setRivalResult]=useState(null);
  const [rivalError,setRivalError]=useState("");

  // Report state (auto-generated from scan)
  // Fix It state
  const [fixUrl,setFixUrl]=useState("");
  const [fixNiche,setFixNiche]=useState("");
  const [fixLoading,setFixLoading]=useState(false);
  const [fixResult,setFixResult]=useState(null);
  const [fixError,setFixError]=useState("");

  // ═══ SCAN — What is AI saying about me? ═══
  const runScan = useCallback(async()=>{
    if(!brand.trim())return; setScanLoading(true);setScanResult(null);setScanError("");
    try {
      const raw = await ask(
        `You monitor what AI engines say about brands. Respond with ONLY valid JSON:
{"overallSentiment":"<positive|neutral|negative|mixed>","overallScore":<0-100>,"summary":"<3 sentence overview of how AI perceives this brand>","engineResults":[{"engine":"<ChatGPT|Gemini|Claude|Perplexity|Grok|AI Overviews>","mentioned":<true|false>,"sentiment":"<positive|neutral|negative|absent>","whatItSays":"<2-3 sentences: exact paraphrase of what this engine would say about the brand>","topQueries":["<query where brand appears>"]}],"positives":["<good things AI says>"],"negatives":["<concerns or criticisms AI mentions>"],"missingInfo":["<things AI doesn't know about this brand that it should>"],"inaccuracies":["<things AI gets wrong about this brand>"]}`,
        `What are AI engines (ChatGPT, Gemini, Claude, Perplexity, Grok, Google AI Overviews) saying about "${brand}"? For each engine, assess: Is the brand mentioned when users ask about this category? What is the sentiment? What specific claims do they make? What are they getting wrong? What information is missing? Be specific and realistic.`
      );
      const p=pJ(raw); if(!p) throw new Error("Parse failed: "+raw.slice(0,200)); setScanResult(p);
    } catch(e){setScanError(e.message);} setScanLoading(false);
  },[brand]);

  // ═══ RIVALS — What is AI saying about competitors? ═══
  const runRivals = useCallback(async()=>{
    if(!brand.trim()||(!rival1.trim()&&!rival2.trim()))return; setRivalLoading(true);setRivalResult(null);setRivalError("");
    try {
      const rivals = [rival1,rival2].filter(r=>r.trim());
      const raw = await ask(
        `You compare how AI engines discuss competing brands. Respond with ONLY valid JSON:
{"yourBrand":{"name":"<brand>","avgScore":<0-100>,"mentionRate":"<X of 6 engines>","topStrength":"<what AI says you're best at>","topWeakness":"<biggest gap>"},"competitors":[{"name":"<rival>","avgScore":<0-100>,"mentionRate":"<X of 6 engines>","topStrength":"<their advantage per AI>","topWeakness":"<their weakness per AI>","beatsYouOn":["<areas they're recommended over you>"],"youBeatThemOn":["<areas you're recommended over them>"]}],"headToHeadQueries":[{"query":"<comparison query users ask>","winner":"<who AI recommends>","reason":"<why>"}],"stealOpportunities":["<specific things you could do to take their AI mentions>"]}`,
        `Compare how AI engines discuss "${brand}" vs ${rivals.map(r=>`"${r}"`).join(" and ")}. For each: who gets mentioned more? Who gets recommended? What does each brand get praised/criticized for? Where are the opportunities to steal competitor mentions? Be specific.`
      );
      const p=pJ(raw); if(!p) throw new Error("Parse failed: "+raw.slice(0,200)); setRivalResult(p);
    } catch(e){setRivalError(e.message);} setRivalLoading(false);
  },[brand,rival1,rival2]);

  // ═══ FIX IT — GEO content to boost visibility ═══
  const runFix = useCallback(async()=>{
    if(!brand.trim()||!fixUrl.trim())return; setFixLoading(true);setFixResult(null);setFixError("");
    const gaps = scanResult ? (scanResult.missingInfo||[]).concat(scanResult.negatives||[]).join(", ") : "general visibility";
    try {
      const raw = await ask(
        `You create GEO action plans. Respond with ONLY valid JSON:
{"priorityActions":[{"action":"<specific action>","platform":"<where to do it>","impact":"<high|medium|low>","effort":"<quick|moderate|heavy>","description":"<2 sentences on how to execute>"}],"contentToCreate":[{"type":"<article|FAQ|comparison|review response>","title":"<suggested title>","targetQuery":"<the AI query this targets>","outline":"<brief outline>","publishOn":"<Medium|Reddit|LinkedIn|Own blog>"}],"schemaMarkup":"<JSON-LD schema suggestion for their website>","quickWins":["<things they can do today>"],"weeklyPlan":{"week1":"<focus>","week2":"<focus>","week3":"<focus>","week4":"<focus>"}}`,
        `Create a GEO action plan for "${brand}" (${fixUrl}, niche: ${fixNiche||"general"}). Known gaps: ${gaps}. Generate: priority actions ranked by impact, specific content to create with titles and outlines, schema markup suggestions, quick wins for today, and a 4-week plan. Be actionable and specific.`
      );
      const p=pJ(raw); if(!p) throw new Error("Parse failed: "+raw.slice(0,200)); setFixResult(p);
    } catch(e){setFixError(e.message);} setFixLoading(false);
  },[brand,fixUrl,fixNiche,scanResult]);

  const sc=(v)=>v>=70?C.success:v>=40?C.reward:C.danger;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Sora','Outfit',sans-serif",position:"relative"}}>
      <style>{`
        @keyframes mm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes mm-spin{to{transform:rotate(360deg)}}
        @keyframes mm-slide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mm-glow{0%,100%{box-shadow:0 0 24px ${C.primary}22}50%{box-shadow:0 0 48px ${C.primary}44}}
        @keyframes mm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,60,142,.15);border-radius:2px}
        button:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)} button{transition:all .2s}
      `}</style>

      {/* Aurora BG */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:-400,left:"20%",width:800,height:800,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.primary}08 0%, transparent 50%)`,animation:"mm-float 12s ease-in-out infinite"}} />
        <div style={{position:"absolute",top:300,right:"-10%",width:600,height:600,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.trust}05 0%, transparent 50%)`,animation:"mm-float 15s ease-in-out infinite 3s"}} />
        <div style={{position:"absolute",inset:0,opacity:.012,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)",backgroundSize:"32px 32px"}} />
      </div>

      {/* Header */}
      <header style={{padding:"16px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`,position:"relative",zIndex:10,opacity:ready?1:0,transition:"opacity .5s"}}>
        <a href="/" style={{display:"flex",alignItems:"center",gap:11,textDecoration:"none"}}>
          <div style={{width:44,height:44,borderRadius:13,background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"mm-float 4s ease-in-out infinite",display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,color:"#fff",fontWeight:800,boxShadow:`0 0 32px ${C.primary}44, 0 0 60px ${C.primary}15`,border:"2px solid rgba(255,255,255,.12)"}}>@</div>
          <div>
            <div style={{fontSize:20,fontWeight:800,letterSpacing:-.5,color:"#fff",background:`linear-gradient(135deg,#fff,${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:`drop-shadow(0 0 8px ${C.primary}22)`}}>MentionMe</div>
            <div style={{fontSize:8.5,color:C.dim,letterSpacing:2,textTransform:"uppercase"}}>AI Brand Intelligence</div>
          </div>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:7}}><Dot color={C.success} size={6} /><span style={{fontSize:10.5,color:C.success,fontFamily:"'Fira Code',monospace"}}>LIVE</span></div>
      </header>

      {/* Nav */}
      <nav style={{display:"flex",gap:1,padding:"0 26px",borderBottom:`1px solid ${C.border}`,overflowX:"auto",opacity:ready?1:0,transition:"opacity .5s .1s"}}>
        {[
          {id:"scan",l:"🔍 Scan My Brand",c:C.primary},
          {id:"rivals",l:"⚔️ Rival Intel",c:C.reward},
          {id:"report",l:"📊 Visibility Report",c:C.trust},
          {id:"fix",l:"🚀 Fix It (GEO)",c:C.success},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"13px 18px",background:"none",border:"none",cursor:"pointer",whiteSpace:"nowrap",
            color:tab===t.id?t.c:C.dim,fontFamily:"'Sora',sans-serif",fontSize:12,fontWeight:tab===t.id?700:500,
            borderBottom:tab===t.id?`2px solid ${t.c}`:"2px solid transparent",
            textShadow:tab===t.id?`0 0 12px ${t.c}33`:"none",
          }}>{t.l}</button>
        ))}
      </nav>

      <main style={{padding:26,maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>

        {/* ═══════════ SCAN MY BRAND ═══════════ */}
        {tab==="scan"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:4,background:`linear-gradient(90deg,#fff,${C.primary})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>What is AI saying about you?</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:28}}>Scan all 6 major AI engines to see exactly how they describe your brand right now</div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
              <Card glow={C.primary}>
                <Inp label="Your brand / product name" value={brand} onChange={e=>setBrand(e.target.value)} placeholder="e.g., Notion, Shopify, your brand name" />
                <Btn onClick={runScan} disabled={scanLoading||!brand.trim()} style={{width:"100%",justifyContent:"center"}}>
                  {scanLoading?"Scanning AI engines...":"🔍 Scan all 6 AI engines"}
                </Btn>
                {scanError&&<div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",border:"1px solid rgba(255,68,102,.15)",fontSize:11.5,color:C.danger,wordBreak:"break-word"}}>{scanError}</div>}
              </Card>
              <Card>
                <div style={{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:10}}>Scan status</div>
                {!scanLoading&&!scanResult&&(
                  <div>
                    <div style={{fontSize:12,color:C.dim,fontStyle:"italic",marginBottom:16}}>Enter your brand name to discover what AI thinks about you</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                      {ENGINES.map(e=><div key={e.id} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:8,background:"rgba(255,255,255,.02)",border:`1px solid ${C.border}`}}>
                        <span style={{fontSize:14,color:e.color}}>{e.icon}</span><span style={{fontSize:11,color:C.dim}}>{e.name}</span>
                      </div>)}
                    </div>
                  </div>
                )}
                <Timer on={scanLoading} />
                {scanResult&&!scanLoading&&<div style={{fontSize:12,color:C.success,textShadow:`0 0 8px ${C.success}44`}}>✓ Scan complete — analyzed across all 6 engines</div>}
              </Card>
            </div>

            {/* Scan Results */}
            {scanResult&&(
              <div style={{marginTop:28,animation:"mm-slide .4s ease"}}>
                {/* Overall Score + Sentiment */}
                <Card glow={sc(scanResult.overallScore)} style={{marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:24}}>
                    <div style={{width:90,height:90,borderRadius:"50%",border:`3px solid ${sc(scanResult.overallScore)}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"mm-glow 3s infinite",flexShrink:0,background:`radial-gradient(circle, ${sc(scanResult.overallScore)}08 0%, transparent 70%)`}}>
                      <div style={{fontSize:30,fontWeight:800,color:sc(scanResult.overallScore),fontFamily:"'Fira Code',monospace",textShadow:`0 0 16px ${sc(scanResult.overallScore)}55`}}>{scanResult.overallScore}</div>
                      <div style={{fontSize:8,color:C.dim}}>/ 100</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                        <span style={{fontSize:17,fontWeight:700,color:"#fff"}}>AI Perception Score</span>
                        <SentimentBadge sentiment={scanResult.overallSentiment} />
                      </div>
                      <div style={{fontSize:13,color:C.muted,lineHeight:1.55}}>{scanResult.summary}</div>
                    </div>
                  </div>
                </Card>

                {/* Per-engine breakdown */}
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:12}}>What each AI engine says about you</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
                  {(scanResult.engineResults||[]).map((er,i)=>{
                    const eng = ENGINES.find(e=>e.name===er.engine)||{color:C.dim,icon:"?"};
                    return (
                      <Card key={i} glow={er.mentioned?eng.color:undefined} style={{padding:20}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontSize:18,color:eng.color,filter:`drop-shadow(0 0 6px ${eng.color}44)`}}>{eng.icon}</span>
                            <span style={{fontSize:13,fontWeight:700}}>{er.engine}</span>
                          </div>
                          <SentimentBadge sentiment={er.sentiment} />
                        </div>
                        <div style={{fontSize:12,color:er.mentioned?"#ccc":C.dim,lineHeight:1.5,marginBottom:8,fontStyle:er.mentioned?"normal":"italic"}}>
                          {er.mentioned?er.whatItSays:"Not mentioned by this engine"}
                        </div>
                        {er.topQueries?.length>0&&(
                          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                            {er.topQueries.map((q,j)=><span key={j} style={{padding:"2px 8px",borderRadius:8,background:`${eng.color}0a`,border:`1px solid ${eng.color}15`,fontSize:10,color:eng.color}}>"{q}"</span>)}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Positives, Negatives, Missing, Inaccuracies */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <Card glow={C.success}>
                    <div style={{fontSize:12,fontWeight:700,color:C.success,marginBottom:10}}>✓ What AI gets right</div>
                    {(scanResult.positives||[]).map((p,i)=><div key={i} style={{fontSize:12,color:C.muted,padding:"4px 0"}}>▸ {p}</div>)}
                    {(!scanResult.positives||scanResult.positives.length===0)&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>Nothing positive found</div>}
                  </Card>
                  <Card glow={C.danger}>
                    <div style={{fontSize:12,fontWeight:700,color:C.danger,marginBottom:10}}>✕ Concerns AI mentions</div>
                    {(scanResult.negatives||[]).map((n,i)=><div key={i} style={{fontSize:12,color:C.muted,padding:"4px 0"}}>▸ {n}</div>)}
                    {(!scanResult.negatives||scanResult.negatives.length===0)&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>No negatives found</div>}
                  </Card>
                  <Card glow={C.reward}>
                    <div style={{fontSize:12,fontWeight:700,color:C.reward,marginBottom:10}}>? Missing information</div>
                    {(scanResult.missingInfo||[]).map((m,i)=><div key={i} style={{fontSize:12,color:C.muted,padding:"4px 0"}}>▸ {m}</div>)}
                  </Card>
                  <Card glow="#a78bfa">
                    <div style={{fontSize:12,fontWeight:700,color:"#a78bfa",marginBottom:10}}>⚠ Inaccuracies</div>
                    {(scanResult.inaccuracies||[]).map((a,i)=><div key={i} style={{fontSize:12,color:C.muted,padding:"4px 0"}}>▸ {a}</div>)}
                    {(!scanResult.inaccuracies||scanResult.inaccuracies.length===0)&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>No inaccuracies detected</div>}
                  </Card>
                </div>

                <div style={{marginTop:18,display:"flex",gap:10}}>
                  <Btn ghost onClick={()=>setTab("rivals")}>⚔️ Compare with rivals</Btn>
                  <Btn onClick={()=>setTab("fix")}>🚀 Fix these gaps</Btn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ RIVAL INTEL ═══════════ */}
        {tab==="rivals"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:4,background:`linear-gradient(90deg,${C.reward},#fff)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Rival intelligence</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:28}}>See how AI engines compare you to your competitors</div>

            <Card glow={C.reward} style={{marginBottom:22}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                <Inp label="Your brand" value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Your brand" />
                <Inp label="Competitor 1" value={rival1} onChange={e=>setRival1(e.target.value)} placeholder="e.g., Competitor A" />
                <Inp label="Competitor 2 (optional)" value={rival2} onChange={e=>setRival2(e.target.value)} placeholder="e.g., Competitor B" />
              </div>
              <Btn onClick={runRivals} disabled={rivalLoading||!brand.trim()||(!rival1.trim()&&!rival2.trim())} style={{width:"100%",justifyContent:"center"}}>
                {rivalLoading?"Analyzing competitors...":"⚔️ Run rival comparison"}
              </Btn>
              {rivalError&&<div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",fontSize:11.5,color:C.danger}}>{rivalError}</div>}
              <Timer on={rivalLoading} />
            </Card>

            {rivalResult&&(
              <div style={{animation:"mm-slide .4s ease"}}>
                {/* Head to head scores */}
                <div style={{display:"grid",gridTemplateColumns:`repeat(${1+(rivalResult.competitors||[]).length},1fr)`,gap:14,marginBottom:18}}>
                  <Card glow={C.primary} style={{textAlign:"center"}}>
                    <div style={{fontSize:11,color:C.dim,textTransform:"uppercase",fontFamily:"'Fira Code',monospace",marginBottom:8}}>You</div>
                    <div style={{fontSize:32,fontWeight:800,color:C.primary,fontFamily:"'Fira Code',monospace",textShadow:`0 0 16px ${C.primary}44`}}>{rivalResult.yourBrand?.avgScore||0}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff",margin:"8px 0 4px"}}>{rivalResult.yourBrand?.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>{rivalResult.yourBrand?.mentionRate} engines</div>
                    <div style={{fontSize:11,color:C.success,marginTop:6}}>{rivalResult.yourBrand?.topStrength}</div>
                    <div style={{fontSize:11,color:C.danger,marginTop:2}}>{rivalResult.yourBrand?.topWeakness}</div>
                  </Card>
                  {(rivalResult.competitors||[]).map((comp,i)=>(
                    <Card key={i} style={{textAlign:"center"}}>
                      <div style={{fontSize:11,color:C.dim,textTransform:"uppercase",fontFamily:"'Fira Code',monospace",marginBottom:8}}>Rival {i+1}</div>
                      <div style={{fontSize:32,fontWeight:800,color:C.reward,fontFamily:"'Fira Code',monospace"}}>{comp.avgScore||0}</div>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff",margin:"8px 0 4px"}}>{comp.name}</div>
                      <div style={{fontSize:11,color:C.muted}}>{comp.mentionRate} engines</div>
                      <div style={{fontSize:11,color:C.success,marginTop:6}}>{comp.topStrength}</div>
                      <div style={{fontSize:11,color:C.danger,marginTop:2}}>{comp.topWeakness}</div>
                    </Card>
                  ))}
                </div>

                {/* Head to head queries */}
                <Card style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:12}}>Head-to-head: who does AI recommend?</div>
                  {(rivalResult.headToHeadQueries||[]).map((q,i)=>(
                    <div key={i} style={{padding:"10px 0",borderBottom:i<(rivalResult.headToHeadQueries||[]).length-1?`1px solid ${C.border}`:"none"}}>
                      <div style={{fontSize:12.5,color:"#ddd",marginBottom:4}}>"{q.query}"</div>
                      <div style={{fontSize:12,color:q.winner===brand?C.success:C.danger}}>Winner: <strong>{q.winner}</strong> — {q.reason}</div>
                    </div>
                  ))}
                </Card>

                {/* Steal opportunities */}
                <Card glow={C.reward}>
                  <div style={{fontSize:12,fontWeight:700,color:C.reward,marginBottom:10}}>Steal opportunities</div>
                  {(rivalResult.stealOpportunities||[]).map((o,i)=><div key={i} style={{fontSize:12,color:C.muted,padding:"5px 0"}}>▸ {o}</div>)}
                </Card>

                <div style={{marginTop:16}}><Btn onClick={()=>setTab("fix")}>🚀 Build a plan to beat them</Btn></div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ VISIBILITY REPORT ═══════════ */}
        {tab==="report"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:4,background:`linear-gradient(90deg,${C.trust},#fff)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Visibility report</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:28}}>Your AI visibility scorecard with actionable recommendations</div>

            {!scanResult ? (
              <Card style={{textAlign:"center",padding:48}}>
                <div style={{fontSize:40,marginBottom:14}}>🔍</div>
                <div style={{fontSize:16,fontWeight:600,color:"#fff",marginBottom:8}}>No scan data yet</div>
                <p style={{fontSize:13,color:C.muted,marginBottom:20}}>Run a brand scan first to generate your visibility report</p>
                <Btn onClick={()=>setTab("scan")}>← Scan my brand first</Btn>
              </Card>
            ) : (
              <div>
                {/* Score overview */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
                  {[
                    {l:"AI Score",v:scanResult.overallScore+"/100",c:sc(scanResult.overallScore)},
                    {l:"Engines mentioning you",v:`${(scanResult.engineResults||[]).filter(e=>e.mentioned).length}/6`,c:C.trust},
                    {l:"Sentiment",v:scanResult.overallSentiment,c:scanResult.overallSentiment==="positive"?C.success:scanResult.overallSentiment==="negative"?C.danger:C.reward},
                    {l:"Issues found",v:String((scanResult.negatives||[]).length+(scanResult.inaccuracies||[]).length+(scanResult.missingInfo||[]).length),c:C.danger},
                  ].map((s,i)=>(
                    <Card key={i} glow={s.c}>
                      <div style={{fontSize:9.5,color:C.dim,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Fira Code',monospace",marginBottom:8}}>{s.l}</div>
                      <div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"'Fira Code',monospace",textShadow:`0 0 12px ${s.c}33`,textTransform:"capitalize"}}>{s.v}</div>
                    </Card>
                  ))}
                </div>

                {/* Engine visibility bars */}
                <Card style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Engine-by-engine visibility</div>
                  {(scanResult.engineResults||[]).map((er,i)=>{
                    const eng=ENGINES.find(e=>e.name===er.engine)||{color:C.dim,icon:"?"};
                    const score=er.mentioned?(er.sentiment==="positive"?85:er.sentiment==="neutral"?55:30):0;
                    return (
                      <div key={i} style={{display:"grid",gridTemplateColumns:"140px 1fr 90px",alignItems:"center",gap:14,padding:"8px 0",borderBottom:i<(scanResult.engineResults||[]).length-1?`1px solid ${C.border}`:"none"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontSize:16,color:eng.color}}>{eng.icon}</span>
                          <span style={{fontSize:12.5,fontWeight:600}}>{er.engine}</span>
                        </div>
                        <Bar pct={score} color={eng.color} />
                        <SentimentBadge sentiment={er.sentiment} />
                      </div>
                    );
                  })}
                </Card>

                {/* Recommendations */}
                <Card glow={C.primary} style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:12}}>Recommended actions</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {(scanResult.missingInfo||[]).map((m,i)=>(
                      <div key={`m${i}`} style={{padding:"12px 14px",borderRadius:10,background:`${C.reward}08`,border:`1px solid ${C.reward}15`}}>
                        <div style={{fontSize:10,color:C.reward,fontWeight:600,marginBottom:4}}>ADD MISSING INFO</div>
                        <div style={{fontSize:12,color:C.muted}}>{m}</div>
                      </div>
                    ))}
                    {(scanResult.inaccuracies||[]).map((a,i)=>(
                      <div key={`a${i}`} style={{padding:"12px 14px",borderRadius:10,background:`${C.danger}08`,border:`1px solid ${C.danger}15`}}>
                        <div style={{fontSize:10,color:C.danger,fontWeight:600,marginBottom:4}}>FIX INACCURACY</div>
                        <div style={{fontSize:12,color:C.muted}}>{a}</div>
                      </div>
                    ))}
                    {(scanResult.negatives||[]).map((n,i)=>(
                      <div key={`n${i}`} style={{padding:"12px 14px",borderRadius:10,background:`rgba(167,139,250,.06)`,border:"1px solid rgba(167,139,250,.12)"}}>
                        <div style={{fontSize:10,color:"#a78bfa",fontWeight:600,marginBottom:4}}>ADDRESS CONCERN</div>
                        <div style={{fontSize:12,color:C.muted}}>{n}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div style={{display:"flex",gap:10}}>
                  <Btn onClick={()=>setTab("fix")}>🚀 Generate a fix plan</Btn>
                  <Btn ghost onClick={()=>setTab("rivals")}>⚔️ Compare with rivals</Btn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ FIX IT (GEO) ═══════════ */}
        {tab==="fix"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:4,background:`linear-gradient(90deg,${C.success},${C.trust})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Fix it — GEO action plan</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:28}}>Get a specific plan to boost your AI visibility based on your scan results</div>

            {!scanResult&&(
              <Card style={{marginBottom:22,padding:20,background:`${C.reward}06`,border:`1px solid ${C.reward}15`}}>
                <div style={{fontSize:12,color:C.reward}}>💡 Tip: Run a brand scan first for a personalized plan. Without scan data, you'll get general recommendations.</div>
              </Card>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
              <Card glow={C.success}>
                <Inp label="Brand name" value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Your brand" />
                <Inp label="Website URL" value={fixUrl} onChange={e=>setFixUrl(e.target.value)} placeholder="https://yourbrand.com" />
                <Inp label="Niche / industry" value={fixNiche} onChange={e=>setFixNiche(e.target.value)} placeholder="e.g., SaaS, E-commerce, Health" />
                <Btn onClick={runFix} disabled={fixLoading||!brand.trim()||!fixUrl.trim()} style={{width:"100%",justifyContent:"center"}}>
                  {fixLoading?"Building your plan...":"🚀 Generate GEO action plan"}
                </Btn>
                {fixError&&<div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",fontSize:11.5,color:C.danger}}>{fixError}</div>}
              </Card>
              <Card>
                <div style={{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:10}}>Plan status</div>
                {!fixLoading&&!fixResult&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>Fill in details and generate your personalized GEO action plan</div>}
                <Timer on={fixLoading} />
                {fixResult&&!fixLoading&&<div style={{fontSize:12,color:C.success}}>✓ Action plan ready with {(fixResult.priorityActions||[]).length} actions and {(fixResult.contentToCreate||[]).length} content pieces</div>}
              </Card>
            </div>

            {fixResult&&(
              <div style={{marginTop:28,animation:"mm-slide .4s ease"}}>
                {/* Quick wins */}
                <Card glow={C.success} style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.success,marginBottom:10}}>⚡ Quick wins — do these today</div>
                  {(fixResult.quickWins||[]).map((w,i)=><div key={i} style={{fontSize:12.5,color:C.muted,padding:"5px 0",display:"flex",gap:8}}><span style={{color:C.success,flexShrink:0}}>▸</span>{w}</div>)}
                </Card>

                {/* Priority actions */}
                <Card style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:14}}>Priority actions</div>
                  {(fixResult.priorityActions||[]).map((a,i)=>(
                    <div key={i} style={{padding:"14px 16px",marginBottom:8,borderRadius:10,background:"rgba(255,255,255,.015)",border:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{a.action}</span>
                        <div style={{display:"flex",gap:6}}>
                          <span style={{padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:600,
                            background:a.impact==="high"?`${C.danger}12`:a.impact==="medium"?`${C.reward}12`:`${C.trust}12`,
                            color:a.impact==="high"?C.danger:a.impact==="medium"?C.reward:C.trust,
                            border:`1px solid ${a.impact==="high"?C.danger:a.impact==="medium"?C.reward:C.trust}22`
                          }}>{a.impact} impact</span>
                          <span style={{padding:"2px 8px",borderRadius:8,fontSize:10,background:"rgba(255,255,255,.04)",color:C.muted}}>{a.effort}</span>
                        </div>
                      </div>
                      <div style={{fontSize:11.5,color:C.muted,marginBottom:4}}>Platform: <span style={{color:C.trust}}>{a.platform}</span></div>
                      <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{a.description}</div>
                    </div>
                  ))}
                </Card>

                {/* Content to create */}
                <Card glow={C.primary} style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:14}}>Content to create</div>
                  {(fixResult.contentToCreate||[]).map((c,i)=>(
                    <div key={i} style={{padding:"14px 16px",marginBottom:8,borderRadius:10,background:"rgba(255,255,255,.015)",border:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:13,fontWeight:700,color:C.primary}}>{c.title}</span>
                        <span style={{padding:"2px 8px",borderRadius:8,background:`${C.reward}12`,fontSize:10,color:C.reward}}>{c.type}</span>
                      </div>
                      <div style={{fontSize:11.5,color:C.muted,marginBottom:4}}>Targets: <span style={{color:C.trust}}>"{c.targetQuery}"</span> · Publish on: <span style={{color:C.success}}>{c.publishOn}</span></div>
                      <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{c.outline}</div>
                    </div>
                  ))}
                </Card>

                {/* 4-week plan */}
                {fixResult.weeklyPlan&&(
                  <Card glow={C.trust} style={{marginBottom:18}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:14}}>4-week GEO plan</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
                      {["week1","week2","week3","week4"].map((w,i)=>(
                        <div key={w} style={{padding:14,borderRadius:10,background:"rgba(255,255,255,.015)",border:`1px solid ${C.border}`,textAlign:"center"}}>
                          <div style={{fontSize:10,color:C.trust,fontFamily:"'Fira Code',monospace",fontWeight:600,marginBottom:8}}>WEEK {i+1}</div>
                          <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{fixResult.weeklyPlan[w]}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Btn ghost onClick={()=>{
                  const pkg = JSON.stringify({brand,url:fixUrl,niche:fixNiche,scanResult,rivalResult,fixResult},null,2);
                  const b=new Blob([pkg],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`mentionme-plan-${Date.now()}.json`;a.click();
                }}>⬇ Download full report + plan</Btn>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
