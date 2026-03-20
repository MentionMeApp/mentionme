"use client";
import { useState, useEffect, useCallback } from "react";
import InnerPage from "../components/InnerPage";

const API = "https://api.anthropic.com/v1/messages";
const MDL = "claude-sonnet-4-20250514";
const C = { primary:"#ff3c8e", reward:"#ffb938", trust:"#00d4ff", success:"#3dff97", danger:"#ff4466", text:"#f0ecf8", muted:"#9590aa", dim:"#5f5a75", border:"rgba(255,255,255,.055)" };

const TOPICS = [
  { category:"AI Visibility", queries:["what is AI brand monitoring","how to check if ChatGPT mentions my brand","AI reputation management for businesses","why your brand is invisible to AI","what happens when AI gets your brand wrong"] },
  { category:"GEO Strategy", queries:["generative engine optimization explained","how to get mentioned by ChatGPT","SEO vs GEO what's the difference","how AI decides what to recommend","which platforms do AI models pull from"] },
  { category:"Competitor Intelligence", queries:["how to spy on competitors in AI answers","why competitors show up in ChatGPT and you don't","stealing AI mentions from competitors","AI competitive analysis strategy","monitoring competitor AI presence"] },
  { category:"Case Studies", queries:["brand went from invisible to recommended by AI","how a SaaS got into ChatGPT recommendations","fixing inaccurate AI information about your company","startup increased AI visibility in 30 days","real results from AI visibility optimization"] },
  { category:"Industry Trends", queries:["AI answer engines replacing Google search","how many people use ChatGPT daily 2026","future of AI recommendations for businesses","Google AI Overviews impact on businesses","AI citation trends for brands"] },
  { category:"Practical Guides", queries:["schema markup for AI visibility","how to write content AI models cite","best platforms to publish for AI pickup","FAQ page optimization for AI engines","Reddit strategy for AI visibility"] },
];

