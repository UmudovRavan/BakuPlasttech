import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sun, Moon, ArrowRight, ChevronDown } from 'lucide-react';
import logo from './logo/BakuPlasttechLogo.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
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
    setLangDropdownOpen(false);
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
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languageOptions = [
    { code: 'az', label: 'AZE', flag: 'https://flagcdn.com/w20/az.png' },
    { code: 'en', label: 'ENG', flag: 'https://flagcdn.com/w20/gb.png' },
  ];
  const activeLanguageOption = languageOptions.find((item) => item.code === language) || languageOptions[1];

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
          {/* Language Dropdown */}
          <div className={`lang-dropdown ${langDropdownOpen ? 'open' : ''}`}>
            <button
              className="lang-trigger"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-label="Language"
              type="button"
            >
              <img className="lang-flag" src={activeLanguageOption.flag} alt={activeLanguageOption.label} />
              <span className="lang-label">{activeLanguageOption.label}</span>
              <ChevronDown size={14} className="lang-chevron" />
            </button>

            <div className="lang-menu">
              {languageOptions.map((item) => (
                <button
                  key={item.code}
                  className={`lang-menu-item ${language === item.code ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(item.code);
                    setLangDropdownOpen(false);
                  }}
                  type="button"
                >
                  <img className="lang-flag" src={item.flag} alt={item.label} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button className="theme-toggle-header" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Quote Button */}
          <button className="header-cta">
            <span>{t('nav.getQuote')}</span>
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
               {languageOptions.map((item) => (
                 <span
                   key={item.code}
                   className={language === item.code ? 'active' : ''}
                   onClick={() => setLanguage(item.code)}
                 >
                   <img className="lang-flag" src={item.flag} alt={item.label} /> {item.label}
                 </span>
               ))}
             </div>
             <button className="mobile-cta-btn">{t('nav.getQuote')}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
