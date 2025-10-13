import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const STORAGE_KEY = 'microcred-lang';
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }, [lang]);

  const t = (key) => {
    return (translations[lang] && translations[lang][key]) || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
