import React from 'react';
import InnerHero from '../layout/common/InnerHero';
import { useLanguage } from '../../context/LanguageContext';

const ContactHero = () => {
  const { t } = useLanguage();
  const breadcrumbs = [
    { label: t('contact.breadcrumbsHome'), path: '/' },
    { label: t('contact.breadcrumbsContact'), path: null }
  ];

  return (
    <InnerHero 
      title={t('contact.heroTitle')}
      description={t('contact.heroDesc')}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default ContactHero;
