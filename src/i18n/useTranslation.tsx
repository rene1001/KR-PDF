import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Language } from '../types';
import { translations, Translations } from './translations';

interface I18nContextType {
  lang: Language;
  currentLang: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('kr_pdf_lang') as Language;
    if (saved && ['en', 'fr', 'es', 'pt', 'de', 'it', 'ar'].includes(saved)) {
      return saved;
    }
    const nav = navigator.language.slice(0, 2).toLowerCase();
    if (['en', 'fr', 'es', 'pt', 'de', 'it', 'ar'].includes(nav)) {
      return nav as Language;
    }
  } catch (e) {
    // Ignore storage/navigator errors
  }
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('kr_pdf_lang', newLang);
    } catch (e) {}
  };

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <I18nContext.Provider value={{ lang, currentLang: lang, t: translations[lang] || translations.en, setLanguage, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      lang: 'en' as Language,
      currentLang: 'en' as Language,
      t: translations.en,
      setLanguage: () => {},
      dir: 'ltr' as const,
    };
  }
  return context;
}
