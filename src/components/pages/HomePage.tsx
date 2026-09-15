import React from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Edit3, 
  Layers, 
  Scissors, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Smartphone, 
  Smile, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PageView } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { AdSlot } from '../layout/AdSlot';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, dir } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            {t.heroTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              {t.heroTitleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Primary Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <button
              id="hero-cta-pdf-word"
              onClick={() => onNavigate('pdf-to-word')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <FileText className="w-5 h-5" />
              <span>{t.heroCtaPdfToWord}</span>
            </button>

            <button
              id="hero-cta-image-pdf"
              onClick={() => onNavigate('image-to-pdf')}
              className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-md shadow-teal-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <ImageIcon className="w-5 h-5" />
              <span>{t.heroCtaImageToPdf}</span>
            </button>

            <button
              id="hero-cta-edit-pdf"
              onClick={() => onNavigate('edit-pdf')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md shadow-slate-900/15 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Edit3 className="w-5 h-5" />
              <span>{t.heroCtaEditPdf}</span>
            </button>
          </div>

          {/* In-Browser Privacy Assurance Note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>{t.heroPrivacyPill}</span>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot placement="top" />
      </div>

      {/* Main Tools Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t.toolsSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.toolsSectionSubtitle}
          </p>
        </div>

        {/* 3 Main Tools (Featured Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: PDF to Word */}
          <div
            id="tool-card-pdf-word"
            onClick={() => onNavigate('pdf-to-word')}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                PDF → DOCX
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {t.pdfToWordTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.pdfToWordDesc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 text-sm font-bold">
              <span>Convert now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Image to PDF */}
          <div
            id="tool-card-image-pdf"
            onClick={() => onNavigate('image-to-pdf')}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-teal-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-teal-100/80 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                JPG, PNG, WEBP → PDF
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                {t.imageToPdfTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.imageToPdfDesc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-600 text-sm font-bold">
              <span>Create PDF</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Edit PDF */}
          <div
            id="tool-card-edit-pdf"
            onClick={() => onNavigate('edit-pdf')}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Edit3 className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-100/80 text-cyan-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                Annotate & Sign
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                {t.editorTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.editorDesc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-cyan-600 text-sm font-bold">
              <span>Open Editor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Secondary Tools: Merge & Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => onNavigate('merge-pdf')}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {t.mergeTitle}
                </h4>
                <p className="text-xs text-slate-500">{t.mergeDesc}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>

          <div
            onClick={() => onNavigate('split-pdf')}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {t.splitTitle}
                </h4>
                <p className="text-xs text-slate-500">{t.splitDesc}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </section>

      {/* Middle In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot placement="middle" />
      </div>

      {/* Section Advantages / Why KR PDF */}
      <section className="py-16 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Why Millions Choose KR PDF
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Built with precision for speed, security, and an uncomplicated user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit1Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit1Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit2Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit2Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit3Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit3Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit4Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit4Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit5Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit5Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {t.benefit6Title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.benefit6Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Textual Content Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Complete Online PDF Solutions Without Compromises
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Managing document formats in professional and academic environments should be effortless. 
              KR PDF provides modern web utilities capable of converting, merging, splitting, and modifying 
              PDFs directly on your computer, tablet, or smartphone without the need to install desktop software 
              or sacrifice confidential file privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">
                1. High-Fidelity Word Conversion
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Extract tables, typography, paragraphs, and headlines cleanly into editable Microsoft Word (.docx) 
                files with no loss of structural integrity.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">
                2. Instant Multi-Image to PDF
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Combine receipts, ID scans, photos, and presentation slides (JPG, PNG, WEBP) into standardized A4 or 
                Letter documents with custom margins.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">
                3. Full-Featured Interactive Editor
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add text annotations, draw signatures, highlight important clauses, rotate pages, or remove unwanted 
                pages from any document with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <AdSlot placement="bottom" />
      </div>
    </div>
  );
};