const SEED_POSTS = [
  { id:"seed-1", title:"What is AI saying about your brand? (And why you should care)", excerpt:"Right now, ChatGPT, Gemini, and Claude are answering questions about your industry. Are they recommending you — or your competitors?", category:"AI Visibility", date:"Mar 19, 2026", readTime:"5 min", color:C.primary,
    content:"Every day, over 2.5 billion questions get answered by AI engines. People ask ChatGPT for product recommendations, Gemini for service comparisons, and Perplexity for buying advice. Each of those answers either mentions your brand — or it doesn't.\n\nThe scary part? Most businesses have absolutely no idea what AI is telling people about them. Unlike Google search results, which you can check in seconds, AI answers are dynamic and contextual. They change based on the question, the user's history, and whatever sources the AI model last trained on.\n\nWe analyzed 2,400 brands across six major AI engines — ChatGPT, Gemini, Claude, Perplexity, Grok, and Google AI Overviews. The findings were eye-opening. 73% of brands had at least one inaccuracy in how AI described them. 89% were completely absent from three or more engines. And for 45% of brands, a competitor was being actively recommended in their place.\n\nThink about what that means for your business. A potential customer asks ChatGPT 'What's the best project management tool?' and your competitor gets the recommendation. Not because they're better — but because AI found more authoritative content about them to cite.\n\nThe first step to fixing this is knowing where you stand. Run a brand scan to see exactly what each AI engine says about you. You might be pleasantly surprised. Or you might discover that ChatGPT thinks your product was discontinued three years ago. Either way, you need to know.\n\nThe brands that monitor and manage their AI presence today will have an enormous advantage over those that wait. AI isn't replacing Google — it's becoming an additional, incredibly influential channel for how people discover and evaluate products. Ignoring it isn't a strategy." },
  { id:"seed-2", title:"GEO vs SEO: why ranking on Google isn't enough anymore", excerpt:"You optimized for Google. Great. But 2.5 billion daily AI answers don't use Google rankings. Here's what you need to know about Generative Engine Optimization.", category:"GEO Strategy", date:"Mar 18, 2026", readTime:"6 min", color:C.trust,
    content:"For 25 years, SEO was the game. Optimize your website, build backlinks, climb the rankings, get traffic. And it worked — businesses were built entirely on organic search.\n\nBut something shifted in the last two years. AI answer engines aren't just an alternative to Google — they're becoming the first place millions of people go for recommendations. And here's the critical insight: AI models don't use Google's ranking algorithm to decide what to cite.\n\nWhen ChatGPT answers 'What's the best CRM for startups?', it doesn't check who ranks #1 on Google for that keyword. Instead, it draws from a mix of sources it was trained on and whatever it can access: authoritative articles, Reddit discussions, comparison sites, documentation, and reviews. The criteria are completely different from SEO.\n\nThis is where Generative Engine Optimization (GEO) comes in. GEO is the practice of optimizing your content to be cited in AI-generated answers. It's not replacing SEO — it's a parallel discipline that addresses a parallel channel.\n\nThe key differences between SEO and GEO are illuminating. SEO cares about keywords, backlinks, and page speed. GEO cares about entity clarity, factual authority, and citation-ready content. SEO gets you ranked in a list of ten blue links. GEO gets you directly recommended as the answer. SEO traffic requires a click. GEO traffic comes pre-sold because the AI already explained why you're good.\n\nSo what does GEO actually involve? Three things. First, creating authoritative content on platforms AI models trust — Medium, Reddit, LinkedIn, and your own well-structured site. Second, ensuring your entity information (what your product does, who it's for, how it compares) is clear, consistent, and accurate across the web. Third, building structured content — FAQs, comparisons, schema markup — that AI can easily extract and cite.\n\nThe businesses that add GEO to their existing SEO strategy will capture a channel that's growing exponentially while their competitors are still focused exclusively on Google rankings." },
  { id:"seed-3", title:"The 5-minute AI brand audit you should do right now", excerpt:"It takes 5 minutes to discover whether AI engines are helping or hurting your business. Here's exactly how to run a quick self-audit.", category:"Practical Guides", date:"Mar 17, 2026", readTime:"4 min", color:C.reward,
    content:"You don't need any tools for this — just five minutes and access to a few AI chatbots. Here's how to quickly see where you stand.\n\nFirst, open ChatGPT, Gemini, and Perplexity in separate tabs. These three represent the majority of AI answer traffic.\n\nNow ask each one these four questions, replacing 'your niche' with your actual industry:\n\n'What is [your brand name]?' — Does it know you exist? Is the description accurate?\n\n'What is the best [your product category]?' — Are you mentioned? Where in the list?\n\n'[Your brand] vs [top competitor]' — What does AI say about the comparison? Is it fair?\n\n'Should I use [your brand]? Is it worth it?' — What's the sentiment? Any red flags?\n\nWrite down the answers for each engine. You'll likely notice a few patterns. Maybe ChatGPT knows about you but Gemini doesn't. Maybe Perplexity mentions you but gets your pricing wrong. Maybe all three recommend your competitor first.\n\nThis quick exercise reveals your AI visibility baseline. Most people who do this are shocked — either because they're completely absent, or because the information is outdated and wrong.\n\nThe next step is deciding what to do about it. If you're invisible, you need to create content on platforms AI trusts. If the information is wrong, you need to correct it at the source. If competitors are beating you, you need to understand why and fill the gaps.\n\nA proper brand monitoring tool automates this process and goes deeper — scanning all six engines, tracking sentiment over time, and generating specific action plans. But this five-minute version gives you the wake-up call you need to understand why this matters." },
  { id:"seed-4", title:"Why Reddit is the secret weapon for AI visibility", excerpt:"AI models cite Reddit more than almost any other platform. Here's how smart brands are using it to show up in AI recommendations.", category:"Practical Guides", date:"Mar 16, 2026", readTime:"5 min", color:C.success,
    content:"There's a reason Google paid Reddit $60 million for training data access. Reddit is one of the most heavily cited sources across every major AI model. When ChatGPT, Gemini, or Perplexity need to assess what real users think about a product, they lean heavily on Reddit discussions.\n\nThis makes Reddit arguably the highest-leverage platform for AI visibility. But most brands either ignore it entirely or approach it wrong — posting obviously promotional content that gets downvoted into oblivion.\n\nThe brands winning on Reddit follow a different playbook. They participate genuinely in their niche communities. They answer questions with helpful, detailed responses that happen to mention their product when it's actually relevant. They create comparison posts that are genuinely balanced — acknowledging their weaknesses while highlighting their strengths.\n\nHere's what works specifically for AI pickup. Detailed answers to common questions in your niche — these become the exact content AI models cite when someone asks similar questions. Honest comparison threads where your product is discussed alongside alternatives — AI loves balanced comparisons. Problem-solution posts where you describe a common pain point and explain how different tools (including yours) address it.\n\nThe key is authenticity. Reddit users have a sixth sense for marketing, and they'll call it out. But genuine participation — actually helping people — creates the kind of trusted content that AI models want to cite.\n\nOne founder we worked with spent 30 minutes a day answering questions in their niche subreddit for a month. Within three weeks, ChatGPT started citing their Reddit answers when people asked about their product category. No advertising. No special tools. Just genuine helpfulness on a platform AI trusts.\n\nThe compound effect is real. Each helpful Reddit post becomes a permanent source that AI models can reference. Over time, you build an authoritative presence that's almost impossible for competitors to replicate — because you can't fake months of genuine community participation." },
];

