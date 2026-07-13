import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: "Welcome to Drishti Kakkar's Terminal Portfolio v2.0.0", type: "system" },
    { text: ">> The candidate who codes AI agents AND directs music videos.", type: "system" },
    { text: "Type 'help' to see commands, or click suggestions below.", type: "system" },
    { text: "─────────────────────────────────────────────────────────", type: "system" }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      desc: "Show all available commands",
      action: () => [
        "Available commands:",
        "  about        Who is Drishti Kakkar?",
        "  hire         Why should you hire me?",
        "  skills       Core technical & creative skills",
        "  projects     Real-world projects (not to-do apps)",
        "  education    Academic background & CGPA",
        "  leadership   Leadership roles & impact",
        "  contact      Email, phone, and socials",
        "  clear        Clear terminal"
      ]
    },
    about: {
      desc: "Bio summary",
      action: () => [
        "┌─────────────────────────────────────────────┐",
        "│  DRISHTI KAKKAR                             │",
        "│  B.Tech IT • AI Engineer • Creative Tech    │",
        "└─────────────────────────────────────────────┘",
        "",
        "The 'Unicorn Profile' — where logic meets storytelling.",
        "",
        "By day:  Coding AI pipelines with Llama 3.3 & Groq,",
        "         building full-stack React/Node.js apps,",
        "         and training ML models on IIT datasets.",
        "",
        "By evening: Directing Saregama music videos,",
        "            designing B2B brand identities,",
        "            and anchoring national-level hackathons.",
        "",
        "Most candidates offer one or the other.",
        "I offer both — and that's the competitive edge."
      ]
    },
    hire: {
      desc: "Why hire me — recruiter perspective",
      action: () => [
        "⚡ WHY HIRE DRISHTI — What recruiters notice in 6 seconds:",
        "",
        "1. UNICORN PROFILE",
        "   → Rare blend of engineering depth + creative direction.",
        "   → Fluent in both design AND developer conversations.",
        "   → Ideal for: Frontend Eng, Product Strategy, Creative Tech.",
        "",
        "2. SELF-STARTER LEADERSHIP",
        "   → Vice Chair CSI SFIT (50+ member tech team)",
        "   → NSS Head (200+ participant welfare campaigns)",
        "   → GDG PR Exec (anchored HackX2.0 national hackathon)",
        "",
        "3. MODERN AI STACK (not just Python basics)",
        "   → Groq, Llama 3.3, Gemini & Claude API integration",
        "   → Built agentic AI career platforms, deepfake detectors",
        "   → Prompt engineering at production-grade level",
        "",
        "4. REAL-WORLD PROJECTS (not to-do apps)",
        "   → IoT smart lockers (Arduino + React)",

        "   → JP Morgan Chase mentorship deliverable",
        "",
        "5. STRONG ACADEMICS",
        "   → 8.6 CGPA while managing 5+ leadership roles",
        "",
        ">>> Type 'contact' to reach out."
      ]
    },
    skills: {
      desc: "List skills",
      action: () => [
        "🛠️ SKILL MATRIX — Not just buzzwords, backed by projects:",
        "",
        "  [Languages]    Python, C, Java, HTML/CSS, JavaScript",
        "  [Frontend]     React.js, Next.js, Tailwind CSS, Figma",
        "  [Backend]      Node.js, Flask, FastAPI, Advanced SQL",
        "  [AI & LLMs]    Llama 3.3, Groq, Gemini, Claude APIs",
        "  [ML & Data]    Prompt Eng, NLP, Computer Vision, OpenCV",
        "  [Creative]     UI/UX (Figma), Photoshop, Final Cut Pro",
        "  [Leadership]   Public Speaking, Event Anchoring, PR",
        "",
        "What sets me apart: I don't just USE these tools —",
        "I build production-grade systems with them."
      ]
    },
    projects: {
      desc: "Explore projects",
      action: () => [
        "🚀 FEATURED PROJECTS — Real problems, real solutions:",
        "",
        "  ★ CareerGPS AI",
        "    Full agentic AI pipeline — not an API wrapper.",
        "    Analyzes GitHub + Resume via Groq & Llama 3.3.",
        "",
        "  ★ CyberGuard AI",
        "    Sub-2-second deepfake detection, 94%+ accuracy.",
        "    Computer Vision + Deep Learning pipeline.",
        "",

        "  ★ Smart Locker (IoT)",
        "    Hardware meets software — Arduino + Raspberry Pi",
        "    OTP auth + sensor-based contactless delivery.",
        "",
        "  ★ AI Chatbot (JP Morgan Chase)",
        "    WhatsApp bot for hospital QR medicine lookup.",
        "    Built during Agastya Foundation mentorship.",
        "",
        ">>> No to-do apps. No weather widgets. Real impact."
      ]
    },
    education: {
      desc: "Academic history",
      action: () => [
        "🎓 EDUCATION:",
        "",
        "  St. Francis Institute of Technology, Mumbai",
        "  Bachelor of Technology — Information Technology",
        "  Aug 2024 – Jun 2028 (Expected)",
        "",
        "  CGPA: 8.6 — maintained while managing:",
        "    → Vice Chair of CSI SFIT",
        "    → NSS Head",
        "    → GDG PR Executive",
        "    → 2 active internships",
        "    → 6+ real-world projects",
        "",
        "  That's discipline + consistency under pressure."
      ]
    },
    leadership: {
      desc: "Leadership roles",
      action: () => [
        "👥 LEADERSHIP — Not just participation, IMPACT:",
        "",
        "  Vice Chairperson — CSI SFIT",
        "    50+ member tech association, workshops, hackathons",
        "",
        "  NSS Head — NSS SFIT",
        "    200+ participant welfare campaigns across Mumbai",
        "",
        "  PR Executive — Google Developers Group SFIT",
        "    Anchored HackX2.0 national-level hackathon (300+ devs)",
        "",
        "  Joint PR & Social Media Head — SFIT Alumni Association",
        "    Monthly newsletters reaching 1000+ alumni",
        "",
        "  Why it matters: These roles prove I can present,",
        "  manage teams, and deliver under real pressure."
      ]
    },
    contact: {
      desc: "Contact information",
      action: () => [
        "✉️ LET'S CONNECT:",
        "",
        "  Email:      drishtikakkar15@gmail.com",
        "  Phone:      +91 83558 44274",
        "  LinkedIn:   linkedin.com/in/drishti-kakkar-13a1992b3",
        "  GitHub:     github.com/drishti-kakkar",
        "  Location:   Mumbai, Maharashtra, India",
        "",
        "  Open to: Internships, Freelance, Creative Collab",
        "",
        "  >>> I respond within 24 hours."
      ]
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommand = (cmdText) => {
    const trimmedCmd = cmdText.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    let response = [];
    if (trimmedCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (commands[trimmedCmd]) {
      response = commands[trimmedCmd].action();
    } else {
      response = [
        `Command not found: '${cmdText}'.`,
        "Type 'help' to see the list of valid commands."
      ];
    }

    setHistory(prev => [
      ...prev,
      { text: `visitor@drishti:~$ ${cmdText}`, type: "input" },
      ...response.map(line => ({ text: line, type: "output" }))
    ]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-window" onClick={focusInput}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-btn close"></div>
          <div className="terminal-btn minimize"></div>
          <div className="terminal-btn maximize"></div>
        </div>
        <div className="terminal-title">drishti@portfolio:~</div>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="terminal-body">
        {history.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type === 'input' ? 'terminal-prompt' : ''}`}>
            {line.text}
          </div>
        ))}
        
        <div className="terminal-input-container">
          <span className="terminal-prompt">visitor@drishti:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Type a command..."
          />
        </div>

        <div className="terminal-suggestions">
          {Object.keys(commands).map(cmd => (
            <button
              key={cmd}
              className="terminal-suggest-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(cmd);
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default Terminal;
