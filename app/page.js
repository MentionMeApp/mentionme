"use client";
import { useState, useEffect, useRef } from "react";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", danger:"#ff4466", bg:"#0a0510", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75" };

const PLANS = [
  { id:"starter",name:"Starter",price:67,desc:"For solopreneurs testing the waters",color:C.trust,features:["5 GEO audits / month","10 content generations","3 distribution templates","Basic campaign tracking","Email support"],cta:"Start free trial" },
  { id:"pro",name:"Pro",price:197,desc:"For serious marketers & growing brands",color:C.primary,badge:"MOST POPULAR",features:["Unlimited GEO audits","Unlimited content generation","All 8 distribution platforms","Advanced campaign analytics","AI visibility monitoring","Priority support","Weekly GEO score reports"],cta:"Start free trial" },
  { id:"agency",name:"Agency",price:497,desc:"For agencies managing multiple clients",color:C.reward,features:["Everything in Pro","25 client workspaces","White-label reports","Team seats (up to 10)","API access","Dedicated account manager","Custom AI engine targeting","Bulk campaign deployment"],cta:"Contact sales" },
];

const FAQS = [
  {q:"What is GEO and how is it different from SEO?",a:"GEO (Generative Engine Optimization) optimizes your content to be cited in AI-generated answers from ChatGPT, Gemini, Claude, Perplexity, and Google AI Overviews. While SEO targets traditional search rankings, GEO ensures your brand is mentioned when AI answers questions in your niche."},
  {q:"How quickly will I see results?",a:"Most users see visibility improvements within 2-4 weeks. The audit gives you an immediate baseline to track progress from day one."},
  {q:"Do you actually insert links into AI answers?",a:"We create authoritative, high-quality content placed on sources AI models trust — Medium, Reddit, LinkedIn, and your own site with proper schema markup. This makes AI models naturally cite and recommend your brand."},
  {q:"Can I cancel anytime?",a:"Yes. All plans are month-to-month, no contracts. Cancel anytime and keep access through the end of your billing period."},
  {q:"Is there a free trial?",a:"Every plan includes a 7-day free trial with full access. No credit card required. We also offer a free one-time GEO audit so you can see your score before committing."},
  {q:"Which AI platforms do you cover?",a:"All six major engines: ChatGPT, Google Gemini, Claude, Perplexity, Grok, and Google AI Overviews. Content is tailored for each platform's citation patterns."},
];

function useInView(th=0.1){const ref=useRef(null);const[vis,setVis]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);o.disconnect();}},{threshold:th});o.observe(el);return()=>o.disconnect();},[]);return[ref,vis];}

