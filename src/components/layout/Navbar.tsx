import React, { useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Edit3, 
  Layers, 
  Scissors, 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { PageView, Language } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { lang, t, setLanguage, dir } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setToolsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              KR
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                KR <span className="text-emerald-600">PDF</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 -mt-1 tracking-wider uppercase">
                {t.brandTagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-item-pdf-word"
              onClick={() => handleNav('pdf-to-word')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'pdf-to-word'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              {t.navPdfToWord}
            </button>

            <button
              id="nav-item-image-pdf"
              onClick={() => handleNav('image-to-pdf')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'image-to-pdf'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-teal-600" />
              {t.navImageToPdf}
            </button>

            <button
              id="nav-item-edit-pdf"
              onClick={() => handleNav('edit-pdf')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'edit-pdf'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <Edit3 className="w-4 h-4 text-cyan-600" />
              {t.navEditPdf}
            </button>

            {/* All Tools Dropdown */}
            <div className="relative">
              <button
                id="nav-item-all-tools"
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {t.navAllTools}
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsMenuOpen && (
                <div 
                  className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                >
                  <button
                    onClick={() => handleNav('merge-pdf')}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>{t.mergeTitle}</span>
                  </button>
                  <button
                    onClick={() => handleNav('split-pdf')}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Scissors className="w-4 h-4 text-teal-600" />
                    <span>{t.splitTitle}</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    onClick={() => handleNav('pdf-to-word')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span>JPG to PDF / PNG to PDF</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Free / Privacy Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.noRegistrationBadge}</span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="btn-language-selector"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                title="Change language"
              >
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {langMenuOpen && (
                <div 
                  className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-44 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-50`}
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2.5 cursor-pointer transition-colors ${
                        item.code === lang
                          ? 'bg-emerald-50 font-bold text-emerald-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav('pdf-to-word')}
            className={`w-full px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentPage === 'pdf-to-word' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
            }`}
          >
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>{t.navPdfToWord}</span>
          </button>
          <button
            onClick={() => handleNav('image-to-pdf')}
            className={`w-full px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentPage === 'image-to-pdf' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
            }`}
          >
            <ImageIcon className="w-5 h-5 text-teal-600" />
            <span>{t.navImageToPdf}</span>
          </button>
          <button
            onClick={() => handleNav('edit-pdf')}
            className={`w-full px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentPage === 'edit-pdf' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
            }`}
          >
            <Edit3 className="w-5 h-5 text-cyan-600" />
            <span>{t.navEditPdf}</span>
          </button>
          <button
            onClick={() => handleNav('merge-pdf')}
            className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-3"
          >
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>{t.mergeTitle}</span>
          </button>
          <button
            onClick={() => handleNav('split-pdf')}
            className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-3"
          >
            <Scissors className="w-5 h-5 text-teal-600" />
            <span>{t.splitTitle}</span>
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-500">
            <button onClick={() => handleNav('privacy-policy')} className="hover:underline">
              {t.footerPrivacy}
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms')} className="hover:underline">
              {t.footerTerms}
            </button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:underline">
              {t.navContact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
