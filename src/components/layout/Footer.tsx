import React from 'react';
import { PageView, Language } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { ShieldCheck, Heart, Lock, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, t, setLanguage } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      {/* Top Value Assurance Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">100% In-Browser Privacy</p>
                <p className="text-xs text-slate-400">Your files are processed locally on your device</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Instant & Unlimited</p>
                <p className="text-xs text-slate-400">Zero waiting queues, zero registration needed</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Free Forever</p>
                <p className="text-xs text-slate-400">No hidden paywalls or credit card prompts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-base">
                KR
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                KR <span className="text-emerald-400">PDF</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t.footerDesc}
            </p>
            <div className="text-xs text-slate-500">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-medium">
                SSL Secured • Privacy Guaranteed
              </span>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              {t.navTools}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('pdf-to-word')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.pdfToWordTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('image-to-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.imageToPdfTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('edit-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.editorTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('merge-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.mergeTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('split-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.splitTitle}
                </button>
              </li>
            </ul>
          </div>

          {/* Format Converters Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Format Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('image-to-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  JPG to PDF Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('image-to-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  PNG to PDF Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('image-to-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  WEBP to PDF Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pdf-to-word')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  PDF to DOCX Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('edit-pdf')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Sign PDF Online
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.footerPrivacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.footerTerms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookie-policy')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.footerCookies}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.footerAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t.footerContact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Language & Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KR PDF. {t.footerRights}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500">Language:</span>
            {(['en', 'fr', 'es', 'pt', 'de', 'it', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`uppercase px-1.5 py-0.5 rounded ${
                  lang === l
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
