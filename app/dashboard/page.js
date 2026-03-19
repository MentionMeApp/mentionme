"use client";
import { useState, useEffect, useCallback } from "react";

const API = "https://api.anthropic.com/v1/messages";
const MDL = "claude-sonnet-4-20250514";

const PLATS = [
  { id:"chatgpt", name:"ChatGPT", icon:"◈", daily:"800M+", color:"#10a37f", share:32 },
  { id:"gemini", name:"Gemini", icon:"◇", daily:"600M+", color:"#4285f4", share:24 },
  { id:"claude", name:"Claude", icon:"◆", daily:"300M+", color:"#d4a574", share:12 },
  { id:"perplexity", name:"Perplexity", icon:"◎", daily:"250M+", color:"#20b2aa", share:10 },
  { id:"grok", name:"Grok", icon:"✦", daily:"200M+", color:"#e0e0e0", share:8 },
  { id:"aio", name:"AI Overviews", icon:"◉", daily:"350M+", color:"#ea4335", share:14 },
];

const NICHES = ["SaaS & Software","E-commerce","Health & Wellness","Finance & Crypto","Real Estate","Education","Travel","Legal Services","Marketing Agency","Local Business","B2B Services","Creator Economy"];

const DIST = [
  { id:"medium", name:"Medium", icon:"M", color:"#00ab6c", type:"Article" },
  { id:"reddit", name:"Reddit", icon:"R", color:"#ff4500", type:"Post" },
  { id:"quora", name:"Quora", icon:"Q", color:"#b92b27", type:"Answer" },
  { id:"linkedin", name:"LinkedIn", icon:"in", color:"#0077b5", type:"Article" },
  { id:"blog", name:"Own Blog", icon:"B", color:"#ff3c8e", type:"SEO Page" },
  { id:"youtube", name:"YouTube", icon:"▶", color:"#ff0000", type:"Description" },
  { id:"hackernews", name:"Hacker News", icon:"Y", color:"#ff6600", type:"Submission" },
  { id:"github", name:"GitHub", icon:"G", color:"#8b5cf6", type:"README" },
];

async function ask(system, user) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 90000);
  try {
    const r = await fetch(API, { method:"POST", headers:{"Content-Type":"application/json"}, signal:ctrl.signal,
      body:JSON.stringify({ model:MDL, max_tokens:4096, system, messages:[{role:"user",content:user}] }) });
    clearTimeout(timeout);
    if (!r.ok) { const e = await r.json().catch(()=>({})); throw new Error(e?.error?.message||`HTTP ${r.status}`); }
    const d = await r.json(); if (d.error) throw new Error(d.error.message);
    return (d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
  } catch(e) { clearTimeout(timeout); if (e.name==="AbortError") throw new Error("Timed out. Try again."); throw e; }
}
function parseJSON(raw) { try { const c=raw.replace(/```json\s*/g,"").replace(/```/g,"").trim(); const s=c.indexOf("{"); const e=c.lastIndexOf("}"); if(s>=0&&e>s) return JSON.parse(c.slice(s,e+1)); return JSON.parse(c); } catch { return null; } }

// ═══ DOPAMINE COLOR SYSTEM ═══
// Hot magenta = action/primary (excitement, urgency)
// Electric amber/gold = reward/success (dopamine trigger)  
// Cyan/electric blue = trust/intelligence (AI feel)
// Warm pink glow = comfort/belonging
const C = {
  bg:"#0a0510",
  card:"rgba(255,255,255,.018)",
  border:"rgba(255,255,255,.055)",
  primary:"#ff3c8e",       // hot magenta — excitement
  primaryGlow:"rgba(255,60,142,.15)",
  primarySoft:"rgba(255,60,142,.08)",
  reward:"#ffb938",         // electric amber — dopamine/reward
  rewardSoft:"rgba(255,185,56,.08)",
  trust:"#00d4ff",          // electric cyan — trust/AI
  trustSoft:"rgba(0,212,255,.08)",
  success:"#3dff97",        // neon mint — success
  successSoft:"rgba(61,255,151,.08)",
  danger:"#ff4466",
  text:"#f0ecf8",
  muted:"#9590aa",
  dim:"#5f5a75",
};

// ═══ Components ═══
const Dot = ({color,size=7}) => <span style={{display:"inline-block",width:size,height:size,borderRadius:"50%",background:color,animation:"mm-pulse 2s ease-in-out infinite",boxShadow:`0 0 ${size*2}px ${color}66`}} />;

