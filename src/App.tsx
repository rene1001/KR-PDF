import React, { useState, useEffect } from 'react';
import { I18nProvider, useTranslation } from './i18n/useTranslation';
import { PageView } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/layout/CookieBanner';
import { HomePage } from './components/pages/HomePage';
import { PdfToWordTool } from './components/tools/PdfToWord/PdfToWordTool';
import { ImageToPdfTool } from './components/tools/ImageToPdf/ImageToPdfTool';
import { PdfEditorTool } from './components/tools/PdfEditor/PdfEditorTool';
import { MergePdfTool } from './components/tools/MergePdfTool';
import { SplitPdfTool } from './components/tools/SplitPdfTool';
import { LegalPage } from './components/pages/LegalPage';
import { ContactPage } from './components/pages/ContactPage';
import { updateSeoMeta } from './utils/seoHelper';
import { trackPageView } from './utils/analytics';

const AppContent: React.FC = () => {
  const { currentLang, t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Handle URL hash changes for direct linking & browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') as PageView;
      const validPages: PageView[] = [
        'home',
        'pdf-to-word',
        'image-to-pdf',
        'edit-pdf',
        'merge-pdf',
        'split-pdf',
        'privacy-policy',
        'terms',
        'cookie-policy',
        'about',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash, SEO tags & Analytics whenever page or language changes
  useEffect(() => {
    // Update hash without triggering a jump
    if (currentPage === 'home') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    } else {
      if (window.location.hash !== `#${currentPage}`) {
        window.location.hash = `#${currentPage}`;
      }
    }

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // SEO updates
    updateSeoMeta(currentPage, currentLang, t);

    // Analytics page view track
    trackPageView(currentPage, currentLang);
  }, [currentPage, currentLang, t]);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'pdf-to-word' && <PdfToWordTool onNavigate={handleNavigate} />}
        {currentPage === 'image-to-pdf' && <ImageToPdfTool onNavigate={handleNavigate} />}
        {currentPage === 'edit-pdf' && <PdfEditorTool onNavigate={handleNavigate} />}
        {currentPage === 'merge-pdf' && <MergePdfTool onNavigate={handleNavigate} />}
        {currentPage === 'split-pdf' && <SplitPdfTool onNavigate={handleNavigate} />}
        
        {(currentPage === 'privacy-policy' ||
          currentPage === 'terms' ||
          currentPage === 'cookie-policy' ||
          currentPage === 'about') && (
          <LegalPage type={currentPage} onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <CookieBanner onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
