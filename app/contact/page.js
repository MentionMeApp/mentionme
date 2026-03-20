"use client";
import { useState } from "react";
import InnerPage from "../components/InnerPage";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75", border:"rgba(255,255,255,.055)" };

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect this to an API route that sends via Resend/SendGrid
    // For now, open mailto as fallback
    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
    window.location.href = `mailto:hello@mentionme.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inp = { width:"100%", padding:"12px 16px", borderRadius:10, background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, color:C.text, fontSize:14, fontFamily:"inherit", outline:"none", transition:"all .3s" };

  return (
    <InnerPage title="Get in touch">
      <p style={{ fontSize:15, color:C.muted, lineHeight:1.6, marginBottom:40 }}>
        Have a question, feature request, or partnership inquiry? We'd love to hear from you.
        Fill out the form below or email us directly at <a href="mailto:hello@mentionme.app" style={{ color:C.primary }}>hello@mentionme.app</a>.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
        {/* Form */}
        <div style={{ background:"rgba(255,255,255,.015)", border:`1px solid ${C.border}`, borderRadius:16, padding:28 }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✨</div>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Message sent!</div>
              <p style={{ fontSize:14, color:C.muted }}>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} style={{
                marginTop:20, padding:"10px 24px", borderRadius:10, border:"none", cursor:"pointer",
                background:`linear-gradient(135deg,${C.primary},#ff6b3c)`, color:"#fff", fontSize:13, fontWeight:600, fontFamily:"inherit",
              }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Your name</label>
                <input value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" style={inp}
                  onFocus={e=>{e.target.style.borderColor=C.primary+"55";e.target.style.boxShadow=`0 0 16px ${C.primary}15`}}
                  onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Email address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="john@company.com" style={inp}
                  onFocus={e=>{e.target.style.borderColor=C.primary+"55";e.target.style.boxShadow=`0 0 16px ${C.primary}15`}}
                  onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Topic</label>
                <select value={subject} onChange={e=>setSubject(e.target.value)} style={{...inp, cursor:"pointer", appearance:"none"}}>
                  <option value="general" style={{background:"#1a1525"}}>General inquiry</option>
                  <option value="support" style={{background:"#1a1525"}}>Technical support</option>
                  <option value="billing" style={{background:"#1a1525"}}>Billing question</option>
                  <option value="enterprise" style={{background:"#1a1525"}}>Enterprise / Agency plan</option>
                  <option value="partnership" style={{background:"#1a1525"}}>Partnership</option>
                  <option value="feature" style={{background:"#1a1525"}}>Feature request</option>
                </select>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:6, fontFamily:"'Fira Code',monospace" }}>Message</label>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} required rows={5} placeholder="Tell us what's on your mind..." style={{...inp, resize:"vertical"}}
                  onFocus={e=>{e.target.style.borderColor=C.primary+"55";e.target.style.boxShadow=`0 0 16px ${C.primary}15`}}
                  onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none"}} />
              </div>
              <button type="submit" style={{
                width:"100%", padding:"13px 24px", borderRadius:11, border:"none", cursor:"pointer",
                background:`linear-gradient(135deg,${C.primary},#ff6b3c)`, color:"#fff",
                fontSize:14, fontWeight:700, fontFamily:"inherit", boxShadow:`0 4px 20px ${C.primary}33`,
              }}>Send message →</button>
            </form>
          )}
        </div>

        {/* Info cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { icon:"📧", title:"Email us", desc:"hello@mentionme.app", sub:"We respond within 24 hours", color:C.primary },
            { icon:"💬", title:"Live chat", desc:"Available in-app", sub:"Pro & Agency plans — instant support", color:C.trust },
            { icon:"📚", title:"Help center", desc:"docs.mentionme.app", sub:"Guides, tutorials, and FAQs", color:C.reward },
            { icon:"🤝", title:"Partnerships", desc:"partners@mentionme.app", sub:"Agency & integration inquiries", color:C.success },
          ].map((card,i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,.012)", border:`1px solid ${C.border}`, borderRadius:14, padding:"20px 22px",
              transition:"all .3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=card.color+"25";e.currentTarget.style.boxShadow=`0 0 16px ${card.color}08`}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none"}}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:24, filter:`drop-shadow(0 0 6px ${card.color}44)` }}>{card.icon}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{card.title}</div>
                  <div style={{ fontSize:13, color:card.color, marginTop:2 }}>{card.desc}</div>
                  <div style={{ fontSize:11.5, color:C.dim, marginTop:2 }}>{card.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InnerPage>
  );
}
