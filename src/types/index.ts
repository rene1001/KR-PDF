export type Language = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'it' | 'ar';

export type ToolId = 
  | 'pdf-to-word'
  | 'image-to-pdf'
  | 'edit-pdf'
  | 'merge-pdf'
  | 'split-pdf';

export type PageView = 
  | 'home'
  | 'pdf-to-word'
  | 'image-to-pdf'
  | 'edit-pdf'
  | 'merge-pdf'
  | 'split-pdf'
  | 'privacy-policy'
  | 'terms'
  | 'cookie-policy'
  | 'about'
  | 'contact';

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
}

export type PageSizeOption = 'a4' | 'letter' | 'fit';
export type PageOrientationOption = 'portrait' | 'landscape' | 'auto';
export type PageMarginOption = 'none' | 'small' | 'normal';

export interface ImageToPdfSettings {
  pageSize: PageSizeOption;
  orientation: PageOrientationOption;
  margin: PageMarginOption;
  quality: number; // 0.1 to 1.0
  fileName: string;
}

export interface PdfPageInfo {
  pageNumber: number; // 1-based
  rotation: number; // 0, 90, 180, 270
  width: number;
  height: number;
  thumbnailUrl?: string;
  isDeleted?: boolean;
}

export type EditorToolMode = 'navigate' | 'text' | 'highlight' | 'draw' | 'signature' | 'image';

export interface TextAnnotation {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  isBold?: boolean;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export interface HighlightAnnotation {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface DrawStroke {
  id: string;
  pageNumber: number;
  points: { x: number; y: number }[];
  color: string;
  lineWidth: number;
}

export interface SignatureAnnotation {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
}

export interface ImageOverlay {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
}

export interface ConversionProgress {
  status: 'idle' | 'reading' | 'analyzing' | 'extracting' | 'building' | 'done' | 'error';
  percent: number;
  message: string;
  error?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: ToolId;
  slug: string;
  aliases: string[];
  nameKey: string;
  descKey: string;
  h1Key: string;
  metaDescKey: string;
  iconName: string;
  color: string;
  acceptedFormats: string[];
  outputFormat: string;
}
