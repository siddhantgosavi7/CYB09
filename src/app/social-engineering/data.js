export const scenarios = [
  {
    id: "phone_pretexting",
    title: "The Urgent IT Call",
    description: "You receive a phone call at work from someone claiming to be from the IT department.",
    icon: "📞",
    difficulty: "Medium",
    nodes: {
      start: {
        text: "Your desk phone rings. The caller says: \"Hi, this is Amit from IT Support. We've detected a malware infection on your computer. I need your login credentials immediately to run a remote security scan before the virus spreads to the company network.\"",
        choices: [
          { text: "Give them your username and password to fix the issue quickly", next: "gave_creds", score: 0 },
          { text: "Ask for their employee ID and say you'll call IT back on the official number", next: "verified", score: 30 },
          { text: "Say you're busy and hang up", next: "hung_up", score: 10 },
          { text: "Ask them to send you an email with instructions instead", next: "asked_email", score: 5 },
        ],
      },
      gave_creds: {
        text: "❌ You've been social engineered! A real IT department will NEVER ask for your password over the phone. The attacker now has full access to your account and potentially the company network.\n\n🔑 Lesson: No legitimate IT support will ever ask for your password. Always verify the caller through official channels.",
        choices: [],
        isEnd: true,
        score: 0,
      },
      verified: {
        text: "✅ Smart move! You asked for verification. The caller stammers and says \"I don't have my ID handy, but this is really urgent...\" What do you do?",
        choices: [
          { text: "They sound stressed — give them the info since it's urgent", next: "gave_creds_delayed", score: 0 },
          { text: "Insist on calling back through the official IT helpdesk number", next: "called_back", score: 35 },
          { text: "Report this call to your manager immediately", next: "reported", score: 35 },
        ],
      },
      hung_up: {
        text: "You hung up, which stops the immediate threat. But you haven't reported the attempt, so the attacker might try targeting someone else in your organization.\n\n🔑 Lesson: Always report suspicious calls to your IT/security team so they can warn others.",
        choices: [],
        isEnd: true,
        score: 10,
      },
      asked_email: {
        text: "The caller says: \"Sure, I'll send you an email with a link to our remote support tool.\" A few minutes later, you receive an email from amit.it.support@gmail.com with a link to download a \"security scanner\".\n\nThis is actually malware! The attacker used a personal email pretending to be corporate IT.\n\n🔑 Lesson: Official IT communications come from company email domains. Never download tools from unverified sources.",
        choices: [],
        isEnd: true,
        score: 5,
      },
      gave_creds_delayed: {
        text: "❌ Even though you initially asked for verification, you still gave in to pressure. Social engineers are trained to create urgency.\n\n🔑 Lesson: Stay firm in your verification process. Urgency is a manipulation tactic — real emergencies have proper procedures.",
        choices: [],
        isEnd: true,
        score: 5,
      },
      called_back: {
        text: "🌟 Excellent! You called the official IT helpdesk and they confirmed NO one from IT called you. The helpdesk thanks you for reporting it and sends a company-wide alert about the social engineering attempt. You've protected yourself AND your entire organization!",
        choices: [],
        isEnd: true,
        score: 35,
      },
      reported: {
        text: "🌟 Great decision! Your manager immediately contacts the security team. They identify that several employees received similar calls. Thanks to your quick reporting, the company blocks the attacker's phone number and sends a security advisory to all employees.",
        choices: [],
        isEnd: true,
        score: 35,
      },
    },
    maxScore: 65,
  },
  {
    id: "usb_baiting",
    title: "The Mystery USB Drive",
    description: "You find a USB drive in the office parking lot with an interesting label.",
    icon: "💾",
    difficulty: "Easy",
    nodes: {
      start: {
        text: "You find a USB drive in the office parking lot labeled \"Employee Salary Data Q3 2026 - CONFIDENTIAL\". What do you do?",
        choices: [
          { text: "Plug it into your work computer to see what's on it", next: "plugged_in", score: 0 },
          { text: "Take it to the IT/security team", next: "reported_it", score: 40 },
          { text: "Plug it into your personal laptop at home instead", next: "personal_laptop", score: 0 },
          { text: "Leave it where it is and ignore it", next: "ignored", score: 10 },
        ],
      },
      plugged_in: {
        text: "❌ The USB drive contains malware that immediately begins executing when plugged in! It installs a keylogger and backdoor on your work computer, giving the attacker access to the entire company network.\n\n🔑 Lesson: Never plug in unknown USB drives. Attackers deliberately drop them in places employees will find them. This is called 'USB Baiting' or 'USB Drop Attack'.",
        choices: [],
        isEnd: true,
        score: 0,
      },
      reported_it: {
        text: "🌟 Perfect response! The IT security team safely analyzes the USB drive in an isolated environment and discovers it contains malware. They sweep the parking lot for more drives and send a security awareness reminder to all employees. Your vigilance may have prevented a major data breach!",
        choices: [],
        isEnd: true,
        score: 40,
      },
      personal_laptop: {
        text: "❌ Using your personal laptop doesn't make it safe! The malware on the USB drive now infects your personal computer. It steals your saved passwords, banking information, and personal files.\n\n🔑 Lesson: An unknown USB drive is dangerous on ANY computer. The threat isn't about which device you use — it's about the unknown content on the drive.",
        choices: [],
        isEnd: true,
        score: 0,
      },
      ignored: {
        text: "Leaving it is better than plugging it in, but someone else might find and plug it in. The best action is to report it to security.\n\n🔑 Lesson: See something suspicious? Report it! You're not just protecting yourself — you're protecting everyone in your organization.",
        choices: [],
        isEnd: true,
        score: 10,
      },
    },
    maxScore: 40,
  },
  {
    id: "tailgating",
    title: "The Friendly Stranger",
    description: "Someone without a badge asks you to hold the door at a secure entrance.",
    icon: "🚪",
    difficulty: "Medium",
    nodes: {
      start: {
        text: "You're entering your office building through a badge-access door. A person in business attire carrying coffee and a laptop bag approaches from behind and says: \"Hey! Could you hold the door? I left my badge at my desk — I'm from the 5th floor marketing team.\"",
        choices: [
          { text: "Hold the door — they look like they belong here", next: "held_door", score: 0 },
          { text: "Politely ask them to use the reception desk to get a visitor badge", next: "reception", score: 35 },
          { text: "Let the door close and suggest they call a colleague to come let them in", next: "call_colleague", score: 30 },
          { text: "Hold the door but ask to see some form of ID", next: "asked_id", score: 10 },
        ],
      },
      held_door: {
        text: "❌ You've just allowed potential unauthorized access! This technique is called 'tailgating' or 'piggybacking'. The person could be anyone — a corporate spy, a thief, or a social engineer. They used social pressure and a plausible story to bypass physical security.\n\n🔑 Lesson: Badge-access doors exist for a reason. Everyone should authenticate themselves, regardless of how they look or what story they tell.",
        choices: [],
        isEnd: true,
        score: 0,
      },
      reception: {
        text: "🌟 Excellent! You maintained security without being rude. The person seems slightly annoyed but heads to reception. Later, security discovers this person wasn't an employee at all — they were attempting to gain unauthorized access to steal equipment.\n\nYour policy adherence prevented a security breach!",
        choices: [],
        isEnd: true,
        score: 35,
      },
      call_colleague: {
        text: "✅ Good approach! By suggesting they contact a colleague, you're offering a reasonable alternative while maintaining security. If they're a real employee, getting someone to vouch for them is quick. If they're not, they'll likely leave.",
        choices: [],
        isEnd: true,
        score: 30,
      },
      asked_id: {
        text: "Asking for ID shows awareness, but you're not qualified to verify employee IDs, and a sophisticated attacker might have a fake one. The correct procedure is to direct them to reception or security.\n\n🔑 Lesson: Don't try to be the security guard yourself. Use established procedures — that's what reception desks and security teams are for.",
        choices: [],
        isEnd: true,
        score: 10,
      },
    },
    maxScore: 35,
  },
  {
    id: "impersonation",
    title: "The Vendor Visit",
    description: "Someone claiming to be a software vendor asks for network access.",
    icon: "🎭",
    difficulty: "Hard",
    nodes: {
      start: {
        text: "A well-dressed person arrives at your department claiming: \"I'm Priya Sharma from CloudTech Solutions. Your manager Mr. Verma scheduled a meeting with me today to demo our new security software. He asked me to get started setting up — could you give me access to a network port and the Wi-Fi password?\"",
        choices: [
          { text: "Help them set up — they mentioned your manager by name", next: "gave_access", score: 0 },
          { text: "Ask them to wait while you verify with Mr. Verma", next: "verified_manager", score: 30 },
          { text: "Direct them to reception to follow visitor protocol", next: "sent_reception", score: 35 },
          { text: "Give them guest Wi-Fi access only — that should be safe", next: "guest_wifi", score: 15 },
        ],
      },
      gave_access: {
        text: "❌ Major security breach! This person was an attacker using impersonation. Knowing your manager's name is easy — it's on LinkedIn. By giving network access, you've potentially exposed the entire corporate network.\n\n🔑 Lesson: Name-dropping is a classic social engineering tactic. Always verify through official channels, regardless of who they claim to know.",
        choices: [],
        isEnd: true,
        score: 0,
      },
      verified_manager: {
        text: "You message Mr. Verma. He responds: \"I don't have any vendor meeting today. Who is this person?\" The impersonator is confronted and quickly leaves the building.\n\n✅ Quick verification saved the day!",
        choices: [
          { text: "Report the incident to security", next: "reported_incident", score: 35 },
          { text: "Just glad they left, go back to work", next: "no_report", score: 0 },
        ],
      },
      sent_reception: {
        text: "🌟 Perfect response! Reception checks their records — no vendor meeting is scheduled. Security is alerted, and the person is escorted out. Camera footage is saved for investigation. Your adherence to protocol prevented unauthorized network access!",
        choices: [],
        isEnd: true,
        score: 35,
      },
      guest_wifi: {
        text: "Guest Wi-Fi is better than full network access, but you still haven't verified this person's identity. They could use guest access as a stepping stone, or their real goal might be to plant a physical device.\n\n🔑 Lesson: Even 'limited' access should only be granted through proper procedures. Always verify identity and authorization first.",
        choices: [],
        isEnd: true,
        score: 15,
      },
      reported_incident: {
        text: "🌟 Excellent! Security reviews the CCTV footage, identifies the impersonator, and adds them to a watch list. They also discover the same person attempted similar tactics at two other companies in the tech park. Your report helped protect multiple organizations!",
        choices: [],
        isEnd: true,
        score: 35,
      },
      no_report: {
        text: "You verified the identity, which is great. But not reporting the incident means security can't investigate or prevent future attempts. The same attacker might succeed at another department.\n\n🔑 Lesson: Always report security incidents, even if you stopped them. It helps the organization learn and prepare.",
        choices: [],
        isEnd: true,
        score: 0,
      },
    },
    maxScore: 70,
  },
];
