import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Terminal from './components/Terminal';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  Code,
  Brain,
  Video,
  Users,
  Send,
  Shield,
  Compass,
  Lock,
  Cpu,
  BarChart2,
  Sparkles,
  GraduationCap,
  Zap,
  Target,
  Palette,
  TrendingUp,
  Star,
  X,
  Image,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/* Intersection Observer hook for scroll-triggered animations */
function useInView(options) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, isInView];
}

/* Animated Section wrapper */
function AnimatedSection({ children, className = '', id, style }) {
  const [ref, isInView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`section container ${className} ${isInView ? 'animate-in' : 'animate-hidden'}`}
      style={style}
    >
      {children}
    </section>
  );
}

function App() {
  const [skillCategory, setSkillCategory] = useState('tech');
  const [activeExpType, setActiveExpType] = useState('work');
  const [selectedExpIdx, setSelectedExpIdx] = useState(0);
  const [projectCategory, setProjectCategory] = useState('all');
  const [contactStatus, setContactStatus] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Stats for the hero counter strip
  const stats = [
    { label: 'CGPA', value: '8.6', icon: <GraduationCap size={18} /> },
    { label: 'Projects Built', value: '6+', icon: <Code size={18} /> },
    { label: 'Leadership Roles', value: '5+', icon: <Users size={18} /> },
    { label: 'Certifications', value: '8+', icon: <Award size={18} /> }
  ];

  // "Why Hire Me" value proposition cards — derived from recruiter insights
  const valueProps = [
    {
      icon: <Zap size={28} />,
      title: 'The Unicorn Profile',
      subtitle: 'Logic meets Storytelling',
      desc: 'Rare duality of engineering depth and creative direction — I bridge the gap between design teams and dev teams, fluent in both languages.',
      tags: ['Frontend Eng.', 'UI/UX Eng.', 'Product Strategy', 'Creative Tech']
    },
    {
      icon: <Target size={28} />,
      title: 'High-Impact Leadership',
      subtitle: 'Self-starter who executes',
      desc: 'Vice Chairperson of CSI SFIT, NSS Head, GDG PR Executive — proven ability to manage teams, budgets, and deliver under pressure before graduation.',
      tags: ['Team Management', 'Public Speaking', 'Event Anchoring']
    },
    {
      icon: <Brain size={28} />,
      title: 'Modern AI Stack',
      subtitle: 'Beyond basic Python',
      desc: 'Hands-on with Groq, Llama 3.3, Gemini & Claude APIs, building agentic AI platforms, deepfake detectors, and automated career pipelines — not toy projects.',
      tags: ['Prompt Engineering', 'LLM APIs', 'Computer Vision', 'NLP']
    },
    {
      icon: <Shield size={28} />,
      title: 'Real-World Solutions',
      subtitle: 'No "To-Do list" projects',
      desc: 'From IoT smart lockers with Arduino OTP systems to women\'s safety ecosystems with gesture-based SOS — every project solves a real problem.',
      tags: ['IoT + Hardware', 'Civic Tech', 'Security', 'Healthcare']
    }
  ];

  // Experience Data — structured into Work and Leadership for interactive tabs
  const experiences = {
    work: [
      {
        title: "Copywriter Intern",
        company: "EvolvEd",
        period: "May 2026 - Present",
        tags: ["Content Writing", "PR", "Marketing", "HTML Emails"],
        desc: "Creating engaging content for official channels, drafting PR newsletters, LinkedIn updates, and custom HTML email marketing campaigns that drive user engagement.",
        impact: "Authoring weekly PR newsletters reaching 500+ subscribers"
      },
      {
        title: "Graphic Designer",
        company: "Zoetics (B2B Business)",
        period: "May 2025 - Present",
        tags: ["Figma", "Photoshop", "Branding", "B2B Design"],
        desc: "Designing B2B product catalogs, digital creatives, brand identity visuals, and holiday greeting assets for corporate clients — bridging design and business.",
        impact: "Delivering 30+ branded assets for corporate B2B campaigns"
      },
      {
        title: "Assistant Director",
        company: "Final Cut Studio & Production",
        period: "Sep 2025 - Oct 2025",
        tags: ["Direction", "Production", "Saregama Music", "Film"],
        desc: "Served as Assistant Director for a high-profile Saregama music video. Orchestrated shoot logistics, script breakdowns, scene scheduling, and directed on-set talent.",
        impact: "AD on commercial Saregama music video — real production credits"
      },
      {
        title: "Data Science & Analytics Intern",
        company: "Remarkskill x IIT Hyderabad",
        period: "Jun 2025 - Jul 2025",
        tags: ["Python", "Machine Learning", "Data Visualization", "IIT"],
        desc: "Gained hands-on training with exploratory data analysis, data pre-processing, and building regression models on real-world datasets under IIT Hyderabad mentorship.",
        impact: "Built 3 ML models on production-grade IIT datasets"
      },
      {
        title: "Actor & Assistant Director Intern",
        company: "Momomoto Studios",
        period: "Apr 2024 - Jul 2024",
        tags: ["Acting", "Scripting", "Direction", "TV Commercial"],
        desc: "Contributed to script development, scene execution, and worked as an actor on a television commercial project — real-world media production experience.",
        impact: "On-screen acting + direction in TV commercial production"
      }
    ],
    leadership: [
      {
        title: "Vice Chairperson",
        company: "CSI SFIT",
        period: "Jun 2026 - Present",
        tags: ["Technical Association", "Management", "Leadership"],
        desc: "Elected to lead CSI Student Chapter — coordinating tech workshops, hackathons, and overseeing administrative/operational activities of the entire branch.",
        impact: "Managing 50+ member team & coordinating college-wide tech events"
      },
      {
        title: "NSS Head",
        company: "NSS SFIT",
        period: "Jun 2026 - Present",
        tags: ["Social Welfare", "Leadership", "Event Management"],
        desc: "Directing college community service projects, blood donation campaigns, tree plantation drives, and organizing welfare events across Mumbai.",
        impact: "Directing social welfare campaigns impacting 200+ participants"
      },
      {
        title: "Public Relations Executive",
        company: "Google Developers Group (GDG) SFIT",
        period: "Jan 2026 - May 2026",
        tags: ["Public Relations", "Content Writing", "Event PR", "Google"],
        desc: "Managed promotional copy, scriptwriting, and anchoring for the HackX2.0 national-level hackathon — part of the global Google Developer ecosystem.",
        impact: "Anchored HackX2.0 national hackathon reaching 300+ participants"
      },
      {
        title: "Joint PR & Social Media Head",
        company: "SFIT Alumni Association",
        period: "Jul 2025 - Jun 2026",
        tags: ["Alumni Engagement", "Social Media", "Webinars", "Newsletters"],
        desc: "Managed alumni outreach campaigns, conducted interactive alumni webinars on Slido, and designed the monthly newsletter for 1000+ alumni network.",
        impact: "Reaching 1000+ alumni through monthly digital newsletters"
      }
    ]
  };

  // Projects Data — with real GitHub repo links
  const projects = [
    {
      title: "CareerGPS AI",
      desc: "AI-powered career guidance platform that analyzes resumes, GitHub profiles, and LinkedIn pages to provide personalized career path recommendations, skill gap analysis, and mock interview simulations.",
      tech: ["React", "Node.js", "Llama 3.3", "Groq AI", "FastAPI"],
      category: "ai",
      icon: <Brain size={24} />,
      highlight: "Not a wrapper — full agentic AI pipeline with Groq inference",
      github: "https://github.com/drishti-kakkar/CareerGPS-AI"
    },
    {
      title: "CyberGuard AI",
      desc: "Rapid-analysis security tool that detects spam copy, phishing links, and identifies deepfake images or AI-generated edits from user uploads in under 2 seconds with 94%+ accuracy.",
      tech: ["Python", "Computer Vision", "Deep Learning", "Flask"],
      category: "ai",
      icon: <Shield size={24} />,
      highlight: "Sub-2-second deepfake detection with production-grade accuracy",
      github: "https://github.com/drishti-kakkar/CyberGuard-AI"
    },
    {
      title: "SheShield",
      desc: "Smart women's safety ecosystem featuring gesture-based SOS alerts, real-time GPS tracking, companion smartwatch integration, and instant emergency contact notification.",
      tech: ["React Native", "Node.js", "GPS APIs", "IoT", "WebSockets"],
      category: "iot",
      icon: <Compass size={24} />,
      highlight: "Civic tech — gesture-based SOS with real GPS tracking",
      github: "https://github.com/drishti-kakkar/SheShield"
    },
    {
      title: "IoT Contactless Smart Locker",
      desc: "Space-efficient physical delivery locker integrating OTP authentication, Wi-Fi connectivity, electronic lock control, and sensor-based package detection for contactless delivery.",
      tech: ["Arduino", "Raspberry Pi", "React", "Node.js", "Embedded C"],
      category: "iot",
      icon: <Lock size={24} />,
      highlight: "Hardware + Software integration — Arduino to React frontend",
      github: "https://github.com/drishti-kakkar/Smart-Locker-IoT"
    },
    {
      title: "AI Chatbot (QR Locator)",
      desc: "Integrated WhatsApp chatbot linked with hospital QR scanners, helping patients locate generic medicines, read store catalogs, and navigate directories — built during JP Morgan Chase mentorship.",
      tech: ["Python", "WhatsApp API", "SQL", "QR Scanners"],
      category: "ai",
      icon: <Cpu size={24} />,
      highlight: "JP Morgan Chase mentorship — real healthcare deployment",
      github: "https://github.com/drishti-kakkar/AI-Chatbot-QR"
    },
    {
      title: "Netflix Data Platform",
      desc: "Data-driven analytics platform featuring search indexes, genre aggregations, trend analysis, and interactive SVG charts built from Netflix catalog datasets with advanced filtering.",
      tech: ["React", "D3.js / SVG Charts", "Node.js", "Python"],
      category: "web",
      icon: <BarChart2 size={24} />,
      highlight: "Production-quality data visualization with D3.js",
      github: "https://github.com/drishti-kakkar/Netflix-Data-Platform"
    }
  ];

  // Skills Data — grouped by competency level instead of arbitrary percentages
  const skills = {
    tech: {
      expert: ["Python", "React.js", "JavaScript", "HTML / CSS"],
      proficient: ["Node.js", "Express", "FastAPI", "Flask", "SQL", "Next.js", "Tailwind CSS"],
      familiar: ["C", "Java", "DSA", "Embedded C", "Arduino", "Raspberry Pi"]
    },
    ai: {
      expert: ["Prompt Engineering", "LLM API Integration"],
      proficient: ["Llama 3.3 / Groq", "Gemini API", "Claude API", "NLP"],
      familiar: ["Computer Vision", "OpenCV", "IBM Watson Studio", "Deep Learning"]
    },
    creative: {
      expert: ["Canva", "Adobe Photoshop", "Content Copywriting", "Social Media Strategy"],
      proficient: ["UI/UX Design (Figma)", "Video Editing (Final Cut Pro)", "Digital PR"],
      familiar: ["After Effects", "Brand Identity Design", "Motion Graphics"]
    },
    leadership: {
      expert: ["Public Speaking & Anchoring", "Event Management", "Team Leadership"],
      proficient: ["Proposal & Doc Drafting", "PR Strategy", "Newsletter Design"],
      familiar: ["Budget Management", "Stakeholder Communication"]
    }
  };

  // Creative Showcase Data — updated with visual mockups
  const creativeWorks = [
    {
      title: "Saregama Music Video — AD",
      type: "Film & Direction",
      desc: "Served as Assistant Director on a Saregama-label music video. Managed shoot logistics, scene breakdowns, talent direction, and multi-location scheduling.",
      tags: ["Direction", "Saregama", "Production"],
      image: "/src/assets/saregama_video.png"
    },
    {
      title: "Zoetics B2B Brand Catalog",
      type: "Graphic Design",
      desc: "Designed comprehensive product catalogs, digital creatives, and branded holiday assets for corporate B2B clients. 30+ branded deliverables.",
      tags: ["Figma", "Photoshop", "B2B Branding"],
      image: "/src/assets/zoetics_catalog.png"
    },
    {
      title: "SFIT Alumni Newsletter Design",
      type: "Content & Design",
      desc: "Designed and authored monthly digital newsletters for 1000+ alumni network. Combined Canva visuals with copywriting for alumni engagement.",
      tags: ["Newsletter", "Canva", "1000+ Reach"],
      image: "/src/assets/alumni_newsletter.png"
    },
    {
      title: "HackX2.0 National Hackathon — Anchor",
      type: "Public Speaking",
      desc: "Anchored the main stage at GDG SFIT's HackX2.0 national-level hackathon. Managed crowd energy, introduced speakers, and facilitated 300+ attendees.",
      tags: ["Anchoring", "300+ Audience", "GDG"]
    },
    {
      title: "EvolvEd Email Campaigns",
      type: "Copywriting & Marketing",
      desc: "Created HTML email marketing campaigns, PR newsletters, and LinkedIn content for EvolvEd's official channels driving user engagement.",
      tags: ["HTML Emails", "PR", "Content Marketing"]
    },
    {
      title: "Momomoto Studios — TV Commercial",
      type: "Acting & Direction",
      desc: "On-screen actor and assistant director for a television commercial. Contributed to script development, blocking, and scene execution.",
      tags: ["Acting", "TV Commercial", "Script Dev"]
    }
  ];

  // Certifications
  const certifications = [
    { name: "IBM SkillsBuild: ML & DL, NLP & Computer Vision", issuer: "IBM" },
    { name: "Deloitte Data Analytics Simulation", issuer: "Deloitte & Forage" },
    { name: "Artificial Intelligence and Machine Learning", issuer: "IIT Bombay x Remarkskill" },
    { name: "Data Science and Analytics", issuer: "IIT Hyderabad x Remarkskill" },
    { name: "Colloquium '26 Consolation Winner II [Team Lead]", issuer: "St. Francis Institute of Technology" },
    { name: "Samadhan Ideathon Top 5 [Team Lead]", issuer: "NSS SFIT" },
    { name: "OutSkill 16-Hour Intensive AI Workshop", issuer: "OutSkill" },
    { name: "Engineering Mentorship Program", issuer: "Agastya Foundation x JP Morgan Chase" }
  ];

  // Web3Forms contact handler — REPLACE the access key with your own from https://web3forms.com
  const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'; // <-- Get your free key at web3forms.com

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactStatus('');

    const formData = new FormData(e.target);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', 'New Contact from Portfolio — Drishti Kakkar');
    formData.append('from_name', 'Portfolio Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        setContactStatus('success');
        e.target.reset();
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    } finally {
      setContactSubmitting(false);
    }
  };



  const filteredProjects = projects.filter(project =>
    projectCategory === 'all' || project.category === projectCategory
  );

  // Get skills for the selected category
  const getSkillsForCategory = () => {
    if (skillCategory === 'all') {
      // Merge all categories
      const allExpert = Object.values(skills).flatMap(s => s.expert);
      const allProficient = Object.values(skills).flatMap(s => s.proficient);
      const allFamiliar = Object.values(skills).flatMap(s => s.familiar);
      return { expert: allExpert, proficient: allProficient, familiar: allFamiliar };
    }
    return skills[skillCategory] || { expert: [], proficient: [], familiar: [] };
  };

  const currentSkills = getSkillsForCategory();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <header id="home" className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-subtitle">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', marginRight: '8px', animation: 'blink 1.5s infinite' }}></span>
              SYSTEM.INIT() // AVAILABLE FOR HIRE
            </span>
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Drishti</span><br />
              <span style={{ fontSize: '0.6em', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                I build where <span className="highlight">logic</span> meets <span className="highlight">storytelling</span>
              </span>
            </h1>
            <p className="hero-description">
              IT undergrad at SFIT Mumbai who codes AI agents by morning and directs commercial videos by evening. From Llama 3.3 pipelines to Saregama music videos — I create products that are <strong className="highlight">functionally rigorous</strong> and <strong className="highlight">visually compelling</strong>.
            </p>

            {/* Stats strip */}
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div className="hero-stat" key={i}>
                  <span className="hero-stat-icon">{stat.icon}</span>
                  <div>
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-buttons">
              <a href="#why-hire" className="btn btn-primary">
                <Zap size={16} /> Why Hire Me
              </a>
              <a href="#projects" className="btn btn-secondary">
                <Code size={16} /> View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                <Send size={16} /> Get In Touch
              </a>
            </div>
          </div>
          <div className="hero-terminal">
            <div className="hero-visual">
              <svg className="bg-blob" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7FB3FF" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <path d="M66 198C66 115 136 52 218 48c82-4 178 28 237 86 59 58 97 167 53 221-44 54-147 56-250 33-103-23-198-85-198-190z" fill="url(#g1)" />
                  <g transform="translate(120 80)" opacity="0.18">
                    <circle cx="220" cy="60" r="6" fill="#FFFFFF" />
                    <circle cx="40" cy="150" r="4" fill="#FFFFFF" />
                    <rect x="120" y="40" width="80" height="2" rx="1" fill="#FFFFFF" />
                  </g>
                </g>
              </svg>

              <div className="terminal-wrap">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatedSection id="why-hire">
        <h2>
          <span className="highlight">00.</span> Why Hire Me
        </h2>
        <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '2.5rem', marginTop: '-0.5rem' }}>
          What a recruiter notices in <span className="highlight">6 seconds</span> — the things that make my profile different from 99% of undergrad candidates.
        </p>
        <div className="value-props-grid">
          {valueProps.map((vp, i) => (
            <div className="value-prop-card" key={i}>
              <div className="vp-header">
                <div className="vp-icon">{vp.icon}</div>
                <div>
                  <h3 className="vp-title">{vp.title}</h3>
                  <span className="vp-subtitle">{vp.subtitle}</span>
                </div>
              </div>
              <p className="vp-desc">{vp.desc}</p>
              <div className="vp-tags">
                {vp.tags.map((tag, j) => (
                  <span className="vp-tag" key={j}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>


      <AnimatedSection id="about">
        <h2>
          <span className="highlight">01.</span> About Me
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a passionate IT undergraduate at <strong className="highlight">St. Francis Institute of Technology</strong> with a CGPA of <strong className="highlight">8.6</strong>. Most candidates are either purely technical or purely creative — I operate comfortably in both worlds.
            </p>
            <p>
              My engineering stack revolves around <strong className="highlight">Python, React, Node.js, and Machine Learning</strong> — building data pipelines, engineering prompts for LLMs like Llama 3.3 & Groq, and shipping full-stack applications. I don't just follow tutorials; I build production-grade tools that solve real problems.
            </p>
            <p>
              Outside the compiler, I work as a <strong className="highlight">Graphic Designer at Zoetics</strong>, <strong className="highlight">Assistant Director on Saregama productions</strong>, and <strong className="highlight">Copywriter at EvolvEd</strong>. This duality means I can build developer interfaces with a designer's eye, communicate complex technical narratives through public speaking, and lead cross-functional teams — a skill set most engineers develop 5 years into their career.
            </p>

            {/* Education highlight card */}
            <div className="education-highlight">
              <GraduationCap size={24} className="highlight" />
              <div>
                <h4>St. Francis Institute of Technology, Mumbai</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  B.Tech Information Technology • Aug 2024 – Jun 2028 • <strong className="highlight">CGPA 8.6</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="about-features">
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Code size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Full-Stack Dev</h3>
              <p style={{ fontSize: '0.85rem' }}>React, Node.js, FastAPI, SQL — end-to-end application engineering with IoT integration capabilities.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Video size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Film & Direction</h3>
              <p style={{ fontSize: '0.85rem' }}>Real production credits — AD on Saregama music videos, TV commercials, script writing, and Final Cut Pro editing.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Brain size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>AI & LLM Eng.</h3>
              <p style={{ fontSize: '0.85rem' }}>Groq/Llama 3.3 APIs, prompt engineering, deepfake detection, and agentic AI pipelines — not just model consumers.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Leadership & PR</h3>
              <p style={{ fontSize: '0.85rem' }}>CSI Vice Chair, NSS Head, GDG PR Exec — managing 50+ member teams and anchoring national-level hackathons.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* SKILLS MATRIX                          */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="skills">
        <h2>
          <span className="highlight">02.</span> Skills Matrix
        </h2>
        <div className="skills-tabs">
          {['all', 'tech', 'ai', 'creative', 'leadership'].map(tab => (
            <button
              key={tab}
              onClick={() => setSkillCategory(tab)}
              className={`skill-tab-btn ${skillCategory === tab ? 'active' : ''}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="skills-levels">
          {/* Expert Level */}
          {currentSkills.expert.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot expert"></span>
                <span>Expert</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.expert.map((skill, i) => (
                  <span key={i} className="skill-badge expert">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Proficient Level */}
          {currentSkills.proficient.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot proficient"></span>
                <span>Proficient</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.proficient.map((skill, i) => (
                  <span key={i} className="skill-badge proficient">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Familiar Level */}
          {currentSkills.familiar.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot familiar"></span>
                <span>Familiar</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.familiar.map((skill, i) => (
                  <span key={i} className="skill-badge familiar">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* EXPERIENCE & LEADERSHIP                */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="experience">
        <h2>
          <span className="highlight">03.</span> Experience & Leadership
        </h2>

        {/* Tab Selector buttons */}
        <div className="exp-selector-tabs">
          <button
            onClick={() => { setActiveExpType('work'); setSelectedExpIdx(0); }}
            className={`exp-type-btn ${activeExpType === 'work' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Professional Experience</span>
          </button>
          <button
            onClick={() => { setActiveExpType('leadership'); setSelectedExpIdx(0); }}
            className={`exp-type-btn ${activeExpType === 'leadership' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Leadership & Community</span>
          </button>
        </div>

        {/* Dashboard layout */}
        <div className="exp-dashboard">
          {/* Left company names pane */}
          <div className="exp-left-pane">
            {experiences[activeExpType].map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExpIdx(idx)}
                className={`exp-company-tab ${selectedExpIdx === idx ? 'active' : ''}`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Right details pane */}
          <div className="exp-right-pane">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                  {experiences[activeExpType][selectedExpIdx].title}
                </h3>
                <div style={{ color: 'var(--color-accent)', fontWeight: 600, marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  @ {experiences[activeExpType][selectedExpIdx].company}
                </div>
              </div>
              <span className="timeline-period" style={{ marginTop: '0.25rem' }}>
                {experiences[activeExpType][selectedExpIdx].period}
              </span>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: '0.5rem 0 0.25rem 0' }}>
              {experiences[activeExpType][selectedExpIdx].desc}
            </p>

            {experiences[activeExpType][selectedExpIdx].impact && (
              <div className="timeline-impact">
                <TrendingUp size={15} />
                <span>{experiences[activeExpType][selectedExpIdx].impact}</span>
              </div>
            )}

            <div className="timeline-tags" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              {experiences[activeExpType][selectedExpIdx].tags.map((tag, tIdx) => (
                <span key={tIdx} className="timeline-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* SELECTED PROJECTS                      */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="projects">
        <h2>
          <span className="highlight">04.</span> Selected Projects
        </h2>

        <div className="filters-container">
          <div className="filter-group">
            {['all', 'ai', 'iot', 'web'].map(cat => (
              <button
                key={cat}
                onClick={() => setProjectCategory(cat)}
                className={`filter-btn ${projectCategory === cat ? 'active' : ''}`}
              >
                {cat === 'all' ? 'All Projects' : cat === 'ai' ? 'AI & Data Science' : cat === 'iot' ? 'IoT & Hardware' : 'Web Platforms'}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article className="project-card" key={index}>
              <div className="project-image-placeholder">
                <div className="project-image-icon">
                  {project.icon}
                </div>
                <div className="project-image-overlay">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    <Github size={16} /> View Code
                  </a>
                </div>
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                {project.highlight && (
                  <div className="project-highlight">
                    <Star size={12} />
                    <span>{project.highlight}</span>
                  </div>
                )}
                <p className="project-description">{project.desc}</p>
                <div className="project-tags">
                  {project.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="project-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* CREATIVE SHOWCASE                      */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="creative">
        <h2>
          <span className="highlight">05.</span> Creative Showcase
        </h2>
        <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '2rem', marginTop: '-0.5rem' }}>
          Visual proof of creative work — because <span className="highlight">designers and directors hire with their eyes</span>.
        </p>
        <div className="creative-grid">
          {creativeWorks.map((work, index) => (
            <div
              className="creative-card"
              key={index}
              style={{ cursor: work.image ? 'pointer' : 'default' }}
              onClick={() => work.image && setLightboxImage(work)}
            >
              {work.image ? (
                <div
                  className="creative-card-visual has-image"
                  style={{ backgroundImage: `url(${work.image})` }}
                >
                  <div className="creative-card-type-badge">{work.type}</div>
                  <div className="project-image-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="btn btn-secondary btn-sm" style={{ pointerEvents: 'none' }}>
                      <Sparkles size={16} /> View Showcase
                    </span>
                  </div>
                </div>
              ) : (
                <div className="creative-card-visual">
                  <div className="creative-card-type-badge">{work.type}</div>
                  <Palette size={32} className="creative-card-icon" />
                </div>
              )}
              <div className="creative-card-body">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {work.title}
                  {work.image && <Sparkles size={14} className="highlight" style={{ animation: 'blink 2s infinite' }} />}
                </h3>
                <p>{work.desc}</p>
                <div className="creative-card-tags">
                  {work.tags.map((tag, j) => (
                    <span key={j} className="creative-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', padding: '1.25rem', border: '1px dashed var(--color-border)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            <Image size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Full portfolio of design work, video frames, and behind-the-scenes content available upon request. <a href="#contact" className="highlight" style={{ textDecoration: 'underline' }}>Get in touch</a> to see more.
          </p>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* CERTIFICATIONS & ACHIEVEMENTS          */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="certifications">
        <h2>
          <span className="highlight">06.</span> Certifications & Achievements
        </h2>
        <div className="certifications-list">
          {certifications.map((cert, index) => (
            <div className="cert-card" key={index}>
              <Award className="cert-icon" size={28} />
              <div className="cert-info">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* CONTACT                                */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="contact">
        <h2>
          <span className="highlight">07.</span> Get In Touch
        </h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Let's collaborate!</h3>
            <p>
              I am actively seeking <strong className="highlight">internships</strong>, <strong className="highlight">freelance projects</strong>, and <strong className="highlight">creative collaborations</strong>. Whether it's building an AI agent, designing a product interface, or directing a media project — I bring the full stack.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
              <div className="contact-method">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:drishtikakkar15@gmail.com">drishtikakkar15@gmail.com</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <a href="tel:+918355844274">+91 83558 44274</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">
                  <Linkedin size={20} />
                </div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer">linkedin.com/in/drishti-kakkar</a>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value="New Contact from Portfolio — Drishti Kakkar" />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required className="form-control" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required className="form-control" placeholder="Your message here..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={contactSubmitting}>
              {contactSubmitting ? (
                <><Loader2 size={16} className="spin-icon" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
            {contactStatus === 'success' && (
              <div className="contact-feedback success">
                <CheckCircle size={16} />
                <span>Message sent successfully! I'll reply within 24 hours.</span>
              </div>
            )}
            {contactStatus === 'error' && (
              <div className="contact-feedback error">
                <AlertCircle size={16} />
                <span>Something went wrong. Please email me directly at drishtikakkar15@gmail.com</span>
              </div>
            )}
          </form>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* FOOTER                                 */}
      {/* ═══════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-container">
          <div className="social-links">
            <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
            <a href="mailto:drishtikakkar15@gmail.com" className="social-link" aria-label="Email">
              <Mail size={22} />
            </a>
          </div>
          <p className="footer-text">
            Designed & Built by Drishti Kakkar. Powered by React.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
              <X size={24} />
            </button>
            <img src={lightboxImage.image} alt={lightboxImage.title} className="lightbox-img" />
            <div className="lightbox-details">
              <span className="lightbox-badge">{lightboxImage.type}</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.5rem' }}>{lightboxImage.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {lightboxImage.desc}
              </p>
              <div className="creative-card-tags" style={{ marginTop: '0.5rem' }}>
                {lightboxImage.tags.map((tag, j) => (
                  <span key={j} className="creative-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
