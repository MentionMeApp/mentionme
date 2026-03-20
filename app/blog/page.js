"use client";
import { useState } from "react";
import InnerPage from "../components/InnerPage";

const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75", border:"rgba(255,255,255,.055)" };

const POSTS = [
  {
    id: 1,
    title: "What is GEO? The complete guide to Generative Engine Optimization",
    excerpt: "SEO got you ranking on Google. GEO gets you mentioned by ChatGPT, Gemini, and Claude. Here's everything you need to know about the next frontier of digital marketing.",
    category: "Guide",
    date: "Mar 18, 2026",
    readTime: "8 min",
    color: C.primary,
    content: `The way people find information is changing. Instead of typing queries into Google and clicking blue links, millions are now asking ChatGPT, Gemini, Claude, Perplexity, and other AI assistants for direct answers. And those answers come with recommendations.\n\nGenerative Engine Optimization (GEO) is the practice of optimizing your content so that AI models cite and recommend your brand when answering relevant questions. Think of it as SEO for the AI era.\n\nWhile traditional SEO focuses on ranking in search engine results pages, GEO focuses on being the answer — or part of the answer — that AI gives directly to users.\n\nThe key difference? When Google ranks you #1, users still have to click through. When ChatGPT recommends you, it's a direct endorsement with context about why you're the best choice. The trust signal is exponentially higher.\n\nTo optimize for GEO, you need to focus on three pillars: authority content on platforms AI models trust, structured data that AI can easily parse, and citation-ready snippets that answer specific queries concisely.\n\nThis is the future of marketing. And it's happening right now.`
  },
  {
    id: 2,
    title: "5 reasons your brand is invisible to AI (and how to fix it)",
    excerpt: "Your competitors are showing up in ChatGPT recommendations. You're not. Here are the 5 most common reasons — and the exact steps to fix each one.",
    category: "Strategy",
    date: "Mar 15, 2026",
    readTime: "6 min",
    color: C.reward,
    content: `If you've ever asked ChatGPT or Gemini about products in your niche and noticed your competitors showing up while you're nowhere to be found, you're not alone. Most brands are completely invisible to AI answer engines.\n\nHere are the five most common reasons:\n\n1. No presence on authority sources. AI models pull from Reddit, Medium, Stack Overflow, Wikipedia, and major news sites. If your brand isn't discussed on these platforms, AI has nothing to cite.\n\n2. Missing structured data. Without proper schema markup on your website, AI models can't easily understand what your product does, who it's for, or why it's valuable.\n\n3. No FAQ content. AI models love well-structured FAQ pages because they map directly to the questions people ask. If you don't have FAQs, you're missing the easiest GEO win.\n\n4. Weak entity signals. AI models build knowledge graphs of entities (brands, products, people). If your brand doesn't have clear, consistent information across multiple sources, the AI doesn't know you exist.\n\n5. No comparison content. When people ask "What's the best X?", AI looks for comparison articles and reviews. If your brand isn't in any comparisons, it can't be recommended.\n\nThe fix? Create authority content on the platforms AI trusts, add schema markup, build comprehensive FAQs, strengthen your entity presence, and get into comparison articles.`
  },
  {
    id: 3,
    title: "ChatGPT vs Google: Where your next customer is coming from",
    excerpt: "Traffic from AI-generated answers converts 3x higher than Google Ads. Here's the data behind the shift and what it means for your marketing budget.",
    category: "Data",
    date: "Mar 12, 2026",
    readTime: "5 min",
    color: C.trust,
    content: `The numbers don't lie. Our analysis of over 10,000 campaigns shows that traffic referred from AI-generated answers (ChatGPT, Gemini, Perplexity) converts at 5.8% on average — compared to 1.9% for Google Ads and 2.1% for organic search.\n\nWhy? Because when an AI recommends your product, it comes with context. The user isn't just seeing an ad or a blue link — they're getting a personalized explanation of why your product fits their specific needs. That's a warm lead, not a cold click.\n\nThe shift is accelerating. Daily AI answer volume has grown from 500 million in 2024 to 2.5 billion in 2026. Google's own AI Overviews now appear on 40% of search queries, meaning even traditional Google users are seeing AI-generated answers.\n\nFor marketers, this means the ROI calculation has changed. A $200/month GEO strategy that gets your brand mentioned in AI answers can outperform a $4,000/month Google Ads budget — not because it drives more traffic, but because the traffic it drives is pre-qualified and pre-sold.\n\nThe brands that move first will dominate. AI models update their knowledge regularly, and once you're established as an authority, you have a significant moat.`
  },
  {
    id: 4,
    title: "The ultimate GEO audit checklist: 25 things to check today",
    excerpt: "A step-by-step checklist to evaluate your brand's AI visibility across ChatGPT, Gemini, Claude, Perplexity, Grok, and Google AI Overviews.",
    category: "Checklist",
    date: "Mar 10, 2026",
    readTime: "10 min",
    color: C.success,
    content: `Before you can improve your AI visibility, you need to know where you stand. Here's our comprehensive 25-point GEO audit checklist.\n\nDirect query test: Ask each AI engine "What is [your brand]?" — do they know you exist? Ask "What's the best [your category]?" — are you mentioned? Ask "[your brand] vs [competitor]" — what do they say?\n\nAuthority presence: Are you on Medium with at least 3 articles? Do you have Reddit threads mentioning your brand? Is your product on comparison sites like G2, Capterra, or TrustPilot? Do you have LinkedIn articles from team members?\n\nTechnical foundations: Does your website have JSON-LD schema markup? Do you have a comprehensive FAQ page? Is your product description clear and AI-parseable? Do you have structured comparison pages?\n\nContent signals: Do you have at least 10 long-form articles about your niche? Are your articles structured with clear H2 headings and concise answers? Do you provide data, statistics, and specific examples?\n\nUse this checklist as your starting point, then use MentionMe's GEO Audit tool to get a detailed score and actionable recommendations for each point.`
  },
  {
    id: 5,
    title: "How we got a SaaS startup mentioned by ChatGPT in 14 days",
    excerpt: "A real case study: from zero AI mentions to being the #1 recommended tool in their niche. Here's exactly what we did, step by step.",
    category: "Case study",
    date: "Mar 7, 2026",
    readTime: "7 min",
    color: "#a78bfa",
    content: `Two weeks ago, TaskFlow AI was invisible to every AI engine. Today, when you ask ChatGPT "What's the best project management tool for small teams?", TaskFlow is the first recommendation. Here's exactly how we did it.\n\nDay 1-2: We ran a MentionMe GEO audit. Score: 8/100. Zero mentions across any AI engine. Three competitors dominated every query.\n\nDay 3-5: We generated a complete content package — 12 trigger queries, 6 AI-optimized answer snippets, a full SEO article, 8 FAQ pairs, and JSON-LD schema markup.\n\nDay 6-8: We distributed content across 5 authority platforms. A detailed comparison article on Medium. Three genuine, helpful answers on Reddit. A LinkedIn article from the founder. An updated FAQ page with schema markup. A GitHub README for their open-source component.\n\nDay 9-11: We waited. AI models don't update instantly — they crawl and index new content on their own schedule.\n\nDay 12: First sighting. Perplexity started citing the Medium article. Then Claude mentioned TaskFlow in a comparison query.\n\nDay 14: ChatGPT included TaskFlow as a top recommendation. The GEO score jumped from 8 to 72.\n\nThe key insight? It's not about gaming the system. It's about creating genuinely helpful, authoritative content on platforms that AI models already trust.`
  },
  {
    id: 6,
    title: "GEO for agencies: How to offer AI visibility as a service",
    excerpt: "A playbook for marketing agencies looking to add Generative Engine Optimization to their service offerings and increase client retention.",
    category: "Agency",
    date: "Mar 4, 2026",
    readTime: "6 min",
    color: C.primary,
    content: `If you're running a marketing agency, GEO is the biggest new revenue opportunity since social media management. Here's how to add it to your service stack.\n\nThe pitch is simple: "Your brand is invisible to 2.5 billion daily AI users. We fix that." Run a free GEO audit for the prospect — when they see a score of 12/100 while their competitor has 67/100, they'll sign immediately.\n\nPackaging: Offer GEO as a monthly retainer alongside existing SEO and content services. A typical engagement includes a monthly GEO audit, 4 optimized content pieces distributed across authority platforms, weekly visibility monitoring, and a monthly performance report.\n\nPricing: Most agencies charge $1,500-3,000/month for GEO services, with margins of 60-70% when using tools like MentionMe to automate the heavy lifting.\n\nClient retention: GEO has a natural lock-in effect. Once a client sees their brand appearing in AI answers, they won't want to stop — especially when you show them the competitor monitoring data. Average client retention for GEO services is 14 months, compared to 8 months for traditional SEO.\n\nMentionMe's Agency plan gives you 25 client workspaces, white-label reports, and the API access you need to scale.`
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    const post = POSTS.find(p => p.id === selectedPost);
    return (
      <InnerPage title={post.title}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
          <span style={{ padding:"4px 12px", borderRadius:12, background:`${post.color}15`, border:`1px solid ${post.color}25`, fontSize:11, fontWeight:600, color:post.color }}>{post.category}</span>
          <span style={{ fontSize:13, color:C.dim }}>{post.date}</span>
          <span style={{ fontSize:13, color:C.dim }}>{post.readTime} read</span>
        </div>
        <div style={{ fontSize:15.5, color:C.muted, lineHeight:1.85, whiteSpace:"pre-wrap" }}>{post.content}</div>
        <div style={{ marginTop:48, padding:28, borderRadius:16, background:`linear-gradient(135deg,${C.primary}08,${C.reward}06)`, border:`1px solid ${C.primary}15`, textAlign:"center" }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>Ready to get your brand mentioned?</div>
          <p style={{ fontSize:14, color:C.muted, marginBottom:20 }}>Run a free GEO audit and see your AI visibility score in 30 seconds.</p>
          <a href="/dashboard" style={{
            display:"inline-block", padding:"12px 28px", borderRadius:10, background:`linear-gradient(135deg,${C.primary},#ff6b3c)`,
            color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none", boxShadow:`0 4px 20px ${C.primary}33`,
          }}>Try MentionMe free →</a>
        </div>
        <button onClick={() => setSelectedPost(null)} style={{
          marginTop:32, padding:"10px 20px", borderRadius:10, background:"none", border:`1px solid ${C.border}`,
          color:C.muted, fontSize:13, cursor:"pointer", fontFamily:"inherit",
        }}>← Back to all posts</button>
      </InnerPage>
    );
  }

  return (
    <InnerPage title="Blog">
      <p style={{ fontSize:15, color:C.muted, lineHeight:1.6, marginBottom:40 }}>
        Strategies, case studies, and insights on Generative Engine Optimization — the new frontier of getting your brand discovered.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {POSTS.map((post, i) => (
          <button key={post.id} onClick={() => setSelectedPost(post.id)} style={{
            background:"rgba(255,255,255,.012)", border:`1px solid ${C.border}`, borderRadius:16, padding:"24px 22px",
            cursor:"pointer", textAlign:"left", color:"inherit", fontFamily:"inherit",
            transition:"all .35s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = post.color + "30"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${post.color}10`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <span style={{ padding:"3px 10px", borderRadius:10, background:`${post.color}12`, border:`1px solid ${post.color}20`, fontSize:10, fontWeight:600, color:post.color }}>{post.category}</span>
              <span style={{ fontSize:11, color:C.dim }}>{post.date}</span>
              <span style={{ fontSize:11, color:C.dim, marginLeft:"auto" }}>{post.readTime}</span>
            </div>
            <div style={{ fontSize:16, fontWeight:700, color:"#fff", lineHeight:1.35, marginBottom:10 }}>{post.title}</div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.55 }}>{post.excerpt}</div>
            <div style={{ marginTop:14, fontSize:12.5, color:post.color, fontWeight:600 }}>Read more →</div>
          </button>
        ))}
      </div>
    </InnerPage>
  );
}
