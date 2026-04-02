import React from 'react';
import { Link } from 'react-router-dom';

const InnerHero = ({ title, description, breadcrumbs }) => {
  return (
    <section className="inner-hero">
      <div className="inner-hero-container">
        <nav className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.path ? (
                <Link to={crumb.path}>{crumb.label}</Link>
              ) : (
                <span className="breadcrumb-current">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumb-separator">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        <div className="hero-accent-line"></div>
        <h1 className="inner-hero-title">{title}</h1>
        <p className="inner-hero-desc">{description}</p>
      </div>
      <div className="inner-hero-bg"></div>
    </section>
  );
};

export default InnerHero;
