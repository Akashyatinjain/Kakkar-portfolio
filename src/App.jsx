import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';

// Image asset imports
import drishtiImg from './assets/drishti.png';
import careergpsImg from './assets/careergps_mockup.png';
import cyberguardImg from './assets/cyberguard_mockup.png';
import lockerImg from './assets/locker_mockup.png';
import saregamaImg from './assets/saregama_video.png';
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
  Users,
  Send,
  Shield,
  Lock,
  Cpu,
  BarChart2,
  Sparkles,
  GraduationCap,
  Star,
  X,
  Loader2,
  CheckCircle,
  Download,
  Calendar,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ChevronDown,
  GitFork,
  ArrowUpRight,
  Globe,
  FileText,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/* STARFIELD CANVAS COMPONENT                                  */
/* ═══════════════════════════════════════════════════════════ */

function StarField() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animFrameRef = useRef(null);

  const initStars = useCallback((canvas) => {
    const stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Occasional blue-tinted star
        blue: Math.random() < 0.15,
      });
    }
    // Add a few larger bright stars
    for (let i = 0; i < 8; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.3 + 0.5,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        blue: true,
        glow: true,
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      starsRef.current = initStars({ width: rect.width, height: rect.height });
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time += 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + 0.4 * twinkle);

        if (star.glow) {
          // Glow for bright stars
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          gradient.addColorStop(0, `rgba(100, 180, 255, ${alpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        if (star.blue) {
          ctx.fillStyle = `rgba(120, 170, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(200, 210, 230, ${alpha})`;
        }
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initStars]);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
}


/* ═══════════════════════════════════════════════════════════ */
/* INTERSECTION OBSERVER HOOK                                  */
/* ═══════════════════════════════════════════════════════════ */

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


/* ═══════════════════════════════════════════════════════════ */
/* MAIN APP COMPONENT                                          */
/* ═══════════════════════════════════════════════════════════ */

function App() {
  const [contactStatus, setContactStatus] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // ─── DATA ───

  // GitHub stats (hardcoded — update with real values)
  const githubStats = {
    username: '@drishti-kakkar',
    repos: 12,
    stars: 8,
    followers: 15,
    languages: [
      { name: 'JavaScript', percent: 38, color: 'lang-javascript' },
      { name: 'Python', percent: 30, color: 'lang-python' },
      { name: 'HTML', percent: 18, color: 'lang-html' },
      { name: 'CSS', percent: 10, color: 'lang-css' },
      { name: 'Java', percent: 4, color: 'lang-java' },
    ],
  };

  // Project/Skills stats card (replacing LeetCode)
  const projectStats = {
    total: 6,
    categories: [
      { label: 'AI & ML', count: 3, total: 6 },
      { label: 'Web Apps', count: 2, total: 6 },
      { label: 'IoT', count: 1, total: 6 },
    ],
  };

  // Skills showcase — grouped by the columns in the reference image
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Advanced SQL'],
    },
    {
      title: 'Web',
      skills: ['HTML', 'CSS', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'RESTful APIs', 'Tailwind CSS', 'Flask', 'FastAPI'],
    },
    {
      title: 'Data & AI',
      skills: ['MySQL', 'MongoDB', 'SQLite', 'Vertex AI', 'Gemini API', 'Multimodal RAG', 'Power BI', 'Pandas', 'Plotly', 'AI/ML (basic)', 'DSA'],
    },
    {
      title: 'Tools & Productivity',
      skills: ['Git', 'GitHub', 'Docker', 'Linux (Ubuntu)', 'Kali Linux', 'VS Code', 'Vercel', 'Render', 'Streamlit', 'Railway', 'Prompt Engineering'],
    },
  ];

  // Work experience — 7 roles from CV
  const workExperience = [
    {
      title: 'Copywrite Intern',
      company: 'EvolvEd',
      companyType: '— Internship',
      period: 'May 2026 – Present',
      current: true,
      bullets: [
        'Creating engaging content for the college\'s official social media channels, including PR drafts, LinkedIn posts, and HTML emailers.',
        'Contributing creative ideas and communication strategies to strengthen the institution\'s digital presence.',
      ],
      tags: [
        { label: 'Content Writing', color: '#3b82f6' },
        { label: 'PR', color: '#a855f7' },
        { label: 'Marketing', color: '#10b981' },
        { label: 'HTML Emails', color: '#f97316' },
      ],
    },
    {
      title: 'Assistant Director',
      company: 'Final Cut Studio & Production',
      companyType: '— Contract',
      period: 'Sep 2025 – Oct 2025',
      current: false,
      bullets: [
        'Worked as an Assistant Director for a SAREGAMA music video featuring a renowned rapper, managing both creative and production responsibilities.',
        'Coordinated teams, prepared shoot documents, and ensured smooth on-time execution of scenes.',
      ],
      tags: [
        { label: 'Direction', color: '#ec4899' },
        { label: 'Saregama', color: '#f97316' },
        { label: 'Production', color: '#8b5cf6' },
        { label: 'Film', color: '#3b82f6' },
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Zoetics (B2B, Family Business)',
      companyType: '— Part-time',
      period: 'May 2025 – Present',
      current: true,
      bullets: [
        'Designed digital creatives, product catalogs, and marketing visuals tailored for B2B communication.',
        'Ensuring brand consistency and client engagement. Designed Festival wishes digital templates.',
      ],
      tags: [
        { label: 'Graphic Design', color: '#ec4899' },
        { label: 'B2B', color: '#3b82f6' },
        { label: 'Branding', color: '#a855f7' },
        { label: 'Catalogs', color: '#10b981' },
      ],
    },
    {
      title: 'Data Science & Analytics Intern',
      company: 'Remarkskill x IIT Hyderabad',
      companyType: '— Internship',
      period: 'Jun 2025 – Jul 2025',
      current: false,
      bullets: [
        'Worked on data preprocessing, exploratory analysis, and visualization to derive insights.',
        'Applying Python and analytics tools for real-world datasets.',
      ],
      tags: [
        { label: 'Python', color: '#3b82f6' },
        { label: 'Machine Learning', color: '#a855f7' },
        { label: 'Data Viz', color: '#10b981' },
        { label: 'IIT', color: '#eab308' },
      ],
    },
    {
      title: 'Teaching Assistant',
      company: 'Arihant Academy',
      companyType: '— Freelance',
      period: 'Dec 2025 – Apr 2026',
      current: false,
      bullets: [
        'Assisted students with concepts in English, Mathematics and Science. Conducted doubt-solving sessions, and supported lesson planning. (Covered 8th, 9th and 10th grade students)',
        'Taught the core concepts, practice sums and previous year papers to 10th students right before their board examinations.',
      ],
      tags: [
        { label: 'Teaching', color: '#10b981' },
        { label: 'Education', color: '#3b82f6' },
        { label: 'Math & Science', color: '#a855f7' },
      ],
    },
    {
      title: 'Exam Invigilator',
      company: 'Arihant Academy',
      companyType: '— Part-time',
      period: 'Aug 2024 – Mar 2025',
      current: false,
      bullets: [
        'Supervised examinations, maintained discipline, and ensured smooth execution of academic protocols.',
        'Covered 8th, 9th, and 10th grade students during academic assessments.',
      ],
      tags: [
        { label: 'Administration', color: '#eab308' },
        { label: 'Invigilation', color: '#3b82f6' },
        { label: 'Student Management', color: '#10b981' },
      ],
    },
    {
      title: 'Actor & Assistant Director Intern',
      company: 'Momomoto Studios',
      companyType: '— Internship',
      period: 'Apr 2024 – Jul 2024',
      current: false,
      bullets: [
        'Contributed to script discussions, scene execution, and creative direction.',
        'Performing as an actor in short-form content while also assisting in production.',
      ],
      tags: [
        { label: 'Acting', color: '#ec4899' },
        { label: 'Direction', color: '#f97316' },
        { label: 'Scripting', color: '#8b5cf6' },
      ],
    },
  ];

  // Collegiate Activities — 8 roles from CV
  const leadershipExperience = [
    {
      title: 'Vice Chairperson — CSI SFIT',
      company: 'CSI Student Chapter',
      companyType: '— Collegiate Activity',
      period: 'Jun 2026 – Present',
      current: true,
      bullets: [
        'Directing CSI Student Chapter operations, managing a core committee of 50+ members.',
        'Coordinating college-wide technical workshops, speaker sessions, and national hackathons.',
      ],
      tags: [
        { label: 'Leadership', color: '#3b82f6' },
        { label: 'Management', color: '#a855f7' },
        { label: 'Workshops', color: '#10b981' },
        { label: 'Community', color: '#f97316' },
      ],
    },
    {
      title: 'Head — NSS SFIT',
      company: 'NSS Student Chapter',
      companyType: '— Collegiate Activity',
      period: 'Jun 2026 – Present',
      current: true,
      bullets: [
        'Leading NSS chapter operations and community service initiatives across Mumbai.',
        'Organizing social welfare campaigns and donation camps impacting 200+ participants.',
      ],
      tags: [
        { label: 'Social Service', color: '#10b981' },
        { label: 'Leadership', color: '#3b82f6' },
        { label: 'Community', color: '#a855f7' },
      ],
    },
    {
      title: 'PR Executive — Google Developers Group',
      company: 'GDG SFIT',
      companyType: '— Collegiate Activity',
      period: 'Jan 2026 – Jun 2026',
      current: false,
      bullets: [
        'Managed PR and script making for HackX2.0 Hackathon.',
        'Anchored GDG HackX2.0, presenting to a national audience of 300+ participants.',
      ],
      tags: [
        { label: 'PR', color: '#3b82f6' },
        { label: 'Google Developer Group', color: '#eab308' },
        { label: 'Hackathon', color: '#10b981' },
        { label: 'Anchoring', color: '#f97316' },
      ],
    },
    {
      title: 'Volunteer — NSS SFIT (Volunteer of the Month July\'25)',
      company: 'NSS SFIT',
      companyType: '— Collegiate Activity',
      period: 'Jul 2025 – Jun 2026',
      current: false,
      bullets: [
        'Designed posters, carousels, directed a short reel, and contributed in clean-ups and tree planting.',
      ],
      tags: [
        { label: 'Design', color: '#ec4899' },
        { label: 'Social Service', color: '#10b981' },
        { label: 'Content Creation', color: '#a855f7' },
      ],
    },
    {
      title: 'Joint PR & SM Head — SFIT Alumni Association',
      company: 'SFIT Alumni Association',
      companyType: '— Collegiate Activity',
      period: 'Jul 2025 – Jun 2026',
      current: false,
      bullets: [
        'Led alumni engagement through PR, events, and social media outreach.',
        'Managed webinars and quizzes on Slido single-handedly. Currently working on newsletters and Rekindle event.',
      ],
      tags: [
        { label: 'Alumni Engagement', color: '#3b82f6' },
        { label: 'Social Media', color: '#ec4899' },
        { label: 'Newsletters', color: '#a855f7' },
        { label: 'Webinars', color: '#10b981' },
      ],
    },
    {
      title: 'PR Executive — CSI SFIT',
      company: 'CSI Student Chapter',
      companyType: '— Collegiate Activity',
      period: 'Jul 2025 – Jun 2026',
      current: false,
      bullets: [
        'Handling event management and social media captions, scripting, hosting, and PR activities.',
      ],
      tags: [
        { label: 'PR', color: '#3b82f6' },
        { label: 'Scripting', color: '#a855f7' },
        { label: 'Social Media', color: '#ec4899' },
      ],
    },
    {
      title: 'Marketing Executive — Student Council, SFIT',
      company: 'SFIT Student Council',
      companyType: '— Collegiate Activity',
      period: 'Mar 2025 – Apr 2025',
      current: false,
      bullets: [
        'Coordinated sponsor communication and drafted marketing emails.',
      ],
      tags: [
        { label: 'Marketing', color: '#10b981' },
        { label: 'Sponsorships', color: '#3b82f6' },
      ],
    },
    {
      title: 'PR Executive — Student Council, SFIT',
      company: 'SFIT Student Council',
      companyType: '— Collegiate Activity',
      period: 'Mar 2025 – Apr 2025',
      current: false,
      bullets: [
        'Drafted messages, managed registrations desk, and promoted events through social media & public speaking across college.',
      ],
      tags: [
        { label: 'PR', color: '#3b82f6' },
        { label: 'Public Speaking', color: '#f97316' },
        { label: 'Social Media', color: '#ec4899' },
      ],
    },
  ];

  // Projects — 9 non-red items from CV
  const projects = [
    {
      title: 'CareerGPS AI',
      desc: 'Developed and deployed an AI-powered career guidance platform. Integrated resume, GitHub, and LinkedIn analysis, job market trend insights, AI chatbot support, interview assessment, and personalized career recommendations through an automated full-stack system.',
      tech: ['React', 'Node.js', 'Llama 3.3', 'Groq AI', 'FastAPI'],
      techColors: ['#61dafb', '#68a063', '#7c3aed', '#f97316', '#009688'],
      date: 'Jan 2026 – Mar 2026',
      icon: <Brain size={24} />,
      github: 'https://github.com/drishti-kakkar/CareerGPS-AI',
      image: careergpsImg,
    },
    {
      title: 'CyberGuard AI — Spam Detection',
      desc: 'Detects spam, message, URL, or upload a screenshot. AI analyzes it in under 2 seconds. Zero data stored. It also has a heatmap and it also detects deepfakes like AI generated images and manipulations.',
      tech: ['Python', 'Computer Vision', 'Deep Learning', 'Flask'],
      techColors: ['#3b82f6', '#ef4444', '#a855f7', '#10b981'],
      date: 'Oct 2025 – Dec 2025',
      icon: <Shield size={24} />,
      github: 'https://github.com/drishti-kakkar/CyberGuard-AI',
      image: cyberguardImg,
    },
    {
      title: 'Secure Smart Locker (IoT)',
      desc: 'Designed and developed a space-efficient IoT-enabled smart locker for secure, contactless home deliveries. Integrated microcontroller-based access control with OTP authentication and real-time mobile notifications to ensure package safety. Implemented Wi-Fi connectivity, electronic locking mechanism, and sensor-based parcel detection for automated operation. Focused on enhancing last-mile delivery security and user convenience through smart automation.',
      tech: ['Arduino', 'Raspberry Pi', 'React', 'Node.js', 'Embedded C'],
      techColors: ['#00979d', '#c51a4a', '#61dafb', '#68a063', '#f97316'],
      date: '2025',
      icon: <Lock size={24} />,
      github: 'https://github.com/drishti-kakkar/Smart-Locker-IoT',
      image: lockerImg,
    },
    {
      title: 'AI Chatbot (QR Locator)',
      desc: 'Designed and implemented a WhatsApp chatbot integrated with hospital QR scanners to help users instantly locate affordable generic medicines, access store details, and navigate efficiently using structured backend data systems. [part of that AGASTYA FOUNDATION X JP MORGAN PROJECT]',
      tech: ['Python', 'WhatsApp API', 'SQL', 'QR Scanners'],
      techColors: ['#3b82f6', '#25d366', '#f59e0b', '#6b7280'],
      date: '2025',
      icon: <Cpu size={24} />,
      github: 'https://github.com/drishti-kakkar/AI-Chatbot-QR',
      image: heroImg,
    },
    {
      title: 'COVID-19 Analysis',
      desc: 'Developed a data analysis project to track COVID-19 case trends, recovery rates, and death rates using real-world datasets. The project involved data cleaning, preprocessing, and visualization to present key insights.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
      techColors: ['#3b82f6', '#a855f7', '#ef4444', '#10b981'],
      date: '2024',
      icon: <BarChart2 size={24} />,
      github: 'https://github.com/drishti-kakkar',
    },
    {
      title: 'Netflix Data Analysis & Platform',
      desc: 'Developed and deployed a full-stack web application using Netflix dataset insights, featuring movie search, filters, genre analysis, and interactive visualizations.',
      tech: ['React', 'Node.js', 'Python', 'Data Viz'],
      techColors: ['#61dafb', '#68a063', '#3b82f6', '#f97316'],
      date: '2024',
      icon: <BarChart2 size={24} />,
      github: 'https://github.com/drishti-kakkar',
    },
    {
      title: 'Tic-Tac-Toe Game',
      desc: 'A Python-based Tic-Tac-Toe game that includes an AI opponent and emoji support for a more engaging user experience.',
      tech: ['Python', 'AI Logic', 'Game Dev'],
      techColors: ['#3b82f6', '#a855f7', '#6b7280'],
      date: '2024',
      icon: <Code size={24} />,
      github: 'https://github.com/drishti-kakkar',
    },
    {
      title: 'Advanced Calculator (Tkinter)',
      desc: 'A fully functional and standard scientific calculator built with Python and the Tkinter library, demonstrating proficiency in GUI (Graphical User Interface) development.',
      tech: ['Python', 'Tkinter', 'GUI'],
      techColors: ['#3b82f6', '#a855f7', '#10b981'],
      date: '2024',
      icon: <Cpu size={24} />,
      github: 'https://github.com/drishti-kakkar',
    },
    {
      title: 'Hand Recognition & Finger Counting',
      desc: 'A project focused on real-time hand recognition and finger counting using OpenCV and MediaPipe. It utilizes computer vision techniques to detect hand landmarks and a custom algorithm to count the number of extended fingers.',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
      techColors: ['#3b82f6', '#10b981', '#f97316', '#ef4444'],
      date: '2024 – In Progress',
      icon: <Code size={24} />,
      github: 'https://github.com/drishti-kakkar',
    },
  ];

  // Certifications
  const certifications = [
    { name: 'Artificial Intelligence and Machine Learning', issuer: 'IIT Bombay x Remarkskill', type: 'AI / ML', code: 'IITB', icon: <Brain size={20} /> },
    { name: 'Data Science and Analytics', issuer: 'IIT Hyderabad x Remarkskill', type: 'Data Science', code: 'IITH', icon: <BarChart2 size={20} /> },
    { name: "Colloquium '26 Consolation Winner II [Team Lead]", issuer: 'St. Francis Institute of Technology', type: 'Leadership', code: 'SFIT', icon: <Users size={20} /> },
    { name: 'Samadhan Ideathon Top 5 [Team Lead]', issuer: 'NSS SFIT', type: 'Innovation', code: 'NSS', icon: <Award size={20} /> },
    { name: 'Engineering Mentorship Program', issuer: 'Agastya Foundation x JP Morgan Chase', type: 'Mentorship', code: 'JPMC', icon: <GraduationCap size={20} /> },
  ];

  // Contact handler
  const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactStatus('');
    const formData = new FormData(e.target);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', 'New Contact from Portfolio — Drishti Kakkar');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
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

  // ─── RENDER ───

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION                            */}
      {/* ═══════════════════════════════════════ */}
      <header id="home" className="hero">
        <StarField />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-inner">
            {/* Left: Text content */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Open to internship & full-time opportunities
              </div>

              <h1 className="hero-heading">
                Hi, I'm <span className="hero-name">Drishti</span><br />
                <span className="hero-name">Kakkar</span>
              </h1>

              <p className="hero-subtitle">Full-Stack Developer</p>

              <p className="hero-description">
                IT undergraduate who builds full-stack products and AI tooling — from career guidance platforms to IoT smart lockers, shipped under real deadlines.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-outline">
                  View Projects
                </a>
                <a href="/drishti-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-filled">
                  <FileText size={14} />
                  View Résumé
                </a>
                <a href="#contact" className="hero-text-link">
                  Get in touch →
                </a>

                <div className="hero-socials">
                  <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="mailto:drishtikakkar15@gmail.com" className="hero-social-icon" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img src={drishtiImg} alt="Drishti Kakkar" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <ChevronDown size={24} />
        </div>
      </header>


      {/* ═══════════════════════════════════════ */}
      {/* EXPERIENCE — Stats & Timeline           */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="experience" className="experience-section">
        <span className="section-label">EXPERIENCE</span>
        <h2 className="section-title">Where I've been</h2>

        {/* By the numbers header */}
        <div className="stats-intro">
          <Github size={20} className="stats-intro-icon" />
          <h3>By the numbers</h3>
          <span className="stats-intro-label">LIVE GITHUB & PROJECT STATS</span>
        </div>

        {/* Stats cards */}
        <div className="stats-grid">
          {/* GitHub Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">
                <Github size={18} />
                GitHub
              </div>
              <span className="stat-card-username">{githubStats.username}</span>
            </div>

            <div className="github-stats-row">
              <div className="github-stat-box">
                <div className="github-stat-icon"><GitFork size={16} /></div>
                <span className="github-stat-value">{githubStats.repos}</span>
                <span className="github-stat-label">Repositories</span>
              </div>
              <div className="github-stat-box">
                <div className="github-stat-icon"><Star size={16} /></div>
                <span className="github-stat-value">{githubStats.stars}</span>
                <span className="github-stat-label">Stars earned</span>
              </div>
              <div className="github-stat-box">
                <div className="github-stat-icon"><Users size={16} /></div>
                <span className="github-stat-value">{githubStats.followers}</span>
                <span className="github-stat-label">Followers</span>
              </div>
            </div>

            <div className="language-section-title">MOST USED LANGUAGES</div>
            {githubStats.languages.map((lang) => (
              <div className="language-bar-row" key={lang.name}>
                <span className="language-bar-name">{lang.name}</span>
                <div className="language-bar-track">
                  <div
                    className={`language-bar-fill ${lang.color}`}
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Project Stats Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">
                <Code size={18} />
                Project Stats
              </div>
              <span className="stat-card-username">#deployed</span>
            </div>

            <div className="platform-card-body">
              <div className="platform-stat-ring">
                <span className="platform-stat-number" style={{ fontSize: '1.5rem' }}>{projectStats.total}</span>
              </div>
              <div className="platform-card-stats">
                {projectStats.categories.map((cat) => (
                  <div className="platform-difficulty-row" key={cat.label}>
                    <span className="difficulty-label">{cat.label}</span>
                    <span className="difficulty-value">{cat.count} / {cat.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Showcase (Replicating What I work with layout) */}
        <div className="platform-section" style={{ marginTop: '2.5rem' }}>
          <div className="platform-section-header">
            <div className="platform-section-title">
              <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
              <strong>Skills</strong>
              <span className="platform-section-meta">— What I work with</span>
            </div>
          </div>
          
          <div className="skills-dashboard-grid">
            {skillCategories.map((category, idx) => (
              <div className="skills-dashboard-column" key={idx}>
                <h3>{category.title}</h3>
                <div className="skills-dashboard-list">
                  {category.skills.map((skill, sIdx) => (
                    <div className="skills-dashboard-item" key={sIdx}>
                      <div className="skills-dashboard-icon-wrapper">
                        <Code size={12} />
                      </div>
                      <span className="skills-dashboard-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Timeline */}
        <div className="timeline" style={{ marginTop: '2rem' }}>
          {workExperience.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3>{exp.title} — {exp.company.split(' ')[0].toUpperCase()}</h3>
                    <div className="timeline-company">
                      <span className="timeline-company-name">{exp.company}</span>
                      <span className="timeline-company-type"> {exp.companyType}</span>
                      {exp.current && <span className="timeline-current-badge" style={{ marginLeft: '0.5rem' }}>CURRENT</span>}
                    </div>
                  </div>
                  <span className="timeline-period">{exp.period}</span>
                </div>

                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                <div className="timeline-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span className="timeline-tag" key={tIdx}>
                      <span className="timeline-tag-dot" style={{ background: tag.color }} />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Timeline */}
        <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Leadership & Community
        </h3>
        <div className="timeline">
          {leadershipExperience.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <div className="timeline-company">
                      <span className="timeline-company-name">{exp.company}</span>
                      {exp.current && <span className="timeline-current-badge" style={{ marginLeft: '0.5rem' }}>CURRENT</span>}
                    </div>
                  </div>
                  <span className="timeline-period">{exp.period}</span>
                </div>

                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                <div className="timeline-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span className="timeline-tag" key={tIdx}>
                      <span className="timeline-tag-dot" style={{ background: tag.color }} />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>


      {/* ═══════════════════════════════════════ */}
      {/* ABOUT SECTION                           */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="about" className="about-section">
        <span className="section-label">ABOUT</span>
        <h2 className="section-title">Who I am</h2>

        <div className="about-layout">
          <img src={drishtiImg} alt="Drishti Kakkar" className="about-photo" />

          <div className="about-text">
            <p>
              I'm a second-year Information Technology student at St. Francis Institute of Technology, currently
              holding a CGPA of 8.6. I like building things end-to-end — from the data pipeline to the UI — and I
              gravitate toward projects where AI tooling solves a real, unglamorous problem.
            </p>
            <p>
              Over the last two years that's meant a career guidance platform powered by Llama 3.3, a CyberGuard
              deepfake detector, an IoT smart locker system, and a hospital navigation chatbot built during a JP Morgan
              Chase mentorship. I've also spent time on the other side of the table — <strong>directing a Saregama music
              video</strong>, leading PR at GDG, and anchoring a national-level hackathon.
            </p>
          </div>
        </div>

        <div className="about-info-cards">
          <div className="about-info-card">
            <div className="about-info-icon">
              <GraduationCap size={22} />
            </div>
            <h4>B.E. Information Technology, St. Francis Institute of Technology (2024–2028)</h4>
            <p>CGPA: 8.6</p>
          </div>
          <div className="about-info-card">
            <div className="about-info-icon">
              <MapPin size={22} />
            </div>
            <h4>Mumbai, India</h4>
            <p>Based in</p>
          </div>
          <div className="about-info-card">
            <div className="about-info-icon">
              <Globe size={22} />
            </div>
            <h4>English, Hindi, Marathi</h4>
            <p>Languages</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects">
        <span className="section-label">PROJECTS</span>
        <h2 className="section-title">Things I've built</h2>
        <p className="projects-subtitle" style={{ marginBottom: '1.5rem' }}>Auto-scrolling — click a card to open full details.</p>

        <div className="projects-marquee-wrapper">
          <div className="projects-marquee-track">
            {[...projects, ...projects].map((project, index) => (
              <article
                className="project-marquee-card"
                key={index}
                onClick={() => window.open(project.github, '_blank')}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Arrow icon */}
                <div className="project-card-arrow" style={{ opacity: 1 }}>
                  <ArrowUpRight size={14} />
                </div>

                {/* Image */}
                <div
                  className={`project-media ${project.image ? 'has-image' : ''}`}
                  style={project.image ? { backgroundImage: `url(${project.image})`, height: '160px' } : { height: '160px' }}
                >
                  {!project.image && (
                    <div className="project-image-icon">{project.icon}</div>
                  )}
                </div>

                {/* Body */}
                <div className="project-body" style={{ padding: '1rem', flex: 1 }}>
                  <span className="project-date">{project.date}</span>
                  <h3 className="project-title" style={{ fontSize: '0.95rem' }}>{project.title}</h3>
                  <p className="project-description" style={{ fontSize: '0.78rem', marginBottom: '0.5rem', WebkitLineClamp: 3 }}>
                    {project.desc}
                  </p>

                  {/* Tech dots */}
                  <div className="project-tech-dots" style={{ marginBottom: '0.5rem' }}>
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="tech-dot"
                        title={t}
                        style={{
                          background: project.techColors?.[tIdx] || 'var(--accent-cyan)',
                          width: '18px',
                          height: '18px',
                          fontSize: '0.5rem'
                        }}
                      >
                        {t.charAt(0)}
                      </span>
                    ))}
                  </div>

                  <span className="project-details-link" style={{ fontSize: '0.68rem' }}>CLICK FOR DETAILS</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="certifications">
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>CERTIFICATIONS & AWARDS</span>
        <h2 className="section-title trophy-section-title">Trophy Room</h2>
        <p className="trophy-subtitle">Achievements and certifications unlocked — hover to pause, click to enlarge.</p>

        {/* Row 1 */}
        <div className="trophy-marquee-wrapper">
          <div className="trophy-marquee-track">
            {/* Duplicate items for seamless loop */}
            {[...certifications, ...certifications].map((cert, index) => (
              <div className="trophy-card" key={`row1-${index}`}>
                <div className="trophy-card-image">
                  <div className="trophy-card-placeholder">
                    <span className="trophy-card-placeholder-icon">{cert.icon}</span>
                    <span className="trophy-card-placeholder-code">{cert.code}</span>
                    <span className="trophy-card-placeholder-type">{cert.type}</span>
                  </div>
                </div>
                <div className="trophy-card-title">{cert.name} — {cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trophy-row-spacer" />

        {/* Row 2 — reverse direction */}
        <div className="trophy-marquee-wrapper">
          <div className="trophy-marquee-track reverse">
            {[...certifications, ...certifications].reverse().map((cert, index) => (
              <div className="trophy-card" key={`row2-${index}`}>
                <div className="trophy-card-image">
                  <div className="trophy-card-placeholder">
                    <span className="trophy-card-placeholder-icon">{cert.icon}</span>
                    <span className="trophy-card-placeholder-code">{cert.code}</span>
                    <span className="trophy-card-placeholder-type">{cert.type}</span>
                  </div>
                </div>
                <div className="trophy-card-title">{cert.name} — {cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>


      {/* ═══════════════════════════════════════ */}
      {/* CONTACT SECTION                         */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="contact">
        <span className="section-label">CONTACT</span>
        <h2 className="section-title">Get in touch</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's talk</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              I'm open to internships, freelance work, and collaborations where strong execution matters as much as the idea itself.
            </p>

            <div className="contact-methods-grid">
              <div className="contact-method-card">
                <MapPin size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div>
                  <h4>Location</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-method-card">
                <Calendar size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div>
                  <h4>Availability</h4>
                  <p>Open for internships and projects</p>
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
                <Mail size={18} /> drishtikakkar15@gmail.com
              </a>
              <a href="tel:+918355844274" className="contact-link-item">
                <Phone size={18} /> +91 83558 44274
              </a>
              <a href="mailto:drishtikakkar15@gmail.com?subject=Resume%20Request" className="contact-link-item resume-btn">
                <Download size={18} /> Request Resume / CV
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
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
              <textarea id="message" name="message" required className="form-control" placeholder="Your message here..." />
            </div>
            <button type="submit" className="btn btn-filled" style={{ alignSelf: 'flex-start' }} disabled={contactSubmitting}>
              {contactSubmitting ? (
                <><Loader2 size={16} className="spin-icon" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
            {contactStatus === 'success' && (
              <div className="contact-feedback success">
                <CheckCircle size={16} />
                <span>Message sent successfully. I'll get back to you soon.</span>
              </div>
            )}
            {contactStatus === 'error' && (
              <div className="contact-feedback error">
                <AlertCircle size={16} />
                <span>Something went wrong. Email me directly at drishtikakkar15@gmail.com.</span>
              </div>
            )}
          </form>
        </div>
      </AnimatedSection>


      {/* ═══════════════════════════════════════ */}
      {/* FOOTER                                  */}
      {/* ═══════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-container">
          <div className="social-links">
            <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:drishtikakkar15@gmail.com" className="social-link" aria-label="Email">
              <Mail size={20} />
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
              <span className="lightbox-badge">{lightboxImage.type || 'Preview'}</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.5rem' }}>{lightboxImage.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {lightboxImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
