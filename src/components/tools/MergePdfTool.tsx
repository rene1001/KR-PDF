import React, { useState } from 'react';
import { Layers, Download, Plus, Trash2, ArrowUp, ArrowDown, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PageView } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { FileDropzone } from '../common/FileDropzone';
import { ProgressBar } from '../common/ProgressBar';
import { SeoContent } from '../common/SeoContent';
import { AdSlot } from '../layout/AdSlot';
import { mergePdfFiles, triggerFileDownload } from '../../utils/pdfUtils';
import { trackEvent } from '../../utils/analytics';

interface MergePdfToolProps {
  onNavigate: (page: PageView) => void;
}

export const MergePdfTool: React.FC<MergePdfToolProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    const copy = [...files];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    setFiles(copy);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    setProgress(20);
    try {
      trackEvent({ action: 'conversion_started', tool: 'merge-pdf' });
      const mergedBytes = await mergePdfFiles(files, (p) => setProgress(p));
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      setMergedBlob(blob);
      setIsProcessing(false);
      confetti({ particleCount: 70, spread: 60 });
      trackEvent({ action: 'conversion_success', tool: 'merge-pdf' });
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('Failed to merge PDF files. Please ensure files are valid.');
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    triggerFileDownload(mergedBlob, 'kr-pdf-merged.pdf');
    trackEvent({ action: 'download_clicked', tool: 'merge-pdf' });
  };

  const resetAll = () => {
    setFiles([]);
    setMergedBlob(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.mergeH1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.mergeDesc}
        </p>
      </div>

      <AdSlot placement="top" />

      <div className="mt-6">
        {files.length === 0 ? (
          <FileDropzone
            accept="application/pdf,.pdf"
            multiple={true}
            title={t.mergeDropTitle}
            subtitle="Select 2 or more PDF documents to combine into a single file"
            buttonLabel="Select PDF Files"
            onFilesSelected={handleFilesSelected}
            icon={<Layers className="w-10 h-10" />}
          />
        ) : mergedBlob ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              PDFs Merged Successfully!
            </h3>
            <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
              Your {files.length} documents have been combined into one clean PDF file.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Merged PDF</span>
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Merge More Files</span>
              </button>
            </div>
            <AdSlot placement="after-process" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-800">
                {files.length} PDFs selected
              </span>
              <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>{t.mergeAddMore}</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                  }}
                />
              </label>
            </div>

            <div className="divide-y divide-slate-100">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-800 truncate">{file.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveFile(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveFile(idx, 'down')}
                      disabled={idx === files.length - 1}
                      className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(idx)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>{isProcessing ? 'Merging files...' : t.mergeBtnMerge}</span>
              </button>
            </div>

            {isProcessing && <ProgressBar percent={progress} message="Merging PDF files..." />}
          </div>
        )}
      </div>

      <AdSlot placement="middle" />

      <SeoContent
        toolId="merge-pdf"
        onNavigate={onNavigate}
        steps={[
          {
            step: 1,
            title: 'Choose PDF Files',
            desc: 'Select two or more PDF documents from your computer or phone.',
          },
          {
            step: 2,
            title: 'Order Documents',
            desc: 'Use the up and down arrows to arrange the files in your desired sequence.',
          },
          {
            step: 3,
            title: 'Combine & Save',
            desc: 'Click merge to get your unified single PDF file in seconds.',
          },
        ]}
        faqs={[
          {
            question: 'How many PDF documents can I combine together?',
            answer:
              'You can combine multiple PDF files without strict document limits as long as each file is within 50 MB.',
          },
          {
            question: 'Will page quality or bookmarks be altered?',
            answer:
              'No. All vector text, high-resolution graphics, and original page geometries are preserved identically.',
          },
        ]}
        relatedTools={[
          {
            id: 'split-pdf',
            title: t.splitTitle,
            desc: t.splitDesc,
          },
          {
            id: 'pdf-to-word',
            title: t.pdfToWordTitle,
            desc: t.pdfToWordDesc,
          },
        ]}
      />
    </div>
  );
};
