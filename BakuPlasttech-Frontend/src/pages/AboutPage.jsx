import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import InnerHero from '../components/layout/common/InnerHero';
import Button from '../components/ui/Button';
import { Shield, Target, Eye, Settings, Globe, Users, Award, Factory } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/about.css';

const contentByLang = {
  en: {
    breadcrumbsHome: 'Home',
    breadcrumbsAbout: 'About',
    heroTitle: 'Engineering Trust Through Precision Manufacturing',
    heroDesc: 'BakuPlastTech delivers high-performance plastic construction components engineered for durability, reliability, and modern infrastructure.',
    whoWeAre: 'Who We Are',
    introTitle: 'A Regional Leader in Industrial Plastic Solutions',
    introParagraphs: [
      'Established with a focus on engineering excellence, BakuPlastTech is a premiere manufacturer of high-quality plastic construction materials.',
      'We produce precision-engineered components including electrical boxes, wall clips, expansion anchors, and technical accessories.',
      'With advanced manufacturing capacity and expert teams, we provide scalable solutions for large architectural and industrial projects.',
    ],
    missionTitle: 'Our Mission',
    missionDesc: 'To provide the construction and electrical industry with reliable, durable, precision-engineered plastic components.',
    visionTitle: 'Our Vision',
    visionDesc: 'To become the benchmark for innovation and manufacturing excellence in regional plastic construction materials.',
    coreValuesTitle: 'Our Core Values',
    values: [
      { title: 'Quality First', desc: 'Uncompromising standards in every component we manufacture.' },
      { title: 'Technical Precision', desc: 'Engineering-first approach with high-precision molding.' },
      { title: 'Reliable Production', desc: 'Scalable manufacturing designed for large projects.' },
      { title: 'Partnership', desc: 'Long-term relationships with technical support and supply consistency.' },
    ],
    productionTitle: 'Built Around Precision and Performance',
    productionDesc: 'Our manufacturing philosophy is rooted in technical discipline. We use advanced production lines and premium-grade raw materials.',
    productionItems: [
      { title: 'Advanced Manufacturing', desc: 'High-capacity automated molding and finishing lines.' },
      { title: 'Consistent Quality Control', desc: 'Rigorous testing and inspection throughout the production cycle.' },
      { title: 'Scalable Supply Capacity', desc: 'Optimized logistics supporting regional infrastructure projects.' },
    ],
    statLabels: ['Production Authority', 'Projects Supported', 'Catalog Components', 'Certified Quality'],
    industriesTitle: 'Where Our Solutions Work',
    industriesDesc: 'Our precision plastic components are engineered for diverse industrial and construction environments.',
    industries: [
      { title: 'Residential Construction', desc: 'Reliable mounting and electrical solutions for housing developments.' },
      { title: 'Commercial Infrastructure', desc: 'Strategic components for large-scale commercial environments.' },
      { title: 'Electrical Installations', desc: 'High-specification enclosures and technical management systems.' },
      { title: 'Industrial Projects', desc: 'Heavy-duty accessories designed for rigorous factory applications.' },
    ],
    certTitle: 'Technical Quality and Consistency',
    certs: ['Durable Materials', 'Production Consistency', 'Technical Compliance'],
    ctaTitle: "Let's Build Reliable Infrastructure Together",
    ctaDesc: 'Connect with our technical team to learn more about our manufacturing capabilities and project support services.',
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Explore Products',
  },
  az: {
    breadcrumbsHome: 'Ana Səhifə',
    breadcrumbsAbout: 'Haqqımızda',
    heroTitle: 'Dəqiq İstehsalla Etibarı Qururuq',
    heroDesc: 'BakuPlastTech müasir infrastruktur üçün dayanıqlı və etibarlı plastik komponentlər istehsal edir.',
    whoWeAre: 'Biz Kimik',
    introTitle: 'Sənaye Plastik Həllərində Regional Lider',
    introParagraphs: [
      'BakuPlastTech mühəndislik keyfiyyətinə fokuslanan, yüksək keyfiyyətli plastik tikinti materialları istehsalçısıdır.',
      'Elektrik qutuları, divar klipsləri, ankerlər və texniki aksesuarlar daxil olmaqla dəqiq komponentlər istehsal edirik.',
      'Müasir istehsal gücü və peşəkar komanda ilə iri memarlıq və sənaye layihələri üçün miqyaslana bilən həllər təqdim edirik.',
    ],
    missionTitle: 'Missiyamız',
    missionDesc: 'Tikinti və elektrik sektorunu etibarlı, dayanıqlı və dəqiq hazırlanmış plastik komponentlərlə təmin etmək.',
    visionTitle: 'Vizyonumuz',
    visionDesc: 'Regional plastik tikinti materialları bazarında innovasiya və istehsal keyfiyyətində etalon olmaq.',
    coreValuesTitle: 'Əsas Dəyərlərimiz',
    values: [
      { title: 'Keyfiyyət Öncə', desc: 'Hər istehsal olunan komponentdə yüksək və dəyişməz standartlar.' },
      { title: 'Texniki Dəqiqlik', desc: 'Yüksək dəqiqlikli istehsal və mühəndislik yönümlü yanaşma.' },
      { title: 'Etibarlı İstehsal', desc: 'İri layihələrin tələblərinə cavab verən miqyaslana bilən istehsal.' },
      { title: 'Tərəfdaşlıq', desc: 'Texniki dəstək və sabit təchizatla uzunmüddətli əməkdaşlıq.' },
    ],
    productionTitle: 'Dəqiqlik və Performans Əsasında',
    productionDesc: 'İstehsal fəlsəfəmiz texniki intizam üzərində qurulub. Müasir xətlər və premium xammaldan istifadə edirik.',
    productionItems: [
      { title: 'Müasir İstehsal', desc: 'Yüksək güclü avtomatlaşdırılmış formalaşdırma və bitirmə xətləri.' },
      { title: 'Sabit Keyfiyyət Nəzarəti', desc: 'Bütün istehsal dövründə ciddi test və yoxlama prosesi.' },
      { title: 'Miqyaslana Bilən Təchizat', desc: 'Regional infrastruktur layihələri üçün optimallaşdırılmış logistika.' },
    ],
    statLabels: ['İstehsal Gücü', 'Dəstəklənən Layihə', 'Kataloq Komponent', 'Sertifikatlı Keyfiyyət'],
    industriesTitle: 'Həllərimizin Tətbiq Sahələri',
    industriesDesc: 'Dəqiq plastik komponentlərimiz müxtəlif sənaye və tikinti mühitləri üçün hazırlanır.',
    industries: [
      { title: 'Yaşayış Tikintisi', desc: 'Yaşayış layihələri üçün etibarlı montaj və elektrik həlləri.' },
      { title: 'Kommersiya İnfrastrukturu', desc: 'Böyük kommersiya mühitləri üçün strateji komponentlər.' },
      { title: 'Elektrik Quraşdırmaları', desc: 'Texniki infrastruktur üçün yüksək spesifikasiyalı sistemlər.' },
      { title: 'Sənaye Layihələri', desc: 'Ağır iş rejimi üçün dayanıqlı sənaye aksesuarları.' },
    ],
    certTitle: 'Texniki Keyfiyyət və Sabitlik',
    certs: ['Dayanıqlı Materiallar', 'İstehsal Sabitliyi', 'Texniki Uyğunluq'],
    ctaTitle: 'Etibarlı İnfrastrukturu Birlikdə Quraq',
    ctaDesc: 'İstehsal imkanlarımız və layihə dəstəyimiz haqqında öyrənmək üçün texniki komandamızla əlaqə saxlayın.',
    ctaPrimary: 'Əlaqə',
    ctaSecondary: 'Məhsullara Bax',
  },
};

