import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'home' },
  { id: 'why-hire', label: 'why_hire' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'creative', label: 'creative' },
  { id: 'certifications', label: 'certs' },
  { id: 'contact', label: 'contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur scroll indicator
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 70; // Header height offset
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar" style={{ padding: scrolled ? '0.2rem 0' : '0.5rem 0' }}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <TerminalIcon size={20} className="highlight" />
          drishti<span>.dev</span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-menu">
          {navItems.map((item, idx) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                <span>0{idx + 1}.</span> {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Links */}
        <ul className={`nav-links mobile-menu ${isOpen ? 'open' : ''}`}>
          {navItems.map((item, idx) => (
            <li key={item.id} style={{ width: '100%' }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                style={{ width: '100%', padding: '0.75rem 0' }}
              >
                <span>0{idx + 1}.</span> {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
