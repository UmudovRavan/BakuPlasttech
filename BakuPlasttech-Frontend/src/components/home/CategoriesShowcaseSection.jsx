import React from 'react';
import { showcaseCategories } from '../../data/categories';
import '../../styles/home.css';

const CategoriesShowcaseSection = () => {
  return (
    <section className="section showcase">
      <div className="container">
        <div className="showcase-grid">
          {showcaseCategories.map((cat, index) => {
            if (cat.variant === 'image') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size}`}>
                  <img src={cat.image} alt={cat.title} />
                  <div className="showcase-overlay"></div>
                  <div className="showcase-content">
                    <h3 className="showcase-title-white">{cat.title}</h3>
                    <p className="showcase-desc-white">{cat.description}</p>
                    <a href="#" className="showcase-link">
                      View Collection <span className="material-symbols-outlined">trending_flat</span>
                    </a>
                  </div>
                </div>
              );
            }
            if (cat.variant === 'solid') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-solid`}>
                  <h3 className="showcase-title-white">{cat.title}</h3>
                  <p className="showcase-desc-white">{cat.description}</p>
                  <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: '-10px', right: '-10px' }}>
                    {cat.icon}
                  </span>
                </div>
              );
            }
            if (cat.variant === 'light') {
              return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-light`}>
                  <h3 className="product-card-title" style={{ fontSize: '28px' }}>{cat.title}</h3>
                  <p className="section-subtitle" style={{ fontSize: '14px', marginBottom: '24px' }}>{cat.description}</p>
                  <div className="section-underline"></div>
                </div>
              );
            }
            if (cat.variant === 'image-centered') {
               return (
                <div key={cat.id} className={`showcase-item ${cat.size} variant-image-centered`}>
                  <img src={cat.image} alt={cat.title} style={{ opacity: 0.5, filter: 'none' }} />
                  <div className="showcase-content" style={{ textAlign: 'center', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                    <h3 className="showcase-title-white" style={{ color: 'var(--dark-text)' }}>{cat.title}</h3>
                    <p className="showcase-desc-white" style={{ color: 'var(--gray-text)', marginBottom: '32px' }}>{cat.description}</p>
                    <button className="btn btn-outline" style={{ letterSpacing: '3px' }}>Explore All</button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcaseSection;
