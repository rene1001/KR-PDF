import React, { useState } from 'react';
import { Scissors, Download, RefreshCw, CheckCircle2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PageView } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { FileDropzone } from '../common/FileDropzone';
import { ProgressBar } from '../common/ProgressBar';
import { SeoContent } from '../common/SeoContent';
import { AdSlot } from '../layout/AdSlot';
import { splitPdfFile, triggerFileDownload } from '../../utils/pdfUtils';
import { trackEvent } from '../../utils/analytics';

interface SplitPdfToolProps {
  onNavigate: (page: PageView) => void;
}

export const SplitPdfTool: React.FC<SplitPdfToolProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [rangeInput, setRangeInput] = useState<string>('1-2');
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitBlob, setSplitBlob] = useState<Blob | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
    }
  };

  const parsePageRange = (input: string): number[] => {
    const pages = new Set<number>();
    const parts = input.split(',').map((p) => p.trim());

    parts.forEach((part) => {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p)) pages.add(p);
      }
    });

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file) return;
    const pagesToExtract = parsePageRange(rangeInput);
    if (pagesToExtract.length === 0) {
      alert('Please enter valid page numbers (e.g. 1-3, 5).');
      return;
    }

    setIsProcessing(true);
    try {
      trackEvent({ action: 'conversion_started', tool: 'split-pdf' });
      const splitBytes = await splitPdfFile(file, pagesToExtract);
      const blob = new Blob([splitBytes], { type: 'application/pdf' });
      setSplitBlob(blob);
      setIsProcessing(false);
      confetti({ particleCount: 70, spread: 60 });
      trackEvent({ action: 'conversion_success', tool: 'split-pdf' });
    } catch (err: any) {
      console.error(err);
      setIsProcessing(false);
      alert(err.message || 'Failed to extract pages.');
    }
  };

  const handleDownload = () => {
    if (!splitBlob || !file) return;
    triggerFileDownload(splitBlob, `${file.name.replace(/\.pdf$/i, '')}-extracted.pdf`);
    trackEvent({ action: 'download_clicked', tool: 'split-pdf' });
  };

  const resetAll = () => {
    setFile(null);
    setSplitBlob(null);
    setRangeInput('1-2');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.splitH1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.splitDesc}
        </p>
      </div>

      <AdSlot placement="top" />

      <div className="mt-6">
        {!file ? (
          <FileDropzone
            accept="application/pdf,.pdf"
            multiple={false}
            title={t.splitDropTitle}
            subtitle="Extract specific pages or page ranges from any PDF document"
            buttonLabel="Select PDF File"
            onFilesSelected={handleFileSelected}
            icon={<Scissors className="w-10 h-10" />}
          />
        ) : splitBlob ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Pages Extracted Successfully!
            </h3>
            <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
              Your requested pages have been extracted into a separate PDF document.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Extracted PDF</span>
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Split Another File</span>
              </button>
            </div>
            <AdSlot placement="after-process" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs max-w-xl mx-auto space-y-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{file.name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.splitRangePrompt}
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5, 8-10"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-mono focus:outline-emerald-500"
              />
              <span className="block text-[11px] text-slate-400 mt-1">
                Enter single pages or ranges separated by commas.
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={resetAll}
                className="px-5 py-3 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSplit}
                disabled={isProcessing}
                className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>{isProcessing ? 'Extracting...' : t.splitBtnSplit}</span>
              </button>
            </div>

            {isProcessing && <ProgressBar percent={50} message="Extracting pages..." />}
          </div>
        )}
      </div>

      <AdSlot placement="middle" />

      <SeoContent
        toolId="split-pdf"
        onNavigate={onNavigate}
        steps={[
          {
            step: 1,
            title: 'Upload Document',
            desc: 'Select or drag your PDF file to the split tool.',
          },
          {
            step: 2,
            title: 'Define Page Range',
            desc: 'Type the pages you want to keep, like 1-5 or 2, 4, 7.',
          },
          {
            step: 3,
            title: 'Download New PDF',
            desc: 'Instantly download your trimmed and organized PDF.',
          },
        ]}
        faqs={[
          {
            question: 'Can I extract non-consecutive pages?',
            answer:
              'Yes! You can specify distinct pages and ranges such as "1, 3, 5-7" to create a new PDF composed solely of those exact pages.',
          },
        ]}
        relatedTools={[
          {
            id: 'merge-pdf',
            title: t.mergeTitle,
            desc: t.mergeDesc,
          },
          {
            id: 'edit-pdf',
            title: t.editorTitle,
            desc: t.editorDesc,
          },
        ]}
      />
    </div>
  );
};
