import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactForm = () => {
  const { t } = useLanguage();

  return (
    <div className="contact-form-card">
      <div className="form-header">
        <h2 className="form-title">{t('contact.formTitle')}</h2>
        <p className="form-desc">{t('contact.formDesc')}</p>
      </div>
      
      <form className="contact-form-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="input-group">
            <label className="input-label">{t('contact.fullName')}</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Engineering Manager" 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">{t('contact.businessEmail')}</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="name@company.com" 
              required 
            />
          </div>
        </div>
        
        <div className="input-group">
          <label className="input-label">{t('contact.phone')}</label>
          <input 
            type="tel" 
            className="form-input" 
            placeholder="+994 (--) --- -- --" 
          />
        </div>
        
        <div className="input-group" style={{ marginBottom: '40px' }}>
          <label className="input-label">{t('contact.message')}</label>
          <textarea 
            className="form-textarea" 
            placeholder="Describe your technical requirements or product inquiry..." 
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">
          {t('contact.sendInquiry')}
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
