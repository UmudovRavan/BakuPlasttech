import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import '../../styles/header.css';

const Header = () => {
  const [logoSrc, setLogoSrc] = useState('/src/assets/logo/BakuPlasttechLogo.png');
  const [hasLogo, setHasLogo] = useState(false);

  useEffect(() => {
    // Basic check if image exists (could be improved)
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => setHasLogo(true);
    img.onerror = () => setHasLogo(false);
  }, [logoSrc]);

  return (
    <header className="header">
      <div className="container header-container">
        <a href="/" className="logo-link">
          {hasLogo ? (
            <img src={logoSrc} alt="BakuPlastTech Logo" className="logo-image" />
          ) : (
            <span className="logo-text">BakuPlastTech</span>
          )}
        </a>

        <nav className="nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Products</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact</a>
          <a href="#" className="nav-link">AZ/RU/EN</a>
        </nav>

        <div className="header-actions">
          <Button variant="primary">Get a Quote</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
