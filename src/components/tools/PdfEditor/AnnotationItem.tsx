import React, { useState, useRef, useEffect } from 'react';
import { 
  Move, 
  Trash2, 
  Copy, 
  Bold, 
  Check, 
  Edit2, 
  Maximize2 
} from 'lucide-react';
import { 
  TextAnnotation, 
  HighlightAnnotation, 
  SignatureAnnotation, 
  ImageOverlay 
} from '../../../types';

export type AnnotationType = 'text' | 'highlight' | 'signature' | 'image';

interface AnnotationItemProps {
  type: AnnotationType;
  item: TextAnnotation | HighlightAnnotation | SignatureAnnotation | ImageOverlay;
  scale: number;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updated: any) => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  pageWidth: number;
  pageHeight: number;
}

const TEXT_COLORS = [
  { hex: '#0f172a', name: 'Noir' },
  { hex: '#1e3a8a', name: 'Bleu foncé' },
  { hex: '#dc2626', name: 'Rouge' },
  { hex: '#16a34a', name: 'Vert' },
  { hex: '#7c3aed', name: 'Violet' },
  { hex: '#ea580c', name: 'Orange' },
];

const HIGHLIGHT_COLORS = [
  { hex: '#fef08a', name: 'Jaune' },
  { hex: '#a7f3d0', name: 'Vert' },
  { hex: '#bae6fd', name: 'Bleu' },
  { hex: '#fbcfe8', name: 'Rose' },
  { hex: '#fed7aa', name: 'Orange' },
];

