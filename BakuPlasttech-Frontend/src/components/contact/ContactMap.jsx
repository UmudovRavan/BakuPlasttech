import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactMap = () => {
  const { t } = useLanguage();

  return (
    <div className="map-container">
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZepbTcGT0YPx-PM-dJVwneNk2KOY2vdowddkEKSpPEbez2ZML4cuggKJnq8V6YIrzsSBGK3ay-RVBrO-_fyj507WOS5vbHG63GW6OvsOmmgi3hxKqROn3dXGRK9KkrfaHu6gRZ8_wyyZBBaIGzZ3ORxTTjJteHh_K3LgCi1AVlzhbBaBeWWg7RHwVRGRfn62uikwkfq-3XqDGlocP7tPUaAMYgg6nW5bLb3NA1BcPlUt5J2EI8jmqCigOkynSFNIxwlwUnJ9aORYa" 
        alt="Baku City Map" 
        className="map-placeholder"
      />
      <div className="map-overlay-badge">
        <div className="pulse-dot"></div>
        <span className="info-content-title" style={{ fontSize: '10px', fontWeight: '800' }}>{t('contact.mapHq')}</span>
      </div>
    </div>
  );
};

export default ContactMap;
