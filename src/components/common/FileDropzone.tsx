import React, { useState, useRef } from 'react';
import { UploadCloud, File, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { validateFileSize } from '../../utils/fileValidation';

interface FileDropzoneProps {
  accept: string;
  multiple?: boolean;
  maxSizeBytes?: number;
  title: string;
  subtitle: string;
  buttonLabel: string;
  onFilesSelected: (files: File[]) => void;
  icon?: React.ReactNode;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  accept,
  multiple = false,
  maxSizeBytes = 52428800, // 50 MB
  title,
  subtitle,
  buttonLabel,
  onFilesSelected,
  icon,
}) => {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndPassFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg(null);

    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      const sizeValidation = validateFileSize(f.size, maxSizeBytes);
      if (!sizeValidation.valid) {
        setErrorMsg(`${f.name}: ${sizeValidation.error || t.errorFileSize}`);
        return;
      }
      validFiles.push(f);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    validateAndPassFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndPassFiles(e.target.files);
    // Reset so selecting the exact same file again triggers change event
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        id="dropzone-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center bg-white ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01] shadow-lg shadow-emerald-500/10'
            : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50 shadow-xs'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          id="dropzone-file-input"
        />

        {/* Pulsing Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-5 transition-transform group-hover:scale-105">
          {icon || <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />}
        </div>

        {/* Heading & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
          {subtitle}
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          id="btn-choose-file"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-95 flex items-center gap-2"
        >
          <UploadCloud className="w-5 h-5" />
          <span>{buttonLabel}</span>
        </button>

        {/* Security & Confidentiality Pill */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.privacyBadgeText}</span>
          </div>
          <span>•</span>
          <span>{t.fileLimitsHint}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
