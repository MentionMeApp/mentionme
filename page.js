import "./globals.css";

export const metadata = {
  title: "MentionMe — Get Your Brand Inside 2.5B Daily AI Answers",
  description: "The first GEO platform that optimizes your content for citation across ChatGPT, Gemini, Claude, Perplexity, Grok & Google AI Overviews.",
  metadataBase: new URL("https://mentionme.app"),
  openGraph: {
    title: "MentionMe — Get Mentioned by AI",
    description: "Optimize your brand for citation across all major AI engines. Start free.",
    url: "https://mentionme.app",
    siteName: "MentionMe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MentionMe — Get Mentioned by AI",
    description: "Optimize your brand for citation across all major AI engines.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
