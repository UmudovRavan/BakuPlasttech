import React from 'react';
import '../../styles/home.css';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <span className="material-symbols-outlined feature-card-icon">{icon}</span>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
