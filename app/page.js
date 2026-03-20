"use client";
import { useState, useEffect, useRef } from "react";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", danger:"#ff4466", bg:"#0a0510", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75" };

const PLANS = [
  { id:"free",name:"Free",price:0,desc:"See what AI says about you",color:C.muted,features:["1 brand scan / month","All 6 AI engines scanned","Basic sentiment report","Overall visibility score","Community support"],cta:"Start free",tag:null },
  { id:"starter",name:"Starter",price:29,desc:"Monitor & understand your AI presence",color:C.trust,features:["10 brand scans / month","Unlimited competitor scans","Full per-engine breakdown","Inaccuracy & gap detection","Sentiment tracking","Email reports","Priority email support"],cta:"Start free trial",tag:null },
  { id:"pro",name:"Pro",price:79,desc:"Monitor, analyze, and fix your AI visibility",color:C.primary,badge:"BEST VALUE",features:["Unlimited brand scans","Unlimited rival intelligence","Full visibility reports","GEO action plans (Fix It)","Content generation with outlines","4-week improvement roadmaps","Weekly monitoring alerts","Schema markup generator","Priority support + live chat"],cta:"Start free trial",tag:"Everything you need" },
  { id:"agency",name:"Agency",price:199,desc:"Manage AI visibility for multiple clients",color:C.reward,features:["Everything in Pro","15 client workspaces","White-label PDF reports","Team seats (up to 8)","Bulk scanning (50+ brands)","API access","Dedicated account manager","Custom alert rules","Client dashboard sharing"],cta:"Start free trial",tag:null },
];

const FAQS = [
  {q:"What exactly does MentionMe do?",a:"MentionMe scans all 6 major AI engines — ChatGPT, Gemini, Claude, Perplexity, Grok, and Google AI Overviews — to show you exactly what they're telling people about your brand. You see the sentiment, specific claims, inaccuracies, and missing information. Then our GEO tools help you fix what's wrong and boost your visibility."},
  {q:"Is the free plan really free?",a:"Yes — one full brand scan per month across all 6 engines, completely free, forever. No credit card required. You'll see your AI perception score, what each engine says, and what's missing. Upgrade when you need more scans or the GEO fix tools."},
  {q:"How is this different from Google Alerts?",a:"Google Alerts monitors web mentions — articles, blogs, news. MentionMe monitors what AI engines are directly telling people about you when they ask for recommendations. This is a completely different (and increasingly important) channel that no other tool covers."},
  {q:"What are the GEO action plans?",a:"When our scan finds gaps — missing info, inaccuracies, or low visibility — our GEO (Generative Engine Optimization) tools generate a specific plan to fix it: what content to create, where to publish it, and a week-by-week roadmap. Available on Pro and Agency plans."},
  {q:"How often should I scan?",a:"We recommend scanning weekly to track changes. AI models update their knowledge regularly, so your visibility can shift. Pro and Agency plans include unlimited scans and weekly monitoring alerts."},
  {q:"Can I cancel anytime?",a:"Yes. All paid plans are month-to-month with no contracts. Cancel anytime and keep access through the end of your billing period. The free plan never expires."},
];

const COMPARISONS = [
  { tool:"Brand24", price:"$79/mo", aiEngines:"0", monitors:"Social & web", verdict:"No AI monitoring" },
  { tool:"Mention", price:"$41/mo", aiEngines:"0", monitors:"Social & web", verdict:"No AI monitoring" },
  { tool:"Semrush", price:"$130/mo", aiEngines:"0", monitors:"SEO & ads", verdict:"No AI monitoring" },
  { tool:"MentionMe", price:"$29/mo", aiEngines:"6", monitors:"All AI engines", verdict:"Purpose-built for AI", highlight:true },
];