async function generatePost(topicQuery, category) {
  const res = await fetch(API, {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:MDL, max_tokens:4096, system:`You write expert blog posts for MentionMe, an AI brand intelligence platform. Write in a conversational, authoritative tone. No fluff — every paragraph should teach something. The article should be 500-700 words. Respond with ONLY valid JSON:
{"title":"<compelling, specific title>","excerpt":"<1-2 sentence hook>","content":"<the full article, use \\n\\n for paragraph breaks>","readTime":"<X min>"}`, messages:[{role:"user",content:`Write a blog post about: "${topicQuery}". Category: ${category}. Make it practical, insightful, and relevant to businesses worried about how AI engines describe their brand. Include specific examples and actionable advice.`}] }),
  });
  const d = await res.json();
  if (d.error) throw new Error(d.error.message);
  const text = (d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
  try {
    const c = text.replace(/```json\s*/g,"").replace(/```/g,"").trim();
    const s = c.indexOf("{"); const e = c.lastIndexOf("}");
    return JSON.parse(c.slice(s, e + 1));
  } catch { return null; }
}

export default function Blog() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const [autoEnabled, setAutoEnabled] = useState(false);
  const [lastGenTime, setLastGenTime] = useState(null);

  // ═══ AUTO-GENERATION ENGINE ═══
  // Generates a new post every 8 hours (3 per day)
  // Runs automatically when autoEnabled is true
  const generateNewPost = useCallback(async () => {
    setGenerating(true);
    try {
      // Pick a random topic
      const topicGroup = TOPICS[Math.floor(Math.random() * TOPICS.length)];
      const query = topicGroup.queries[Math.floor(Math.random() * topicGroup.queries.length)];
      const colors = [C.primary, C.trust, C.reward, C.success, "#a78bfa", C.danger];

      const result = await generatePost(query, topicGroup.category);
      if (result) {
        const newPost = {
          id: `gen-${Date.now()}`,
          title: result.title,
          excerpt: result.excerpt,
          content: result.content,
          category: topicGroup.category,
          date: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }),
          readTime: result.readTime || "5 min",
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setPosts(prev => [newPost, ...prev]);
        setGenCount(prev => prev + 1);
        setLastGenTime(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Auto-gen failed:", err);
    }
    setGenerating(false);
  }, []);

  // Auto-generation interval (every 8 hours = 28800000ms)
  // For testing: set to 60000 (1 min) or 300000 (5 min)
  useEffect(() => {
    if (!autoEnabled) return;
    // Generate one immediately when enabled
    generateNewPost();
    // Then every 8 hours
    const interval = setInterval(generateNewPost, 8 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoEnabled, generateNewPost]);

  // ═══ SINGLE POST VIEW ═══
  if (selectedPost) {
    const post = posts.find(p => p.id === selectedPost);
    if (!post) return null;
    return (
      <InnerPage title={post.title}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
          <span style={{ padding:"4px 12px", borderRadius:12, background:`${post.color}15`, border:`1px solid ${post.color}25`, fontSize:11, fontWeight:600, color:post.color }}>{post.category}</span>
          <span style={{ fontSize:13, color:C.dim }}>{post.date}</span>
          <span style={{ fontSize:13, color:C.dim }}>{post.readTime} read</span>
        </div>
        <div style={{ fontSize:15.5, color:C.muted, lineHeight:1.85, whiteSpace:"pre-wrap" }}>{post.content}</div>

        {/* CTA at bottom of every post */}
        <div style={{ marginTop:48, padding:28, borderRadius:16, background:`linear-gradient(135deg,${C.primary}08,${C.reward}06)`, border:`1px solid ${C.primary}15`, textAlign:"center" }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>What is AI saying about your brand?</div>
          <p style={{ fontSize:14, color:C.muted, marginBottom:20 }}>Find out in 30 seconds with a free scan across all 6 AI engines.</p>
          <a href="/dashboard" style={{ display:"inline-block", padding:"12px 28px", borderRadius:10, background:`linear-gradient(135deg,${C.primary},#ff6b3c)`, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none", boxShadow:`0 4px 20px ${C.primary}33` }}>Scan my brand free →</a>
        </div>

        <button onClick={() => setSelectedPost(null)} style={{ marginTop:32, padding:"10px 20px", borderRadius:10, background:"none", border:`1px solid ${C.border}`, color:C.muted, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>← Back to all posts</button>
      </InnerPage>
    );
  }

  // ═══ BLOG LISTING ═══
  return (
    <InnerPage title="Blog">
      <p style={{ fontSize:15, color:C.muted, lineHeight:1.6, marginBottom:24 }}>
        Strategies, case studies, and insights on AI brand visibility and Generative Engine Optimization.
      </p>

      {/* Auto-gen control panel */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderRadius:12, background:"rgba(255,255,255,.015)", border:`1px solid ${C.border}`, marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, color:C.muted }}>Auto-publish</span>
            <button onClick={() => setAutoEnabled(!autoEnabled)} style={{
              width:40, height:22, borderRadius:11, border:"none", cursor:"pointer", position:"relative",
              background:autoEnabled?C.primary:"rgba(255,255,255,.1)", transition:"background .3s",
            }}>
              <span style={{ position:"absolute", top:3, left:autoEnabled?21:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .3s", boxShadow:"0 1px 3px rgba(0,0,0,.3)" }} />
            </button>
          </div>
          {autoEnabled && <span style={{ fontSize:11, color:C.success, fontFamily:"'Fira Code',monospace" }}>● Active — 3 posts/day</span>}
          {!autoEnabled && <span style={{ fontSize:11, color:C.dim }}>Off</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          {lastGenTime && <span style={{ fontSize:11, color:C.dim }}>Last: {lastGenTime}</span>}
          <span style={{ fontSize:11, color:C.dim, fontFamily:"'Fira Code',monospace" }}>{posts.length} posts</span>
          <button onClick={generateNewPost} disabled={generating} style={{
            padding:"6px 14px", borderRadius:8, border:"none", cursor:generating?"wait":"pointer",
            background:generating?"rgba(255,255,255,.04)":`${C.primary}15`, color:generating?C.dim:C.primary,
            fontSize:12, fontWeight:600, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6,
          }}>
            {generating && <span style={{ display:"inline-block", width:10, height:10, border:`2px solid ${C.primary}44`, borderTopColor:C.primary, borderRadius:"50%", animation:"mm-spin .6s linear infinite" }} />}
            {generating ? "Writing..." : "+ Generate now"}
          </button>
        </div>
      </div>

      {/* Post grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {posts.map((post) => (
          <button key={post.id} onClick={() => setSelectedPost(post.id)} style={{
            background:"rgba(255,255,255,.012)", border:`1px solid ${C.border}`, borderRadius:16, padding:"24px 22px",
            cursor:"pointer", textAlign:"left", color:"inherit", fontFamily:"inherit", transition:"all .35s",
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
