import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import InnerHero from '../components/layout/common/InnerHero';
import Button from '../components/ui/Button';
import { Shield, Target, Eye, Settings, Zap, Globe, Users, Award, Hammer, HardHat, Factory, LayoutDashboard } from 'lucide-react';
import '../styles/about.css';

const AboutPage = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'About', path: null }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* 1. Inner Hero */}
      <InnerHero 
        title="Engineering Trust Through Precision Manufacturing"
        description="BakuPlastTech delivers high-performance plastic construction components engineered for durability, reliability, and modern infrastructure."
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Company Intro */}
      <section className="section company-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image">
              <img 
                src="https://images.unsplash.com/photo-1541888941255-081d746ed89b?q=80&w=1200&auto=format&fit=crop" 
                alt="BakuPlastTech Manufacturing" 
              />
            </div>
            <div className="intro-content">
              <span className="intro-label">Who We Are</span>
              <h2 className="intro-title">A Regional Leader in Industrial Plastic Solutions</h2>
              <div className="intro-text-block">
                <p>
                  Established with a focus on engineering excellence, BakuPlastTech is a premiere manufacturer of high-quality plastic construction materials. Our specialized products serve as the backbone for modern electrical and construction infrastructure throughout Baku and the surrounding regions.
                </p>
                <p>
                  We are dedicated to producing precision-engineered components, including specialized electrical boxes, wall clips, expansion anchors, and technical accessories. Every product leaving our facility is a testament to our commitment to durability and technical compliance.
                </p>
                <p>
                  With advanced manufacturing capabilities and a specialized team of industry experts, we provide scalable solutions for large-scale architectural projects, ensuring that safety and quality are never compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">
                <Target size={32} />
              </div>
              <h3 className="mv-title">Our Mission</h3>
              <p className="mv-desc">
                To provide the professional construction and electrical industry with the most reliable, durable, and precision-engineered plastic components that secure modern infrastructure for generations.
              </p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">
                <Eye size={32} />
              </div>
              <h3 className="mv-title">Our Vision</h3>
              <p className="mv-desc">
                To be the industry benchmark for innovation and manufacturing excellence in the regional plastic construction materials market, recognized for our engineering integrity and client trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="section core-values">
        <div className="container">
          <div className="section-title-center">
            <div className="info-strip-icon" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Shield size={40} />
            </div>
            <h2 className="section-title">Our Core Values</h2>
            <div className="section-underline"></div>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <Award className="value-icon" size={24} />
              <h4 className="value-title">Quality First</h4>
              <p className="value-desc">Uncompromising standards in every component we manufacture, ensuring long-term reliability.</p>
            </div>
            <div className="value-card">
              <Settings className="value-icon" size={24} />
              <h4 className="value-title">Technical Precision</h4>
              <p className="value-desc">Engineering focused approaches with high-precision molding and internationally certified quality.</p>
            </div>
            <div className="value-card">
              <Factory className="value-icon" size={24} />
              <h4 className="value-title">Reliable Production</h4>
              <p className="value-desc">Scalable manufacturing capacity designed to meet the demands of large industrial projects.</p>
            </div>
            <div className="value-card">
              <Users className="value-icon" size={24} />
              <h4 className="value-title">Partnership</h4>
              <p className="value-desc">Building long-term relationships through technical support and supply consistency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Production Excellence */}
      <section className="production-excellence">
        <div className="container">
          <div className="pe-grid">
            <div className="pe-content">
              <h2>Built Around Precision and Performance</h2>
              <p className="pe-desc">
                Our manufacturing philosophy is rooted in technical discipline. We utilize advanced production lines and premium-grade raw materials to ensure every component meets the rigorous demands of the modern industrial environment.
              </p>
              
              <div className="pe-features">
                <div className="pe-feature-item">
                  <div className="pe-feature-icon">
                    <Factory size={20} />
                  </div>
                  <div>
                    <h4>Advanced Manufacturing</h4>
                    <p>High-capacity automated molding and finishing lines.</p>
                  </div>
                </div>
                <div className="pe-feature-item">
                  <div className="pe-feature-icon">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4>Consistent Quality Control</h4>
                    <p>Rigorous testing and inspection throughout the production cycle.</p>
                  </div>
                </div>
                <div className="pe-feature-item">
                  <div className="pe-feature-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4>Scalable Supply Capacity</h4>
                    <p>Optimized logistics to support large regional infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pe-image">
              <img 
                src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200&auto=format&fit=crop" 
                alt="Production Excellence" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Company Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-container">
            <div className="about-stat-item">
              <span className="stat-number">EST. 2024</span>
              <span className="stat-label">Production Authority</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Projects Supported</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Catalog Components</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Certified Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Industries */}
      <section className="industries">
        <div className="container">
          <div className="section-title-center">
            <h2 className="section-title">Where Our Solutions Work</h2>
            <div className="section-underline"></div>
            <p className="section-subtitle">
              Our precision plastic components are engineered for diverse industrial and construction environments.
            </p>
          </div>

          <div className="industries-grid">
            <div className="industry-card">
              <h4 className="industry-title">Residential Construction</h4>
              <p className="industry-desc">Reliable mounting and electrical solutions for high-rise and private housing developments.</p>
            </div>
            <div className="industry-card">
              <h4 className="industry-title">Commercial Infrastructure</h4>
              <p className="industry-desc">Strategic components for large-scale commercial, retail, and office environments.</p>
            </div>
            <div className="industry-card">
              <h4 className="industry-title">Electrical Installations</h4>
              <p className="industry-desc">High-specification enclosures and management systems for technical infrastructure.</p>
            </div>
            <div className="industry-card">
              <h4 className="industry-title">Industrial Projects</h4>
              <p className="industry-desc">Durable, heavy-duty accessories designed for rigorous industrial factory applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Certification Strip */}
      <section className="certification-strip">
        <div className="container">
          <div className="cert-container">
            <div className="cert-text">Technical Quality and Consistency</div>
            <div className="cert-items">
              <div className="cert-item">
                <div className="cert-dot"></div>
                Durable Materials
              </div>
              <div className="cert-item">
                <div className="cert-dot"></div>
                Production Consistency
              </div>
              <div className="cert-item">
                <div className="cert-dot"></div>
                Technical Compliance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <section className="section cta industrial-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined cta-icon" style={{ color: '#FFFFFF', fontSize: '64px' }}>
            business_center
          </span>
          <h2 className="cta-title" style={{ color: '#FFFFFF' }}>Let's Build Reliable Infrastructure Together</h2>
          <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Connect with our technical team to learn more about our manufacturing capabilities and project support services.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '32px' }}>
             <Link to="/contact">
               <Button variant="white" className="btn-lg">Contact Us</Button>
             </Link>
             <Link to="/products">
               <Button variant="outline" className="btn-lg" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>Explore Products</Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
