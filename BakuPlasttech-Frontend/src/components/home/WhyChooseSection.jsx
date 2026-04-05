import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FeatureCard from '../ui/FeatureCard';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/home.css';

const WhyChooseSection = () => {
  const { t } = useLanguage();
  const features = t('home.why.features') || [];

  return (
    <section className="section why-choose">
      <div className="container">
        <SectionTitle title={t('home.why.title')} centered />
        
        <div className="features-grid">
          {features.map(feature => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
