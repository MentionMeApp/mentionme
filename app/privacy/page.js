"use client";
import InnerPage from "../components/InnerPage";

const S = { section:{ marginBottom:32 }, h2:{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:12, marginTop:32 }, p:{ fontSize:14.5, color:"#9590aa", lineHeight:1.75, marginBottom:12 }, ul:{ paddingLeft:20, marginBottom:12 }, li:{ fontSize:14.5, color:"#9590aa", lineHeight:1.75, marginBottom:6 } };

export default function Privacy() {
  return (
    <InnerPage title="Privacy policy">
      <p style={{ fontSize:13, color:"#5f5a75", marginBottom:40 }}>Last updated: March 20, 2026</p>

      <div style={S.section}>
        <p style={S.p}>At MentionMe ("we", "us", "our"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at mentionme.app and related services.</p>
      </div>

      <h2 style={S.h2}>Information we collect</h2>
      <p style={S.p}>We collect information you provide directly to us, including:</p>
      <ul style={S.ul}>
        <li style={S.li}>Account information (name, email address, password)</li>
        <li style={S.li}>Billing information (processed securely via Stripe — we never store card details)</li>
        <li style={S.li}>Campaign data (brand names, URLs, product descriptions, niche selections)</li>
        <li style={S.li}>Generated content (audit results, content packages, distribution templates)</li>
        <li style={S.li}>Usage data (features used, frequency, session duration)</li>
      </ul>

      <h2 style={S.h2}>How we use your information</h2>
      <p style={S.p}>We use the information we collect to:</p>
      <ul style={S.ul}>
        <li style={S.li}>Provide, maintain, and improve our GEO platform services</li>
        <li style={S.li}>Process transactions and send related billing information</li>
        <li style={S.li}>Send you weekly GEO visibility reports and campaign updates</li>
        <li style={S.li}>Respond to your comments, questions, and support requests</li>
        <li style={S.li}>Monitor and analyze usage trends to improve the platform</li>
        <li style={S.li}>Detect, prevent, and address technical issues and fraud</li>
      </ul>

      <h2 style={S.h2}>AI processing</h2>
      <p style={S.p}>When you use our GEO audit, content generation, and distribution features, your input data (brand names, URLs, product descriptions) is processed by third-party AI services (Anthropic Claude API) to generate results. This data is sent securely via encrypted connections and is not used to train AI models. We do not share your campaign data with other users or third parties beyond what is necessary to provide the service.</p>

      <h2 style={S.h2}>Data sharing</h2>
      <p style={S.p}>We do not sell, rent, or trade your personal information. We may share information with:</p>
      <ul style={S.ul}>
        <li style={S.li}>Service providers (hosting, payment processing, email delivery) who assist in operating our platform</li>
        <li style={S.li}>Law enforcement or government agencies when required by law</li>
        <li style={S.li}>Business partners in the event of a merger, acquisition, or sale of assets</li>
      </ul>

      <h2 style={S.h2}>Data security</h2>
      <p style={S.p}>We implement industry-standard security measures including encryption in transit (TLS/SSL), encryption at rest, secure authentication, and regular security audits. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

      <h2 style={S.h2}>Data retention</h2>
      <p style={S.p}>We retain your account data for as long as your account is active. Campaign data and generated content are retained for 12 months after creation, or until you delete them. You can request deletion of your account and all associated data at any time by contacting us.</p>

      <h2 style={S.h2}>Cookies</h2>
      <p style={S.p}>We use essential cookies for authentication and session management. We use analytics cookies (PostHog) to understand how the platform is used. You can disable non-essential cookies through your browser settings.</p>

      <h2 style={S.h2}>Your rights</h2>
      <p style={S.p}>Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal data. You may also have the right to opt out of marketing communications. To exercise any of these rights, contact us at privacy@mentionme.app.</p>

      <h2 style={S.h2}>Children's privacy</h2>
      <p style={S.p}>MentionMe is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from children.</p>

      <h2 style={S.h2}>Changes to this policy</h2>
      <p style={S.p}>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>

      <h2 style={S.h2}>Contact us</h2>
      <p style={S.p}>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p style={S.p}>Email: privacy@mentionme.app<br/>Or use our <a href="/contact" style={{ color:"#ff3c8e" }}>contact form</a>.</p>
    </InnerPage>
  );
}
