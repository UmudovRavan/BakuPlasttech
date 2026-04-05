import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/hero.css';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>

      {/* Left Panel */}
      <div className="hero-left">
        <div className="hero-l-shape"></div>
        
        <div className="hero-est-tag">EST. 2024</div>
        
        <h1 className="hero-title">
          <span className="hero-line-1">Professional Plastic</span>
          <span className="hero-line-2">CONSTRUCTION</span>
          <span className="hero-line-3">Solutions</span>
        </h1>
        
        <p className="hero-subtitle">
          {t('home.hero.subtitle')}
        </p>

        <div className="hero-ctas">
          <Link to="/products" className="btn-primary-rect">{t('home.hero.viewProducts')}</Link>
          <Link to="/contact" className="btn-secondary-rect">{t('home.hero.contactUs')}</Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <b>12+</b>
            <span>{t('home.hero.yearsExpertise')}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <b>500+</b>
            <span>{t('home.hero.products')}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <b>1000+</b>
            <span>{t('home.hero.globalClients')}</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hero-right">
        <div className="hero-right-bg-pattern"></div>
        
        <div className="hero-watermark">BAKU PLASTTECH</div>
        
        {/* Hexagon Border Overlay */}
        <div className="hero-hexagon-border"></div>

        {/* Glass Card */}
        <div className="glass-card">
          <div className="glass-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l9 4.5V17.5L12 22l-9-4.5V6.5L12 2z"></path>
              <polyline points="12 22 12 12 21 7.5"></polyline>
              <polyline points="12 12 3 7.5"></polyline>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="glass-card-content">
            <h3 className="glass-card-title">{t('home.hero.cardTitle')}</h3>
            <p className="glass-card-subtitle">{t('home.hero.cardSubtitle')}</p>
          </div>
          <div className="active-status">
            <div className="active-pulse">
              <span className="pulse-dot"></span>
              <span>{t('home.hero.activeProduction')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
