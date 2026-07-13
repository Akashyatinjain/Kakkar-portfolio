import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';

// Image asset imports for Vite compilation
import drishtiImg from './assets/drishti.png';
import careergpsImg from './assets/careergps_mockup.png';
import cyberguardImg from './assets/cyberguard_mockup.png';
import lockerImg from './assets/locker_mockup.png';
import saregamaImg from './assets/saregama_video.png';
import zoeticsImg from './assets/zoetics_catalog.png';
import newsletterImg from './assets/alumni_newsletter.png';
import heroImg from './assets/hero.png';
import reactSvg from './assets/react.svg';
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
  Download,
  Calendar,
  AlertCircle,
  ExternalLink,
  BookOpen
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
    { label: 'CGPA Scale', value: '8.6/10', icon: <GraduationCap size={18} /> },
    { label: 'Production Projects', value: '6 Deployed', icon: <Code size={18} /> },
    { label: 'Leadership Roles', value: '5+ Active', icon: <Users size={18} /> },
    { label: 'Verifiable Certs', value: '8+ Issued', icon: <Award size={18} /> }
  ];

  // "Why Hire Me" value proposition cards — derived from recruiter insights
  const valueProps = [
    {
      icon: <Zap size={28} />,
      title: 'Cross-functional thinking',
      subtitle: 'Design, code, and communication',
      bullets: [
        'Comfortable moving between product, UI, and implementation',
        'Builds interfaces that are useful rather than just visually busy',
        'Knows how to explain ideas clearly to different people'
      ],
      tags: ['Product Thinking', 'Frontend', 'Systems', 'Storytelling']
    },
    {
      icon: <Target size={28} />,
      title: 'Work that actually ships',
      subtitle: 'Practical, hands-on execution',
      bullets: [
        'Has worked across web apps, AI tools, campaigns, and live events',
        'Prefers solving real problems over chasing novelty',
        'Can take a rough idea and turn it into something usable'
      ],
      tags: ['Execution', 'Ownership', 'Delivery', 'Problem Solving']
    },
    {
      icon: <Brain size={28} />,
      title: 'Technical depth without the noise',
      subtitle: 'Useful AI and engineering work',
      bullets: [
        'Built AI workflows around LLM APIs and practical integrations',
        'Experienced with Python, React, and backend services',
        'Strong interest in tools that feel genuinely helpful'
      ],
      tags: ['Python', 'React', 'LLM APIs', 'Automation']
    },
    {
      icon: <Shield size={28} />,
      title: 'A grounded creative edge',
      subtitle: 'Design, direction, and clarity',
      bullets: [
        'Brings visual thinking into technical work rather than keeping them separate',
        'Has worked with branding, content, campaigns, and on-set production',
        'Keeps the details sharp whether the medium is code or a camera'
      ],
      tags: ['Branding', 'Content', 'Direction', 'Visual Thinking']
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
        desc: "Creating engaging content for official channels, drafting PR newsletters, LinkedIn updates, and custom HTML email marketing campaigns.",
        impact: "Authoring weekly PR newsletters reaching 500+ subscribers",
        achievements: [
          "Authored weekly PR newsletters and LinkedIn updates driving community engagement.",
          "Designed custom HTML email campaigns to improve click-rates and subscriber reach."
        ]
      },
      {
        title: "Graphic Designer",
        company: "Zoetics (B2B Business)",
        period: "May 2025 - Present",
        tags: ["Figma", "Photoshop", "Branding", "B2B Design"],
        desc: "Designing B2B product catalogs, digital creatives, brand identity visuals, and holiday greeting assets for corporate clients.",
        impact: "Delivered 30+ B2B assets",
        achievements: [
          "Designed professional B2B product catalogs and brand identities for corporate clients.",
          "Delivered 30+ corporate creatives ensuring brand consistency across campaigns."
        ]
      },
      {
        title: "Assistant Director",
        company: "Final Cut Studio & Production",
        period: "Sep 2025 - Oct 2025",
        tags: ["Direction", "Production", "Saregama Music", "Film"],
        desc: "Served as Assistant Director for a high-profile Saregama music video, managing logistics and directing on-set talent.",
        impact: "Commercial music video AD credits",
        achievements: [
          "Coordinated shoot logistics, script breakdowns, and scene schedules for commercial production.",
          "Directed on-set talent and managed camera team during multi-location schedules."
        ]
      },
      {
        title: "Data Science & Analytics Intern",
        company: "Remarkskill x IIT Hyderabad",
        period: "Jun 2025 - Jul 2025",
        tags: ["Python", "Machine Learning", "Data Visualization", "IIT"],
        desc: "Gained hands-on training with exploratory data analysis, data pre-processing, and building regression models on real-world datasets.",
        impact: "Built 3 ML models",
        achievements: [
          "Developed and deployed 3 regression models on production-grade IIT datasets.",
          "Conducted detailed exploratory data analysis and data visualization to derive insights."
        ]
      },
      {
        title: "Actor & Assistant Director Intern",
        company: "Momomoto Studios",
        period: "Apr 2024 - Jul 2024",
        tags: ["Acting", "Scripting", "Direction", "TV Commercial"],
        desc: "Contributed to script development, scene execution, and worked as an actor on a commercial television project.",
        impact: "TV commercial acting + AD credits",
        achievements: [
          "Contributed to script development and scene blocking during commercial filming.",
          "Worked on-screen as actor in short-form promotional commercial content."
        ]
      }
    ],
    leadership: [
      {
        title: "Vice Chairperson",
        company: "CSI SFIT",
        period: "Jun 2026 - Present",
        tags: ["Technical Association", "Management", "Leadership"],
        desc: "Elected to lead CSI Student Chapter — coordinating tech workshops, hackathons, and overseeing branch administrative activities.",
        impact: "Leading 50+ member team",
        achievements: [
          "Directing CSI Student Chapter operations, managing a core committee of 50+ members.",
          "Coordinating college-wide technical workshops, speaker sessions, and national hackathons."
        ]
      },
      {
        title: "NSS Head",
        company: "NSS SFIT",
        period: "Jun 2026 - Present",
        tags: ["Social Welfare", "Leadership", "Event Management"],
        desc: "Directing college community service projects, blood donation campaigns, tree plantation drives, and organizing welfare events.",
        impact: "Directing campaigns with 200+ participants",
        achievements: [
          "Organized social welfare campaigns and donation camps impacting over 200+ participants.",
          "Managed budget allocations, public relations, and operational logistics for NSS activities."
        ]
      },
      {
        title: "Public Relations Executive",
        company: "Google Developers Group (GDG) SFIT",
        period: "Jan 2026 - May 2026",
        tags: ["Public Relations", "Content Writing", "Event PR", "Google"],
        desc: "Managed promotional copy, scriptwriting, and anchoring for the HackX2.0 national-level hackathon.",
        impact: "Anchored national event with 300+ devs",
        achievements: [
          "Wrote promotional copy and scripts for GDG technical workshops and national hackathons.",
          "Anchored GDG HackX2.0, presenting to a national audience of 300+ participants."
        ]
      },
      {
        title: "Joint PR & Social Media Head",
        company: "SFIT Alumni Association",
        period: "Jul 2025 - Jun 2026",
        tags: ["Alumni Engagement", "Social Media", "Webinars", "Newsletters"],
        desc: "Managed alumni outreach campaigns, conducted interactive alumni webinars on Slido, and designed the monthly newsletter.",
        impact: "Reaching 1000+ alumni network",
        achievements: [
          "Designed and authored monthly digital newsletters sent to a network of 1000+ alumni.",
          "Hosted interactive webinars using Slido for alumni career guidance sessions."
        ]
      }
    ]
  };

  // Projects Data — with real GitHub repo links
  const projects = [
    {
      title: "CareerGPS AI",
      desc: "A career guidance tool that combines resume and profile analysis with practical suggestions, designed to help people think more clearly about their next step.",
      tech: ["React", "Node.js", "Llama 3.3", "Groq AI", "FastAPI"],
      category: "ai",
      icon: <Brain size={24} />,
      highlight: "Built around a practical AI workflow",
      github: "https://github.com/drishti-kakkar/CareerGPS-AI",
      image: careergpsImg
    },
    {
      title: "CyberGuard AI",
      desc: "A rapid security analysis tool for identifying suspicious content and AI-generated edits, focused on speed and utility rather than flashy demos.",
      tech: ["Python", "Computer Vision", "Deep Learning", "Flask"],
      category: "ai",
      icon: <Shield size={24} />,
      highlight: "Fast, useful detection work",
      github: "https://github.com/drishti-kakkar/CyberGuard-AI",
      image: cyberguardImg
    },

    {
      title: "IoT Contactless Smart Locker",
      desc: "A compact locker system built with hardware and software working together for secure, contactless delivery and access control.",
      tech: ["Arduino", "Raspberry Pi", "React", "Node.js", "Embedded C"],
      category: "iot",
      icon: <Lock size={24} />,
      highlight: "Integrated hardware and software",
      github: "https://github.com/drishti-kakkar/Smart-Locker-IoT",
      image: lockerImg
    },
    {
      title: "AI Chatbot (QR Locator)",
      desc: "A WhatsApp-based support assistant for hospital navigation, built with real-world utility in mind and shaped by mentorship experience.",
      tech: ["Python", "WhatsApp API", "SQL", "QR Scanners"],
      category: "ai",
      icon: <Cpu size={24} />,
      highlight: "Focused on accessibility and clarity",
      github: "https://github.com/drishti-kakkar/AI-Chatbot-QR",
      image: heroImg
    },
    {
      title: "Netflix Data Platform",
      desc: "A data-focused interface for exploring catalog patterns and trends with interactive visualizations and a strong emphasis on clarity.",
      tech: ["React", "D3.js / SVG Charts", "Node.js", "Python"],
      category: "web",
      icon: <BarChart2 size={24} />,
      highlight: "Built for information, not noise",
      github: "https://github.com/drishti-kakkar/Netflix-Data-Platform",
      image: reactSvg
    }
  ];

  // Skills Data — grouped by competency level instead of arbitrary percentages
  const skills = {
    tech: {
      advanced: [
        { name: "Python", rating: 5 },
        { name: "React.js", rating: 4 },
        { name: "JavaScript", rating: 4 },
        { name: "HTML / CSS", rating: 5 }
      ],
      intermediate: [
        { name: "Node.js", rating: 4 },
        { name: "Express", rating: 3 },
        { name: "FastAPI", rating: 4 },
        { name: "Flask", rating: 3 },
        { name: "SQL", rating: 4 },
        { name: "Next.js", rating: 3 },
        { name: "Tailwind CSS", rating: 5 }
      ],
      familiar: [
        { name: "C", rating: 3 },
        { name: "Java", rating: 3 },
        { name: "DSA", rating: 3 },
        { name: "Embedded C", rating: 3 },
        { name: "Arduino", rating: 4 },
        { name: "Raspberry Pi", rating: 3 }
      ]
    },
    ai: {
      advanced: [
        { name: "Prompt Engineering", rating: 5 },
        { name: "LLM API Integration", rating: 5 }
      ],
      intermediate: [
        { name: "Llama 3.3 / Groq", rating: 4 },
        { name: "Gemini API", rating: 4 },
        { name: "Claude API", rating: 4 },
        { name: "NLP", rating: 3 }
      ],
      familiar: [
        { name: "Computer Vision", rating: 3 },
        { name: "OpenCV", rating: 3 },
        { name: "IBM Watson Studio", rating: 3 },
        { name: "Deep Learning", rating: 3 }
      ]
    },
    creative: {
      advanced: [
        { name: "Canva", rating: 5 },
        { name: "Adobe Photoshop", rating: 4 },
        { name: "Content Copywriting", rating: 4 },
        { name: "Social Media Strategy", rating: 4 }
      ],
      intermediate: [
        { name: "UI/UX Design (Figma)", rating: 4 },
        { name: "Video Editing (Final Cut Pro)", rating: 4 },
        { name: "Digital PR", rating: 3 }
      ],
      familiar: [
        { name: "After Effects", rating: 2 },
        { name: "Brand Identity Design", rating: 3 },
        { name: "Motion Graphics", rating: 2 }
      ]
    },
    leadership: {
      advanced: [
        { name: "Public Speaking & Anchoring", rating: 5 },
        { name: "Event Management", rating: 5 },
        { name: "Team Leadership", rating: 5 }
      ],
      intermediate: [
        { name: "Proposal & Doc Drafting", rating: 4 },
        { name: "PR Strategy", rating: 4 },
        { name: "Newsletter Design", rating: 4 }
      ],
      familiar: [
        { name: "Budget Management", rating: 3 },
        { name: "Stakeholder Communication", rating: 3 }
      ]
    }
  };

  // Creative Showcase Data — updated with visual mockups
  const creativeWorks = [
    {
      title: "Saregama Music Video — AD",
      type: "Film & Direction",
      desc: "Served as Assistant Director on a Saregama-label music video. Managed shoot logistics, scene breakdowns, talent direction, and multi-location scheduling.",
      tags: ["Direction", "Saregama", "Production"],
      image: saregamaImg
    },
    {
      title: "Zoetics B2B Brand Catalog",
      type: "Graphic Design",
      desc: "Designed comprehensive product catalogs, digital creatives, and branded holiday assets for corporate B2B clients. 30+ branded deliverables.",
      tags: ["Figma", "Photoshop", "B2B Branding"],
      image: zoeticsImg
    },
    {
      title: "SFIT Alumni Newsletter Design",
      type: "Content & Design",
      desc: "Designed and authored monthly digital newsletters for 1000+ alumni network. Combined Canva visuals with copywriting for alumni engagement.",
      tags: ["Newsletter", "Canva", "1000+ Reach"],
      image: newsletterImg
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
    { name: "Artificial Intelligence and Machine Learning", issuer: "IIT Bombay x Remarkskill", type: "AI / ML", code: "IITB", icon: <Brain size={20} /> },
    { name: "Data Science and Analytics", issuer: "IIT Hyderabad x Remarkskill", type: "Data Science", code: "IITH", icon: <BarChart2 size={20} /> },
    { name: "Colloquium '26 Consolation Winner II [Team Lead]", issuer: "St. Francis Institute of Technology", type: "Leadership", code: "SFIT", icon: <Users size={20} /> },
    { name: "Samadhan Ideathon Top 5 [Team Lead]", issuer: "NSS SFIT", type: "Innovation", code: "NSS", icon: <Target size={20} /> },
    { name: "Engineering Mentorship Program", issuer: "Agastya Foundation x JP Morgan Chase", type: "Mentorship", code: "JPMC", icon: <GraduationCap size={20} /> }
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
      const allExpert = Object.values(skills).flatMap(s => s.advanced);
      const allProficient = Object.values(skills).flatMap(s => s.intermediate);
      const allFamiliar = Object.values(skills).flatMap(s => s.familiar);
      return { advanced: allExpert, intermediate: allProficient, familiar: allFamiliar };
    }
    return skills[skillCategory] || { advanced: [], intermediate: [], familiar: [] };
  };

  const currentSkills = getSkillsForCategory();

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return <span className="skill-stars" style={{ marginLeft: '8px', color: 'var(--color-accent)', opacity: 0.85, fontSize: '0.85rem' }}>{filledStars}{emptyStars}</span>;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <header id="home" className="section container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-grid">
          <div className="hero-content">
            {/* Profile Avatar */}
            <div className="hero-avatar-wrapper">
              <img src={drishtiImg} alt="Drishti Kakkar" className="hero-avatar" />
            </div>
            <span className="hero-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', marginRight: '8px', animation: 'blink 1.5s infinite' }}></span>
              Open to product, design, and engineering work
            </span>
            <h1 className="hero-title">
              I’m <span className="highlight">Drishti</span><br />
              <span style={{ fontSize: '0.6em', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                building digital things that feel <span className="highlight">clear</span>, <span className="highlight">useful</span>, and <span className="highlight">human</span>
              </span>
            </h1>
            <div className="hero-roles">
              <span>Developer</span>
              <span className="bullet-sep">•</span>
              <span>Designer</span>
              <span className="bullet-sep">•</span>
              <span>Storyteller</span>
              <span className="bullet-sep">•</span>
              <span>Builder</span>
            </div>
            <p className="hero-description" style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', maxWidth: '650px', marginTop: '-0.25rem' }}>
              I work across code, visuals, and communication, and I’m most interested in projects where the experience matters as much as the idea.
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
              <a href="#projects" className="btn btn-primary">
                <Code size={16} /> View Projects
              </a>
              <a href="mailto:drishtikakkar15@gmail.com?subject=Resume%20Request" className="btn btn-secondary">
                <Download size={16} /> Download CV / Resume
              </a>
            </div>
          </div>

        </div>
      </header>

      <AnimatedSection id="why-hire">
        <h2>What I Bring</h2>
        <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '2.5rem', marginTop: '-0.5rem', color: 'var(--color-text-secondary)' }}>
          I tend to work best where product thinking, visual craft, and execution meet. That’s where the strongest ideas usually end up.
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
              <ul className="vp-bullets" style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', paddingLeft: '1.1rem', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: '0.75rem 0 1rem 0', flexGrow: 1 }}>
                {vp.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ lineHeight: '1.4' }}>{bullet}</li>
                ))}
              </ul>
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
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I’m an IT undergraduate in Mumbai who spends most of my time building things that are useful, polished, and easy to understand. That usually means web apps, AI features, brand visuals, or content that needs to connect with people.
            </p>
            <p>
              My work sits somewhere between engineering and communication. I like writing code, but I also care a lot about how something feels, reads, and lands with the people using it.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Outside of the usual academic work, I’ve been involved in design, production, and leadership roles that have made me more comfortable working across teams and formats.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.2rem', marginBottom: '1.25rem', listStyle: 'none' }}>
              <li style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✔</span> <span><strong>Graphic Designer</strong> at Zoetics</span>
              </li>
              <li style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✔</span> <span><strong>Assistant Director</strong> on Saregama productions</span>
              </li>
              <li style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✔</span> <span><strong>Copywriter</strong> at EvolvEd</span>
              </li>
              <li style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✔</span> <span><strong>Technical Leader</strong> at CSI Student Chapter</span>
              </li>
            </ul>

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
              <h3 style={{ fontSize: '1.1rem' }}>Product-minded development</h3>
              <p style={{ fontSize: '0.85rem' }}>React, Node.js, FastAPI, and SQL work that is built to be useful rather than just impressive on paper.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Video size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Visual and narrative work</h3>
              <p style={{ fontSize: '0.85rem' }}>Branding, campaigns, social content, and production work that all come from the same design sense.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Brain size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Practical AI usage</h3>
              <p style={{ fontSize: '0.85rem' }}>LLM integrations and automation that are built around actual problems, not novelty for its own sake.</p>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Leadership with calm</h3>
              <p style={{ fontSize: '0.85rem' }}>Experience coordinating people and events without losing sight of the quality of the work itself.</p>
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
          {/* Advanced Level */}
          {currentSkills.advanced.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot expert"></span>
                <span>Advanced</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.advanced.map((skill, i) => (
                  <span key={i} className="skill-badge expert" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span>{skill.name}</span>
                    {renderStars(skill.rating)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Intermediate Level */}
          {currentSkills.intermediate.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot proficient"></span>
                <span>Intermediate</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.intermediate.map((skill, i) => (
                  <span key={i} className="skill-badge proficient" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span>{skill.name}</span>
                    {renderStars(skill.rating)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Familiar Level */}
          {currentSkills.familiar.length > 0 && (
            <div className="skill-level-group">
              <div className="skill-level-label">
                <span className="skill-level-dot familiar"></span>
                <span>Learning</span>
                <span className="skill-level-line"></span>
              </div>
              <div className="skill-badges">
                {currentSkills.familiar.map((skill, i) => (
                  <span key={i} className="skill-badge familiar" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span>{skill.name}</span>
                    {renderStars(skill.rating)}
                  </span>
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

            {experiences[activeExpType][selectedExpIdx].achievements && (
              <ul className="exp-achievements">
                {experiences[activeExpType][selectedExpIdx].achievements.map((ach, aIdx) => (
                  <li key={aIdx}>{ach}</li>
                ))}
              </ul>
            )}

            {experiences[activeExpType][selectedExpIdx].impact && (
              <div className="timeline-impact" style={{ marginTop: '0.75rem' }}>
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
              <div className={`project-media ${project.image ? 'has-image' : ''}`} style={project.image ? { backgroundImage: `url(${project.image})` } : {}}>
                {!project.image && (
                  <div className="project-image-icon">
                    {project.icon}
                  </div>
                )}
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
                <div className="project-tags" style={{ marginBottom: '0.5rem' }}>
                  {project.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="project-tag">{tech}</span>
                  ))}
                </div>
                
                {/* Project Links footer */}
                <div className="project-links" style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn primary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', padding: '0.35rem 0.55rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', color: 'var(--color-accent)', transition: 'var(--transition-fast)', cursor: 'pointer' }}>
                    <Github size={13} /> GitHub
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', padding: '0.35rem 0.55rem', borderRadius: '4px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', transition: 'var(--transition-fast)', cursor: 'pointer' }}>
                    <ExternalLink size={13} /> Live
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', padding: '0.35rem 0.55rem', borderRadius: '4px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', transition: 'var(--transition-fast)', cursor: 'pointer' }}>
                    <BookOpen size={13} /> Case Study
                  </a>
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
          <span className="highlight">05.</span> Creative Work
        </h2>
        <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '2rem', marginTop: '-0.5rem' }}>
          A few pieces from the design and production side of my work, where the visual quality matters just as much as the idea.
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
                <div className="creative-card-visual has-image">
                  <img src={work.image} alt={work.title} className="creative-card-image" />
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
            There’s more where this came from — design work, campaign materials, and production references are available on request.
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
              <div className="cert-badge-logo">{cert.code}</div>
              <div className="cert-icon-wrapper">{cert.icon}</div>
              <div className="cert-info">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-issuer">{cert.issuer}</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                  <span className="cert-pill">{cert.type}</span>
                  <span className="cert-verified-pill">✓ Verified</span>
                </div>
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Let’s talk</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              I’m open to internships, freelance work, and collaborations where strong execution matters as much as the idea itself.
            </p>
            
            <div className="contact-methods-grid">
              <div className="contact-method-card">
                <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
                <div>
                  <h4>Location</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="contact-method-card">
                <Calendar size={20} style={{ color: 'var(--color-accent)' }} />
                <div>
                  <h4>Availability</h4>
                  <p>Usually available for short-term work, internships, and focused projects</p>
                </div>
              </div>
            </div>

            <div className="contact-links-panel">
              <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <Github size={18} /> GitHub
              </a>
              <a href="mailto:drishtikakkar15@gmail.com" className="contact-link-item">
                <Mail size={18} /> Email: drishtikakkar15@gmail.com
              </a>
              <a href="tel:+918355844274" className="contact-link-item">
                <Phone size={18} /> Call: +91 83558 44274
              </a>
              <a href="mailto:drishtikakkar15@gmail.com?subject=Resume%20Request" className="contact-link-item resume-btn">
                <Download size={18} /> Request Resume / CV
              </a>
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
                <span>Message sent successfully. I’ll get back to you as soon as I can.</span>
              </div>
            )}
            {contactStatus === 'error' && (
              <div className="contact-feedback error">
                <AlertCircle size={16} />
                <span>Something went wrong. You can also email me directly at drishtikakkar15@gmail.com.</span>
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
