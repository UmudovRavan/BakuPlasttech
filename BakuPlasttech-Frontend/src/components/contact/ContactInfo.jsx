import React from 'react';
import { Mail, Phone, MapPin, Share2, Globe, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="contact-sidebar">
      <div className="contact-info-card">
        <h3 className="info-content-title" style={{ color: 'var(--color-accent)', marginBottom: '32px' }}>{t('contact.hq')}</h3>

        <div className="info-item">
          <div className="info-icon-box">
            <MapPin size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">{t('contact.address')}</h4>
            <p className="info-content-value">
              Heydar Aliyev Ave, 115<br />
              Baku, AZ1029, Azerbaijan
            </p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon-box">
            <Phone size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">{t('contact.inquiries')}</h4>
            <p className="info-content-value">+994 12 567 89 00</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon-box">
            <Mail size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">{t('contact.support')}</h4>
            <p className="info-content-value">info@bakuplasttech.az</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon-box">
            <MessageCircle size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">WhatsApp</h4>
            <a
              className="info-content-link"
              href="https://wa.me/994509612813"
              target="_blank"
              rel="noreferrer"
            >
              +994509612813
            </a>
          </div>
        </div>
      </div>

      {/* Social Strip */}
      <div className="flex gap-4" style={{ paddingLeft: '8px' }}>
        <button className="theme-toggle-header" style={{ borderRadius: '4px' }}><Share2 size={16} /></button>
        <button className="theme-toggle-header" style={{ borderRadius: '4px' }}><Globe size={16} /></button>
      </div>
    </div>
  );
};

export default ContactInfo;
