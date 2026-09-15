import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  FileCheck, 
  HelpCircle,
  FileType
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PageView, ConversionProgress } from '../../../types';
import { useTranslation } from '../../../i18n/useTranslation';
import { FileDropzone } from '../../common/FileDropzone';
import { ProgressBar } from '../../common/ProgressBar';
import { SeoContent } from '../../common/SeoContent';
import { AdSlot } from '../../layout/AdSlot';
import { extractPdfStructuredContent, triggerFileDownload } from '../../../utils/pdfUtils';
import { createDocxFromPdfData } from '../../../utils/docxUtils';
import { trackEvent } from '../../../utils/analytics';
import { validatePdfToWordFiles } from '../../../utils/fileValidation';

interface PdfToWordToolProps {
  onNavigate: (page: PageView) => void;
}

export const PdfToWordTool: React.FC<PdfToWordToolProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionState, setConversionState] = useState<ConversionProgress>({
    status: 'idle',
    percent: 0,
    message: '',
  });
  const [generatedDocxBlob, setGeneratedDocxBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState(0);

  // When user drops or picks a PDF file
  const handleFileSelected = async (files: File[]) => {
    const validation = validatePdfToWordFiles(files);
    if (!validation.valid || !validation.file) {
      setConversionState({
        status: 'error',
        percent: 0,
        message: '',
        error: validation.error || t.errorInvalidFormat,
      });
      return;
    }

    const file = validation.file as File;

    setSelectedFile(file);
    setConversionState({
      status: 'reading',
      percent: 15,
      message: 'Reading PDF document...',
    });

    trackEvent({ action: 'conversion_started', tool: 'pdf-to-word', fileSizeBytes: file.size });
    const startTime = performance.now();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);

      setConversionState({
        status: 'analyzing',
        percent: 35,
        message: 'Analyzing pages & text structure...',
      });

      // Extract layout & paragraphs
      const structuredData = await extractPdfStructuredContent(
        uint8,
        (percent, msg) => {
          setConversionState({
            status: 'extracting',
            percent,
            message: msg,
          });
        }
      );

      setPageCount(structuredData.pages.length);

      setConversionState({
        status: 'building',
        percent: 85,
        message: 'Generating formatted Microsoft Word (.docx) file...',
      });

      // Generate DOCX blob
      const docxBlob = await createDocxFromPdfData(
        structuredData.pages,
        file.name.replace(/\.pdf$/i, '')
      );

      setGeneratedDocxBlob(docxBlob);
      setConversionState({
        status: 'done',
        percent: 100,
        message: t.pdfToWordDone,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      trackEvent({
        action: 'conversion_success',
        tool: 'pdf-to-word',
        durationMs: performance.now() - startTime,
      });
    } catch (err: any) {
      console.error(err);
      let userMsg = t.errorGeneral;
      const raw = (err?.message || '').toLowerCase();
      if (raw.includes('password') || raw.includes('encrypted')) {
        userMsg = t.errorPasswordPdf || 'Ce fichier PDF est protégé par un mot de passe.';
      } else if (raw.includes('corrupt') || raw.includes('invalid') || raw.includes('format') || raw.includes('fdf') || raw.includes('syntax')) {
        userMsg = t.errorCorruptPdf;
      }
      setConversionState({
        status: 'error',
        percent: 0,
        message: '',
        error: userMsg,
      });
      trackEvent({ action: 'conversion_error', tool: 'pdf-to-word', errorType: userMsg });
    }
  };

  const handleDownload = () => {
    if (!generatedDocxBlob || !selectedFile) return;
    const docxName = selectedFile.name.replace(/\.[^/.]+$/, '') + '.docx';
    triggerFileDownload(generatedDocxBlob, docxName);
    trackEvent({ action: 'download_clicked', tool: 'pdf-to-word' });
  };

  const resetAll = () => {
    setSelectedFile(null);
    setGeneratedDocxBlob(null);
    setConversionState({
      status: 'idle',
      percent: 0,
      message: '',
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Tool Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.pdfToWordH1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.pdfToWordDesc}
        </p>
      </div>

      {/* Top Ad Unit */}
      <AdSlot placement="top" />

      {/* Main Conversion Card */}
      <div className="mt-6">
        {conversionState.status === 'idle' && (
          <FileDropzone
            accept="application/pdf,.pdf"
            multiple={false}
            title={t.pdfToWordDropTitle}
            subtitle={t.pdfToWordDropSubtitle}
            buttonLabel={t.pdfToWordBtnChoose}
            onFilesSelected={handleFileSelected}
            icon={<FileText className="w-10 h-10" />}
          />
        )}

        {(conversionState.status === 'reading' ||
          conversionState.status === 'analyzing' ||
          conversionState.status === 'extracting' ||
          conversionState.status === 'building') && (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-xs">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {t.pdfToWordProcessing}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{selectedFile?.name}</p>
            <ProgressBar
              percent={conversionState.percent}
              message={conversionState.message}
            />
          </div>
        )}

        {conversionState.status === 'done' && generatedDocxBlob && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {t.pdfToWordDone}
            </h3>
            <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto">
              Your document is ready. {pageCount} page{pageCount > 1 ? 's were' : ' was'}{' '}
              processed and converted to editable Microsoft Word format.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                id="btn-download-word"
                onClick={handleDownload}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{t.pdfToWordDownload}</span>
              </button>

              <button
                onClick={resetAll}
                className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.pdfToWordConvertAnother}</span>
              </button>
            </div>

            {/* In-content after process ad */}
            <AdSlot placement="after-process" />
          </div>
        )}

        {conversionState.status === 'error' && (
          <div className="bg-white rounded-3xl p-8 border border-red-200 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-red-900 mb-2">
              Conversion failed
            </h3>
            <p className="text-sm text-red-600 mb-6 max-w-md mx-auto">
              {conversionState.error}
            </p>
            <button
              onClick={resetAll}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Try with another file
            </button>
          </div>
        )}

        {/* Informational Limitations & Technology note */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block mb-1">
              Privacy & Quality Assurance
            </span>
            <p className="mb-2">{t.pdfToWordNotice}</p>
            <p className="text-slate-500 italic">{t.pdfToWordLimitations}</p>
          </div>
        </div>
      </div>

      {/* Middle Ad Unit */}
      <AdSlot placement="middle" />

      {/* SEO Article & FAQs */}
      <SeoContent
        toolId="pdf-to-word"
        onNavigate={onNavigate}
        steps={[
          {
            step: 1,
            title: 'Upload Your PDF',
            desc: 'Select or drag your PDF document onto the drop area.',
          },
          {
            step: 2,
            title: 'Automatic Extraction',
            desc: 'The engine parses lines, headings, paragraphs and structural sections.',
          },
          {
            step: 3,
            title: 'Download DOCX',
            desc: 'Save your newly created Microsoft Word (.docx) file immediately.',
          },
        ]}
        faqs={[
          {
            question: 'Will the text in my Word document be fully editable?',
            answer:
              'Yes! The output is a standard Microsoft Word (.docx) file containing editable paragraphs, titles, and runs that you can open and edit in Microsoft Word, Google Docs, or LibreOffice.',
          },
          {
            question: 'Is my data secure and private?',
            answer:
              'Completely. The conversion is performed directly within your browser session using web standards. No document data is stored on remote databases.',
          },
          {
            question: 'What happens if my PDF is a scanned photo of a document?',
            answer:
              'For scanned or image-based PDFs, our system extracts optical text best-effort and generates high-resolution embedded pages into your Word file so you never lose any page content.',
          },
          {
            question: 'Is there any cost or registration required?',
            answer:
              'No. KR PDF is 100% free with no subscription and no user account required.',
          },
        ]}
        relatedTools={[
          {
            id: 'image-to-pdf',
            title: t.imageToPdfTitle,
            desc: t.imageToPdfDesc,
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
