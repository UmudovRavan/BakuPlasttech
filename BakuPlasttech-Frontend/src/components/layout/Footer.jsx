import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/BakuPlasttechLogo.png';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column footer-brand">
            <Link to="/">
              <img src={logo} alt="BakuPlastTech" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">
              Engineering Precision. Leading manufacturer of 
              high-performance plastic construction materials in the region.
            </p>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/products" className="footer-link">Technical Specs</Link></li>
              <li><Link to="/" className="footer-link">Certifications</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/" className="footer-link">Careers</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Headquarters</h4>
            <div className="footer-contact">
              <p>Industrial Zone, Phase II</p>
              <p>Baku, Azerbaijan</p>
              <p>+994 (12) 000-00-00</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2024 BakuPlastTech. Engineering Precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
