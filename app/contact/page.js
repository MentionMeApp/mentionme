"use client";
import { useState } from "react";
import InnerPage from "../components/InnerPage";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75", border:"rgba(255,255,255,.055)" };

// ═══ SETUP (one time, 2 minutes): ═══
// 1. Go to https://web3forms.com
// 2. Enter admin@mentionme.app as your email
// 3. Check your inbox for the access key
// 4. Replace the key below
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending"); setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `MentionMe Contact: ${subject}`,
          from_name: name, name, email, topic: subject, message, replyto: email,
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus("sent"); setName(""); setEmail(""); setSubject("general"); setMessage(""); }
      else throw new Error(data.message || "Send failed");
    } catch (err) { setStatus("error"); setErrorMsg(err.message); }
  };

  const inp = { width:"100%", padding:"12px 16px", borderRadius:10, background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, color:C.text, fontSize:14, fontFamily:"inherit", outline:"none", transition:"all .3s" };

  return (
    <InnerPage title="Get in touch">
      <p style={{ fontSize:15, color:C.muted, lineHeight:1.6, marginBottom:40 }}>
        Have a question, feature request, or partnership inquiry? Fill out the form or email us directly at <a href="mailto:admin@mentionme.app" style={{ color:C.primary }}>admin@mentionme.app</a>.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
        <div style={{ background:"rgba(255,255,255,.015)", border:`1px solid ${C.border}`, borderRadius:16, padding:28 }}>
          {status === "sent" ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✨</div>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Message sent!</div>
              <p style={{ fontSize:14, color:C.muted, marginBottom:6 }}>Delivered straight to our inbox.</p>
              <p style={{ fontSize:13, color:C.dim }}>We'll reply within 24 hours.</p>
              <button onClick={() => setStatus("idle")} style={{ marginTop:24, padding:"10px 24px", borderRadius:10, border:"none", cursor:"pointer", background:`linear-gradient(135deg,${C.primary},#ff6b3c)`, color:"#fff", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom:16 }}><label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Name</label><input value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" style={inp} onFocus={e=>{e.target.style.borderColor=C.primary+"55"}} onBlur={e=>{e.target.style.borderColor=C.border}} /></div>
              <div style={{ marginBottom:16 }}><label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="john@company.com" style={inp} onFocus={e=>{e.target.style.borderColor=C.primary+"55"}} onBlur={e=>{e.target.style.borderColor=C.border}} /></div>
              <div style={{ marginBottom:16 }}><label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Topic</label><select value={subject} onChange={e=>setSubject(e.target.value)} style={{...inp,cursor:"pointer",appearance:"none"}}><option value="general" style={{background:"#1a1525"}}>General inquiry</option><option value="support" style={{background:"#1a1525"}}>Technical support</option><option value="billing" style={{background:"#1a1525"}}>Billing question</option><option value="enterprise" style={{background:"#1a1525"}}>Enterprise / Agency</option><option value="partnership" style={{background:"#1a1525"}}>Partnership</option><option value="feature" style={{background:"#1a1525"}}>Feature request</option></select></div>
              <div style={{ marginBottom:20 }}><label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Message</label><textarea value={message} onChange={e=>setMessage(e.target.value)} required rows={5} placeholder="Tell us what's on your mind..." style={{...inp,resize:"vertical"}} onFocus={e=>{e.target.style.borderColor=C.primary+"55"}} onBlur={e=>{e.target.style.borderColor=C.border}} /></div>
              {status==="error"&&<div style={{marginBottom:14,padding:12,borderRadius:10,background:"rgba(255,68,102,.06)",border:"1px solid rgba(255,68,102,.15)",fontSize:12,color:C.primary}}>{errorMsg}</div>}
              <button type="submit" disabled={status==="sending"} style={{width:"100%",padding:"13px 24px",borderRadius:11,border:"none",cursor:status==="sending"?"wait":"pointer",background:status==="sending"?"rgba(255,255,255,.04)":`linear-gradient(135deg,${C.primary},#ff6b3c)`,color:status==="sending"?C.muted:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",boxShadow:status==="sending"?"none":`0 4px 20px ${C.primary}33`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                {status==="sending"&&<span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.primary}44`,borderTopColor:C.primary,borderRadius:"50%",animation:"mm-spin .6s linear infinite"}} />}
                {status==="sending"?"Sending...":"Send message →"}
              </button>
            </form>
          )}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { icon:"📧", title:"Email", desc:"admin@mentionme.app", sub:"We respond within 24 hours", color:C.primary },
            { icon:"💬", title:"Live chat", desc:"In-app for Pro users", sub:"Business hours support", color:C.trust },
            { icon:"📚", title:"Blog & guides", desc:"Tips and strategies", sub:"Learn about AI visibility", color:C.reward, href:"/blog" },
            { icon:"🤝", title:"Partnerships", desc:"admin@mentionme.app", sub:"Agency & integration inquiries", color:C.success },
          ].map((card,i) => (
            <a key={i} href={card.href||`mailto:admin@mentionme.app`} style={{display:"block",background:"rgba(255,255,255,.012)",border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 22px",transition:"all .3s",textDecoration:"none",color:"inherit"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=card.color+"25"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:24,filter:`drop-shadow(0 0 6px ${card.color}44)`}}>{card.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{card.title}</div><div style={{fontSize:13,color:card.color,marginTop:2}}>{card.desc}</div><div style={{fontSize:11.5,color:C.dim,marginTop:2}}>{card.sub}</div></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </InnerPage>
  );
}
