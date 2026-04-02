import React from 'react';
import { Mail, Phone, MapPin, Share2, Globe, MessageSquare } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="contact-sidebar">
      <div className="contact-info-card">
        <h3 className="info-content-title" style={{ color: 'var(--color-accent)', marginBottom: '32px' }}>Headquarters</h3>

        <div className="info-item">
          <div className="info-icon-box">
            <MapPin size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">Address</h4>
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
            <h4 className="info-content-title">Inquiries</h4>
            <p className="info-content-value">+994 12 567 89 00</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon-box">
            <Mail size={20} />
          </div>
          <div className="info-content">
            <h4 className="info-content-title">Technical Support</h4>
            <p className="info-content-value">info@bakuplasttech.az</p>
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
