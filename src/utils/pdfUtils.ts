// Polyfills for browser / runtime compatibility with pdfjs-dist v5
if (typeof Uint8Array !== 'undefined' && !(Uint8Array.prototype as any).toHex) {
  (Uint8Array.prototype as any).toHex = function () {
    return Array.from(this)
      .map((b: any) => b.toString(16).padStart(2, '0'))
      .join('');
  };
}
if (typeof Promise !== 'undefined' && !(Promise as any).try) {
  (Promise as any).try = function (fn: any, ...args: any[]) {
    return new Promise((resolve) => resolve(fn(...args)));
  };
}

import { PDFDocument, rgb, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { 
  ImageItem, 
  ImageToPdfSettings, 
  TextAnnotation, 
  HighlightAnnotation, 
  DrawStroke, 
  SignatureAnnotation, 
  ImageOverlay 
} from '../types';

// Configure pdfjs worker
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  } catch (e) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
  }
}

/**
 * Convert images into a single PDF document using pdf-lib
 */
export async function generatePdfFromImages(
  images: ImageItem[],
  settings: ImageToPdfSettings,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Page dimensions in points (1 pt = 1/72 inch)
  // A4: 595.28 x 841.89 pt
  // Letter: 612 x 792 pt
  const PAGE_SIZES = {
    a4: { width: 595.28, height: 841.89 },
    letter: { width: 612, height: 792 },
  };

  const MARGINS = {
    none: 0,
    small: 20,
    normal: 40,
  };

  const baseMargin = MARGINS[settings.margin] ?? 0;

  for (let i = 0; i < images.length; i++) {
    const imgItem = images[i];
    if (onProgress) {
      onProgress(Math.round(((i + 1) / images.length) * 90));
    }

    // Convert file/image to arrayBuffer
    const arrayBuffer = await imgItem.file.arrayBuffer();
    const mimeType = imgItem.file.type.toLowerCase();

    let embeddedImage;
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
    } else if (mimeType === 'image/png') {
      embeddedImage = await pdfDoc.embedPng(arrayBuffer);
    } else {
      // WEBP or other formats: convert via HTML Canvas to PNG first
      const pngBytes = await convertBlobToPngBytes(imgItem.file, settings.quality);
      embeddedImage = await pdfDoc.embedPng(pngBytes);
    }

    const imgWidth = embeddedImage.width;
    const imgHeight = embeddedImage.height;

    // Determine target page width and height
    let pageWidth: number;
    let pageHeight: number;

    if (settings.pageSize === 'fit') {
      pageWidth = imgWidth + baseMargin * 2;
      pageHeight = imgHeight + baseMargin * 2;
    } else {
      const baseDim = PAGE_SIZES[settings.pageSize] || PAGE_SIZES.a4;
      let isLandscape = false;
      if (settings.orientation === 'landscape') {
        isLandscape = true;
      } else if (settings.orientation === 'auto') {
        isLandscape = imgWidth > imgHeight;
      }

      if (isLandscape) {
        pageWidth = Math.max(baseDim.width, baseDim.height);
        pageHeight = Math.min(baseDim.width, baseDim.height);
      } else {
        pageWidth = Math.min(baseDim.width, baseDim.height);
        pageHeight = Math.max(baseDim.width, baseDim.height);
      }
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Apply rotation if item was rotated in UI
    if (imgItem.rotation) {
      page.setRotation(degrees(imgItem.rotation));
    }

    // Compute fitted drawing dimensions inside page minus margins
    const availableWidth = Math.max(10, pageWidth - baseMargin * 2);
    const availableHeight = Math.max(10, pageHeight - baseMargin * 2);

    const scale = Math.min(availableWidth / imgWidth, availableHeight / imgHeight, 1);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;

    const x = baseMargin + (availableWidth - renderWidth) / 2;
    const y = baseMargin + (availableHeight - renderHeight) / 2;

    page.drawImage(embeddedImage, {
      x,
      y,
      width: renderWidth,
      height: renderHeight,
    });
  }

  if (onProgress) onProgress(100);
  return await pdfDoc.save();
}

/**
 * Helper to convert any image file (e.g. WebP, Gif) to PNG byte array using Canvas
 */
async function convertBlobToPngBytes(file: File, quality: number = 0.85): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be created'));
        return;
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert canvas to blob'));
            return;
          }
          const buffer = await blob.arrayBuffer();
          resolve(new Uint8Array(buffer));
        },
        'image/png',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for conversion'));
    };

    img.src = objectUrl;
  });
}

/**
 * Render a single PDF page to a HTML Canvas
 */
export async function renderPdfPageToCanvas(
  pdfData: Uint8Array,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale: number = 1.2,
  rotationDegree: number = 0
): Promise<{ width: number; height: number; totalPages: number }> {
  const loadingTask = pdfjsLib.getDocument({ data: pdfData.slice(0) });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(pageNumber);

  const desiredRotation = (page.rotate + rotationDegree) % 360;
  const viewport = page.getViewport({ scale, rotation: desiredRotation });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Cannot get canvas 2d context');

  context.clearRect(0, 0, canvas.width, canvas.height);

  const renderContext: any = {
    canvasContext: context,
    viewport: viewport,
    canvas: canvas,
  };

  await page.render(renderContext).promise;

  return {
    width: viewport.width,
    height: viewport.height,
    totalPages: pdf.numPages,
  };
}