const Bar = ({pct,color}) => (
  <div style={{width:"100%",height:5,background:"rgba(255,255,255,.04)",borderRadius:3}}>
    <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}cc)`,borderRadius:3,transition:"width 1.2s cubic-bezier(.34,1.56,.64,1)",boxShadow:`0 0 8px ${color}44`}} />
  </div>
);

const Card = ({children,glow,style}) => (
  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:24,backdropFilter:"blur(8px)",
    boxShadow:glow?`0 0 30px ${glow}15, inset 0 1px 0 rgba(255,255,255,.04)`:"inset 0 1px 0 rgba(255,255,255,.04)",...style}}>
    {children}
  </div>
);

const Inp = ({label,value,onChange,placeholder,multi,rows=3}) => {
  const s = {width:"100%",padding:"11px 15px",borderRadius:10,background:"rgba(255,255,255,.04)",border:`1px solid ${C.border}`,color:C.text,fontSize:13.5,fontFamily:"inherit",outline:"none",transition:"all .3s"};
  return (
    <div style={{marginBottom:15}}>
      {label && <label style={{display:"block",fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6,fontFamily:"'Fira Code',monospace"}}>{label}</label>}
      {multi ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{...s,resize:"vertical"}}
        onFocus={e=>{e.target.style.borderColor=C.primary+"66";e.target.style.boxShadow=`0 0 16px ${C.primary}18`}}
        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />
      : <input value={value} onChange={onChange} placeholder={placeholder} style={s}
        onFocus={e=>{e.target.style.borderColor=C.primary+"66";e.target.style.boxShadow=`0 0 16px ${C.primary}18`}}
        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />}
    </div>
  );
};

const Btn = ({children,onClick,disabled,ghost,style:sx}) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding:"12px 22px",borderRadius:11,cursor:disabled?"not-allowed":"pointer",
    fontWeight:700,fontSize:13.5,fontFamily:"inherit",border:ghost?`1px solid ${C.border}`:"none",
    transition:"all .3s",display:"inline-flex",alignItems:"center",gap:8,
    background:ghost?"rgba(255,255,255,.03)":disabled?"rgba(255,255,255,.04)":`linear-gradient(135deg,${C.primary},#ff6b3c)`,
    color:ghost?C.text:disabled?C.dim:"#fff",
    boxShadow:disabled||ghost?"none":`0 4px 20px ${C.primary}33`,
    ...sx,
  }}>{children}</button>
);

const Tag = ({children,active,onClick}) => (
  <button onClick={onClick} style={{
    padding:"5px 14px",borderRadius:20,cursor:"pointer",fontSize:11.5,fontFamily:"inherit",transition:"all .25s",
    background:active?`linear-gradient(135deg,${C.primary}20,${C.reward}15)`:"rgba(255,255,255,.03)",
    border:`1px solid ${active?C.primary+"44":C.border}`,
    color:active?C.reward:C.muted,
    boxShadow:active?`0 0 12px ${C.primary}15`:"none",
  }}>{children}</button>
);

