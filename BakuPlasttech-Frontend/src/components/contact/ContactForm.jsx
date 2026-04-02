import React from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <div className="contact-form-card">
      <div className="form-header">
        <h2 className="form-title">Technical Inquiry</h2>
        <p className="form-desc">
          Describe your project requirements or product inquiry. Our engineering team responds to all technical specifications within 24 business hours.
        </p>
      </div>
      
      <form className="contact-form-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Engineering Manager" 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Business Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="name@company.com" 
              required 
            />
          </div>
        </div>
        
        <div className="input-group">
          <label className="input-label">Phone Number</label>
          <input 
            type="tel" 
            className="form-input" 
            placeholder="+994 (--) --- -- --" 
          />
        </div>
        
        <div className="input-group" style={{ marginBottom: '40px' }}>
          <label className="input-label">Technical Message</label>
          <textarea 
            className="form-textarea" 
            placeholder="Describe your technical requirements or product inquiry..." 
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">
          Send Inquiry
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