const AboutPage = () => {
  const { language } = useLanguage();
  const c = contentByLang[language] || contentByLang.en;

  const breadcrumbs = [
    { label: c.breadcrumbsHome, path: '/' },
    { label: c.breadcrumbsAbout, path: null },
  ];

  return (
    <div className="about-page">
      <Header />

      <InnerHero title={c.heroTitle} description={c.heroDesc} breadcrumbs={breadcrumbs} />

      <section className="section company-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image">
              <img src="https://images.unsplash.com/photo-1541888941255-081d746ed89b?q=80&w=1200&auto=format&fit=crop" alt="BakuPlastTech Manufacturing" />
            </div>
            <div className="intro-content">
              <span className="intro-label">{c.whoWeAre}</span>
              <h2 className="intro-title">{c.introTitle}</h2>
              <div className="intro-text-block">
                {c.introParagraphs.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon"><Target size={32} /></div>
              <h3 className="mv-title">{c.missionTitle}</h3>
              <p className="mv-desc">{c.missionDesc}</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon"><Eye size={32} /></div>
              <h3 className="mv-title">{c.visionTitle}</h3>
              <p className="mv-desc">{c.visionDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section core-values">
        <div className="container">
          <div className="section-title-center">
            <div className="info-strip-icon" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Shield size={40} />
            </div>
            <h2 className="section-title">{c.coreValuesTitle}</h2>
            <div className="section-underline"></div>
          </div>

          <div className="values-grid">
            <div className="value-card"><Award className="value-icon" size={24} /><h4 className="value-title">{c.values[0].title}</h4><p className="value-desc">{c.values[0].desc}</p></div>
            <div className="value-card"><Settings className="value-icon" size={24} /><h4 className="value-title">{c.values[1].title}</h4><p className="value-desc">{c.values[1].desc}</p></div>
            <div className="value-card"><Factory className="value-icon" size={24} /><h4 className="value-title">{c.values[2].title}</h4><p className="value-desc">{c.values[2].desc}</p></div>
            <div className="value-card"><Users className="value-icon" size={24} /><h4 className="value-title">{c.values[3].title}</h4><p className="value-desc">{c.values[3].desc}</p></div>
          </div>
        </div>
      </section>

      <section className="production-excellence">
        <div className="container">
          <div className="pe-grid">
            <div className="pe-content">
              <h2>{c.productionTitle}</h2>
              <p className="pe-desc">{c.productionDesc}</p>
              <div className="pe-features">
                <div className="pe-feature-item"><div className="pe-feature-icon"><Factory size={20} /></div><div><h4>{c.productionItems[0].title}</h4><p>{c.productionItems[0].desc}</p></div></div>
                <div className="pe-feature-item"><div className="pe-feature-icon"><Shield size={20} /></div><div><h4>{c.productionItems[1].title}</h4><p>{c.productionItems[1].desc}</p></div></div>
                <div className="pe-feature-item"><div className="pe-feature-icon"><Globe size={20} /></div><div><h4>{c.productionItems[2].title}</h4><p>{c.productionItems[2].desc}</p></div></div>
              </div>
            </div>
            <div className="pe-image">
              <img src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200&auto=format&fit=crop" alt="Production Excellence" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="stats-container">
            <div className="about-stat-item"><span className="stat-number">EST. 2024</span><span className="stat-label">{c.statLabels[0]}</span></div>
            <div className="about-stat-item"><span className="stat-number">1000+</span><span className="stat-label">{c.statLabels[1]}</span></div>
            <div className="about-stat-item"><span className="stat-number">500+</span><span className="stat-label">{c.statLabels[2]}</span></div>
            <div className="about-stat-item"><span className="stat-number">100%</span><span className="stat-label">{c.statLabels[3]}</span></div>
          </div>
        </div>
      </section>

      <section className="industries">
        <div className="container">
          <div className="section-title-center">
            <h2 className="section-title">{c.industriesTitle}</h2>
            <div className="section-underline"></div>
            <p className="section-subtitle">{c.industriesDesc}</p>
          </div>

          <div className="industries-grid">
            {c.industries.map((item, idx) => (
              <div className="industry-card" key={idx}>
                <h4 className="industry-title">{item.title}</h4>
                <p className="industry-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="certification-strip">
        <div className="container">
          <div className="cert-container">
            <div className="cert-text">{c.certTitle}</div>
            <div className="cert-items">
              {c.certs.map((item, idx) => (
                <div className="cert-item" key={idx}><div className="cert-dot"></div>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section cta industrial-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined cta-icon" style={{ color: '#FFFFFF', fontSize: '64px' }}>
            business_center
          </span>
          <h2 className="cta-title" style={{ color: '#FFFFFF' }}>{c.ctaTitle}</h2>
          <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.ctaDesc}</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link to="/contact"><Button variant="white" className="btn-lg">{c.ctaPrimary}</Button></Link>
            <Link to="/products"><Button variant="outline" className="btn-lg" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>{c.ctaSecondary}</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