export const AnnotationItem: React.FC<AnnotationItemProps> = ({
  type,
  item,
  scale,
  isSelected,
  onSelect,
  onChange,
  onDelete,
  onDuplicate,
  pageWidth,
  pageHeight,
}) => {
  const [isEditingText, setIsEditingText] = useState(false);
  const [editText, setEditText] = useState((item as TextAnnotation).text || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditingText && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingText]);

  // Pointer-based smooth dragging
  const handleDragPointerDown = (e: React.PointerEvent) => {
    if (isEditingText) return;
    e.stopPropagation();
    e.preventDefault();
    onSelect();

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startX = item.x;
    const startY = item.y;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = (moveEvent.clientX - startClientX) / scale;
      const dy = (moveEvent.clientY - startClientY) / scale;

      const itemW = (item as any).width || 120;
      const itemH = (item as any).height || (item as any).fontSize || 30;

      const newX = Math.max(0, Math.min(pageWidth - 20, Math.round(startX + dx)));
      const newY = Math.max(0, Math.min(pageHeight - 20, Math.round(startY + dy)));

      onChange({ ...item, x: newX, y: newY });
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Pointer-based corner resizing
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startW = (item as any).width || 140;
    const startH = (item as any).height || 60;
    const aspectRatio = startW / (startH || 1);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = (moveEvent.clientX - startClientX) / scale;
      const dy = (moveEvent.clientY - startClientY) / scale;

      let newW = Math.max(30, Math.min(pageWidth - item.x, Math.round(startW + dx)));
      let newH = Math.max(16, Math.min(pageHeight - item.y, Math.round(startH + dy)));

      // Keep aspect ratio for signatures & images unless shift key is pressed
      if (type === 'signature' || type === 'image') {
        if (!moveEvent.shiftKey) {
          newH = Math.round(newW / aspectRatio);
        }
      }

      onChange({ ...item, width: newW, height: newH });
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleFinishTextEdit = () => {
    setIsEditingText(false);
    const trimmed = editText.trim();
    if (trimmed) {
      onChange({ ...item, text: trimmed });
    } else {
      onChange({ ...item, text: 'Texte' });
    }
  };

  // Render TEXT item
  if (type === 'text') {
    const textItem = item as TextAnnotation;
    const fontSizeScaled = (textItem.fontSize || 16) * scale;
    const isBold = textItem.isBold ?? false;
    const hasWhiteBg = textItem.backgroundColor === '#ffffff' || textItem.backgroundColor === 'white';

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setEditText(textItem.text);
          setIsEditingText(true);
        }}
        style={{
          position: 'absolute',
          left: `${item.x * scale}px`,
          top: `${item.y * scale}px`,
          zIndex: isSelected ? 40 : 20,
        }}
        className={`group select-none cursor-pointer transition-shadow ${
          isSelected ? 'ring-2 ring-emerald-500 rounded-sm' : 'hover:ring-1 hover:ring-emerald-300'
        }`}
      >
        {/* Floating Contextual Toolbar for Text when selected */}
        {isSelected && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute -top-12 left-0 flex items-center gap-1.5 bg-slate-900 text-white px-2 py-1.5 rounded-xl shadow-xl z-50 text-xs whitespace-nowrap animate-in fade-in"
          >
            {/* Drag Handle */}
            <div
              onPointerDown={handleDragPointerDown}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 cursor-grab active:cursor-grabbing"
              title="Glisser pour déplacer le texte"
            >
              <Move className="w-3.5 h-3.5" />
            </div>

            {/* Font Size decrease / increase */}
            <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => onChange({ ...textItem, fontSize: Math.max(10, (textItem.fontSize || 16) - 2) })}
                className="hover:text-emerald-400 font-bold px-1"
                title="Diminuer la taille"
              >
                A-
              </button>
              <span className="font-mono text-[11px] min-w-[20px] text-center text-slate-200">
                {textItem.fontSize || 16}
              </span>
              <button
                type="button"
                onClick={() => onChange({ ...textItem, fontSize: Math.min(60, (textItem.fontSize || 16) + 2) })}
                className="hover:text-emerald-400 font-bold px-1"
                title="Agrandir la taille"
              >
                A+
              </button>
            </div>

            {/* Bold Toggle */}
            <button
              type="button"
              onClick={() => onChange({ ...textItem, isBold: !isBold })}
              className={`p-1 rounded-lg transition-colors ${
                isBold ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Gras (Bold)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Whiteout / White Background toggle (Edit like Word) */}
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...textItem,
                  backgroundColor: hasWhiteBg ? undefined : '#ffffff',
                })
              }
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                hasWhiteBg ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Masquer le fond avec un rectangle blanc (comme dans Word)"
            >
              Fond blanc
            </button>

            {/* Text Color dots */}
            <div className="flex items-center gap-1 border-l border-slate-700 pl-1.5">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onChange({ ...textItem, color: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3.5 h-3.5 rounded-full border border-slate-600 cursor-pointer ${
                    (textItem.color || '#0f172a').toLowerCase() === c.hex.toLowerCase()
                      ? 'ring-2 ring-emerald-400'
                      : ''
                  }`}
                  title={c.name}
                />
              ))}
            </div>

            {/* Edit Text button */}
            <button
              type="button"
              onClick={() => {
                setEditText(textItem.text);
                setIsEditingText(true);
              }}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
              title="Modifier le texte"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            {/* Duplicate button */}
            {onDuplicate && (
              <button
                type="button"
                onClick={onDuplicate}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
                title="Dupliquer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Delete button */}
            <button
              type="button"
              onClick={onDelete}
              className="p-1 rounded-lg hover:bg-red-900/50 text-red-400"
              title="Supprimer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Text Body / Inline Edit Mode */}
        {isEditingText ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-xl border border-emerald-500"
          >
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFinishTextEdit();
                } else if (e.key === 'Escape') {
                  setIsEditingText(false);
                }
              }}
              rows={Math.max(1, editText.split('\n').length)}
              style={{
                fontSize: `${fontSizeScaled}px`,
                color: textItem.color || '#0f172a',
                fontWeight: isBold ? 'bold' : 'normal',
              }}
              className="outline-none bg-transparent resize-none p-1 min-w-[120px]"
            />
            <button
              type="button"
              onClick={handleFinishTextEdit}
              className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white self-end mb-1"
              title="Valider"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div
            onPointerDown={handleDragPointerDown}
            style={{
              fontSize: `${fontSizeScaled}px`,
              color: textItem.color || '#0f172a',
              fontWeight: isBold ? 'bold' : 'normal',
              backgroundColor: hasWhiteBg ? '#ffffff' : 'transparent',
              padding: hasWhiteBg ? '2px 6px' : '0 2px',
              borderRadius: hasWhiteBg ? '3px' : '0',
            }}
            className="cursor-move whitespace-pre leading-tight"
          >
            {textItem.text || 'Texte'}
          </div>
        )}
      </div>
    );
  }

  // Render HIGHLIGHT item
  if (type === 'highlight') {
    const hl = item as HighlightAnnotation;
    const hlW = (hl.width || 140) * scale;
    const hlH = (hl.height || 24) * scale;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{
          position: 'absolute',
          left: `${item.x * scale}px`,
          top: `${item.y * scale}px`,
          width: `${hlW}px`,
          height: `${hlH}px`,
          backgroundColor: hl.color || '#fef08a',
          opacity: 0.5,
          zIndex: isSelected ? 35 : 15,
        }}
        className={`select-none cursor-move transition-shadow ${
          isSelected ? 'ring-2 ring-emerald-600 ring-offset-1 rounded-xs' : 'hover:opacity-75'
        }`}
        onPointerDown={handleDragPointerDown}
      >
        {/* Contextual Toolbar for Highlight when selected */}
        {isSelected && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute -top-10 left-0 flex items-center gap-1.5 bg-slate-900 text-white px-2 py-1 rounded-xl shadow-xl z-50 text-xs whitespace-nowrap animate-in fade-in"
          >
            <div className="flex items-center gap-1">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onChange({ ...hl, color: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3.5 h-3.5 rounded-full border border-slate-600 cursor-pointer ${
                    (hl.color || '#fef08a').toLowerCase() === c.hex.toLowerCase()
                      ? 'ring-2 ring-emerald-400'
                      : ''
                  }`}
                  title={c.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onDelete}
              className="p-1 rounded-lg hover:bg-red-900/50 text-red-400 ml-1"
              title="Supprimer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Resize Handle (Bottom-Right) */}
        {isSelected && (
          <div
            onPointerDown={handleResizePointerDown}
            className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-emerald-600 border border-white rounded-full cursor-nwse-resize z-50 flex items-center justify-center shadow-xs"
            title="Redimensionner la zone de surlignage"
          >
            <Maximize2 className="w-2.5 h-2.5 text-white transform rotate-90" />
          </div>
        )}
      </div>
    );
  }

  // Render SIGNATURE or IMAGE item
  const isSig = type === 'signature';
  const sigItem = item as SignatureAnnotation | ImageOverlay;
  const widthScaled = (sigItem.width || (isSig ? 180 : 160)) * scale;
  const heightScaled = (sigItem.height || (isSig ? 80 : 120)) * scale;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        position: 'absolute',
        left: `${item.x * scale}px`,
        top: `${item.y * scale}px`,
        width: `${widthScaled}px`,
        height: `${heightScaled}px`,
        zIndex: isSelected ? 40 : 20,
      }}
      className={`group select-none transition-shadow ${
        isSelected
          ? 'ring-2 ring-emerald-500 rounded-sm shadow-lg'
          : 'hover:ring-1 hover:ring-emerald-300'
      }`}
    >
      {/* Draggable Body */}
      <div
        onPointerDown={handleDragPointerDown}
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        <img
          src={sigItem.dataUrl}
          alt={isSig ? 'Signature' : 'Image Stamp'}
          draggable={false}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {/* Floating Toolbar for Signature / Image when selected */}
      {isSelected && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute -top-11 left-0 flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1.5 rounded-xl shadow-2xl z-50 text-xs whitespace-nowrap animate-in fade-in"
        >
          {/* Drag Handle icon */}
          <div
            onPointerDown={handleDragPointerDown}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 cursor-grab active:cursor-grabbing"
            title="Glisser pour déplacer"
          >
            <Move className="w-3.5 h-3.5" />
          </div>

          <span className="text-[11px] font-semibold text-slate-300 px-1">
            {isSig ? 'Signature' : 'Photo'}
          </span>

          {/* Scale Decrease / Increase Buttons */}
          <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => {
                const curW = sigItem.width || 160;
                const curH = sigItem.height || 80;
                onChange({
                  ...sigItem,
                  width: Math.max(40, Math.round(curW * 0.9)),
                  height: Math.max(20, Math.round(curH * 0.9)),
                });
              }}
              className="hover:text-emerald-400 font-bold px-1 text-xs"
              title="Réduire"
            >
              -
            </button>
            <span className="text-[10px] text-slate-400">Taille</span>
            <button
              type="button"
              onClick={() => {
                const curW = sigItem.width || 160;
                const curH = sigItem.height || 80;
                onChange({
                  ...sigItem,
                  width: Math.min(pageWidth, Math.round(curW * 1.1)),
                  height: Math.min(pageHeight, Math.round(curH * 1.1)),
                });
              }}
              className="hover:text-emerald-400 font-bold px-1 text-xs"
              title="Agrandir"
            >
              +
            </button>
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={onDelete}
            className="p-1 rounded-lg hover:bg-red-900/50 text-red-400 ml-1"
            title="Supprimer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Resize Handle (Bottom-Right Corner) */}
      {isSelected && (
        <div
          onPointerDown={handleResizePointerDown}
          className="absolute -right-2 -bottom-2 w-5 h-5 bg-emerald-600 border-2 border-white rounded-full cursor-nwse-resize z-50 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          title="Faites glisser ce coin pour redimensionner"
        >
          <Maximize2 className="w-2.5 h-2.5 text-white transform rotate-90" />
        </div>
      )}
    </div>
  );
};
