import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { PageView } from '../../types';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onNavigate: (page: PageView) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('kr_pdf_cookie_consent');
      if (!consent) {
        // Slight delay so it doesn't flash on first load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kr_pdf_cookie_consent', 'all');
    } catch (e) {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('kr_pdf_cookie_consent', 'essential');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Cookie & Privacy Notice
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {t.cookieNotice}{' '}
            <button
              onClick={() => onNavigate('cookie-policy')}
              className="text-emerald-600 font-semibold underline hover:text-emerald-700"
            >
              {t.cookiePolicyLink}
            </button>
          </p>

          <div className="flex items-center gap-2">
            <button
              id="btn-cookie-accept-all"
              onClick={handleAccept}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              {t.cookieAccept}
            </button>
            <button
              id="btn-cookie-decline"
              onClick={handleDecline}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.cookieDecline}
            </button>
          </div>
        </div>

        <button
          onClick={handleDecline}
          className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