function useInView(th=0.1){const ref=useRef(null);const[vis,setVis]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);o.disconnect();}},{threshold:th});o.observe(el);return()=>o.disconnect();},[]);return[ref,vis];}
function Sec({children,id,style}){const[ref,vis]=useInView(0.06);return <section ref={ref} id={id} style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",...style}}>{children}</section>;}
function Faq({q,a}){const[open,setOpen]=useState(false);return(<div style={{borderBottom:"1px solid rgba(255,255,255,.055)"}}><button onClick={()=>setOpen(!open)} style={{width:"100%",padding:"20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",color:C.text,fontFamily:"inherit",textAlign:"left"}}><span style={{fontSize:15.5,fontWeight:600,paddingRight:20}}>{q}</span><span style={{fontSize:20,color:C.primary,transition:"transform .3s",flexShrink:0,transform:open?"rotate(45deg)":"none",filter:`drop-shadow(0 0 6px ${C.primary}44)`}}>+</span></button><div style={{maxHeight:open?300:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.22,1,.36,1)"}}><div style={{paddingBottom:20,fontSize:14,color:C.muted,lineHeight:1.65}}>{a}</div></div></div>);}

export default function Landing() {
  const [annual,setAnnual]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [scrollY,setScrollY]=useState(0);
  useEffect(()=>{setTimeout(()=>setLoaded(true),50);},[]);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);
  const scrollTo=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Sora','Outfit',sans-serif",overflowX:"hidden"}}>
      <style>{`
        @keyframes lp-glow{0%,100%{box-shadow:0 0 30px ${C.primary}25}50%{box-shadow:0 0 60px ${C.primary}40}}
        @keyframes lp-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes lp-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes lp-pulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes lp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes lp-aurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        *{box-sizing:border-box;margin:0;padding:0} html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,60,142,.12);border-radius:3px}
        button:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px)} button{transition:all .2s}
        a{color:inherit;text-decoration:none}
      `}</style>

      {/* BG */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:-350,left:"25%",width:900,height:900,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.primary}07 0%, transparent 50%)`,animation:"lp-float 14s ease-in-out infinite"}} />
        <div style={{position:"absolute",top:800,right:"-5%",width:700,height:700,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.trust}05 0%, transparent 50%)`,animation:"lp-float 18s ease-in-out infinite 4s"}} />
        <div style={{position:"absolute",top:2000,left:"10%",width:600,height:600,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.reward}04 0%, transparent 50%)`,animation:"lp-float 20s ease-in-out infinite 8s"}} />
        <div style={{position:"absolute",inset:0,opacity:.01,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)",backgroundSize:"30px 30px"}} />
      </div>

      {/* Nav */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrollY>60?"rgba(10,5,16,.9)":"transparent",backdropFilter:scrollY>60?"blur(20px)":"none",borderBottom:scrollY>60?"1px solid rgba(255,255,255,.04)":"1px solid transparent",transition:"all .35s"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"lp-aurora 4s ease infinite",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#fff",fontWeight:800,boxShadow:`0 0 28px ${C.primary}44, 0 0 56px ${C.primary}15`,border:"2px solid rgba(255,255,255,.12)"}}>@</div>
          <span style={{fontSize:20,fontWeight:800,letterSpacing:-.4,background:`linear-gradient(135deg,#fff,${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:`drop-shadow(0 0 8px ${C.primary}22)`}}>MentionMe</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:28}}>
          {["How it works","Pricing","Compare","FAQ"].map(s=>(
            <button key={s} onClick={()=>scrollTo(s.toLowerCase().replace(/ /g,"-"))} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontFamily:"inherit"}}>{s}</button>
          ))}
          <a href="/dashboard" style={{padding:"8px 20px",borderRadius:9,background:`linear-gradient(135deg,${C.primary}22,${C.reward}18)`,border:`1px solid ${C.primary}33`,color:C.primary,fontSize:12.5,fontWeight:700,display:"inline-block",boxShadow:`0 0 16px ${C.primary}15`}}>Scan my brand free</a>
        </div>
      </nav>

      <div style={{position:"relative",zIndex:1}}>

        {/* ═══ HERO ═══ */}
        <section style={{padding:"150px 32px 80px",maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 18px",borderRadius:20,background:`linear-gradient(135deg,${C.primary}0c,${C.reward}0a)`,border:`1px solid ${C.primary}1a`,marginBottom:28,opacity:loaded?1:0,transition:"all .5s",boxShadow:`0 0 20px ${C.primary}10`}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.success,animation:"lp-pulse 2s infinite",boxShadow:`0 0 8px ${C.success}66`}} />
            <span style={{fontSize:12,color:C.reward,fontFamily:"'Fira Code',monospace",letterSpacing:.5}}>FREE BRAND SCAN — NO SIGNUP REQUIRED</span>
          </div>

          <h1 style={{fontSize:"clamp(40px, 5.8vw, 76px)",fontWeight:800,lineHeight:1.03,letterSpacing:"-.035em",marginBottom:24,maxWidth:920,margin:"0 auto 24px",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all .6s ease .1s"}}>
            <span style={{color:"#fff"}}>What is AI saying</span><br/>
            <span style={{background:`linear-gradient(135deg, ${C.primary} 0%, ${C.reward} 40%, ${C.trust} 80%)`,backgroundSize:"300% 300%",animation:"lp-grad 8s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:`drop-shadow(0 0 24px ${C.primary}33)`}}>about your brand?</span>
          </h1>

          <p style={{fontSize:"clamp(16px, 2vw, 20px)",color:C.muted,lineHeight:1.6,maxWidth:660,margin:"0 auto 40px",opacity:loaded?1:0,transition:"all .6s ease .2s"}}>
            Right now, ChatGPT, Gemini, and Claude are recommending your competitors to millions of people. MentionMe scans all 6 AI engines to show you exactly what they say — and how to fix it.
          </p>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12,opacity:loaded?1:0,transition:"all .6s ease .3s"}}>
            <a href="/dashboard" style={{padding:"15px 38px",borderRadius:12,border:"none",cursor:"pointer",display:"inline-block",background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",fontSize:16,fontWeight:700,fontFamily:"inherit",animation:"lp-glow 3s infinite",boxShadow:`0 6px 28px ${C.primary}33`}}>Scan my brand free →</a>
            <button onClick={()=>scrollTo("how-it-works")} style={{padding:"15px 28px",borderRadius:12,cursor:"pointer",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"#ccc",fontSize:15,fontWeight:500,fontFamily:"inherit"}}>See how it works</button>
          </div>
          <p style={{fontSize:12.5,color:C.dim,opacity:loaded?1:0,transition:"opacity .5s ease .4s"}}>Free forever · No credit card · Results in 30 seconds</p>

          <div style={{display:"flex",justifyContent:"center",gap:48,marginTop:56,opacity:loaded?1:0,transition:"opacity .6s ease .5s"}}>
            {[{v:"6",l:"AI engines scanned",c:C.trust},{v:"30s",l:"To get your report",c:C.primary},{v:"Free",l:"First scan, always",c:C.success},{v:"24/7",l:"AI never stops talking",c:C.reward}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:800,fontFamily:"'Fira Code',monospace",color:s.c,marginBottom:4,textShadow:`0 0 16px ${s.c}33`}}>{s.v}</div><div style={{fontSize:11.5,color:C.dim}}>{s.l}</div></div>
            ))}
          </div>
        </section>

        {/* Marquee */}
        <div style={{overflow:"hidden",padding:"32px 0",borderTop:"1px solid rgba(255,255,255,.03)",borderBottom:"1px solid rgba(255,255,255,.03)",marginBottom:40}}>
          <div style={{display:"flex",gap:60,animation:"lp-marquee 20s linear infinite",width:"fit-content"}}>
            {[...["ChatGPT","Gemini","Claude","Perplexity","Grok","AI Overviews"],...["ChatGPT","Gemini","Claude","Perplexity","Grok","AI Overviews"]].map((n,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,whiteSpace:"nowrap",opacity:.4}}>
                <span style={{fontSize:20,color:["#10a37f","#4285f4","#d4a574","#20b2aa","#e0e0e0","#ea4335"][i%6],filter:`drop-shadow(0 0 4px ${["#10a37f","#4285f4","#d4a574","#20b2aa","#e0e0e0","#ea4335"][i%6]}44)`}}>{["◈","◇","◆","◎","✦","◉"][i%6]}</span>
                <span style={{fontSize:15,fontWeight:600,color:C.muted}}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ THE PROBLEM ═══ */}
        <Sec style={{padding:"60px 32px 80px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{fontSize:11,color:C.danger,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>THE BLIND SPOT</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:16}}>AI is talking about you<br/>right now. <span style={{color:C.dim}}>Do you know what it's saying?</span></h2>
            <p style={{fontSize:16.5,color:C.muted,maxWidth:600,margin:"0 auto",lineHeight:1.6}}>2.5 billion people ask AI for recommendations every day. If ChatGPT says your competitor is better — or gets your product wrong — you'd never know. Until now.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              {icon:"😱",title:"AI might be wrong about you",desc:"AI engines make claims about your product, pricing, features — sometimes completely inaccurate. Without monitoring, wrong information spreads to millions.",color:C.danger},
              {icon:"👻",title:"You might be invisible",desc:"When someone asks 'What's the best tool for X?' and AI doesn't mention you, that's a customer gone. You can't fix what you can't see.",color:C.reward},
              {icon:"🏆",title:"Your competitors are there",desc:"While you're in the dark, competitors might already be optimizing for AI visibility. They show up in recommendations. You don't.",color:C.primary},
            ].map((f,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,padding:"28px 24px",transition:"all .35s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=f.color+"30";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 30px ${f.color}12`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.04)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                <div style={{fontSize:36,marginBottom:16}}>{f.icon}</div>
                <div style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:8}}>{f.title}</div>
                <div style={{fontSize:13.5,color:C.muted,lineHeight:1.55}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ HOW IT WORKS ═══ */}
        <Sec id="how-it-works" style={{padding:"80px 32px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>HOW IT WORKS</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em"}}>Scan. Understand. Fix. Dominate.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,position:"relative"}}>
            <div style={{position:"absolute",top:48,left:"12.5%",right:"12.5%",height:2,background:`linear-gradient(90deg, ${C.trust}, ${C.primary}, ${C.reward}, ${C.success})`,opacity:.2}} />
            {[
              {step:"01",title:"Scan",desc:"Enter your brand name. We query all 6 AI engines to see exactly what they say about you.",icon:"🔍",color:C.trust},
              {step:"02",title:"Compare",desc:"Add competitors. See who AI recommends, why, and where you can steal their mentions.",icon:"⚔️",color:C.primary},
              {step:"03",title:"Report",desc:"Get a full visibility scorecard with sentiment, gaps, inaccuracies, and priorities.",icon:"📊",color:C.reward},
              {step:"04",title:"Fix it",desc:"Our GEO tools generate an action plan — what to publish, where, and a 4-week roadmap.",icon:"🚀",color:C.success},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:"center",position:"relative",zIndex:1}}>
                <div style={{width:64,height:64,borderRadius:16,margin:"0 auto 20px",background:`${s.color}10`,border:`1px solid ${s.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:`0 0 24px ${s.color}12`}}>{s.icon}</div>
                <div style={{fontFamily:"'Fira Code',monospace",fontSize:10,color:s.color,letterSpacing:2,marginBottom:8,textShadow:`0 0 8px ${s.color}44`}}>STEP {s.step}</div>
                <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.55}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ FEATURES ═══ */}
        <Sec style={{padding:"60px 32px 80px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:C.trust,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>WHAT YOU GET</div>
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em"}}>Everything you need to own your AI narrative</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              {icon:"🔍",title:"6-engine brand scan",desc:"See what ChatGPT, Gemini, Claude, Perplexity, Grok, and AI Overviews say — word for word.",color:C.trust},
              {icon:"😤",title:"Sentiment analysis",desc:"Know if AI is positive, negative, neutral, or completely ignoring you. Per engine, per query.",color:C.primary},
              {icon:"⚔️",title:"Competitor intelligence",desc:"Side-by-side comparison with rivals. See who wins head-to-head queries and why.",color:C.reward},
              {icon:"🚨",title:"Inaccuracy detection",desc:"Catch when AI gets your pricing, features, or facts wrong — before customers see it.",color:C.danger},
              {icon:"📊",title:"Visibility reports",desc:"Actionable scorecards with prioritized recommendations. Know exactly what to fix first.",color:C.success},
              {icon:"🚀",title:"GEO action plans",desc:"AI generates content strategies, article outlines, and a 4-week roadmap to boost your visibility.",color:"#a78bfa"},
            ].map((f,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,padding:"26px 22px",transition:"all .35s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=f.color+"30";e.currentTarget.style.transform="translateY(-3px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.04)";e.currentTarget.style.transform="none"}}>
                <div style={{fontSize:28,marginBottom:14,filter:`drop-shadow(0 0 8px ${f.color}44)`}}>{f.icon}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.55}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SOCIAL PROOF ═══ */}
        <Sec style={{padding:"40px 32px 80px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{background:`linear-gradient(135deg,${C.primary}06,${C.reward}05,${C.trust}04)`,border:`1px solid ${C.primary}12`,borderRadius:20,padding:"48px 40px",textAlign:"center",boxShadow:`0 0 40px ${C.primary}08`}}>
            <div style={{fontSize:11,color:C.reward,fontFamily:"'Fira Code',monospace",letterSpacing:2,marginBottom:20}}>EARLY RESULTS</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:28}}>
              {[{v:"2,400+",l:"Brands scanned",c:C.trust},{v:"73%",l:"Had inaccurate AI info",c:C.danger},{v:"89%",l:"Were missing from 3+ engines",c:C.reward},{v:"41%",l:"Improved score in 3 weeks",c:C.success}].map((s,i)=>(
                <div key={i}><div style={{fontSize:36,fontWeight:800,fontFamily:"'Fira Code',monospace",color:s.c,marginBottom:6,textShadow:`0 0 20px ${s.c}33`}}>{s.v}</div><div style={{fontSize:13,color:"#ddd",fontWeight:600}}>{s.l}</div></div>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:24}}>
            {[
              {q:"I had no idea ChatGPT was telling people my product was discontinued. MentionMe caught it and we fixed it in a day. Revenue recovered within a week.",n:"Jake M.",r:"Founder, CloudSync",c:C.danger},
              {q:"The rival intel feature is worth the price alone. Discovered our competitor was being recommended over us for 12 different queries. Now we own 8 of them.",n:"Priya S.",r:"Head of Marketing, BoltHQ",c:C.reward},
              {q:"Ran the free scan out of curiosity. Score was 14/100. Three weeks of following the GEO plan — now at 67. This tool pays for itself.",n:"Marcus T.",r:"CEO, NomadStays",c:C.success},
            ].map((t,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,padding:"24px 22px",transition:"all .3s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.c+"25"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.04)"}>
                <div style={{fontSize:14,color:"#bbb",lineHeight:1.6,marginBottom:18,fontStyle:"italic"}}>"{t.q}"</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${t.c}25,${t.c}10)`,border:`1px solid ${t.c}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:t.c}}>{t.n[0]}</div>
                  <div><div style={{fontSize:13,fontWeight:600,color:"#ddd"}}>{t.n}</div><div style={{fontSize:11.5,color:C.dim}}>{t.r}</div></div>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ COMPARE ═══ */}
        <Sec id="compare" style={{padding:"60px 32px 80px",maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontSize:11,color:C.reward,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>COMPARE</div>
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em"}}>No other tool monitors AI engines</h2>
          </div>
          <div style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1.5fr 1.5fr",padding:"14px 20px",background:"rgba(255,255,255,.02)",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
              {["Tool","Price","AI Engines","Monitors","Verdict"].map(h=><div key={h} style={{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Fira Code',monospace",fontWeight:600}}>{h}</div>)}
            </div>
            {COMPARISONS.map((c,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1.5fr 1.5fr",padding:"14px 20px",borderBottom:i<COMPARISONS.length-1?"1px solid rgba(255,255,255,.03)":"none",background:c.highlight?`${C.primary}06`:"transparent"}}>
                <div style={{fontSize:13.5,fontWeight:c.highlight?700:400,color:c.highlight?C.primary:"#ccc"}}>{c.tool}</div>
                <div style={{fontSize:13,fontFamily:"'Fira Code',monospace",color:c.highlight?C.success:"#ccc"}}>{c.price}</div>
                <div style={{fontSize:13,fontFamily:"'Fira Code',monospace",color:c.aiEngines==="0"?C.dim:C.success}}>{c.aiEngines}</div>
                <div style={{fontSize:12.5,color:C.muted}}>{c.monitors}</div>
                <div style={{fontSize:12.5,color:c.highlight?C.success:C.dim,fontWeight:c.highlight?600:400}}>{c.verdict}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ PRICING ═══ */}
        <Sec id="pricing" style={{padding:"80px 32px",maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>PRICING</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:12}}>Scan free. Fix cheap. Dominate.</h2>
            <p style={{fontSize:16,color:C.muted,marginBottom:28}}>Start with a free scan. Upgrade when you're hooked.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,padding:"4px 5px",borderRadius:11,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
              <button onClick={()=>setAnnual(false)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",background:!annual?`linear-gradient(135deg,${C.primary}1a,${C.reward}12)`:"transparent",color:!annual?C.primary:C.dim,fontSize:13,fontWeight:600}}>Monthly</button>
              <button onClick={()=>setAnnual(true)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",background:annual?`linear-gradient(135deg,${C.primary}1a,${C.reward}12)`:"transparent",color:annual?C.primary:C.dim,fontSize:13,fontWeight:600}}>Annual <span style={{fontSize:10.5,color:C.success,fontWeight:700,marginLeft:4}}>2 months free</span></button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,alignItems:"start"}}>
            {PLANS.map(plan=>{
              const price=annual&&plan.price>0?Math.round(plan.price*10/12):plan.price;
              const isPro=plan.id==="pro";
              return(
                <div key={plan.id} style={{
                  background:isPro?`linear-gradient(135deg,${C.primary}06,${C.reward}04)`:"rgba(255,255,255,.012)",
                  border:`1px solid ${isPro?C.primary+"25":"rgba(255,255,255,.05)"}`,
                  borderRadius:18,padding:"28px 22px",position:"relative",
                  transform:isPro?"scale(1.04)":"none",boxShadow:isPro?`0 8px 40px ${C.primary}15`:"none",transition:"all .3s",
                }}>
                  {plan.badge&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",padding:"5px 16px",borderRadius:12,background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",fontSize:10,fontWeight:700,fontFamily:"'Fira Code',monospace",letterSpacing:1,boxShadow:`0 4px 16px ${C.primary}33`}}>{plan.badge}</div>}
                  <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:3}}>{plan.name}</div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:18,minHeight:32}}>{plan.desc}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:3,marginBottom:20}}>
                    {plan.price===0?(
                      <span style={{fontSize:38,fontWeight:800,color:C.success,fontFamily:"'Fira Code',monospace"}}>$0</span>
                    ):(
                      <>
                        <span style={{fontSize:38,fontWeight:800,color:plan.color,fontFamily:"'Fira Code',monospace",textShadow:`0 0 16px ${plan.color}33`}}>${price}</span>
                        <span style={{fontSize:13,color:C.dim}}>/mo</span>
                      </>
                    )}
                    {annual&&plan.price>0&&<span style={{fontSize:10.5,color:C.success,marginLeft:6}}>save ${plan.price*2}/yr</span>}
                  </div>
                  <a href="/dashboard" style={{
                    display:"block",width:"100%",padding:"12px 20px",borderRadius:10,border:"none",cursor:"pointer",textAlign:"center",
                    background:isPro?`linear-gradient(135deg,${C.primary},#ff6b3c)`:plan.price===0?"rgba(255,255,255,.06)":`${plan.color}12`,
                    color:isPro?"#fff":plan.price===0?C.text:plan.color,fontSize:13.5,fontWeight:700,fontFamily:"inherit",textDecoration:"none",
                    border:isPro?"none":`1px solid ${plan.price===0?"rgba(255,255,255,.1)":plan.color+"30"}`,
                    boxShadow:isPro?`0 4px 20px ${C.primary}25`:"none",
                  }}>{plan.cta}</a>
                  {plan.tag&&<div style={{textAlign:"center",fontSize:10.5,color:C.reward,marginTop:8,fontWeight:600}}>{plan.tag}</div>}
                  <div style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
                    {plan.features.map((f,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12.5,color:"#bbb"}}>
                        <span style={{color:plan.price===0?C.muted:plan.color,fontSize:11,marginTop:2,flexShrink:0,filter:plan.price>0?`drop-shadow(0 0 3px ${plan.color}44)`:"none"}}>✓</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{textAlign:"center",marginTop:28}}>
            <p style={{fontSize:13.5,color:C.muted}}>All paid plans include a <span style={{color:C.success,fontWeight:600}}>7-day free trial</span>. No credit card required. Cancel anytime.</p>
          </div>
        </Sec>

        {/* ═══ FAQ ═══ */}
        <Sec id="faq" style={{padding:"80px 32px",maxWidth:740,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>FAQ</div>
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em"}}>Common questions</h2>
          </div>
          {FAQS.map((f,i)=><Faq key={i} q={f.q} a={f.a} />)}
        </Sec>

        {/* ═══ FINAL CTA ═══ */}
        <Sec style={{padding:"80px 32px 100px",maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <div style={{background:`linear-gradient(135deg, ${C.primary}08, ${C.reward}06, ${C.trust}05)`,border:`1px solid ${C.primary}15`,borderRadius:24,padding:"56px 40px",boxShadow:`0 0 60px ${C.primary}08`}}>
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-.02em",marginBottom:16}}>
              AI is talking about you.<br/><span style={{background:`linear-gradient(90deg,${C.primary},${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Find out what it's saying.</span>
            </h2>
            <p style={{fontSize:16,color:C.muted,marginBottom:32,maxWidth:500,margin:"0 auto 32px",lineHeight:1.55}}>Your first brand scan is free. See your AI perception score, what each engine says, and what's missing — in 30 seconds.</p>
            <a href="/dashboard" style={{display:"inline-block",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",fontSize:17,fontWeight:700,fontFamily:"inherit",animation:"lp-glow 3s infinite",boxShadow:`0 6px 28px ${C.primary}33`}}>Scan my brand free →</a>
            <p style={{fontSize:12,color:C.dim,marginTop:14}}>Free forever · No signup required · 30-second results</p>
          </div>
        </Sec>

        {/* Footer */}
        <footer style={{padding:"40px 32px",borderTop:"1px solid rgba(255,255,255,.04)",maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"lp-aurora 4s ease infinite",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",fontWeight:800,boxShadow:`0 0 16px ${C.primary}33`,border:"1.5px solid rgba(255,255,255,.1)"}}>@</div>
              <span style={{fontSize:14,fontWeight:700,color:C.muted}}>MentionMe</span>
            </div>
            <div style={{display:"flex",gap:24}}>
              {[{l:"Privacy",h:"/privacy"},{l:"Terms",h:"/terms"},{l:"Contact",h:"/contact"},{l:"Blog",h:"/blog"}].map(s=>(
                <a key={s.l} href={s.h} style={{fontSize:12.5,color:C.dim,textDecoration:"none"}}>{s.l}</a>
              ))}
            </div>
            <div style={{fontSize:12,color:"#3a3454"}}>© 2026 MentionMe. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
