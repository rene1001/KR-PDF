import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  RotateCw, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Download, 
  CheckCircle2, 
  Sliders, 
  RefreshCw, 
  FileCheck,
  AlertCircle,
  X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ImageItem, ImageToPdfSettings, PageView } from '../../../types';
import { useTranslation } from '../../../i18n/useTranslation';
import { FileDropzone } from '../../common/FileDropzone';
import { ProgressBar } from '../../common/ProgressBar';
import { SeoContent } from '../../common/SeoContent';
import { AdSlot } from '../../layout/AdSlot';
import { generatePdfFromImages, triggerFileDownload } from '../../../utils/pdfUtils';
import { trackEvent } from '../../../utils/analytics';
import { validateImageToPdfFiles, getMaxImagesCount } from '../../../utils/fileValidation';

interface ImageToPdfToolProps {
  onNavigate: (page: PageView) => void;
}

export const ImageToPdfTool: React.FC<ImageToPdfToolProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [settings, setSettings] = useState<ImageToPdfSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 'none',
    quality: 0.85,
    fileName: 'kr-pdf-document.pdf',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null);

  // Handle image files selection with validation
  const handleFilesSelected = (files: File[]) => {
    const validation = validateImageToPdfFiles(files, images.length);

    if (!validation.valid || validation.validFiles.length === 0) {
      setErrorMessage(validation.error || t.errorInvalidFormat);
      return;
    }

    setErrorMessage(null);
    const newItems: ImageItem[] = [];

    validation.validFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: url,
        name: file.name,
        size: file.size,
        width: 1000,
        height: 1000,
        rotation: 0,
      });
    });

    setImages((prev) => [...prev, ...newItems]);
    trackEvent({ action: 'file_selected', tool: 'image-to-pdf' });
  };

  // Reorder functions
  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newArr = [...images];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    setImages(newArr);
  };

  // Rotate single image 90 degrees
  const rotateImage = (index: number) => {
    setImages((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      )
    );
  };

  // Remove single image
  const removeImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Clear all images
  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setGeneratedPdfBlob(null);
  };

  // Generate the PDF
  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProgress(10);
    const startTime = performance.now();

    try {
      trackEvent({ action: 'conversion_started', tool: 'image-to-pdf' });
      const pdfBytes = await generatePdfFromImages(images, settings, (p) => setProgress(p));
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setGeneratedPdfBlob(blob);
      setIsProcessing(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      trackEvent({
        action: 'conversion_success',
        tool: 'image-to-pdf',
        durationMs: performance.now() - startTime,
      });
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setErrorMessage(t.errorGeneral);
      trackEvent({ action: 'conversion_error', tool: 'image-to-pdf' });
    }
  };

  // Trigger Download
  const handleDownload = () => {
    if (!generatedPdfBlob) return;
    const finalName = settings.fileName.endsWith('.pdf')
      ? settings.fileName
      : `${settings.fileName}.pdf`;
    triggerFileDownload(generatedPdfBlob, finalName);
    trackEvent({ action: 'download_clicked', tool: 'image-to-pdf' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Tool Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.imageToPdfH1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.imageToPdfDesc}
        </p>
      </div>

      {/* Error notification banner */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Ad Unit */}
      <AdSlot placement="top" />

      {/* Main Workspace */}
      <div className="mt-6">
        {images.length === 0 ? (
          /* Initial Dropzone */
          <FileDropzone
            accept="image/jpeg,image/png,image/webp,image/jpg"
            multiple={true}
            title={t.imageToPdfDropTitle}
            subtitle={t.imageToPdfDropSubtitle}
            buttonLabel={t.imageToPdfBtnChoose}
            onFilesSelected={handleFilesSelected}
            icon={<ImageIcon className="w-10 h-10" />}
          />
        ) : generatedPdfBlob ? (
          /* Result Download Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <FileCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {t.pdfToWordDone}
            </h3>
            <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
              Your {images.length} images were compiled into a high-quality PDF document.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                id="btn-download-image-pdf"
                onClick={handleDownload}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{t.imageToPdfDownload}</span>
              </button>

              <button
                onClick={clearAll}
                className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.imageToPdfConvertAnother}</span>
              </button>
            </div>

            {/* In-content after process ad */}
            <AdSlot placement="after-process" />
          </div>
        ) : (
          /* Active Image Editing & Configuration Grid */
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">
                  {images.length} {images.length === 1 ? 'image' : 'images'}
                </span>
                <span className="text-xs text-slate-400">
                  • {t.imageToPdfReorderHint}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="add-more-images-input"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.imageToPdfAddMore}</span>
                  <input
                    id="add-more-images-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                    }}
                  />
                </label>

                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t.imageToPdfClearAll}</span>
                </button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {/* Page index badge */}
                  <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-slate-900/80 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-3/4 bg-slate-100 flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-200"
                      style={{ transform: `rotate(${img.rotation}deg)` }}
                    />
                  </div>

                  {/* Footer Controls */}
                  <div className="p-2 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'left')}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                        title="Move left"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'right')}
                        disabled={idx === images.length - 1}
                        className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                        title="Move right"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => rotateImage(idx)}
                        className="p-1 rounded hover:bg-slate-200 cursor-pointer"
                        title="Rotate 90°"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1 rounded hover:bg-red-100 text-red-500 cursor-pointer"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Options Configuration Panel */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-base mb-4">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>Document Options & Page Settings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {/* Page Size */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {t.imageToPdfPageSize}
                  </label>
                  <select
                    value={settings.pageSize}
                    onChange={(e) =>
                      setSettings({ ...settings, pageSize: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-emerald-500 text-xs"
                  >
                    <option value="a4">{t.optSizeA4}</option>
                    <option value="letter">{t.optSizeLetter}</option>
                    <option value="fit">{t.optSizeFit}</option>
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {t.imageToPdfOrientation}
                  </label>
                  <select
                    value={settings.orientation}
                    onChange={(e) =>
                      setSettings({ ...settings, orientation: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-emerald-500 text-xs"
                  >
                    <option value="portrait">{t.optOrientPortrait}</option>
                    <option value="landscape">{t.optOrientLandscape}</option>
                    <option value="auto">{t.optOrientAuto}</option>
                  </select>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {t.imageToPdfMargin}
                  </label>
                  <select
                    value={settings.margin}
                    onChange={(e) =>
                      setSettings({ ...settings, margin: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-emerald-500 text-xs"
                  >
                    <option value="none">{t.optMarginNone}</option>
                    <option value="small">{t.optMarginSmall}</option>
                    <option value="normal">{t.optMarginNormal}</option>
                  </select>
                </div>

                {/* Quality / Compression */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {t.imageToPdfQuality}
                  </label>
                  <select
                    value={settings.quality}
                    onChange={(e) =>
                      setSettings({ ...settings, quality: parseFloat(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-emerald-500 text-xs"
                  >
                    <option value={1.0}>{t.optQualityHigh}</option>
                    <option value={0.8}>{t.optQualityMedium}</option>
                    <option value={0.6}>{t.optQualityLow}</option>
                  </select>
                </div>
              </div>

              {/* File Name & Main Generate Action */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-72">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {t.imageToPdfFileName}
                  </label>
                  <input
                    type="text"
                    value={settings.fileName}
                    onChange={(e) => setSettings({ ...settings, fileName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:outline-emerald-500"
                    placeholder="my-document.pdf"
                  />
                </div>

                <button
                  id="btn-generate-image-pdf"
                  onClick={handleGeneratePdf}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{isProcessing ? t.imageToPdfCreating : t.imageToPdfCreateBtn}</span>
                </button>
              </div>

              {isProcessing && (
                <ProgressBar percent={progress} message={t.imageToPdfCreating} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Middle Ad Unit */}
      <AdSlot placement="middle" />

      {/* SEO Article & FAQs */}
      <SeoContent
        toolId="image-to-pdf"
        onNavigate={onNavigate}
        steps={[
          {
            step: 1,
            title: 'Select or Drag Images',
            desc: 'Choose JPG, PNG, WEBP or JPEG photos from your phone or computer.',
          },
          {
            step: 2,
            title: 'Arrange & Configure',
            desc: 'Reorder pages, set page orientation (portrait or landscape), margins and quality.',
          },
          {
            step: 3,
            title: 'Create & Download',
            desc: 'Hit Generate and download your beautifully formatted single PDF document instantly.',
          },
        ]}
        faqs={[
          {
            question: 'Can I combine multiple JPG and PNG images into one single PDF?',
            answer:
              'Yes! KR PDF allows you to select up to 50 images of any supported format (JPG, JPEG, PNG, WEBP) and merges them seamlessly into a single consolidated PDF file.',
          },
          {
            question: 'Are my personal images uploaded to any cloud server?',
            answer:
              'No. KR PDF processes all your images directly inside your web browser using modern client-side technologies. Your pictures never leave your computer or smartphone.',
          },
          {
            question: 'What page sizes are supported?',
            answer:
              'You can pick between standard A4 (210 × 297 mm), US Letter, or "Fit to Image" which creates custom PDF pages tailored to each photograph\'s exact dimensions.',
          },
          {
            question: 'Is there any watermark or registration fee?',
            answer:
              'Never. KR PDF is 100% free with no registration, no subscriptions, and zero watermarks added to your documents.',
          },
        ]}
        relatedTools={[
          {
            id: 'pdf-to-word',
            title: t.pdfToWordTitle,
            desc: t.pdfToWordDesc,
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
