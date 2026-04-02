import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import { Award, Package, ShieldCheck, Cog } from 'lucide-react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      
      <ContactHero />

      <section className="contact-container">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Form */}
            <ContactForm />
            
            {/* Right: Info + Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <ContactInfo />
              <ContactMap />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="spec-strip">
        <div className="container">
          <div className="spec-grid">
            <div className="spec-item">
              <ShieldCheck size={28} color="var(--color-accent)" />
              <span className="spec-text">ISO 9001:2015</span>
            </div>
            <div className="spec-item">
              <Award size={28} color="var(--color-accent)" />
              <span className="spec-text">EU Standards</span>
            </div>
            <div className="spec-item">
              <Package size={28} color="var(--color-accent)" />
              <span className="spec-text">RoHS Compliant</span>
            </div>
            <div className="spec-item">
              <Cog size={28} color="var(--color-accent)" />
              <span className="spec-text">ASTM Verified</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
