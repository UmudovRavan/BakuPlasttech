import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

const getByPath = (obj, path) => {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('bpt-lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('bpt-lang', language);
  }, [language]);

  const value = useMemo(() => {
    const t = (key) => {
      const langPack = translations[language] || translations.en;
      const fallbackPack = translations.en;
      return getByPath(langPack, key) ?? getByPath(fallbackPack, key) ?? key;
    };

    return { language, setLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