function Timer({on}) {
  const [s,setS] = useState(0);
  useEffect(()=>{if(!on){setS(0);return;} const t=setInterval(()=>setS(p=>p+1),1000); return()=>clearInterval(t);},[on]);
  if (!on) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",marginTop:10,borderRadius:10,
      background:`linear-gradient(135deg,${C.primarySoft},${C.trustSoft})`,
      border:`1px solid ${C.primary}18`,boxShadow:`0 0 20px ${C.primary}10`}}>
      <span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.primary}55`,borderTopColor:C.primary,borderRadius:"50%",animation:"mm-spin .6s linear infinite"}} />
      <span style={{fontSize:12,color:C.primary,fontFamily:"'Fira Code',monospace"}}>{s}s</span>
      <span style={{fontSize:11,color:C.muted}}>{s<10?"Warming up the AI...":s<25?"Crunching data...":s<50?"Almost magic...":"Finishing up..."}</span>
    </div>
  );
}

// ═══ MAIN ═══
export default function App() {
  const [tab,setTab] = useState("dashboard");
  const [ready,setReady] = useState(false);
  useEffect(()=>{setTimeout(()=>setReady(true),50);},[]);

  const [aBrand,setABrand]=useState(""); const [aQueries,setAQueries]=useState(""); const [aLoading,setALoading]=useState(false); const [aResult,setAResult]=useState(null); const [aError,setAError]=useState("");
  const [gName,setGName]=useState(""); const [gUrl,setGUrl]=useState(""); const [gOffer,setGOffer]=useState(""); const [gNiche,setGNiche]=useState(""); const [gPlats,setGPlats]=useState([]); const [gLoading,setGLoading]=useState(false); const [gResult,setGResult]=useState(null); const [gError,setGError]=useState("");
  const [dLoading,setDLoading]=useState(false); const [dPlatform,setDPlatform]=useState(null); const [dResult,setDResult]=useState(null); const [dError,setDError]=useState("");
  const [camps,setCamps] = useState([
    {id:1,name:"FitTrack Pro Launch",status:"active",imp:142800,clk:8740,ctr:6.12,plats:["chatgpt","gemini","claude"],niche:"Health",date:"Mar 14"},
    {id:2,name:"TaxHelper Lead Gen",status:"active",imp:89200,clk:5120,ctr:5.74,plats:["chatgpt","perplexity","aio"],niche:"Finance",date:"Mar 11"},
  ]);

  const runAudit = useCallback(async()=>{
    if(!aBrand.trim())return; setALoading(true);setAResult(null);setAError("");
    try{const qs=aQueries.trim()?aQueries.split("\n").filter(Boolean).map(q=>q.trim()):[`best ${aBrand}`,`${aBrand} review`,`${aBrand} alternatives`,`is ${aBrand} worth it`];
    const raw=await ask(`You are a GEO analyst. Respond with ONLY valid JSON: {"overallScore":<0-100>,"summary":"<2 sentences>","queryResults":[{"query":"<q>","visibility":"<high|medium|low|none>","aiMentions":"<analysis>","recommendation":"<action>"}],"topOpportunities":["<1>","<2>","<3>"],"competitorsFound":["<1>","<2>"],"authorityGaps":["<1>","<2>","<3>"]}`,
    `GEO audit for "${aBrand}". Queries: ${qs.map(q=>`"${q}"`).join(", ")}. For each: visibility in AI answers, competitors, authority gaps. Be specific.`);
    const p=parseJSON(raw); if(!p) throw new Error("Parse failed: "+raw.slice(0,200)); setAResult(p);}catch(e){setAError(e.message);} setALoading(false);
  },[aBrand,aQueries]);

  const runGen = useCallback(async()=>{
    if(!gUrl.trim()||!gOffer.trim()||!gNiche)return; setGLoading(true);setGResult(null);setGError("");
    try{const pn=gPlats.length?gPlats.map(id=>PLATS.find(p=>p.id===id)?.name).filter(Boolean).join(", "):"all AI platforms";
    const raw=await ask(`You are a GEO content strategist. Respond with ONLY valid JSON: {"triggerQueries":["<8+ queries>"],"answerSnippets":[{"targetQuery":"<q>","snippet":"<2-3 sentence answer mentioning product>","targetEngine":"<engine>"}],"seoContent":{"title":"<title>","metaDescription":"<155 chars>","h2Headings":["<headings>"],"outline":"<outline>"},"faqPairs":[{"question":"<q>","answer":"<a>"}],"entityOptimizations":["<actions>"],"citationStrategy":"<strategy>"}`,
    `GEO content for: Product: ${gOffer}, URL: ${gUrl}, Niche: ${gNiche}, Target: ${pn}. Generate 8+ trigger queries, 4+ snippets, SEO structure, 5+ FAQs, entity optimizations, citation strategy.`);
    const p=parseJSON(raw); if(!p) throw new Error("Parse failed: "+raw.slice(0,200)); setGResult(p);
    setCamps(prev=>[{id:Date.now(),name:gName||"New Campaign",status:"draft",imp:0,clk:0,ctr:0,plats:gPlats,niche:gNiche,date:"Today"},...prev]);
    }catch(e){setGError(e.message);} setGLoading(false);
  },[gUrl,gOffer,gNiche,gName,gPlats]);

  const runDist = useCallback(async(plat)=>{
    if(!gResult)return; setDPlatform(plat.id);setDLoading(true);setDResult(null);setDError("");
    try{const raw=await ask(`You adapt GEO content for platforms. Respond with ONLY valid JSON: {"title":"<title>","content":"<full publishable content>","hashtags":["<tags>"],"tips":["<3 tips>"],"bestTime":"<when>","reach":"<estimate>","citationNote":"<note>"}`,
    `Adapt for ${plat.name} (${plat.type}): Queries: ${(gResult.triggerQueries||[]).slice(0,5).join(", ")}. Title: ${gResult.seoContent?.title||"N/A"}. FAQs: ${(gResult.faqPairs||[]).slice(0,3).map(f=>f.question).join(", ")}. Create publication-ready content for ${plat.name}.`);
    const p=parseJSON(raw); if(!p) throw new Error("Parse failed"); setDResult(p);}catch(e){setDError(e.message);} setDLoading(false);
  },[gResult]);

  const download=()=>{if(!gResult)return;const b=new Blob([JSON.stringify({campaign:gName,url:gUrl,offer:gOffer,niche:gNiche,content:gResult,distribution:dResult?{platform:dPlatform,content:dResult}:null},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`mentionme-${Date.now()}.json`;a.click();};

  const sc=(v)=>v>=70?C.success:v>=40?C.reward:C.danger;
  const vc=(v)=>v==="high"?C.success:v==="medium"?C.reward:v==="low"?"#ff8844":C.danger;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Sora','Outfit',sans-serif",position:"relative"}}>
      <style>{`
        @keyframes mm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes mm-spin{to{transform:rotate(360deg)}}
        @keyframes mm-slide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mm-glow{0%,100%{box-shadow:0 0 24px ${C.primary}22}50%{box-shadow:0 0 48px ${C.primary}44}}
        @keyframes mm-aurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes mm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes mm-shimmer{0%{left:-150%}100%{left:150%}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,60,142,.15);border-radius:2px}
        button:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)}
        button{transition:all .2s ease}
      `}</style>

      {/* Aurora BG */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:-400,left:"20%",width:800,height:800,borderRadius:"50%",
          background:`radial-gradient(ellipse, ${C.primary}08 0%, transparent 50%)`,animation:"mm-float 12s ease-in-out infinite"}} />
        <div style={{position:"absolute",top:300,right:"-10%",width:600,height:600,borderRadius:"50%",
          background:`radial-gradient(ellipse, ${C.trust}05 0%, transparent 50%)`,animation:"mm-float 15s ease-in-out infinite 3s"}} />
        <div style={{position:"absolute",bottom:-200,left:"30%",width:700,height:700,borderRadius:"50%",
          background:`radial-gradient(ellipse, ${C.reward}04 0%, transparent 50%)`,animation:"mm-float 18s ease-in-out infinite 6s"}} />
        <div style={{position:"absolute",inset:0,opacity:.012,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)",backgroundSize:"32px 32px"}} />
      </div>

      {/* Header */}
      <header style={{padding:"16px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",
        borderBottom:`1px solid ${C.border}`,position:"relative",zIndex:10,
        opacity:ready?1:0,transition:"opacity .5s"}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:36,height:36,borderRadius:10,
            background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"mm-aurora 4s ease infinite",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",fontWeight:800,
            boxShadow:`0 0 24px ${C.primary}33`}}>@</div>
          <div>
            <div style={{fontSize:17,fontWeight:800,letterSpacing:-.5,color:"#fff",
              background:`linear-gradient(135deg,#fff,${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>MentionMe</div>
            <div style={{fontSize:8.5,color:C.dim,letterSpacing:2,textTransform:"uppercase"}}>GEO Platform</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <Dot color={C.success} size={6} />
          <span style={{fontSize:10.5,color:C.success,fontFamily:"'Fira Code',monospace"}}>LIVE</span>
        </div>
      </header>

      {/* Nav */}
      <nav style={{display:"flex",gap:1,padding:"0 26px",borderBottom:`1px solid ${C.border}`,overflowX:"auto",
        opacity:ready?1:0,transition:"opacity .5s .1s"}}>
        {[{id:"dashboard",l:"Dashboard"},{id:"audit",l:"GEO Audit"},{id:"generate",l:"Generate"},{id:"distribute",l:"Distribute"},{id:"campaigns",l:"Campaigns"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"13px 17px",background:"none",border:"none",cursor:"pointer",whiteSpace:"nowrap",
            color:tab===t.id?C.primary:C.dim,fontFamily:"'Fira Code',monospace",fontSize:10,letterSpacing:.6,
            borderBottom:tab===t.id?`2px solid ${C.primary}`:"2px solid transparent",
            textTransform:"uppercase",
            textShadow:tab===t.id?`0 0 12px ${C.primary}44`:"none",
          }}>{t.l}</button>
        ))}
      </nav>

      <main style={{padding:26,maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>

        {/* ═══ DASHBOARD ═══ */}
        {tab==="dashboard"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:26}}>
              {[{l:"AI Engines",v:"6",c:C.primary,g:C.primary},{l:"Daily Answers",v:"2.5B+",c:C.trust,g:C.trust},{l:"Active",v:String(camps.filter(c=>c.status==="active").length),c:C.reward,g:C.reward},{l:"Total Clicks",v:camps.reduce((s,c)=>s+c.clk,0).toLocaleString(),c:C.success,g:C.success}].map((s,i)=>(
                <Card key={i} glow={s.g} style={{animation:`mm-slide .45s ease ${i*.08}s both`}}>
                  <div style={{fontSize:9.5,color:C.dim,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Fira Code',monospace",marginBottom:10}}>{s.l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'Fira Code',monospace",textShadow:`0 0 20px ${s.c}33`}}>{s.v}</div>
                </Card>
              ))}
            </div>
            <Card glow={C.primary} style={{marginBottom:26}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:18,
                background:`linear-gradient(90deg,#fff,${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI platform reach</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {PLATS.map((p,i)=>(
                  <div key={p.id} style={{background:"rgba(255,255,255,.012)",borderRadius:12,padding:"14px 16px",
                    border:`1px solid ${C.border}`,transition:"all .35s",cursor:"default",position:"relative",overflow:"hidden"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color+"40";e.currentTarget.style.boxShadow=`0 0 20px ${p.color}15`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <span style={{fontSize:16,color:p.color,filter:`drop-shadow(0 0 6px ${p.color}44)`}}>{p.icon}</span>
                      <span style={{fontSize:12.5,fontWeight:600}}>{p.name}</span>
                      <Dot color={p.color} size={4} />
                    </div>
                    <div style={{fontFamily:"'Fira Code',monospace",fontSize:16,fontWeight:700,color:p.color,marginBottom:6,textShadow:`0 0 12px ${p.color}33`}}>{p.daily}</div>
                    <Bar pct={(p.share/35)*100} color={p.color} />
                  </div>
                ))}
              </div>
            </Card>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {[{i:"🔍",t:"GEO Audit",d:"Check AI visibility",to:"audit",c:C.trust},{i:"🧠",t:"Generate",d:"Create optimized content",to:"generate",c:C.primary},{i:"🚀",t:"Distribute",d:"Push to authority sites",to:"distribute",c:C.reward}].map((a,i)=>(
                <button key={a.to} onClick={()=>setTab(a.to)} style={{
                  background:"rgba(255,255,255,.012)",border:`1px solid ${C.border}`,borderRadius:16,padding:24,
                  cursor:"pointer",textAlign:"left",color:"inherit",fontFamily:"inherit",
                  transition:"all .35s",animation:`mm-slide .4s ease ${.3+i*.1}s both`}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=a.c+"35";e.currentTarget.style.boxShadow=`0 4px 24px ${a.c}12`}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none"}}>
                  <div style={{fontSize:28,marginBottom:12,filter:`drop-shadow(0 0 8px ${a.c}44)`}}>{a.i}</div>
                  <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>{a.t}</div>
                  <div style={{fontSize:11.5,color:C.muted}}>{a.d}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AUDIT ═══ */}
        {tab==="audit"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:3,background:`linear-gradient(90deg,#fff,${C.trust})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GEO visibility audit</div>
            <div style={{fontSize:12.5,color:C.muted,marginBottom:24}}>See exactly how AI engines talk about your brand</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
              <Card glow={C.trust}>
                <Inp label="Brand / product name" value={aBrand} onChange={e=>setABrand(e.target.value)} placeholder="e.g., Notion, Stripe, FitTrack Pro" />
                <Inp label="Custom queries (optional)" value={aQueries} onChange={e=>setAQueries(e.target.value)} placeholder={"best project management tool\ntop productivity app 2026"} multi rows={4} />
                <Btn onClick={runAudit} disabled={aLoading||!aBrand.trim()} style={{width:"100%",justifyContent:"center"}}>
                  {aLoading?"Running audit...":"🔍 Run GEO audit"}
                </Btn>
                {aError&&<div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",border:"1px solid rgba(255,68,102,.15)",fontSize:11.5,color:C.danger,wordBreak:"break-word"}}>{aError}</div>}
              </Card>
              <Card>
                <div style={{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:10}}>Status</div>
                {!aLoading&&!aResult&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>Enter a brand name to begin</div>}
                <Timer on={aLoading} />
                {aResult&&!aLoading&&<div style={{fontSize:12,color:C.success,textShadow:`0 0 8px ${C.success}44`}}>✓ Audit complete — score: {aResult.overallScore}/100</div>}
              </Card>
            </div>
            {aResult&&(
              <div style={{marginTop:24,animation:"mm-slide .4s ease"}}>
                <Card glow={sc(aResult.overallScore)} style={{marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:22}}>
                    <div style={{width:85,height:85,borderRadius:"50%",border:`3px solid ${sc(aResult.overallScore)}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"mm-glow 3s infinite",flexShrink:0,
                      background:`radial-gradient(circle, ${sc(aResult.overallScore)}08 0%, transparent 70%)`}}>
                      <div style={{fontSize:28,fontWeight:800,color:sc(aResult.overallScore),fontFamily:"'Fira Code',monospace",textShadow:`0 0 16px ${sc(aResult.overallScore)}55`}}>{aResult.overallScore}</div>
                      <div style={{fontSize:8,color:C.dim,textTransform:"uppercase"}}>/ 100</div>
                    </div>
                    <div><div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:5}}>GEO visibility score</div><div style={{fontSize:12.5,color:C.muted,lineHeight:1.5}}>{aResult.summary}</div></div>
                  </div>
                </Card>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <Card>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:12}}>Query breakdown</div>
                    {(aResult.queryResults||[]).map((q,i)=>(
                      <div key={i} style={{padding:"10px 0",borderBottom:i<(aResult.queryResults||[]).length-1?`1px solid ${C.border}`:"none"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{fontSize:12,color:"#ddd"}}>"{q.query}"</span>
                          <span style={{fontSize:9.5,fontFamily:"'Fira Code',monospace",color:vc(q.visibility),textTransform:"uppercase",textShadow:`0 0 6px ${vc(q.visibility)}44`}}>{q.visibility}</span>
                        </div>
                        <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{q.aiMentions}</div>
                        <div style={{fontSize:10.5,color:C.primary}}>→ {q.recommendation}</div>
                      </div>
                    ))}
                  </Card>
                  <div style={{display:"flex",flexDirection:"column",gap:14}}>
                    <Card glow={C.reward}><div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>Opportunities</div>{(aResult.topOpportunities||[]).map((o,i)=><div key={i} style={{fontSize:11.5,color:C.muted,padding:"4px 0"}}>▸ {o}</div>)}</Card>
                    <Card><div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>Competitors</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{(aResult.competitorsFound||[]).map((c,i)=><span key={i} style={{padding:"3px 10px",borderRadius:14,background:"rgba(255,68,102,.06)",border:"1px solid rgba(255,68,102,.12)",fontSize:11,color:C.danger}}>{c}</span>)}</div></Card>
                    <Card><div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>Authority gaps</div>{(aResult.authorityGaps||[]).map((g,i)=><div key={i} style={{fontSize:11.5,color:C.muted,padding:"4px 0"}}><span style={{color:C.reward}}>!</span> {g}</div>)}</Card>
                  </div>
                </div>
                <div style={{marginTop:16}}><Btn ghost onClick={()=>setTab("generate")}>→ Generate content to fix gaps</Btn></div>
              </div>
            )}
          </div>
        )}

        {/* ═══ GENERATE ═══ */}
        {tab==="generate"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:3,background:`linear-gradient(90deg,${C.primary},${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI content generator</div>
            <div style={{fontSize:12.5,color:C.muted,marginBottom:24}}>Create content AI engines can't ignore</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
              <div>
                <Card glow={C.primary} style={{marginBottom:14}}>
                  <Inp label="Campaign name" value={gName} onChange={e=>setGName(e.target.value)} placeholder="e.g., Q1 Launch" />
                  <Inp label="Target URL" value={gUrl} onChange={e=>setGUrl(e.target.value)} placeholder="https://your-product.com" />
                  <Inp label="Product / offer" value={gOffer} onChange={e=>setGOffer(e.target.value)} placeholder="What you're promoting..." multi rows={3} />
                </Card>
                <Card style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:8}}>Niche</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{NICHES.map(n=><Tag key={n} active={gNiche===n} onClick={()=>setGNiche(n)}>{n}</Tag>)}</div>
                </Card>
                <Card>
                  <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:8}}>AI Platforms</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    {PLATS.map(p=>(
                      <button key={p.id} onClick={()=>setGPlats(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])} style={{
                        display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:9,cursor:"pointer",
                        border:`1px solid ${gPlats.includes(p.id)?p.color+"50":C.border}`,
                        background:gPlats.includes(p.id)?`${p.color}08`:"transparent",
                        color:"inherit",fontFamily:"inherit",textAlign:"left",
                        boxShadow:gPlats.includes(p.id)?`0 0 12px ${p.color}10`:"none",
                      }}>
                        <span style={{fontSize:14,color:p.color,filter:`drop-shadow(0 0 4px ${p.color}44)`}}>{p.icon}</span>
                        <span style={{fontSize:11.5}}>{p.name}</span>
                        {gPlats.includes(p.id)&&<span style={{marginLeft:"auto",color:p.color,fontSize:10}}>✓</span>}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
              <div>
                <Card style={{minHeight:100,marginBottom:14}}>
                  <div style={{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1.1,fontFamily:"'Fira Code',monospace",marginBottom:10}}>Status</div>
                  {!gLoading&&!gResult&&<div style={{fontSize:12,color:C.dim,fontStyle:"italic"}}>Fill in the form and generate</div>}
                  <Timer on={gLoading} />
                  {gResult&&!gLoading&&<div style={{fontSize:12,color:C.success,textShadow:`0 0 8px ${C.success}44`}}>✓ Package ready — {(gResult.triggerQueries||[]).length} queries, {(gResult.answerSnippets||[]).length} snippets</div>}
                </Card>
                <Btn onClick={runGen} disabled={gLoading||!gUrl.trim()||!gOffer.trim()||!gNiche} style={{width:"100%",justifyContent:"center",marginBottom:14}}>
                  {gLoading?"Generating...":"🧠 Generate content"}
                </Btn>
                {gError&&<div style={{padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",border:"1px solid rgba(255,68,102,.15)",fontSize:11.5,color:C.danger,wordBreak:"break-word"}}>{gError}</div>}
              </div>
            </div>
            {gResult&&(
              <div style={{marginTop:24,animation:"mm-slide .4s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:16,fontWeight:700,background:`linear-gradient(90deg,${C.success},${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>✓ Content package ready</div>
                  <Btn ghost onClick={download}>⬇ Download</Btn>
                </div>
                <Card glow={C.primary} style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:9}}>Trigger queries</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{(gResult.triggerQueries||[]).map((q,i)=><span key={i} style={{padding:"4px 12px",borderRadius:14,background:`linear-gradient(135deg,${C.primarySoft},${C.rewardSoft})`,border:`1px solid ${C.primary}18`,fontSize:11.5,color:C.reward}}>"{q}"</span>)}</div>
                </Card>
                <Card style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:10}}>Answer snippets</div>
                  {(gResult.answerSnippets||[]).map((s,i)=>(
                    <div key={i} style={{padding:"12px 14px",marginBottom:7,borderRadius:10,background:"rgba(255,255,255,.015)",border:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span style={{fontSize:10.5,color:C.muted}}>"{s.targetQuery}"</span>
                        <span style={{fontSize:9.5,color:PLATS.find(p=>p.name===s.targetEngine)?.color||C.muted,fontFamily:"'Fira Code',monospace"}}>{s.targetEngine}</span>
                      </div>
                      <div style={{fontSize:12.5,color:"#ccc",lineHeight:1.55}}>{s.snippet}</div>
                    </div>
                  ))}
                </Card>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                  <Card>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>SEO structure</div>
                    {gResult.seoContent?.title&&<div style={{fontSize:13,fontWeight:700,color:C.trust,marginBottom:4}}>{gResult.seoContent.title}</div>}
                    {gResult.seoContent?.metaDescription&&<div style={{fontSize:11,color:C.muted,marginBottom:8,fontStyle:"italic"}}>{gResult.seoContent.metaDescription}</div>}
                    {(gResult.seoContent?.h2Headings||[]).map((h,i)=><div key={i} style={{fontSize:11.5,color:"#bbb",padding:"2px 0"}}><span style={{color:C.primary,marginRight:5}}>H2</span>{h}</div>)}
                    {gResult.seoContent?.outline&&<div style={{marginTop:8,padding:10,borderRadius:7,background:"rgba(255,255,255,.012)",fontSize:11.5,color:C.muted,lineHeight:1.5,maxHeight:180,overflow:"auto"}}>{gResult.seoContent.outline}</div>}
                  </Card>
                  <Card>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>FAQ pairs</div>
                    {(gResult.faqPairs||[]).map((f,i)=>(
                      <div key={i} style={{padding:"8px 0",borderBottom:i<(gResult.faqPairs||[]).length-1?`1px solid ${C.border}`:"none"}}>
                        <div style={{fontSize:12,fontWeight:600,color:"#ddd",marginBottom:3}}>Q: {f.question}</div>
                        <div style={{fontSize:11.5,color:C.muted,lineHeight:1.4}}>A: {f.answer}</div>
                      </div>
                    ))}
                  </Card>
                </div>
                <Card glow={C.reward} style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>Citation strategy</div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>{gResult.citationStrategy}</div>
                </Card>
                <div style={{textAlign:"center"}}><Btn onClick={()=>setTab("distribute")}>🚀 Distribute content →</Btn></div>
              </div>
            )}
          </div>
        )}

        {/* ═══ DISTRIBUTE ═══ */}
        {tab==="distribute"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:3,background:`linear-gradient(90deg,${C.reward},${C.primary})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Distribution planner</div>
            <div style={{fontSize:12.5,color:C.muted,marginBottom:24}}>{gResult?"Pick a platform — we'll make it publish-ready":"Generate content first"}</div>
            {!gResult?(
              <Card style={{textAlign:"center",padding:48}}><div style={{fontSize:36,marginBottom:14}}>🧠</div><div style={{fontSize:14,color:C.muted,marginBottom:10}}>No content yet</div><Btn onClick={()=>setTab("generate")}>← Generate first</Btn></Card>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:22}}>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {DIST.map(dp=>(
                    <button key={dp.id} onClick={()=>runDist(dp)} disabled={dLoading&&dPlatform===dp.id} style={{
                      display:"flex",alignItems:"center",gap:11,padding:"12px 14px",borderRadius:11,cursor:dLoading?"wait":"pointer",width:"100%",
                      background:dPlatform===dp.id?"rgba(255,255,255,.025)":"rgba(255,255,255,.008)",
                      border:`1px solid ${dPlatform===dp.id?dp.color+"35":C.border}`,
                      color:"inherit",fontFamily:"inherit",textAlign:"left",
                      boxShadow:dPlatform===dp.id?`0 0 16px ${dp.color}10`:"none",
                    }}>
                      <div style={{width:30,height:30,borderRadius:8,background:`${dp.color}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:dp.color}}>{dp.icon}</div>
                      <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{dp.name}</div><div style={{fontSize:10,color:C.dim}}>{dp.type}</div></div>
                      {dLoading&&dPlatform===dp.id&&<span style={{width:12,height:12,border:`2px solid ${C.primary}44`,borderTopColor:C.primary,borderRadius:"50%",animation:"mm-spin .6s linear infinite",display:"inline-block"}} />}
                      {!dLoading&&dPlatform===dp.id&&dResult&&<span style={{color:C.success,fontSize:12}}>✓</span>}
                    </button>
                  ))}
                </div>
                <div>
                  {!dResult&&!dLoading&&<Card style={{textAlign:"center",padding:44,opacity:.5}}><div style={{fontSize:13,color:C.dim}}>← Pick a platform</div></Card>}
                  {dLoading&&<Card style={{textAlign:"center",padding:44}}><Timer on={true} /></Card>}
                  {dResult&&!dLoading&&(
                    <Card glow={C.primary} style={{animation:"mm-slide .35s ease"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                        <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{dResult.title}</div>
                        <Btn ghost onClick={()=>navigator.clipboard.writeText(dResult.content)} style={{padding:"6px 12px",fontSize:10.5}}>Copy</Btn>
                      </div>
                      <div style={{padding:14,borderRadius:10,background:"rgba(255,255,255,.015)",border:`1px solid ${C.border}`,fontSize:12.5,color:"#ccc",lineHeight:1.65,maxHeight:300,overflow:"auto",marginBottom:14,whiteSpace:"pre-wrap"}}>{dResult.content}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                        <div>
                          <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Fira Code',monospace",marginBottom:6}}>Tips</div>
                          {(dResult.tips||[]).map((t,i)=><div key={i} style={{fontSize:11.5,color:C.muted,padding:"3px 0"}}>▸ {t}</div>)}
                        </div>
                        <div>
                          <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Fira Code',monospace",marginBottom:6}}>Details</div>
                          <div style={{fontSize:11.5,color:C.muted,marginBottom:4}}>Best time: <span style={{color:"#ddd"}}>{dResult.bestTime}</span></div>
                          <div style={{fontSize:11.5,color:C.muted,marginBottom:4}}>Reach: <span style={{color:"#ddd"}}>{dResult.reach}</span></div>
                          {(dResult.hashtags||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:5}}>{dResult.hashtags.map((h,i)=><span key={i} style={{padding:"2px 8px",borderRadius:8,background:C.trustSoft,fontSize:10,color:C.trust}}>{h}</span>)}</div>}
                        </div>
                      </div>
                      {dResult.citationNote&&<div style={{padding:10,borderRadius:8,background:`linear-gradient(135deg,${C.primarySoft},${C.rewardSoft})`,border:`1px solid ${C.primary}12`,fontSize:11.5,color:C.muted}}><span style={{color:C.reward,fontWeight:700}}>AI citation: </span>{dResult.citationNote}</div>}
                    </Card>
                  )}
                  {dError&&<div style={{marginTop:10,padding:10,borderRadius:10,background:"rgba(255,68,102,.06)",fontSize:11.5,color:C.danger}}>{dError}</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ CAMPAIGNS ═══ */}
        {tab==="campaigns"&&(
          <div style={{animation:"mm-slide .45s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
              <div><div style={{fontSize:20,fontWeight:800,color:"#fff",background:`linear-gradient(90deg,#fff,${C.trust})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Campaigns</div><div style={{fontSize:12.5,color:C.muted,marginTop:2}}>{camps.length} total</div></div>
              <Btn onClick={()=>setTab("generate")}>+ New</Btn>
            </div>
            {camps.map((c,i)=>(
              <Card key={c.id} glow={c.status==="active"?C.success:undefined} style={{marginBottom:9,padding:"16px 20px",animation:`mm-slide .3s ease ${i*.06}s both`}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr .7fr",alignItems:"center",gap:12}}>
                  <div><div style={{fontWeight:700,fontSize:13,color:"#fff",marginBottom:2}}>{c.name}</div><div style={{fontSize:10.5,color:C.dim}}>{c.niche} · {c.date}</div></div>
                  <div><div style={{fontSize:9,color:C.dim,textTransform:"uppercase",letterSpacing:.8,fontFamily:"'Fira Code',monospace",marginBottom:2}}>Status</div><div style={{display:"flex",alignItems:"center",gap:4}}><Dot color={c.status==="active"?C.success:c.status==="draft"?C.trust:C.reward} size={5} /><span style={{fontSize:11,color:c.status==="active"?C.success:c.status==="draft"?C.trust:C.reward,textTransform:"uppercase",fontFamily:"'Fira Code',monospace"}}>{c.status}</span></div></div>
                  <div><div style={{fontSize:9,color:C.dim,textTransform:"uppercase",letterSpacing:.8,fontFamily:"'Fira Code',monospace",marginBottom:2}}>Imp.</div><div style={{fontSize:14,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{c.imp.toLocaleString()}</div></div>
                  <div><div style={{fontSize:9,color:C.dim,textTransform:"uppercase",letterSpacing:.8,fontFamily:"'Fira Code',monospace",marginBottom:2}}>Clicks</div><div style={{fontSize:14,fontWeight:700,fontFamily:"'Fira Code',monospace"}}>{c.clk.toLocaleString()}</div></div>
                  <div><div style={{fontSize:9,color:C.dim,textTransform:"uppercase",letterSpacing:.8,fontFamily:"'Fira Code',monospace",marginBottom:2}}>CTR</div><div style={{fontSize:14,fontWeight:700,fontFamily:"'Fira Code',monospace",color:C.primary,textShadow:`0 0 8px ${C.primary}33`}}>{c.ctr}%</div></div>
                  <div style={{display:"flex",gap:2,justifyContent:"flex-end"}}>{c.plats.map(pid=>{const pl=PLATS.find(p=>p.id===pid);return pl?<span key={pid} style={{fontSize:13,color:pl.color,filter:`drop-shadow(0 0 4px ${pl.color}33)`}}>{pl.icon}</span>:null;})}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
