import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" style={scrolled ? { borderBottomColor: 'rgba(255,255,255,0.08)' } : {}}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          DK<span className="logo-dot">.</span>
        </a>

        {/* Center nav links */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA buttons */}
        <div className="nav-right">
          <a
            href="/drishti-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn nav-btn-filled"
          >
            <FileText size={14} />
            Résumé
          </a>
          <a
            href="#contact"
            className="nav-btn"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
          >
            Let's talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
        <a href="/drishti-cv.pdf" target="_blank" rel="noopener noreferrer" className="nav-btn nav-btn-filled">
          <FileText size={14} /> Résumé
        </a>
        <a
          href="#contact"
          className="nav-btn"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#contact');
          }}
        >
          Let's talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
