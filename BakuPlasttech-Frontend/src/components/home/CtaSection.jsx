import React from 'react';
import Button from '../ui/Button';
import '../../styles/home.css';

const CtaSection = () => {
  return (
    <section className="section cta industrial-gradient">
      <div className="container">
        <span className="material-symbols-outlined cta-icon" style={{ color: 'white' }}>precision_manufacturing</span>
        <h2 className="cta-title">Ready to upgrade your infrastructure?</h2>
        <p className="cta-desc">
          Connect with our technical sales team for volume pricing, custom molding inquiries, or product specifications.
        </p>
        <Button variant="white" className="btn-lg">
          Get in touch with us
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
