"use client";
import { useEffect, useState } from "react";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", bg:"#0a0510", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75" };

export default function InnerPage({ title, children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 50); }, []);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'Sora','Outfit',sans-serif" }}>
      {/* BG */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:-300, left:"30%", width:700, height:700, borderRadius:"50%", background:`radial-gradient(ellipse, ${C.primary}06 0%, transparent 55%)` }} />
        <div style={{ position:"absolute", inset:0, opacity:.01, backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)", backgroundSize:"30px 30px" }} />
      </div>

      {/* Nav */}
      <nav style={{
        padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:"1px solid rgba(255,255,255,.04)", position:"relative", zIndex:10,
        background:"rgba(10,5,16,.9)", backdropFilter:"blur(20px)",
        opacity:ready?1:0, transition:"opacity .4s",
      }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:"#fff", fontWeight:800,
            boxShadow:`0 0 20px ${C.primary}33` }}>@</div>
          <span style={{ fontSize:17, fontWeight:800, letterSpacing:-.3, background:`linear-gradient(135deg,#fff,${C.reward})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>MentionMe</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <a href="/blog" style={{ fontSize:13, color:C.muted, textDecoration:"none" }}>Blog</a>
          <a href="/contact" style={{ fontSize:13, color:C.muted, textDecoration:"none" }}>Contact</a>
          <a href="/dashboard" style={{
            padding:"8px 20px", borderRadius:9, background:`linear-gradient(135deg,${C.primary}22,${C.reward}18)`,
            border:`1px solid ${C.primary}33`, color:C.primary, fontSize:12.5, fontWeight:700, textDecoration:"none",
            boxShadow:`0 0 16px ${C.primary}15`,
          }}>Get started free</a>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth:780, margin:"0 auto", padding:"60px 32px 80px", position:"relative", zIndex:1,
        opacity:ready?1:0, transform:ready?"none":"translateY(16px)", transition:"all .6s ease" }}>
        {title && (
          <h1 style={{ fontSize:36, fontWeight:800, marginBottom:8, background:`linear-gradient(90deg,#fff,${C.reward})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{title}</h1>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer style={{ padding:"40px 32px", borderTop:"1px solid rgba(255,255,255,.04)", maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:`linear-gradient(135deg,${C.primary},#ff6b3c,${C.reward})`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#fff", fontWeight:800 }}>@</div>
            <span style={{ fontSize:14, fontWeight:700, color:C.muted }}>MentionMe</span>
          </div>
          <div style={{ display:"flex", gap:24 }}>
            {[{l:"Privacy",h:"/privacy"},{l:"Terms",h:"/terms"},{l:"Contact",h:"/contact"},{l:"Blog",h:"/blog"}].map(s => (
              <a key={s.l} href={s.h} style={{ fontSize:12.5, color:C.dim, textDecoration:"none" }}>{s.l}</a>
            ))}
          </div>
          <div style={{ fontSize:12, color:"#3a3454" }}>© 2026 MentionMe. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
