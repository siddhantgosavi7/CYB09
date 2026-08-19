export const urlChallenges = [
  { id: 1, url: "https://www.google.com/search?q=cybersecurity", isMalicious: false, difficulty: "easy", explanation: "This is a legitimate Google search URL with HTTPS encryption." },
  { id: 2, url: "http://www.g00gle.com/login", isMalicious: true, difficulty: "easy", explanation: "The domain uses zeros instead of 'o' in 'google'. This is typosquatting — a common phishing technique." },
  { id: 3, url: "https://login.microsoftonline.com/oauth2/authorize", isMalicious: false, difficulty: "medium", explanation: "This is Microsoft's official OAuth login page used for Microsoft 365 authentication." },
  { id: 4, url: "https://www.paypal.com.secure-verify.com/login", isMalicious: true, difficulty: "medium", explanation: "The actual domain is 'secure-verify.com', NOT 'paypal.com'. 'paypal.com' is just a subdomain used to deceive. Always check the root domain!" },
  { id: 5, url: "http://192.168.1.1/admin", isMalicious: false, difficulty: "hard", explanation: "This is a local network IP address, typically a router admin page. Not malicious, but should only be accessed on your own network." },
  { id: 6, url: "https://bit.ly/3xK9mPq", isMalicious: true, difficulty: "hard", explanation: "Shortened URLs hide the real destination. Attackers use URL shorteners to disguise malicious links. Always expand shortened URLs before clicking." },
  { id: 7, url: "https://www.amazon.in/dp/B09XYZ1234", isMalicious: false, difficulty: "easy", explanation: "This is a standard Amazon India product URL with HTTPS. The '/dp/' path is Amazon's product detail page format." },
  { id: 8, url: "https://www.faceb00k-security.com/verify", isMalicious: true, difficulty: "easy", explanation: "This is NOT Facebook. The domain 'faceb00k-security.com' uses zeros and adds '-security'. Facebook's real domain is facebook.com." },
  { id: 9, url: "https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view", isMalicious: false, difficulty: "medium", explanation: "This is a legitimate Google Drive file sharing link with proper domain and path structure." },
  { id: 10, url: "https://www.netflix.com.billing-update.xyz/account", isMalicious: true, difficulty: "medium", explanation: "The real domain is 'billing-update.xyz', not 'netflix.com'. The '.xyz' TLD and suspicious subdomain structure reveal this as phishing." },
  { id: 11, url: "https://github.com/microsoft/vscode/releases", isMalicious: false, difficulty: "medium", explanation: "This is the official GitHub repository for VS Code maintained by Microsoft. Legitimate open-source project page." },
  { id: 12, url: "https://www.apple.com-id-verify.support/icloud", isMalicious: true, difficulty: "hard", explanation: "The actual domain is 'com-id-verify.support'. Apple's ID services are at 'appleid.apple.com'. This uses apple.com as a subdomain prefix to deceive." },
];

export const downloadChallenges = [
  {
    id: 1,
    filename: "resume_template_2026.docx",
    source: "Microsoft Office Templates (templates.office.com)",
    fileSize: "245 KB",
    isSafe: true,
    explanation: "DOCX file from the official Microsoft templates site. This is a standard document format from a trusted source.",
  },
  {
    id: 2,
    filename: "free_antivirus_crack_v2.exe",
    source: "free-software-downloads.ru",
    fileSize: "15.7 MB",
    isSafe: false,
    explanation: "Major red flags: 'crack' in filename suggests pirated software, .exe from Russian domain, antivirus cracks are a classic malware delivery method.",
  },
  {
    id: 3,
    filename: "quarterly_report.pdf",
    source: "Email from your manager (verified company email)",
    fileSize: "1.2 MB",
    isSafe: true,
    explanation: "PDF from a verified internal email is generally safe. The file size is reasonable for a business report.",
  },
  {
    id: 4,
    filename: "invoice_payment_details.pdf.exe",
    source: "Email from unknown sender",
    fileSize: "892 KB",
    isSafe: false,
    explanation: "Double extension (.pdf.exe) is a major red flag! The file will execute as .exe while pretending to be a PDF. Windows hides extensions by default, making this extra dangerous.",
  },
  {
    id: 5,
    filename: "node-v20.11.0.pkg",
    source: "nodejs.org",
    fileSize: "42.3 MB",
    isSafe: true,
    explanation: "Official Node.js installer from the official website. Always download development tools from their official sources.",
  },
  {
    id: 6,
    filename: "whatsapp_gold_premium.apk",
    source: "Shared via WhatsApp group",
    fileSize: "28.4 MB",
    isSafe: false,
    explanation: "'WhatsApp Gold' doesn't exist — it's a well-known scam. APK files from unofficial sources often contain malware. Always install apps from official app stores.",
  },
];

export const browsingTips = [
  { title: "Check the Padlock", desc: "Look for the padlock icon and 'https://' in the URL. But remember — HTTPS alone doesn't mean a site is trustworthy, only that the connection is encrypted.", icon: "🔒" },
  { title: "Verify the Domain", desc: "Always check the root domain. In 'evil.com/paypal.com', the real domain is 'evil.com'. Read from right-to-left before the first single slash.", icon: "🌐" },
  { title: "Beware of Shortened URLs", desc: "Use URL expanders (like checkshorturl.com) to reveal the full destination before clicking shortened links.", icon: "🔗" },
  { title: "Don't Download from Unknown Sources", desc: "Only download software from official websites or trusted app stores. Pirated software is a major malware vector.", icon: "📥" },
  { title: "Watch for Typosquatting", desc: "Attackers register domains similar to popular sites (g00gle.com, amaz0n.com). Always double-check spelling.", icon: "⌨️" },
  { title: "Check File Extensions", desc: "Be wary of double extensions like .pdf.exe or .doc.js. Enable 'Show file extensions' in your OS settings.", icon: "📁" },
];
