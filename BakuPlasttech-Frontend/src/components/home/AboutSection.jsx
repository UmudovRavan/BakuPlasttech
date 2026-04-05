import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/home.css';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYVawExB6ejS1SUgtY0AcagT5qRvQs7kYlcBWtsAokPDLoEKkchBkFlCKvgebcWz6YqWukxVkYK2z0B44qxGpzGFw2h1g23Ek1W0sISymaZyWqRwyKx-ikyTocPhw3YgUZiUOz4s9ozU4BQvK8pS6VodzTWLsuG26pe3juRh9BLgZcaFtaF6Z9AQtmueFNWC6vBplH-ZwxBbZmRfdaX-ZFLp9mOzCKo955Cd-yzLhUi1SMQGGkl3LhqPGnjGHcS-kSgmAxAkDMDzCC" alt="Engineering expertise" />
            <div className="about-badge">
              {t('home.about.badge')}
            </div>
          </div>
          
          <div className="about-content">
            <span className="about-tag">{t('home.about.tag')}</span>
            <h2 className="about-title">{t('home.about.title')}</h2>
            <p className="about-desc">
              {t('home.about.description')}
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="material-symbols-outlined">factory</span>
                </div>
                <div>
                  <h4 className="stat-title">{t('home.about.advancedFacility')}</h4>
                  <p className="stat-desc">{t('home.about.advancedFacilityDesc')}</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h4 className="stat-title">{t('home.about.isoCertified')}</h4>
                  <p className="stat-desc">{t('home.about.isoCertifiedDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