function Sec({children,id,style}){const[ref,vis]=useInView(0.06);return <section ref={ref} id={id} style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",...style}}>{children}</section>;}

function Faq({q,a}){const[open,setOpen]=useState(false);return(
  <div style={{borderBottom:"1px solid rgba(255,255,255,.055)"}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",padding:"20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",color:C.text,fontFamily:"inherit",textAlign:"left"}}>
      <span style={{fontSize:15.5,fontWeight:600,paddingRight:20}}>{q}</span>
      <span style={{fontSize:20,color:C.primary,transition:"transform .3s",flexShrink:0,transform:open?"rotate(45deg)":"none",filter:`drop-shadow(0 0 6px ${C.primary}44)`}}>+</span>
    </button>
    <div style={{maxHeight:open?300:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.22,1,.36,1)"}}>
      <div style={{paddingBottom:20,fontSize:14,color:C.muted,lineHeight:1.65}}>{a}</div>
    </div>
  </div>
);}

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

      {/* ═══ AURORA BG ═══ */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:-350,left:"25%",width:900,height:900,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.primary}07 0%, transparent 50%)`,animation:"lp-float 14s ease-in-out infinite"}} />
        <div style={{position:"absolute",top:600,right:"-5%",width:700,height:700,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.trust}05 0%, transparent 50%)`,animation:"lp-float 18s ease-in-out infinite 4s"}} />
        <div style={{position:"absolute",top:1500,left:"15%",width:800,height:800,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.reward}04 0%, transparent 50%)`,animation:"lp-float 20s ease-in-out infinite 8s"}} />
        <div style={{position:"absolute",top:2800,right:"20%",width:600,height:600,borderRadius:"50%",background:`radial-gradient(ellipse, ${C.primary}05 0%, transparent 50%)`,animation:"lp-float 16s ease-in-out infinite 2s"}} />
        <div style={{position:"absolute",inset:0,opacity:.01,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)",backgroundSize:"30px 30px"}} />
      </div>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 32px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrollY>60?"rgba(10,5,16,.9)":"transparent",backdropFilter:scrollY>60?"blur(20px)":"none",
        borderBottom:scrollY>60?"1px solid rgba(255,255,255,.04)":"1px solid transparent",transition:"all .35s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:9,background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"lp-aurora 4s ease infinite",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"#fff",fontWeight:800,boxShadow:`0 0 20px ${C.primary}33`}}>@</div>
          <span style={{fontSize:17,fontWeight:800,letterSpacing:-.3,background:`linear-gradient(135deg,#fff,${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>MentionMe</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:28}}>
          {["Features","How it works","Pricing","FAQ"].map(s=>(
            <button key={s} onClick={()=>scrollTo(s.toLowerCase().replace(/ /g,"-"))} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontFamily:"inherit"}}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color=C.muted}>{s}</button>
          ))}
          <a href="/dashboard" style={{
            padding:"8px 20px",borderRadius:9,background:`linear-gradient(135deg,${C.primary}22,${C.reward}18)`,border:`1px solid ${C.primary}33`,
            color:C.primary,fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"inline-block",
            boxShadow:`0 0 16px ${C.primary}15`,
          }}>Get started free</a>
        </div>
      </nav>

      <div style={{position:"relative",zIndex:1}}>

        {/* ═══ HERO ═══ */}
        <section style={{padding:"150px 32px 80px",maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,padding:"6px 18px",borderRadius:20,
            background:`linear-gradient(135deg,${C.primary}0c,${C.reward}0a)`,border:`1px solid ${C.primary}1a`,marginBottom:28,
            opacity:loaded?1:0,transition:"all .5s",boxShadow:`0 0 20px ${C.primary}10`,
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.success,animation:"lp-pulse 2s infinite",boxShadow:`0 0 8px ${C.success}66`}} />
            <span style={{fontSize:12,color:C.reward,fontFamily:"'Fira Code',monospace",letterSpacing:.5}}>NOW IN PUBLIC BETA</span>
          </div>

          <h1 style={{
            fontSize:"clamp(40px, 5.8vw, 76px)",fontWeight:800,lineHeight:1.03,letterSpacing:"-.035em",
            marginBottom:24,maxWidth:920,margin:"0 auto 24px",
            opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all .6s ease .1s",
          }}>
            <span style={{color:"#fff"}}>Get your brand inside</span><br/>
            <span style={{
              background:`linear-gradient(135deg, ${C.primary} 0%, ${C.reward} 35%, ${C.trust} 70%, ${C.success} 100%)`,
              backgroundSize:"300% 300%",animation:"lp-grad 8s ease infinite",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              filter:`drop-shadow(0 0 24px ${C.primary}33)`,
            }}>2.5 billion daily AI answers</span>
          </h1>

          <p style={{
            fontSize:"clamp(16px, 2vw, 20px)",color:C.muted,lineHeight:1.6,maxWidth:640,margin:"0 auto 40px",
            opacity:loaded?1:0,transition:"all .6s ease .2s",
          }}>
            The first GEO platform that optimizes your content for citation across ChatGPT, Gemini, Claude, Perplexity, Grok & Google AI Overviews — so AI recommends <em style={{color:"#fff",fontStyle:"italic"}}>you</em>.
          </p>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:12,opacity:loaded?1:0,transition:"all .6s ease .3s"}}>
            <a href="/dashboard" style={{
              padding:"15px 38px",borderRadius:12,border:"none",cursor:"pointer",display:"inline-block",
              background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",
              fontSize:16,fontWeight:700,fontFamily:"inherit",animation:"lp-glow 3s infinite",
              boxShadow:`0 6px 28px ${C.primary}33`,
            }}>Start free trial →</a>
            <button onClick={()=>scrollTo("how-it-works")} style={{
              padding:"15px 28px",borderRadius:12,cursor:"pointer",
              background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",
              color:"#ccc",fontSize:15,fontWeight:500,fontFamily:"inherit",
            }}>See how it works</button>
          </div>
          <p style={{fontSize:12.5,color:C.dim,opacity:loaded?1:0,transition:"opacity .5s ease .4s"}}>No credit card required · 7-day free trial · Cancel anytime</p>

          <div style={{display:"flex",justifyContent:"center",gap:48,marginTop:56,opacity:loaded?1:0,transition:"opacity .6s ease .5s"}}>
            {[{v:"2.5B+",l:"Daily AI answers",c:C.primary},{v:"6",l:"AI engines covered",c:C.trust},{v:"5.8%",l:"Average CTR",c:C.reward},{v:"< 3min",l:"Per campaign",c:C.success}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:800,fontFamily:"'Fira Code',monospace",color:s.c,marginBottom:4,textShadow:`0 0 16px ${s.c}33`}}>{s.v}</div>
                <div style={{fontSize:11.5,color:C.dim}}>{s.l}</div>
              </div>
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

        {/* ═══ FEATURES ═══ */}
        <Sec id="features" style={{padding:"60px 32px 80px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>THE PROBLEM</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:16}}>Your competitors are in every<br/>AI answer. <span style={{color:C.dim}}>You're not.</span></h2>
            <p style={{fontSize:16.5,color:C.muted,maxWidth:560,margin:"0 auto",lineHeight:1.6}}>Every day, 2.5 billion people ask AI for recommendations. If your brand isn't optimized for AI citation, you're invisible.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              {icon:"🔍",title:"GEO visibility audit",desc:"Instantly see how your brand appears across all 6 AI engines with a visibility score and actionable gaps.",color:C.trust},
              {icon:"🧠",title:"AI content generator",desc:"One-click citation-optimized content: trigger queries, answer snippets, FAQ pairs, schema markup, and full SEO.",color:C.primary},
              {icon:"🚀",title:"Multi-platform distribution",desc:"Publication-ready content for Medium, Reddit, Quora, LinkedIn, YouTube, Hacker News, GitHub, and your blog.",color:C.reward},
              {icon:"📊",title:"Campaign analytics",desc:"Track impressions, clicks, and CTR across all AI platforms. See which content gets cited and where.",color:C.success},
              {icon:"🔄",title:"Visibility monitoring",desc:"Weekly automated re-audits with score tracking. Get alerts when competitors enter AI answers in your niche.",color:"#a78bfa"},
              {icon:"⚡",title:"6-engine optimization",desc:"Content tailored for each engine's citation style — ChatGPT, Gemini, Claude, Perplexity, Grok, and AI Overviews.",color:C.primary},
            ].map((f,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,padding:"28px 24px",transition:"all .35s",cursor:"default",position:"relative",overflow:"hidden"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=f.color+"30";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 30px ${f.color}12`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.04)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                <div style={{fontSize:30,marginBottom:16,filter:`drop-shadow(0 0 10px ${f.color}44)`}}>{f.icon}</div>
                <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:8}}>{f.title}</div>
                <div style={{fontSize:13.5,color:C.muted,lineHeight:1.55}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ HOW IT WORKS ═══ */}
        <Sec id="how-it-works" style={{padding:"80px 32px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>HOW IT WORKS</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em"}}>From invisible to everywhere<br/>in four steps</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,position:"relative"}}>
            <div style={{position:"absolute",top:48,left:"12.5%",right:"12.5%",height:2,
              background:`linear-gradient(90deg, ${C.trust}, ${C.primary}, ${C.reward}, ${C.success})`,opacity:.2,
              boxShadow:`0 0 8px ${C.primary}22`}} />
            {[
              {step:"01",title:"Audit",desc:"Enter your brand. Our AI scans all 6 engines to find where you appear — and where you don't.",icon:"🔍",color:C.trust},
              {step:"02",title:"Generate",desc:"One click creates a full content package: optimized snippets, articles, FAQ pairs, and schema markup.",icon:"🧠",color:C.primary},
              {step:"03",title:"Distribute",desc:"Get publication-ready content for 8+ authority platforms. Copy, paste, publish.",icon:"🚀",color:C.reward},
              {step:"04",title:"Dominate",desc:"Watch your GEO score climb as AI engines start citing your content. Track every click.",icon:"📈",color:C.success},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:"center",position:"relative",zIndex:1}}>
                <div style={{width:64,height:64,borderRadius:16,margin:"0 auto 20px",background:`${s.color}10`,border:`1px solid ${s.color}25`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  boxShadow:`0 0 24px ${s.color}12`}}>{s.icon}</div>
                <div style={{fontFamily:"'Fira Code',monospace",fontSize:10,color:s.color,letterSpacing:2,marginBottom:8,textShadow:`0 0 8px ${s.color}44`}}>STEP {s.step}</div>
                <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.55}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SOCIAL PROOF ═══ */}
        <Sec style={{padding:"60px 32px 80px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{background:`linear-gradient(135deg,${C.primary}06,${C.reward}05,${C.trust}04)`,border:`1px solid ${C.primary}12`,borderRadius:20,padding:"48px 40px",textAlign:"center",
            boxShadow:`0 0 40px ${C.primary}08`}}>
            <div style={{fontSize:11,color:C.reward,fontFamily:"'Fira Code',monospace",letterSpacing:2,marginBottom:20}}>EARLY RESULTS</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}}>
              {[{v:"312%",l:"Average visibility increase",s:"across 200+ beta users",c:C.primary},{v:"47K",l:"AI-sourced clicks",s:"in the first 30 days",c:C.reward},{v:"5.8%",l:"Average CTR",s:"3x higher than Google Ads",c:C.success}].map((s,i)=>(
                <div key={i}><div style={{fontSize:42,fontWeight:800,fontFamily:"'Fira Code',monospace",color:s.c,marginBottom:6,textShadow:`0 0 20px ${s.c}33`}}>{s.v}</div><div style={{fontSize:14,color:"#ddd",fontWeight:600,marginBottom:4}}>{s.l}</div><div style={{fontSize:12,color:C.dim}}>{s.s}</div></div>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:24}}>
            {[
              {q:"We went from zero AI mentions to #1 recommended in our niche within 3 weeks. This is the future of marketing.",n:"Sarah K.",r:"Founder, TaskFlow AI",c:C.trust},
              {q:"The audit was eye-opening — competitors were in every AI answer and we were nowhere. Fixed it in one afternoon.",n:"Marcus T.",r:"Head of Growth, NomadStays",c:C.primary},
              {q:"Replaced $4K/mo in Google Ads with GEO content that drives traffic passively. The ROI is insane.",n:"Diana R.",r:"CMO, FinTrack Pro",c:C.reward},
            ].map((t,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.012)",border:"1px solid rgba(255,255,255,.04)",borderRadius:16,padding:"24px 22px",
                transition:"all .3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.c+"25"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.04)"}>
                <div style={{fontSize:14,color:"#bbb",lineHeight:1.6,marginBottom:18,fontStyle:"italic"}}>"{t.q}"</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${t.c}25,${t.c}10)`,border:`1px solid ${t.c}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:t.c}}>{t.n[0]}</div>
                  <div><div style={{fontSize:13,fontWeight:600,color:"#ddd"}}>{t.n}</div><div style={{fontSize:11.5,color:C.dim}}>{t.r}</div></div>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ PRICING ═══ */}
        <Sec id="pricing" style={{padding:"80px 32px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:C.primary,fontFamily:"'Fira Code',monospace",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>PRICING</div>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:16}}>Start getting mentioned today</h2>
            <p style={{fontSize:16,color:C.muted,marginBottom:28}}>7-day free trial on all plans. No credit card required.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,padding:"4px 5px",borderRadius:11,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)"}}>
              <button onClick={()=>setAnnual(false)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",
                background:!annual?`linear-gradient(135deg,${C.primary}1a,${C.reward}12)`:"transparent",
                color:!annual?C.primary:C.dim,fontSize:13,fontWeight:600,boxShadow:!annual?`0 0 12px ${C.primary}12`:"none"}}>Monthly</button>
              <button onClick={()=>setAnnual(true)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",
                background:annual?`linear-gradient(135deg,${C.primary}1a,${C.reward}12)`:"transparent",
                color:annual?C.primary:C.dim,fontSize:13,fontWeight:600}}>Annual <span style={{fontSize:10.5,color:C.success,fontWeight:700,marginLeft:4}}>-20%</span></button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,alignItems:"start"}}>
            {PLANS.map(plan=>{
              const price=annual?Math.round(plan.price*0.8):plan.price;
              const isPro=plan.id==="pro";
              return(
                <div key={plan.id} style={{
                  background:isPro?`linear-gradient(135deg,${C.primary}06,${C.reward}04)`:"rgba(255,255,255,.012)",
                  border:`1px solid ${isPro?C.primary+"22":"rgba(255,255,255,.05)"}`,
                  borderRadius:18,padding:"32px 28px",position:"relative",transform:isPro?"scale(1.04)":"none",
                  boxShadow:isPro?`0 8px 40px ${C.primary}15`:"none",transition:"all .3s",
                }}>
                  {plan.badge&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",padding:"5px 18px",borderRadius:12,
                    background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",fontSize:10,fontWeight:700,fontFamily:"'Fira Code',monospace",letterSpacing:1,
                    boxShadow:`0 4px 16px ${C.primary}33`}}>{plan.badge}</div>}
                  <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:4}}>{plan.name}</div>
                  <div style={{fontSize:13,color:C.muted,marginBottom:20}}>{plan.desc}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:24}}>
                    <span style={{fontSize:44,fontWeight:800,color:plan.color,fontFamily:"'Fira Code',monospace",textShadow:`0 0 16px ${plan.color}33`}}>${price}</span>
                    <span style={{fontSize:14,color:C.dim}}>/mo</span>
                  </div>
                  <button style={{
                    width:"100%",padding:"13px 24px",borderRadius:11,border:"none",cursor:"pointer",
                    background:isPro?`linear-gradient(135deg,${C.primary},#ff6b3c)`:`${plan.color}12`,
                    color:isPro?"#fff":plan.color,fontSize:14,fontWeight:700,fontFamily:"inherit",marginBottom:24,
                    border:isPro?"none":`1px solid ${plan.color}30`,
                    boxShadow:isPro?`0 4px 20px ${C.primary}25`:"none",
                  }}>{plan.cta}</button>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {plan.features.map((f,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13.5,color:"#bbb"}}>
                        <span style={{color:plan.color,fontSize:12,marginTop:2,flexShrink:0,filter:`drop-shadow(0 0 4px ${plan.color}44)`}}>✓</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
          <div style={{
            background:`linear-gradient(135deg, ${C.primary}08, ${C.reward}06, ${C.trust}05)`,
            border:`1px solid ${C.primary}15`,borderRadius:24,padding:"56px 40px",
            boxShadow:`0 0 60px ${C.primary}08`,
          }}>
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-.02em",marginBottom:16}}>
              Stop being invisible to AI.<br/><span style={{background:`linear-gradient(90deg,${C.primary},${C.reward})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Start being mentioned.</span>
            </h2>
            <p style={{fontSize:16,color:C.muted,marginBottom:32,maxWidth:500,margin:"0 auto 32px",lineHeight:1.55}}>Join hundreds of brands using GEO to capture traffic from the fastest-growing channel in marketing.</p>
            <a href="/dashboard" style={{display:"inline-block",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer",
              background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:"#fff",fontSize:17,fontWeight:700,fontFamily:"inherit",
              animation:"lp-glow 3s infinite",boxShadow:`0 6px 28px ${C.primary}33`}}>Start your free trial →</a>
            <p style={{fontSize:12,color:C.dim,marginTop:14}}>Free for 7 days · No credit card · Cancel anytime</p>
          </div>
        </Sec>

        {/* Footer */}
        <footer style={{padding:"40px 32px",borderTop:"1px solid rgba(255,255,255,.04)",maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,backgroundSize:"200% 200%",animation:"lp-aurora 4s ease infinite",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:800}}>@</div>
              <span style={{fontSize:14,fontWeight:700,color:C.muted}}>MentionMe</span>
            </div>
            <div style={{display:"flex",gap:24}}>
              {["Privacy","Terms","Contact","Blog"].map(s=>(
                <span key={s} style={{fontSize:12.5,color:C.dim,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=C.muted} onMouseLeave={e=>e.target.style.color=C.dim}>{s}</span>
              ))}
            </div>
            <div style={{fontSize:12,color:"#3a3454"}}>© 2026 MentionMe. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
