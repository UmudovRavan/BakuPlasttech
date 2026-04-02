import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import '../../styles/navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <img 
            src={logo} 
            alt="BakuPlastTech Logo" 
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><a href="#" className="nav-link active">Home</a></li>
          <li><a href="#" className="nav-link">Products</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Language Switcher */}
          <div className="lang-switcher">
            {['AZ', 'RU', 'EN'].map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${activeLang === lang ? 'active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Quote Button */}
          <button className="nav-cta">
            <span>GET A QUOTE</span>
          </button>

          {/* Mobile Hamburger */}
          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(10px)' : 'none'
            }}></span>
            <span style={{
              opacity: mobileMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none'
            }}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