/**
 * Generate a thumbnail data URL for a specific page of a PDF
 */
export async function getPdfPageThumbnail(
  pdfData: Uint8Array,
  pageNumber: number,
  scale: number = 0.3,
  rotation: number = 0
): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderPdfPageToCanvas(pdfData, pageNumber, canvas, scale, rotation);
  return canvas.toDataURL('image/jpeg', 0.8);
}

/**
 * Extract all text and structured items from a PDF for Word conversion
 */
export async function extractPdfStructuredContent(
  pdfData: Uint8Array,
  onProgress?: (percent: number, msg: string) => void
): Promise<{
  pages: Array<{
    pageNumber: number;
    paragraphs: string[];
    images?: string[];
  }>;
}> {
  const loadingTask = pdfjsLib.getDocument({ data: pdfData.slice(0) });
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  const resultPages: Array<{ pageNumber: number; paragraphs: string[]; images?: string[] }> = [];

  for (let i = 1; i <= totalPages; i++) {
    if (onProgress) {
      onProgress(Math.round((i / totalPages) * 70), `Analyzing page ${i} of ${totalPages}...`);
    }

    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    // Group items into lines and paragraphs based on vertical Y coordinates
    const items = textContent.items as Array<{ str: string; transform: number[]; hasEOL?: boolean }>;
    const lineMap: Map<number, string[]> = new Map();

    for (const item of items) {
      if (!item.str || item.str.trim() === '') continue;
      // transform[5] is the Y-coordinate
      const yCoord = Math.round(item.transform[5]);
      // bucket by approximate baseline (within 4 points)
      let foundBucket = false;
      for (const key of lineMap.keys()) {
        if (Math.abs(key - yCoord) <= 4) {
          lineMap.get(key)!.push(item.str);
          foundBucket = true;
          break;
        }
      }
      if (!foundBucket) {
        lineMap.set(yCoord, [item.str]);
      }
    }

    // Sort lines from top (highest Y) to bottom (lowest Y)
    const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
    const lines = sortedY.map((y) => lineMap.get(y)!.join(' ').trim()).filter(Boolean);

    // If page has almost no text (e.g. scanned image PDF), render page thumbnail to embed in DOCX
    let fallbackImage: string | undefined;
    if (lines.length === 0) {
      try {
        fallbackImage = await getPdfPageThumbnail(pdfData, i, 1.2);
      } catch (e) {
        // Continue if thumbnail generation fails
      }
    }

    resultPages.push({
      pageNumber: i,
      paragraphs: lines.length > 0 ? lines : ['[Scanned page content]'],
      images: fallbackImage ? [fallbackImage] : undefined,
    });
  }

  return { pages: resultPages };
}

/**
 * Merge multiple PDF files into one
 */
export async function mergePdfFiles(
  pdfFiles: File[],
  onProgress?: (percent: number) => void
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < pdfFiles.length; i++) {
    const file = pdfFiles[i];
    const buffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    if (onProgress) {
      onProgress(Math.round(((i + 1) / pdfFiles.length) * 100));
    }
  }

  return await mergedPdf.save();
}

/**
 * Split a PDF file to extract specific page ranges (e.g. 1-3, 5)
 */
export async function splitPdfFile(
  file: File,
  pageNumbersToKeep: number[] // 1-based indices
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(buffer);
  const totalPages = sourceDoc.getPageCount();

  const newDoc = await PDFDocument.create();
  // Filter valid 0-based page indices
  const validIndices = pageNumbersToKeep
    .filter((p) => p >= 1 && p <= totalPages)
    .map((p) => p - 1);

  if (validIndices.length === 0) {
    throw new Error('No valid page numbers selected to extract');
  }

  const copiedPages = await newDoc.copyPages(sourceDoc, validIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  return await newDoc.save();
}

function parseHexToRgb(hex: string | undefined, defaultRgb = { r: 0, g: 0, b: 0 }) {
  if (!hex) return defaultRgb;
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b };
  } else if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b };
  }
  return defaultRgb;
}

/**
 * Save modifications to a PDF document (deletions, rotations, reordering, annotations)
 */
