import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, ArrowRight, X } from 'lucide-react';
import logo from './logo/BakuPlasttechLogo.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* 1. LOGO */}
        <Link to="/" className="logo">
          <img 
            src={logo} 
            alt="BakuPlastTech Logo" 
          />
        </Link>

        {/* 2. NAVBAR (Centered desktop) */}
        <nav className="header-nav">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* 3. CTA ACTIONS */}
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="lang-switcher-pill">
            {['AZ', 'RU', 'EN'].map((lang) => (
              <span 
                key={lang} 
                className={`lang-option ${activeLang === lang ? 'lang-active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Theme Toggle */}
          <button className="theme-toggle-header" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Quote Button */}
          <button className="header-cta">
            <span>GET A QUOTE</span>
            <ArrowRight size={14} style={{ marginLeft: '8px' }} />
          </button>

          {/* Mobile Hamburguer */}
          <button 
            className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="mobile-nav-footer">
             <div className="mobile-lang">
               {['AZ', 'RU', 'EN'].map((lang) => (
                 <span 
                   key={lang} 
                   className={activeLang === lang ? 'active' : ''}
                   onClick={() => setActiveLang(lang)}
                 >
                   {lang}
                 </span>
               ))}
             </div>
             <button className="mobile-cta-btn">GET A QUOTE</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
