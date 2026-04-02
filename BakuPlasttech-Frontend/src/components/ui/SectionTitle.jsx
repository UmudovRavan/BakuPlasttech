import React from 'react';
import '../../styles/ui.css';

const SectionTitle = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`section-title-wrapper ${centered ? 'section-title-center' : ''}`}>
      <h2 className="section-title">{title}</h2>
      <div className="section-underline"></div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
