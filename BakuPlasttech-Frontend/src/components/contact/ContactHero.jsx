import React from 'react';
import InnerHero from '../layout/common/InnerHero';

const ContactHero = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: null }
  ];

  return (
    <InnerHero 
      title="Get in Touch with Our Engineering Team"
      description="Submit your technical inquiry and our team will respond with precise solutions tailored to your project requirements within 24 business hours."
      breadcrumbs={breadcrumbs}
    />
  );
};

export default ContactHero;
