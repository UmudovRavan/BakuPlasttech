import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo/BakuPlasttechLogo.png';
import '../../styles/footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column footer-brand">
            <Link to="/">
              <img src={logo} alt="BakuPlastTech" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.solutions')}</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">{t('nav.products')}</Link></li>
              <li><Link to="/products" className="footer-link">{t('footer.technicalSpecs')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.certifications')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.company')}</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">{t('footer.privacy')}</Link></li>
              <li><Link to="/contact" className="footer-link">{t('footer.contactUs')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.careers')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.hq')}</h4>
            <div className="footer-contact">
              <p>Industrial Zone, Phase II</p>
              <p>Baku, Azerbaijan</p>
              <p>+994 (12) 000-00-00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
