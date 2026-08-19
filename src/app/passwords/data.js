export const commonPasswords = [
  "123456","password","123456789","12345678","12345","1234567","1234567890",
  "qwerty","abc123","111111","password1","iloveyou","1q2w3e4r","000000",
  "qwerty123","zaq12wsx","dragon","sunshine","princess","football",
  "charlie","donald","password123","admin","welcome","monkey","login",
  "master","hello","freedom","whatever","trustno1","shadow","superman",
  "letmein","baseball","michael","access","696969","batman",
];

export function analyzePassword(password) {
  if (!password) return { score: 0, level: "none", crackTime: "Instant", feedback: [], checks: {} };
  const checks = {
    length8: password.length >= 8,
    length12: password.length >= 12,
    length16: password.length >= 16,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noCommon: !commonPasswords.includes(password.toLowerCase()),
    noRepeating: !/(.)\1{2,}/.test(password),
    noSequential: !/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password),
  };

  let score = 0;
  if (checks.length8) score += 10;
  if (checks.length12) score += 15;
  if (checks.length16) score += 10;
  if (checks.uppercase) score += 10;
  if (checks.lowercase) score += 10;
  if (checks.numbers) score += 10;
  if (checks.special) score += 15;
  if (checks.noCommon) score += 10;
  if (checks.noRepeating) score += 5;
  if (checks.noSequential) score += 5;

  const feedback = [];
  if (!checks.length8) feedback.push("Use at least 8 characters");
  if (!checks.length12) feedback.push("Use 12+ characters for strong security");
  if (!checks.uppercase) feedback.push("Add uppercase letters (A-Z)");
  if (!checks.lowercase) feedback.push("Add lowercase letters (a-z)");
  if (!checks.numbers) feedback.push("Add numbers (0-9)");
  if (!checks.special) feedback.push("Add special characters (!@#$%^&*)");
  if (!checks.noCommon) feedback.push("This is a commonly used password — avoid it!");
  if (!checks.noRepeating) feedback.push("Avoid repeating characters (e.g., aaa, 111)");
  if (!checks.noSequential) feedback.push("Avoid sequential patterns (e.g., 123, abc)");

  let level, crackTime;
  if (score <= 15) { level = "weak"; crackTime = "Less than 1 second"; }
  else if (score <= 35) { level = "fair"; crackTime = "A few minutes to hours"; }
  else if (score <= 55) { level = "good"; crackTime = "Days to months"; }
  else if (score <= 75) { level = "strong"; crackTime = "Years to decades"; }
  else { level = "excellent"; crackTime = "Centuries+"; }

  return { score, level, crackTime, feedback, checks };
}

export const passwordTips = [
  { title: "Use Passphrases", desc: "Combine 4+ random words: 'correct-horse-battery-staple' is stronger and easier to remember than 'P@ssw0rd!'", icon: "💡" },
  { title: "Enable 2FA", desc: "Two-Factor Authentication adds a second layer. Even if someone gets your password, they can't log in without the second factor.", icon: "🔐" },
  { title: "Password Manager", desc: "Use tools like Bitwarden or 1Password to generate and store unique passwords for every account.", icon: "🗄️" },
  { title: "Never Reuse Passwords", desc: "If one account is breached, all accounts with the same password are compromised.", icon: "🚫" },
  { title: "Avoid Personal Info", desc: "Don't use birthdays, pet names, or phone numbers. Attackers can find these easily on social media.", icon: "🙅" },
  { title: "Check for Breaches", desc: "Visit haveibeenpwned.com to check if your email/password has appeared in data breaches.", icon: "🔍" },
];

export const passwordQuiz = [
  { question: "Which password is the strongest?", options: ["P@ssw0rd!", "MyDog'sName2024", "correct-horse-battery-staple", "Admin123!"], answer: 2, explanation: "A passphrase like 'correct-horse-battery-staple' has high entropy and is easy to remember. The others use common patterns that attackers check first." },
  { question: "What is a brute force attack?", options: ["Guessing passwords from a dictionary", "Trying every possible character combination", "Tricking users into revealing passwords", "Intercepting password over network"], answer: 1, explanation: "Brute force systematically tries every possible combination. It's why longer passwords with varied characters take exponentially longer to crack." },
  { question: "How often should you change your passwords?", options: ["Every 30 days", "Every 90 days", "Only when there's a breach or suspicion of compromise", "Every year"], answer: 2, explanation: "NIST guidelines now recommend changing passwords only when there's a reason to believe they've been compromised. Frequent forced changes lead to weaker passwords." },
  { question: "What is credential stuffing?", options: ["Creating very long passwords", "Using stolen username/password pairs from one breach to try on other sites", "Filling out forms with fake info", "Storing passwords in a text file"], answer: 1, explanation: "Credential stuffing uses leaked credentials from one site to try logging into other sites. This is why password reuse is so dangerous." },
];
