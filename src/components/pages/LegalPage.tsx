import React from 'react';
import { PageView } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy-policy' | 'terms' | 'cookie-policy' | 'about';
  onNavigate: (page: PageView) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
        {type === 'privacy-policy' && (
          <article className="prose prose-slate max-w-none text-slate-700">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mb-6">Last updated: September 2026</p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              1. Our Core Commitment to Privacy
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              At <strong>KR PDF</strong>, privacy is not an afterthought—it is the foundational pillar of our service architecture. 
              Our tools (including Image to PDF, PDF to Word, and PDF Editor) operate primarily through <strong>client-side in-browser processing</strong>. 
              Your documents and personal files are read and processed directly on your local device.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              2. Zero Cloud File Retention
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              Unlike traditional conversion services that upload your confidential files to remote servers, KR PDF does not store, review, 
              or index your documents. When your conversion or edit finishes, the data exists strictly in your local device memory and is 
              cleared as soon as you close or refresh the tab.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              3. Analytics & Operational Telemetry
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              We collect strictly anonymized, aggregated operational statistics (such as tool usage counts, general browser types, and error rates) 
              to ensure website performance and uptime. We <strong>never</strong> log document file names, contents, metadata, or personally 
              identifiable information.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              4. Advertising Partners
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              To keep KR PDF 100% free with no subscriptions, we display third-party advertisements (e.g. Google AdSense). 
              Our advertising partners may use non-personalized or cookie-based identifiers in compliance with applicable privacy regulations. 
              You can manage your cookie preferences at any time.
            </p>
          </article>
        )}

        {type === 'terms' && (
          <article className="prose prose-slate max-w-none text-slate-700">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mb-6">Effective: September 2026</p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              By accessing or using KR PDF, you agree to be bound by these Terms of Service. If you do not agree with any part 
              of these terms, you should not use our web tools.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              2. Permitted Use
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              You are granted a non-exclusive, revocable license to convert, edit, and organize files for personal, educational, 
              and commercial purposes. You agree not to attempt to reverse engineer, disrupt, or automate excessive requests that 
              impair server stability.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              3. Disclaimer of Warranty
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              KR PDF is provided on an "as is" and "as available" basis without warranties of any kind. While we strive for maximum 
              conversion precision, we cannot guarantee identical fidelity for all complex layout variations.
            </p>
          </article>
        )}

        {type === 'cookie-policy' && (
          <article className="prose prose-slate max-w-none text-slate-700">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              Cookie Policy
            </h1>
            <p className="text-sm leading-relaxed mb-4">
              This policy describes how KR PDF uses cookies and local browser storage to provide our web services.
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              Essential Local Storage
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              We use browser localStorage to remember your preferred language (e.g. English, French, Spanish) and your cookie consent 
              selection so you are not prompted repeatedly.
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              Advertising & Analytics Cookies
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              Third-party partners, including Google, use cookies to serve ads based on prior visits. You can opt out of personalized 
              advertising by visiting Google Ad Settings.
            </p>
          </article>
        )}

        {type === 'about' && (
          <article className="prose prose-slate max-w-none text-slate-700">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Platform</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              About KR PDF
            </h1>
            <p className="text-base leading-relaxed mb-4">
              <strong>KR PDF</strong> was built with a clear vision: to empower individuals, students, and professionals 
              globally with high-performance document conversion and editing tools—completely free, without paywalls, and with 
              uncompromising privacy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">In-Browser Architecture</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Engineered using cutting-edge WebAssembly, HTML5 canvas, and client-side processing to eliminate document uploads.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                <h4 className="font-bold text-teal-900 text-sm mb-1">Global Accessibility</h4>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Available in 7 languages with responsive design optimized for desktop and mobile browsers alike.
                </p>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
