import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { PageView, FaqItem } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';

interface SeoContentProps {
  toolId: PageView;
  onNavigate: (page: PageView) => void;
  steps: { step: number; title: string; desc: string }[];
  faqs: FaqItem[];
  relatedTools: { id: PageView; title: string; desc: string }[];
}

export const SeoContent: React.FC<SeoContentProps> = ({
  toolId,
  onNavigate,
  steps,
  faqs,
  relatedTools,
}) => {
  const { t } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 space-y-16">
      {/* 1. Step-by-step How-To Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t.howItWorksTitle}
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          Follow these quick steps to complete your task in just a few seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-xs">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. FAQ Section with Accordion */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Help & Answers</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t.faqTitle}
        </h2>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-semibold text-slate-800 hover:text-emerald-600 transition-colors py-1 cursor-pointer"
                >
                  <span className="text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed pr-8 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Internal Linking / Related Tools Grid */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {t.relatedToolsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors mb-1">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-3">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
