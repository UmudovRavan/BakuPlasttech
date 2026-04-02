import React from 'react';
import '../../styles/home.css';

const AboutSection = () => {
  return (
    <section className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYVawExB6ejS1SUgtY0AcagT5qRvQs7kYlcBWtsAokPDLoEKkchBkFlCKvgebcWz6YqWukxVkYK2z0B44qxGpzGFw2h1g23Ek1W0sISymaZyWqRwyKx-ikyTocPhw3YgUZiUOz4s9ozU4BQvK8pS6VodzTWLsuG26pe3juRh9BLgZcaFtaF6Z9AQtmueFNWC6vBplH-ZwxBbZmRfdaX-ZFLp9mOzCKo955Cd-yzLhUi1SMQGGkl3LhqPGnjGHcS-kSgmAxAkDMDzCC" alt="Engineering expertise" />
            <div className="about-badge">
              Over 15 Years of Industry Expertise.
            </div>
          </div>
          
          <div className="about-content">
            <span className="about-tag">Our Legacy</span>
            <h2 className="about-title">Pioneering Excellence in Polymer Engineering</h2>
            <p className="about-desc">
              BakuPlastTech stands at the intersection of material science and architectural necessity. We specialize in the manufacturing of high-precision plastic components that form the invisible backbone of modern infrastructure. From thermal-resistant electrical housings to high-load bearing anchors, our products are tested under extreme conditions to ensure they meet the rigorous demands of today's construction sites.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="material-symbols-outlined">factory</span>
                </div>
                <div>
                  <h4 className="stat-title">Advanced Facility</h4>
                  <p className="stat-desc">State-of-the-art injection molding technology.</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h4 className="stat-title">ISO Certified</h4>
                  <p className="stat-desc">Maintaining the highest global quality standards.</p>
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
