import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import FeatureCard from '../ui/FeatureCard';
import { features } from '../../data/features';
import '../../styles/home.css';

const WhyChooseSection = () => {
  return (
    <section className="section why-choose">
      <div className="container">
        <SectionTitle title="Why Choose BakuPlastTech" centered />
        
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
