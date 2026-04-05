import React from 'react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/home.css';

const CtaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section cta industrial-gradient">
      <div className="container">
        <span className="material-symbols-outlined cta-icon" style={{ color: 'white' }}>precision_manufacturing</span>
        <h2 className="cta-title">{t('home.cta.title')}</h2>
        <p className="cta-desc">{t('home.cta.desc')}</p>
        <Button variant="white" className="btn-lg">
          {t('home.cta.button')}
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