export async function saveModifiedPdf(
  originalPdfBytes: Uint8Array,
  pageOrder: number[], // 1-based page numbers in desired order
  pageRotations: Record<number, number>, // pageNumber -> additional rotation degrees (0, 90, 180, 270)
  textAnnotations: TextAnnotation[],
  highlightAnnotations: HighlightAnnotation[],
  drawStrokes: DrawStroke[],
  signatures: SignatureAnnotation[],
  imageOverlays: ImageOverlay[]
): Promise<Uint8Array> {
  const sourceDoc = await PDFDocument.load(originalPdfBytes);
  const newDoc = await PDFDocument.create();

  // Reorder and copy pages
  for (let i = 0; i < pageOrder.length; i++) {
    const originalPageNum = pageOrder[i];
    const pageIndex = originalPageNum - 1;

    const [copiedPage] = await newDoc.copyPages(sourceDoc, [pageIndex]);
    const addedPage = newDoc.addPage(copiedPage);

    // Apply rotation if modified
    const extraRotation = pageRotations[originalPageNum] || 0;
    if (extraRotation) {
      const currentRot = addedPage.getRotation().angle;
      addedPage.setRotation(degrees((currentRot + extraRotation) % 360));
    }

    const { width, height } = addedPage.getSize();

    // 1. Draw highlights with selected colors
    const pageHighlights = highlightAnnotations.filter((h) => h.pageNumber === originalPageNum);
    for (const h of pageHighlights) {
      const c = parseHexToRgb(h.color, { r: 1, g: 0.95, b: 0.2 });
      addedPage.drawRectangle({
        x: h.x,
        y: height - h.y - h.height,
        width: h.width,
        height: h.height,
        color: rgb(c.r, c.g, c.b),
        opacity: 0.45,
      });
    }

    // 2. Draw freehand pencil strokes with selected colors and line width
    const pageStrokes = drawStrokes.filter((s) => s.pageNumber === originalPageNum);
    for (const stroke of pageStrokes) {
      if (stroke.points.length < 2) continue;
      const c = parseHexToRgb(stroke.color, { r: 0.06, g: 0.72, b: 0.5 });
      for (let p = 0; p < stroke.points.length - 1; p++) {
        const p1 = stroke.points[p];
        const p2 = stroke.points[p + 1];
        addedPage.drawLine({
          start: { x: p1.x, y: height - p1.y },
          end: { x: p2.x, y: height - p2.y },
          thickness: stroke.lineWidth || 2,
          color: rgb(c.r, c.g, c.b),
          opacity: 0.85,
        });
      }
    }

    // 3. Draw text annotations (supports custom color and optional whiteout background)
    const pageTexts = textAnnotations.filter((t) => t.pageNumber === originalPageNum);
    for (const txt of pageTexts) {
      const c = parseHexToRgb(txt.color, { r: 0.1, g: 0.1, b: 0.1 });
      
      // Optional background box (e.g. whiteout to edit existing PDF like Word)
      if (txt.backgroundColor) {
        const bg = parseHexToRgb(txt.backgroundColor, { r: 1, g: 1, b: 1 });
        const textWidth = txt.width || (txt.fontSize || 16) * (txt.text.length * 0.55);
        const textHeight = (txt.fontSize || 16) * 1.35;
        addedPage.drawRectangle({
          x: txt.x - 2,
          y: height - txt.y - textHeight + 2,
          width: textWidth + 6,
          height: textHeight,
          color: rgb(bg.r, bg.g, bg.b),
          opacity: 1,
        });
      }

      try {
        addedPage.drawText(txt.text, {
          x: txt.x,
          y: height - txt.y - (txt.fontSize || 16),
          size: txt.fontSize || 16,
          color: rgb(c.r, c.g, c.b),
        });
      } catch (err) {
        // Fallback for characters outside standard WinAnsi font charset
        try {
          const sanitized = txt.text.replace(/[^\x20-\xFF]/g, '?');
          addedPage.drawText(sanitized, {
            x: txt.x,
            y: height - txt.y - (txt.fontSize || 16),
            size: txt.fontSize || 16,
            color: rgb(c.r, c.g, c.b),
          });
        } catch (e2) {}
      }
    }

    // 4. Draw signatures
    const pageSignatures = signatures.filter((s) => s.pageNumber === originalPageNum);
    for (const sig of pageSignatures) {
      try {
        const pngImage = await newDoc.embedPng(sig.dataUrl);
        addedPage.drawImage(pngImage, {
          x: sig.x,
          y: height - sig.y - sig.height,
          width: sig.width,
          height: sig.height,
        });
      } catch (e) {
        // Skip invalid image
      }
    }

    // 5. Draw images / stamps (supports both JPEG and PNG)
    const pageImages = imageOverlays.filter((img) => img.pageNumber === originalPageNum);
    for (const img of pageImages) {
      try {
        let embeddedImage;
        if (img.dataUrl.startsWith('data:image/jpeg') || img.dataUrl.startsWith('data:image/jpg')) {
          embeddedImage = await newDoc.embedJpg(img.dataUrl);
        } else {
          embeddedImage = await newDoc.embedPng(img.dataUrl);
        }
        addedPage.drawImage(embeddedImage, {
          x: img.x,
          y: height - img.y - img.height,
          width: img.width,
          height: img.height,
        });
      } catch (e) {
        // Skip invalid image
      }
    }
  }

  return await newDoc.save();
}

/**
 * Trigger browser file download helper with safe filename sanitization
 */
export function triggerFileDownload(blob: Blob, fileName: string) {
  const safeName = fileName.replace(/[/\\?%*:|"<>]/g, '_').replace(/\.\.+/g, '_') || 'download';
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
