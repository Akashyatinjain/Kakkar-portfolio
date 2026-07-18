import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';

// Image asset imports
import drishtiImg from './assets/drishti.png';
import careergpsImg from './assets/careergps_mockup.png';
import cyberguardImg from './assets/cyberguard_mockup.png';
import lockerImg from './assets/locker_mockup.png';
import saregamaImg from './assets/saregama_video.png';
import heroImg from './assets/hero.png';

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
  Loader2,
  CheckCircle,
  Download,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  Globe,
  FileText,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/* INTERSECTION OBSERVER HOOK & ANIMATED SECTION               */
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
  }, [options]);
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

  // ─── DATA ───

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Advanced SQL'],
    },
    {
      title: 'Web Technologies',
      skills: ['HTML5 & CSS3', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'RESTful APIs', 'Tailwind CSS', 'Flask', 'FastAPI'],
    },
    {
      title: 'Data & AI / ML',
      skills: ['MySQL', 'MongoDB', 'Vertex AI', 'Gemini API', 'Multimodal RAG', 'Power BI', 'Pandas & Plotly', 'Data Structures & Algos'],
    },
    {
      title: 'Tools & DevOps',
      skills: ['Git & GitHub', 'Docker', 'Linux (Ubuntu & Kali)', 'VS Code', 'Vercel & Render', 'Streamlit & Railway', 'Prompt Engineering'],
    },
  ];

  // Restructured & Cleaned Timeline (Work + Leadership)
  const timelineExperience = [
    {
      title: 'Vice Chairperson',
      company: 'CSI Student Chapter (SFIT)',
      type: 'Leadership',
      period: 'June 2026 – Present',
      current: true,
      bullets: [
        'Directing CSI Student Chapter operations, managing a core committee of 50+ members.',
        'Coordinating college-wide technical workshops, speaker sessions, and national-level hackathons.'
      ],
      tags: [
        { label: 'Leadership', color: '#a855f7' },
        { label: 'Operations Management', color: '#3b82f6' },
        { label: 'Event Coordination', color: '#10b981' }
      ]
    },
    {
      title: 'Head',
      company: 'NSS Student Chapter (SFIT)',
      type: 'Leadership',
      period: 'June 2026 – Present',
      current: true,
      bullets: [
        'Leading NSS chapter operations and community service initiatives across Mumbai.',
        'Organizing social welfare campaigns and donation camps impacting 200+ participants.'
      ],
      tags: [
        { label: 'Community Service', color: '#10b981' },
        { label: 'Team Management', color: '#3b82f6' },
        { label: 'Public Relations', color: '#f97316' }
      ]
    },
    {
      title: 'Copywrite Intern',
      company: 'EvolvEd',
      type: 'Internship',
      period: 'May 2026 – Present',
      current: true,
      bullets: [
        'Creating engaging content for the college\'s official social media channels, including PR drafts, LinkedIn posts, and HTML email newsletters.',
        'Contributing creative ideas and communication strategies to strengthen the institution\'s digital brand presence.'
      ],
      tags: [
        { label: 'Content Writing', color: '#3b82f6' },
        { label: 'PR & Copywriting', color: '#a855f7' },
        { label: 'HTML Campaigns', color: '#f97316' }
      ]
    },
    {
      title: 'Teaching Assistant',
      company: 'Arihant Academy',
      type: 'Freelance / Teaching',
      period: 'Dec 2025 – April 2026',
      current: false,
      bullets: [
        'Assisted 8th, 9th, and 10th grade students with core concepts in Mathematics, Science, and English.',
        'Taught core concepts and solved previous years\' boards question papers to 10th grade students right before their board examinations.'
      ],
      tags: [
        { label: 'Education', color: '#10b981' },
        { label: 'Mentoring', color: '#3b82f6' },
        { label: 'Mathematics & Science', color: '#ec4899' }
      ]
    },
    {
      title: 'Assistant Director',
      company: 'Final Cut Studio & Production',
      type: 'Contract',
      period: 'Sept 2025 – Oct 2025',
      current: false,
      bullets: [
        'Worked as Assistant Director for a SAREGAMA music video featuring a renowned artist, managing both creative and production logistics.',
        'Coordinated set management, prepared shoot schedules, and ensured smooth timeline execution.'
      ],
      tags: [
        { label: 'Direction', color: '#ec4899' },
        { label: 'Saregama Production', color: '#f97316' },
        { label: 'Project Management', color: '#3b82f6' }
      ]
    },
    {
      title: 'Data Science & Analytics Intern',
      company: 'Remarkskill x IIT Hyderabad',
      type: 'Internship',
      period: 'June 2025 – July 2025',
      current: false,
      bullets: [
        'Conducted data preprocessing, exploratory analysis, and visual reporting on real-world datasets using Python.',
        'Designed analytical insights dashboards under supervision of IIT H researchers.'
      ],
      tags: [
        { label: 'Python Analytics', color: '#3b82f6' },
        { label: 'IIT Hyderabad', color: '#eab308' },
        { label: 'Data Science', color: '#a855f7' }
      ]
    },
    {
      title: 'PR Executive',
      company: 'Google Developers Group (GDG SFIT)',
      type: 'Leadership',
      period: 'Jan 2026 – June 2026',
      current: false,
      bullets: [
        'Managed scriptwriting and public relations for the national-level HackX2.0 Hackathon.',
        'Anchored live hackathon opening and closing ceremonies in front of 300+ participants and judges.'
      ],
      tags: [
        { label: 'GDG SFIT', color: '#eab308' },
        { label: 'Public Speaking', color: '#f97316' },
        { label: 'Event Host', color: '#10b981' }
      ]
    }
  ];

  // Top 4 High-Quality Projects (Static grid layout)
  const projects = [
    {
      title: 'CareerGPS AI',
      desc: 'An AI-powered career pathing platform. Integrates PDF resume parser, Github metrics engine, LinkedIn profiler, market trend graphs, and Llama 3.3 chatbot dialogs to provide automated, tailormade career recommendations.',
      tech: ['React', 'Node.js', 'Llama 3.3', 'FastAPI', 'Groq AI'],
      date: 'Jan 2026 – Mar 2026',
      github: 'https://github.com/drishti-kakkar/CareerGPS-AI',
      image: careergpsImg,
      icon: <Brain size={24} />
    },
    {
      title: 'CyberGuard AI',
      desc: 'Spam, message, and screenshot scanner that leverages computer vision and deep learning to identify text manipulation, spam URLs, heatmaps, and AI-generated deepfakes in under 2 seconds.',
      tech: ['Python', 'Computer Vision', 'Deep Learning', 'Flask'],
      date: 'Oct 2025 – Dec 2025',
      github: 'https://github.com/drishti-kakkar/CyberGuard-AI',
      image: cyberguardImg,
      icon: <Shield size={24} />
    },
    {
      title: 'Secure Smart Locker (IoT)',
      desc: 'A secure package delivery locker featuring microcontroller-based electronic locks, real-time OTP authentication, weight-sensing package detectors, and automated cellular notifications.',
      tech: ['Arduino', 'Raspberry Pi', 'React', 'Node.js', 'Embedded C'],
      date: '2025',
      github: 'https://github.com/drishti-kakkar/Smart-Locker-IoT',
      image: lockerImg,
      icon: <Lock size={24} />
    },
    {
      title: 'AI Hospital Locator Chatbot',
      desc: 'A WhatsApp bot integrated with QR-scanned medical locations to help users instantly check stocks of affordable generic alternatives, store locations, and map coordinates.',
      tech: ['Python', 'WhatsApp API', 'SQL', 'QR Scanners'],
      date: '2025',
      github: 'https://github.com/drishti-kakkar/AI-Chatbot-QR',
      image: heroImg,
      icon: <Cpu size={24} />
    }
  ];

  // Certifications
  const certifications = [
    { name: 'Artificial Intelligence & Machine Learning', issuer: 'IIT Bombay x Remarkskill', type: 'AI / ML', code: 'IITB', icon: <Brain size={20} /> },
    { name: 'Data Science & Analytics', issuer: 'IIT Hyderabad x Remarkskill', type: 'Data Science', code: 'IITH', icon: <BarChart2 size={20} /> },
    { name: 'Engineering Mentorship Program', issuer: 'Agastya Foundation x JP Morgan Chase', type: 'Mentorship', code: 'JPMC', icon: <GraduationCap size={20} /> },
    { name: "Colloquium '26 Consolation Winner II [Team Lead]", issuer: 'St. Francis Institute of Technology', type: 'Leadership', code: 'SFIT', icon: <Users size={20} /> },
    { name: 'Samadhan Ideathon Top 5 [Team Lead]', issuer: 'NSS SFIT', type: 'Innovation', code: 'NSS', icon: <Award size={20} /> }
  ];

  const WEB3FORMS_KEY = 'df6cf22d-327c-4860-93a8-4e89793132e4'; // Pre-filled Web3Forms Key

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactStatus('');
    const formData = new FormData(e.target);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', 'New Contact from Recruiter — Drishti Kakkar');
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

  return (
    <div style={{ position: 'relative' }}>
      {/* Background glow effects */}
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      <div className="bg-glow-3" />

      <Navbar />

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION                            */}
      {/* ═══════════════════════════════════════ */}
      <header id="home" className="hero">
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Active & Open for Internships & Graduate Roles
              </div>

              <h1 className="hero-heading">
                Hi, I'm <span className="hero-name">Drishti Kakkar</span>
              </h1>

              <p className="hero-subtitle">IT Student @ SFIT • Software & AI Builder</p>

              <p className="hero-description">
                I build end-to-end full-stack products and AI integrations — from career recommendation platforms to IoT secure systems, delivered under strict production deadlines.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-filled">
                  View Projects
                </a>
                <a href="/drishti-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <FileText size={16} />
                  View Résumé
                </a>
              </div>

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
                <a href="tel:+918355844274" className="hero-social-icon" aria-label="Phone">
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img src={drishtiImg} alt="Drishti Kakkar" />
              </div>
            </div>
          </div>

          {/* Credibility Bar */}
          <div className="credibility-bar">
            <div className="credibility-inner">
              <div className="credibility-item">
                <div className="credibility-icon"><Brain size={18} /></div>
                <div className="credibility-text">
                  <h4>IIT Certified</h4>
                  <p>Bombay & Hyderabad AI/DS</p>
                </div>
              </div>
              <div className="credibility-item">
                <div className="credibility-icon"><Award size={18} /></div>
                <div className="credibility-text">
                  <h4>JP Morgan Mentee</h4>
                  <p>Agastya Engineering Program</p>
                </div>
              </div>
              <div className="credibility-item">
                <div className="credibility-icon"><Cpu size={18} /></div>
                <div className="credibility-text">
                  <h4>Saregama AD</h4>
                  <p>Music Video Assistant Director</p>
                </div>
              </div>
              <div className="credibility-item">
                <div className="credibility-icon"><GraduationCap size={18} /></div>
                <div className="credibility-text">
                  <h4>8.6 CGPA</h4>
                  <p>Academic Distinction @ SFIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════ */}
      {/* ABOUT SECTION                           */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="about" className="about-section">
        <span className="section-label">ABOUT</span>
        <h2 className="section-title">A look at who I am</h2>

        <div className="about-layout">
          <div className="about-text">
            <p>
              I'm an Information Technology undergraduate at <strong>St. Francis Institute of Technology (SFIT)</strong>, Mumbai.
              I focus on building functional systems where technology meets actual user value — whether that is structured multi-agent AI systems, IoT locker automation, or responsive full-stack dashboards.
            </p>
            <p>
              Beyond technical development, I bring strong project organization and leadership to the table. I actively coordinate as the <strong>Vice Chairperson of the CSI Student Chapter</strong> and <strong>Head of NSS SFIT</strong>, where I manage teams of 50+ members. I've also worked as an Assistant Director for a <strong>SAREGAMA</strong> production, handling on-set scheduling, production documents, and scene execution.
            </p>
          </div>
        </div>

        <div className="about-info-cards">
          <div className="about-info-card">
            <div className="about-info-icon">
              <GraduationCap size={24} />
            </div>
            <h4>B.E. Information Technology</h4>
            <p>St. Francis Institute of Technology (2024–2028)</p>
            <p style={{ marginTop: '0.25rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>CGPA: 8.6</p>
          </div>
          <div className="about-info-card">
            <div className="about-info-icon">
              <MapPin size={24} />
            </div>
            <h4>Location</h4>
            <p>Mumbai, Maharashtra, India</p>
            <p style={{ marginTop: '0.25rem' }}>Open to relocations / hybrid</p>
          </div>
          <div className="about-info-card">
            <div className="about-info-icon">
              <Globe size={24} />
            </div>
            <h4>Core Assets</h4>
            <p>English, Hindi, Marathi</p>
            <p style={{ marginTop: '0.25rem', color: 'var(--accent-cyan)' }}>Strong Technical & PR Communication</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* EXPERIENCE SECTION                      */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="experience" className="experience-section">
        <span className="section-label">EXPERIENCE & LEADERSHIP</span>
        <h2 className="section-title">Where I've contributed</h2>

        <div className="experience-intro">
          <p>
            A combined record of professional development, engineering internships, and leadership roles within university organizations.
          </p>
        </div>

        <div className="timeline">
          {timelineExperience.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <div className="timeline-company">
                      <span className="timeline-company-name">{exp.company}</span>
                      <span className="timeline-company-type">— {exp.type}</span>
                      {exp.current && <span className="timeline-current-badge">CURRENT</span>}
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
      {/* PROJECTS SECTION                        */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="projects" className="projects-section">
        <span className="section-label">PORTFOLIO</span>
        <h2 className="section-title">Projects I've built & shipped</h2>
        <p className="projects-subtitle" style={{ marginBottom: '1.5rem', marginTop: '-1.5rem', color: 'var(--text-muted)' }}>
          Auto-scrolling — click a card to open full details.
        </p>

        <div className="projects-marquee-wrapper">
          <div className="projects-marquee-track">
            {[...projects, ...projects, ...projects].map((project, index) => (
              <article 
                className="project-marquee-card" 
                key={index}
                onClick={() => window.open(project.github, '_blank')}
              >
                <div className="project-card-arrow">
                  <ArrowUpRight size={14} />
                </div>

                <div
                  className={`project-media ${project.image ? 'has-image' : ''}`}
                  style={project.image ? { backgroundImage: `url(${project.image})` } : {}}
                >
                  {!project.image && (
                    <div className="project-image-icon">{project.icon}</div>
                  )}
                </div>

                <div className="project-body">
                  <span className="project-date">{project.date}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.desc}</p>

                  <div className="project-tech">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="project-tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-link-wrapper">
                    <span className="project-details-link">
                      CLICK FOR DETAILS
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* SKILLS SECTION                          */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="skills" className="skills-section">
        <span className="section-label">DASHBOARD</span>
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-dashboard-grid">
          {skillCategories.map((category, idx) => (
            <div className="skills-dashboard-column" key={idx}>
              <h3>{category.title}</h3>
              <div className="skills-dashboard-list">
                {category.skills.map((skill, sIdx) => (
                  <div className="skills-dashboard-item" key={sIdx}>
                    <div className="skills-dashboard-icon-wrapper">
                      <Code size={14} />
                    </div>
                    <span className="skills-dashboard-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* CERTIFICATIONS SECTION                  */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection id="certifications" className="certifications-section">
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>CERTIFICATIONS & AWARDS</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Trophy Room</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', marginTop: '-1.5rem' }}>
          Achievements and certifications unlocked — hover to pause, click to enlarge.
        </p>

        {/* Row 1 */}
        <div className="trophy-marquee-wrapper">
          <div className="trophy-marquee-track">
            {[...certifications, ...certifications, ...certifications].map((cert, index) => (
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

        <div className="trophy-row-spacer" style={{ height: '1rem' }} />

        {/* Row 2 - reverse order */}
        <div className="trophy-marquee-wrapper">
          <div className="trophy-marquee-track reverse">
            {[...certifications, ...certifications, ...certifications].reverse().map((cert, index) => (
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
      <AnimatedSection id="contact" className="contact-section">
        <span className="section-label">CONNECT</span>
        <h2 className="section-title">Let's discuss opportunities</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              I'm seeking software engineering internships, technical associate roles, or leadership opportunities where robust execution and clean design matter.
            </p>

            <div className="contact-methods-grid">
              <div className="contact-method-card">
                <MapPin size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div>
                  <h4>Based in</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-method-card">
                <Calendar size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div>
                  <h4>Availability</h4>
                  <p>Open for immediate opportunities</p>
                </div>
              </div>
            </div>

            <div className="contact-links-panel">
              <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <Github size={16} /> GitHub
              </a>
              <a href="mailto:drishtikakkar15@gmail.com" className="contact-link-item">
                <Mail size={16} /> drishtikakkar15@gmail.com
              </a>
              <a href="tel:+918355844274" className="contact-link-item">
                <Phone size={16} /> +91 83558 44274
              </a>
              <a href="/drishti-cv.pdf" target="_blank" rel="noopener noreferrer" className="contact-link-item resume-btn">
                <Download size={16} /> Download CV / Résumé
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required className="form-control" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message Details</label>
              <textarea id="message" name="message" required className="form-control" placeholder="Describe the role or project..." />
            </div>
            <button type="submit" className="btn btn-filled" style={{ alignSelf: 'flex-start' }} disabled={contactSubmitting}>
              {contactSubmitting ? (
                <><Loader2 size={16} className="spin-icon" /> Submitting...</>
              ) : (
                <><Send size={16} /> Submit Message</>
              )}
            </button>
            {contactStatus === 'success' && (
              <div className="contact-feedback success">
                <CheckCircle size={16} />
                <span>Thank you! Your message was submitted successfully. I'll get back to you shortly.</span>
              </div>
            )}
            {contactStatus === 'error' && (
              <div className="contact-feedback error">
                <AlertCircle size={16} />
                <span>Web submission failed. Please mail me directly at drishtikakkar15@gmail.com.</span>
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
          <p className="footer-text">
            © {new Date().getFullYear()} Drishti Kakkar. Built with React & CSS.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/drishti-kakkar" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/drishti-kakkar-13a1992b3" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:drishtikakkar15@gmail.com" className="footer-social" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
