import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { 
  MousePointer, 
  Type, 
  Highlighter, 
  PenTool, 
  FileSignature, 
  Image as ImageIcon, 
  Download, 
  RotateCw, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  AlertCircle, 
  Undo2, 
  Eraser,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

import { 
  EditorToolMode, 
  TextAnnotation, 
  HighlightAnnotation, 
  DrawStroke, 
  SignatureAnnotation, 
  ImageOverlay, 
  PageView 
} from '../../../types';
import { useTranslation } from '../../../i18n/useTranslation';
import { FileDropzone } from '../../common/FileDropzone';
import { SeoContent } from '../../common/SeoContent';
import { AdSlot } from '../../layout/AdSlot';
import { SignatureModal } from './SignatureModal';
import { AnnotationItem } from './AnnotationItem';
import { 
  renderPdfPageToCanvas, 
  getPdfPageThumbnail, 
  saveModifiedPdf, 
  triggerFileDownload 
} from '../../../utils/pdfUtils';
import { trackEvent } from '../../../utils/analytics';

interface PdfEditorToolProps {
  onNavigate: (page: PageView) => void;
}

type ExtendedToolMode = EditorToolMode | 'select' | 'whiteout';

const PENCIL_COLORS = [
  { hex: '#0f172a', name: 'Noir' },
  { hex: '#dc2626', name: 'Rouge' },
  { hex: '#2563eb', name: 'Bleu' },
  { hex: '#16a34a', name: 'Vert' },
  { hex: '#7c3aed', name: 'Violet' },
  { hex: '#ea580c', name: 'Orange' },
];

const PENCIL_WIDTHS = [
  { width: 2, label: 'Fin' },
  { width: 4, label: 'Normal' },
  { width: 6, label: 'Épais' },
  { width: 10, label: 'Feutre' },
];

const HIGHLIGHT_COLORS = [
  { hex: '#fef08a', name: 'Jaune' },
  { hex: '#a7f3d0', name: 'Vert' },
  { hex: '#bae6fd', name: 'Bleu' },
  { hex: '#fbcfe8', name: 'Rose' },
  { hex: '#fed7aa', name: 'Orange' },
];

export const PdfEditorTool: React.FC<PdfEditorToolProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Original unscaled page dimensions
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number }>({
    width: 595,
    height: 842,
  });

  // Tools & Selection
  const [activeTool, setActiveTool] = useState<ExtendedToolMode>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'text' | 'highlight' | 'signature' | 'image' | null>(null);

  // Annotations State
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [highlightAnnotations, setHighlightAnnotations] = useState<HighlightAnnotation[]>([]);
  const [drawStrokes, setDrawStrokes] = useState<DrawStroke[]>([]);
  const [signatures, setSignatures] = useState<SignatureAnnotation[]>([]);
  const [imageOverlays, setImageOverlays] = useState<ImageOverlay[]>([]);

  // Pencil options
  const [pencilColor, setPencilColor] = useState<string>('#0f172a');
  const [pencilWidth, setPencilWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);

  // Highlighter options
  const [highlightColor, setHighlightColor] = useState<string>('#fef08a');

  // Modals & Export state
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  // References
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const origPageNum = pageOrder[currentPage - 1] ?? 1;

  // 1. Handle PDF upload
  const handlePdfSelected = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage(t.errorInvalidFormat);
      return;
    }

    try {
      setErrorMessage(null);
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      const doc = await PDFDocument.load(uint8);
      const pageCount = doc.getPageCount();

      if (pageCount === 0) {
        setErrorMessage(t.errorCorruptPdf);
        return;
      }

      setPdfFile(file);
      setPdfBytes(uint8);
      setTotalPages(pageCount);
      const initialOrder = Array.from({ length: pageCount }, (_, i) => i + 1);
      setPageOrder(initialOrder);
      setCurrentPage(1);

      loadThumbnails(uint8, pageCount);
      trackEvent({ action: 'file_selected', tool: 'edit-pdf' });
    } catch (err) {
      console.error('Failed to load PDF:', err);
      setErrorMessage(t.errorCorruptPdf);
    }
  };

  // Load page thumbnails in background
  const loadThumbnails = async (data: Uint8Array, count: number) => {
    const thumbs: Record<number, string> = {};
    for (let i = 1; i <= Math.min(count, 30); i++) {
      try {
        const thumb = await getPdfPageThumbnail(data, i, 0.25);
        thumbs[i] = thumb;
        setThumbnails((prev) => ({ ...prev, [i]: thumb }));
      } catch (e) {}
    }
  };

  // 2. Redraw freehand strokes on the draw canvas
  const redrawDrawStrokes = useCallback(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokesForPage = drawStrokes.filter((s) => s.pageNumber === origPageNum);
    for (const stroke of strokesForPage) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.lineWidth * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(stroke.points[0].x * scale, stroke.points[0].y * scale);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x * scale, stroke.points[i].y * scale);
      }
      ctx.stroke();
    }
  }, [drawStrokes, origPageNum, scale]);

  // 3. Render PDF page whenever currentPage, scale, or rotation changes
  useEffect(() => {
    if (!pdfBytes || !pdfCanvasRef.current || pageOrder.length === 0) return;

    const rotation = pageRotations[origPageNum] || 0;

    renderPdfPageToCanvas(pdfBytes, origPageNum, pdfCanvasRef.current, scale, rotation)
      .then((info) => {
        setPageDimensions({
          width: Math.round(info.width / scale),
          height: Math.round(info.height / scale),
        });

        if (drawCanvasRef.current) {
          drawCanvasRef.current.width = info.width;
          drawCanvasRef.current.height = info.height;
          redrawDrawStrokes();
        }
      })
      .catch((err) => console.error(err));
  }, [pdfBytes, currentPage, scale, pageOrder, pageRotations, origPageNum, redrawDrawStrokes]);

  // Sync draw strokes when updated
  useEffect(() => {
    redrawDrawStrokes();
  }, [redrawDrawStrokes]);

  // Keyboard shortcut: Delete or Backspace to delete selected item
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault();
        deleteSelectedAnnotation();
      } else if (e.key === 'Escape') {
        setSelectedId(null);
        setSelectedType(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, selectedType]);

  // Delete currently selected item
  const deleteSelectedAnnotation = () => {
    if (!selectedId) return;
    if (selectedType === 'text') {
      setTextAnnotations((prev) => prev.filter((item) => item.id !== selectedId));
    } else if (selectedType === 'highlight') {
      setHighlightAnnotations((prev) => prev.filter((item) => item.id !== selectedId));
    } else if (selectedType === 'signature') {
      setSignatures((prev) => prev.filter((item) => item.id !== selectedId));
    } else if (selectedType === 'image') {
      setImageOverlays((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setSelectedId(null);
    setSelectedType(null);
  };

  // Duplicate currently selected text
  const duplicateSelectedText = (item: TextAnnotation) => {
    const newId = Math.random().toString(36).substring(2, 9);
    const duplicated: TextAnnotation = {
      ...item,
      id: newId,
      x: Math.min(pageDimensions.width - 40, item.x + 15),
      y: Math.min(pageDimensions.height - 40, item.y + 15),
    };
    setTextAnnotations((prev) => [...prev, duplicated]);
    setSelectedId(newId);
  };

  // Freehand Drawing pointer event handlers
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale,
    };
  };

  const handleDrawPointerDown = (e: React.PointerEvent) => {
    if (activeTool !== 'draw') return;
    e.preventDefault();
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setIsDrawing(true);
    setCurrentStroke([coords]);

    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = pencilColor;
    ctx.lineWidth = pencilWidth * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(coords.x * scale, coords.y * scale);
  };

  const handleDrawPointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || activeTool !== 'draw') return;
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setCurrentStroke((prev) => [...prev, coords]);

    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(coords.x * scale, coords.y * scale);
    ctx.stroke();
  };

  const handleDrawPointerUp = () => {
    if (!isDrawing || activeTool !== 'draw') return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      const newStroke: DrawStroke = {
        id: Math.random().toString(36).substring(2, 9),
        pageNumber: origPageNum,
        points: currentStroke,
        color: pencilColor,
        lineWidth: pencilWidth,
      };
      setDrawStrokes((prev) => [...prev, newStroke]);
    }
    setCurrentStroke([]);
  };

  // Undo last freehand drawing stroke
  const handleUndoStroke = () => {
    setDrawStrokes((prev) => {
      const pageStrokes = prev.filter((s) => s.pageNumber === origPageNum);
      if (pageStrokes.length === 0) return prev;
      const lastId = pageStrokes[pageStrokes.length - 1].id;
      return prev.filter((s) => s.id !== lastId);
    });
  };

  // Clear all drawings on current page
  const handleClearDrawings = () => {
    setDrawStrokes((prev) => prev.filter((s) => s.pageNumber !== origPageNum));
  };

  // Click on Page Workspace to add Text, Highlight, or Whiteout
  const handleWorkspaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'select' || activeTool === 'draw') {
      setSelectedId(null);
      setSelectedType(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.round((e.clientX - rect.left) / scale);
    const clickY = Math.round((e.clientY - rect.top) / scale);

    // 1. ADD TEXT
    if (activeTool === 'text') {
      const newId = Math.random().toString(36).substring(2, 9);
      const newText: TextAnnotation = {
        id: newId,
        pageNumber: origPageNum,
        x: Math.max(10, Math.min(pageDimensions.width - 150, clickX)),
        y: Math.max(10, Math.min(pageDimensions.height - 40, clickY)),
        text: 'Nouveau texte',
        fontSize: 16,
        color: '#0f172a',
        isBold: false,
      };
      setTextAnnotations((prev) => [...prev, newText]);
      setSelectedId(newId);
      setSelectedType('text');
      setActiveTool('select');
    }

    // 2. ADD HIGHLIGHT
    else if (activeTool === 'highlight') {
      const newId = Math.random().toString(36).substring(2, 9);
      const newHighlight: HighlightAnnotation = {
        id: newId,
        pageNumber: origPageNum,
        x: Math.max(10, Math.min(pageDimensions.width - 180, clickX)),
        y: Math.max(10, Math.min(pageDimensions.height - 30, clickY)),
        width: 160,
        height: 24,
        color: highlightColor,
      };
      setHighlightAnnotations((prev) => [...prev, newHighlight]);
      setSelectedId(newId);
      setSelectedType('highlight');
      setActiveTool('select');
    }

    // 3. ADD WHITEOUT (Edit like Word)
    else if (activeTool === 'whiteout') {
      const newId = Math.random().toString(36).substring(2, 9);
      const whiteoutText: TextAnnotation = {
        id: newId,
        pageNumber: origPageNum,
        x: Math.max(10, Math.min(pageDimensions.width - 160, clickX)),
        y: Math.max(10, Math.min(pageDimensions.height - 30, clickY)),
        text: ' ',
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: '#ffffff',
        width: 140,
        height: 24,
      };
      setTextAnnotations((prev) => [...prev, whiteoutText]);
      setSelectedId(newId);
      setSelectedType('text');
      setActiveTool('select');
    }
  };

  // Apply signature from modal
  const handleApplySignature = (dataUrl: string) => {
    const newId = Math.random().toString(36).substring(2, 9);
    const sigW = 180;
    const sigH = 80;
    const centerX = Math.max(20, Math.round(pageDimensions.width / 2 - sigW / 2));
    const centerY = Math.max(40, Math.round(pageDimensions.height / 2 - sigH / 2));

    const newSig: SignatureAnnotation = {
      id: newId,
      pageNumber: origPageNum,
      x: centerX,
      y: centerY,
      width: sigW,
      height: sigH,
      dataUrl,
    };

    setSignatures((prev) => [...prev, newSig]);
    setSelectedId(newId);
    setSelectedType('signature');
    setActiveTool('select');
  };

  // Apply image upload
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const newId = Math.random().toString(36).substring(2, 9);
      const imgW = 160;
      const imgH = 120;
      const centerX = Math.max(20, Math.round(pageDimensions.width / 2 - imgW / 2));
      const centerY = Math.max(40, Math.round(pageDimensions.height / 2 - imgH / 2));

      const newImg: ImageOverlay = {
        id: newId,
        pageNumber: origPageNum,
        x: centerX,
        y: centerY,
        width: imgW,
        height: imgH,
        dataUrl,
      };

      setImageOverlays((prev) => [...prev, newImg]);
      setSelectedId(newId);
      setSelectedType('image');
      setActiveTool('select');

      if (imageUploadRef.current) {
        imageUploadRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  // Page manipulation: Rotate
  const rotateCurrentPage = () => {
    setPageRotations((prev) => ({
      ...prev,
      [origPageNum]: ((prev[origPageNum] || 0) + 90) % 360,
    }));
  };

  // Page manipulation: Delete
  const deleteCurrentPage = () => {
    if (pageOrder.length <= 1) {
      alert('Un document doit comporter au moins une page.');
      return;
    }
    const newOrder = [...pageOrder];
    newOrder.splice(currentPage - 1, 1);
    setPageOrder(newOrder);
    if (currentPage > newOrder.length) {
      setCurrentPage(newOrder.length);
    }
  };

  // Page manipulation: Reorder
  const moveCurrentPage = (direction: 'left' | 'right') => {
    const target = direction === 'left' ? currentPage - 2 : currentPage;
    if (target < 0 || target >= pageOrder.length) return;

    const newOrder = [...pageOrder];
    const [moved] = newOrder.splice(currentPage - 1, 1);
    newOrder.splice(target, 0, moved);
    setPageOrder(newOrder);
    setCurrentPage(target + 1);
  };

  // Save & Download modified PDF
  const handleSaveAndDownload = async () => {
    if (!pdfBytes) return;
    setIsSaving(true);
    setSaveProgress(20);
    const startTime = performance.now();

    try {
      trackEvent({ action: 'conversion_started', tool: 'edit-pdf' });
      setSaveProgress(60);

      const modifiedBytes = await saveModifiedPdf(
        pdfBytes,
        pageOrder,
        pageRotations,
        textAnnotations,
        highlightAnnotations,
        drawStrokes,
        signatures,
        imageOverlays
      );

      setSaveProgress(100);
      const blob = new Blob([modifiedBytes], { type: 'application/pdf' });
      const fileName = pdfFile?.name.replace(/\.pdf$/i, '') + '-modifie.pdf';
      triggerFileDownload(blob, fileName);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsSaving(false);
      trackEvent({
        action: 'conversion_success',
        tool: 'edit-pdf',
        durationMs: performance.now() - startTime,
      });
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      setErrorMessage(t.errorGeneral);
    }
  };

  // Filter current page annotations
  const pageTexts = textAnnotations.filter((t) => t.pageNumber === origPageNum);
  const pageHighlights = highlightAnnotations.filter((h) => h.pageNumber === origPageNum);
  const pageSignatures = signatures.filter((s) => s.pageNumber === origPageNum);
  const pageImages = imageOverlays.filter((img) => img.pageNumber === origPageNum);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Tool Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.editorH1}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.editorDesc}
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
            className="text-xs font-bold underline hover:opacity-80 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Main Workspace */}
      <div className="mt-6">
        {!pdfBytes ? (
          <FileDropzone
            accept="application/pdf,.pdf"
            multiple={false}
            title={t.editorDropTitle}
            subtitle={t.editorDropSubtitle}
            buttonLabel={t.editorBtnChoose}
            onFilesSelected={handlePdfSelected}
            icon={<Edit3 className="w-10 h-10" />}
          />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            
            {/* Primary Top Toolbar */}
            <div className="p-3 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              
              {/* Tool Mode Selectors */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* 1. Select & Move Tool */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool('select');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTool === 'select'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title="Sélectionner, déplacer et modifier des éléments"
                >
                  <MousePointer className="w-4 h-4" />
                  <span>{t.editorToolNavigate}</span>
                </button>

                {/* 2. Text Tool */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool('text');
                    setSelectedId(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTool === 'text'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title="Cliquer sur le document pour ajouter du texte"
                >
                  <Type className="w-4 h-4" />
                  <span>{t.editorToolText}</span>
                </button>

                {/* 3. Highlighter Tool */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool('highlight');
                    setSelectedId(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTool === 'highlight'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title="Surligner du texte avec choix de couleurs"
                >
                  <Highlighter className="w-4 h-4" />
                  <span>{t.editorToolHighlight}</span>
                </button>

                {/* 4. Pencil / Drawing Tool */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool('draw');
                    setSelectedId(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTool === 'draw'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title="Dessiner ou annoter librement avec choix de couleurs"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{t.editorToolDraw}</span>
                </button>

                {/* 5. Signature Tool */}
                <button
                  type="button"
                  onClick={() => setSignatureModalOpen(true)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Créer et apposer une signature"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>{t.editorToolSignature}</span>
                </button>

                {/* 6. Photo / Image Tool */}
                <label className="px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  <span>{t.editorToolImage}</span>
                  <input
                    ref={imageUploadRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileSelected}
                    className="hidden"
                  />
                </label>

                {/* 7. Whiteout / Mask Tool (Edit like Word) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool('whiteout');
                    setSelectedId(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTool === 'whiteout'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title="Masquer ou effacer du texte existant pour éditer comme dans Word"
                >
                  <Eraser className="w-4 h-4" />
                  <span>Masquer / Effaceur</span>
                </button>
              </div>

              {/* Download / Export Button */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-save-modified-pdf"
                  onClick={handleSaveAndDownload}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSaving ? t.editorSaving : t.editorSaveDownload}</span>
                </button>
              </div>
            </div>

            {/* Contextual Sub-Toolbar for Active Tool Options */}
            {activeTool === 'draw' && (
              <div className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-300">Couleur du crayon :</span>
                  <div className="flex items-center gap-1.5">
                    {PENCIL_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setPencilColor(c.hex)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-5 h-5 rounded-full border border-slate-500 cursor-pointer transition-transform ${
                          pencilColor.toLowerCase() === c.hex.toLowerCase()
                            ? 'ring-2 ring-emerald-400 scale-110'
                            : 'hover:scale-105'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <span className="font-medium text-slate-300 ml-3">Épaisseur :</span>
                  <div className="flex items-center gap-1">
                    {PENCIL_WIDTHS.map((w) => (
                      <button
                        key={w.width}
                        type="button"
                        onClick={() => setPencilWidth(w.width)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                          pencilWidth === w.width
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleUndoStroke}
                    className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium flex items-center gap-1 cursor-pointer"
                    title="Annuler le dernier trait"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Annuler</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearDrawings}
                    className="px-2.5 py-1 rounded-lg bg-red-900/40 hover:bg-red-900/60 text-red-300 font-medium flex items-center gap-1 cursor-pointer"
                    title="Effacer tous les dessins de cette page"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Effacer tout</span>
                  </button>
                </div>
              </div>
            )}

            {activeTool === 'highlight' && (
              <div className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-300">Couleur du surligneur :</span>
                  <div className="flex items-center gap-1.5">
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setHighlightColor(c.hex)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-5 h-5 rounded-full border border-slate-500 cursor-pointer transition-transform ${
                          highlightColor.toLowerCase() === c.hex.toLowerCase()
                            ? 'ring-2 ring-emerald-400 scale-110'
                            : 'hover:scale-105'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cliquez sur le document pour placer un surlignage et ajustez sa taille.</span>
                </div>
              </div>
            )}

            {activeTool === 'whiteout' && (
              <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-900/40 flex items-center justify-between gap-3 text-xs text-emerald-200 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Eraser className="w-4 h-4 text-emerald-400" />
                  <span>
                    <strong>Mode Édition Word :</strong> Cliquez sur le document pour masquer du texte existant avec un rectangle blanc, puis ajoutez votre nouveau texte par-dessus !
                  </span>
                </div>
              </div>
            )}

            {/* Secondary Page Navigation & Zoom Bar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  title="Page précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="font-semibold text-slate-800">
                  {t.editorPageOf
                    .replace('{current}', String(currentPage))
                    .replace('{total}', String(pageOrder.length))}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(pageOrder.length, p + 1))}
                  disabled={currentPage >= pageOrder.length}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  title="Page suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Page manipulation: Rotate, Move, Delete */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={rotateCurrentPage}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-medium flex items-center gap-1 cursor-pointer"
                  title="Pivoter la page de 90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.editorRotate}</span>
                </button>

                <button
                  type="button"
                  onClick={() => moveCurrentPage('left')}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Déplacer la page vers la gauche"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => moveCurrentPage('right')}
                  disabled={currentPage === pageOrder.length}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Déplacer la page vers la droite"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={deleteCurrentPage}
                  className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-medium flex items-center gap-1 cursor-pointer"
                  title="Supprimer la page"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.editorDeletePage}</span>
                </button>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.max(0.6, Number((s - 0.2).toFixed(1))))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  title="Zoom arrière"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono px-1">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.2).toFixed(1))))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  title="Zoom avant"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Document Stage */}
            <div className="flex-1 bg-slate-100/70 p-4 sm:p-8 flex items-center justify-center overflow-auto min-h-[500px]">
              <div
                ref={containerRef}
                onClick={handleWorkspaceClick}
                style={{
                  width: `${pageDimensions.width * scale}px`,
                  height: `${pageDimensions.height * scale}px`,
                }}
                className={`relative shadow-2xl bg-white border border-slate-300 select-none ${
                  activeTool === 'select'
                    ? 'cursor-default'
                    : activeTool === 'draw'
                    ? 'cursor-crosshair'
                    : 'cursor-cell'
                }`}
              >
                {/* 1. Underlying Rendered PDF Canvas */}
                <canvas ref={pdfCanvasRef} className="block pointer-events-none" />

                {/* 2. Freehand Drawing Canvas */}
                <canvas
                  ref={drawCanvasRef}
                  onPointerDown={handleDrawPointerDown}
                  onPointerMove={handleDrawPointerMove}
                  onPointerUp={handleDrawPointerUp}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: activeTool === 'draw' ? 30 : 10,
                    pointerEvents: activeTool === 'draw' ? 'auto' : 'none',
                    touchAction: 'none',
                  }}
                />

                {/* 3. Interactive Annotations DOM Layer */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: activeTool === 'draw' ? 10 : 25,
                    pointerEvents: activeTool === 'draw' ? 'none' : 'auto',
                  }}
                >
                  {/* Highlights */}
                  {pageHighlights.map((hl) => (
                    <AnnotationItem
                      key={hl.id}
                      type="highlight"
                      item={hl}
                      scale={scale}
                      isSelected={selectedId === hl.id}
                      onSelect={() => {
                        setSelectedId(hl.id);
                        setSelectedType('highlight');
                      }}
                      onChange={(updated) =>
                        setHighlightAnnotations((prev) =>
                          prev.map((item) => (item.id === updated.id ? updated : item))
                        )
                      }
                      onDelete={() =>
                        setHighlightAnnotations((prev) => prev.filter((item) => item.id !== hl.id))
                      }
                      pageWidth={pageDimensions.width}
                      pageHeight={pageDimensions.height}
                    />
                  ))}

                  {/* Texts (including whiteouts) */}
                  {pageTexts.map((txt) => (
                    <AnnotationItem
                      key={txt.id}
                      type="text"
                      item={txt}
                      scale={scale}
                      isSelected={selectedId === txt.id}
                      onSelect={() => {
                        setSelectedId(txt.id);
                        setSelectedType('text');
                      }}
                      onChange={(updated) =>
                        setTextAnnotations((prev) =>
                          prev.map((item) => (item.id === updated.id ? updated : item))
                        )
                      }
                      onDelete={() =>
                        setTextAnnotations((prev) => prev.filter((item) => item.id !== txt.id))
                      }
                      onDuplicate={() => duplicateSelectedText(txt)}
                      pageWidth={pageDimensions.width}
                      pageHeight={pageDimensions.height}
                    />
                  ))}

                  {/* Signatures */}
                  {pageSignatures.map((sig) => (
                    <AnnotationItem
                      key={sig.id}
                      type="signature"
                      item={sig}
                      scale={scale}
                      isSelected={selectedId === sig.id}
                      onSelect={() => {
                        setSelectedId(sig.id);
                        setSelectedType('signature');
                      }}
                      onChange={(updated) =>
                        setSignatures((prev) =>
                          prev.map((item) => (item.id === updated.id ? updated : item))
                        )
                      }
                      onDelete={() =>
                        setSignatures((prev) => prev.filter((item) => item.id !== sig.id))
                      }
                      pageWidth={pageDimensions.width}
                      pageHeight={pageDimensions.height}
                    />
                  ))}

                  {/* Images / Stamps */}
                  {pageImages.map((img) => (
                    <AnnotationItem
                      key={img.id}
                      type="image"
                      item={img}
                      scale={scale}
                      isSelected={selectedId === img.id}
                      onSelect={() => {
                        setSelectedId(img.id);
                        setSelectedType('image');
                      }}
                      onChange={(updated) =>
                        setImageOverlays((prev) =>
                          prev.map((item) => (item.id === updated.id ? updated : item))
                        )
                      }
                      onDelete={() =>
                        setImageOverlays((prev) => prev.filter((item) => item.id !== img.id))
                      }
                      pageWidth={pageDimensions.width}
                      pageHeight={pageDimensions.height}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Pages Filmstrip */}
            {pageOrder.length > 1 && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto flex items-center gap-3">
                {pageOrder.map((origPage, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentPage(idx + 1);
                      setSelectedId(null);
                      setSelectedType(null);
                    }}
                    className={`relative shrink-0 rounded-lg p-1 border-2 transition-all cursor-pointer ${
                      currentPage === idx + 1
                        ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-16 h-20 bg-slate-100 flex items-center justify-center overflow-hidden">
                      {thumbnails[origPage] ? (
                        <img
                          src={thumbnails[origPage]}
                          alt={`Page ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <span className="block text-center text-[10px] font-semibold text-slate-600 mt-1">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        onSave={handleApplySignature}
      />

      {/* SEO & Educational Content */}
      <div className="mt-16">
        <SeoContent
          title={t.editorH1}
          description={t.editorDesc}
          features={[
            {
              title: 'Édition complète comme dans Word',
              description:
                'Ajoutez, modifiez ou masquez du texte existant avec l’effaceur blanc, repositionnez librement chaque élément sur vos documents PDF.',
            },
            {
              title: 'Signature & Images faciles à déplacer',
              description:
                'Dessinez votre signature manuscrite ou importez vos photos et tampons en un clic, puis placez-les et redimensionnez-les avec précision.',
            },
            {
              title: 'Surligneur & Crayon multicolores',
              description:
                'Choisissez parmi plusieurs palettes de couleurs pour surligner les passages importants ou dessiner des annotations précises.',
            },
            {
              title: 'Organisation des pages',
              description:
                'Réordonnez les pages par glisser-déposer, pivotez-les à 90° ou supprimez les pages superflues avant de télécharger.',
            },
          ]}
          faqs={[
            {
              question: 'Comment éditer le texte d\'un PDF comme un document Word ?',
              answer:
                'Utilisez l\'outil "Masquer / Effaceur" ou cochez "Fond blanc" sur un texte pour recouvrir l\'ancien texte, puis tapez votre nouveau texte avec la police et la couleur de votre choix.',
            },
            {
              question: 'Puis-je déplacer et redimensionner ma signature et mes images ?',
              answer:
                'Oui ! Dès que votre signature ou image est ajoutée, elle apparaît au centre avec un cadre de sélection. Utilisez la poignée pour la déplacer n\'importe où et le coin inférieur droit pour la redimensionner.',
            },
            {
              question: 'Mes fichiers restent-ils confidentiels ?',
              answer:
                'Absolument. Tout le traitement et l\'édition du PDF sont effectués localement et en toute sécurité directement dans votre navigateur web.',
            },
          ]}
        />
      </div>

      {/* Bottom Ad Slot */}
      <div className="mt-12">
        <AdSlot format="horizontal" />
      </div>
    </div>
  );
};
