import { describe, it, expect } from 'vitest';
import {
  validateFileSize,
  formatFileSize,
  isPdfFile,
  isImageFile,
  validateFileFormat,
  sanitizeFileName,
  validatePdfMagicBytes,
  DEFAULT_MAX_FILE_SIZE_BYTES,
} from '../src/utils/fileValidation';

describe('File Size Validation', () => {
  it('should accept valid file sizes under default 50 MB threshold', () => {
    const validSizes = [1, 1024, 10 * 1024 * 1024, 49 * 1024 * 1024];
    validSizes.forEach((size) => {
      const result = validateFileSize(size);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  it('should accept file size exactly matching the max allowed size', () => {
    const result = validateFileSize(DEFAULT_MAX_FILE_SIZE_BYTES, DEFAULT_MAX_FILE_SIZE_BYTES);
    expect(result.valid).toBe(true);
  });

  it('should reject empty files (0 bytes)', () => {
    const result = validateFileSize(0);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('should reject negative file sizes', () => {
    const result = validateFileSize(-10);
    expect(result.valid).toBe(false);
  });

  it('should reject file sizes exceeding the default maximum limit (50 MB)', () => {
    const excessSize = DEFAULT_MAX_FILE_SIZE_BYTES + 1;
    const result = validateFileSize(excessSize);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the maximum');
  });

  it('should honor custom maximum size limits', () => {
    const customLimit = 5 * 1024 * 1024; // 5 MB
    expect(validateFileSize(4 * 1024 * 1024, customLimit).valid).toBe(true);
    expect(validateFileSize(6 * 1024 * 1024, customLimit).valid).toBe(false);
  });

  it('should handle invalid or non-numeric input gracefully', () => {
    expect(validateFileSize(NaN).valid).toBe(false);
    expect(validateFileSize(undefined as any).valid).toBe(false);
  });
});

describe('File Size Formatter', () => {
  it('should format 0 bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 B');
  });

  it('should format bytes correctly', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('should format megabytes correctly', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(50 * 1024 * 1024)).toBe('50 MB');
    expect(formatFileSize(1572864)).toBe('1.5 MB');
  });

  it('should handle invalid input without throwing', () => {
    expect(formatFileSize(NaN)).toBe('0 B');
  });
});

describe('PDF Format Checking', () => {
  it('should identify valid PDF files by extension', () => {
    expect(isPdfFile({ name: 'contract.pdf' })).toBe(true);
    expect(isPdfFile({ name: 'DOCUMENT.PDF' })).toBe(true);
    expect(isPdfFile({ name: 'report.2026.final.pdf' })).toBe(true);
  });

  it('should identify valid PDF files by MIME type', () => {
    expect(isPdfFile({ name: 'downloaded-file', type: 'application/pdf' })).toBe(true);
    expect(isPdfFile({ name: 'data', type: 'application/pdf' })).toBe(true);
  });

  it('should reject non-PDF files', () => {
    expect(isPdfFile({ name: 'photo.png', type: 'image/png' })).toBe(false);
    expect(isPdfFile({ name: 'document.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })).toBe(false);
    expect(isPdfFile({ name: 'malicious.pdf.exe' })).toBe(false);
    expect(isPdfFile({ name: 'notes.txt', type: 'text/plain' })).toBe(false);
  });

  it('should handle empty or missing file objects', () => {
    expect(isPdfFile({ name: '' })).toBe(false);
    expect(isPdfFile(null as any)).toBe(false);
  });
});

describe('Image Format Checking', () => {
  it('should identify standard image formats by extension', () => {
    const validImages = [
      'photo.jpg',
      'avatar.jpeg',
      'screenshot.png',
      'banner.webp',
      'animation.gif',
      'graphic.bmp',
      'icon.svg',
      'PHOTO.JPG',
      'IMAGE.PNG',
    ];

    validImages.forEach((fileName) => {
      expect(isImageFile({ name: fileName })).toBe(true);
    });
  });

  it('should identify images by MIME type', () => {
    expect(isImageFile({ name: 'file-without-ext', type: 'image/png' })).toBe(true);
    expect(isImageFile({ name: 'blob', type: 'image/jpeg' })).toBe(true);
    expect(isImageFile({ name: 'vector', type: 'image/svg+xml' })).toBe(true);
  });

  it('should reject non-image files', () => {
    expect(isImageFile({ name: 'document.pdf', type: 'application/pdf' })).toBe(false);
    expect(isImageFile({ name: 'archive.zip', type: 'application/zip' })).toBe(false);
    expect(isImageFile({ name: 'spreadsheet.xlsx' })).toBe(false);
  });
});

describe('validateFileFormat Helper', () => {
  it('should validate allowed PDF files', () => {
    const result = validateFileFormat({ name: 'test.pdf', type: 'application/pdf' }, ['pdf']);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject non-PDF when only PDF is allowed', () => {
    const result = validateFileFormat({ name: 'photo.jpg', type: 'image/jpeg' }, ['pdf']);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('PDF (.pdf)');
  });

  it('should validate allowed image files', () => {
    const result = validateFileFormat({ name: 'photo.png', type: 'image/png' }, ['image']);
    expect(result.valid).toBe(true);
  });

  it('should support multiple allowed formats', () => {
    expect(validateFileFormat({ name: 'test.pdf' }, ['pdf', 'image']).valid).toBe(true);
    expect(validateFileFormat({ name: 'photo.png' }, ['pdf', 'image']).valid).toBe(true);
    expect(validateFileFormat({ name: 'data.csv' }, ['pdf', 'image']).valid).toBe(false);
  });
});

describe('File Name Sanitization', () => {
  it('should keep standard valid filenames unchanged', () => {
    expect(sanitizeFileName('my-report_2026.pdf')).toBe('my-report_2026.pdf');
    expect(sanitizeFileName('invoice 123.pdf')).toBe('invoice 123.pdf');
  });

  it('should prevent directory and path traversal sequences', () => {
    expect(sanitizeFileName('../../etc/passwd.pdf')).toBe('etc_passwd.pdf');
    expect(sanitizeFileName('..\\..\\windows\\system32\\calc.pdf')).toBe('windows_system32_calc.pdf');
  });

  it('should replace illegal filesystem characters with underscores', () => {
    expect(sanitizeFileName('report:final<2026>?*.pdf')).toBe('report_final_2026___.pdf');
    expect(sanitizeFileName('a|b/c\\d"e.pdf')).toBe('a_b_c_d_e.pdf');
  });

  it('should strip leading dots and reduce consecutive dots', () => {
    expect(sanitizeFileName('...hidden.pdf')).toBe('hidden.pdf');
    expect(sanitizeFileName('my...document..pdf')).toBe('my.document.pdf');
  });

  it('should provide a fallback name when sanitized result is empty', () => {
    expect(sanitizeFileName('')).toBe('document');
    expect(sanitizeFileName('   ')).toBe('document');
    expect(sanitizeFileName('///:::')).toBe('document');
  });
});

describe('PDF Magic Bytes Binary Validation', () => {
  it('should validate binary starting with standard %PDF- magic signature', () => {
    // 0x25 (% ), 0x50 (P), 0x44 (D), 0x46 (F), 0x2D (-)
    const validHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    expect(validatePdfMagicBytes(validHeader)).toBe(true);
  });

  it('should reject non-PDF binary data (e.g., PNG, JPEG, text)', () => {
    // PNG magic bytes
    const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(validatePdfMagicBytes(pngHeader)).toBe(false);

    // JPEG magic bytes
    const jpgHeader = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    expect(validatePdfMagicBytes(jpgHeader)).toBe(false);
  });

  it('should reject truncated or empty byte arrays', () => {
    expect(validatePdfMagicBytes(new Uint8Array([]))).toBe(false);
    expect(validatePdfMagicBytes(new Uint8Array([0x25, 0x50]))).toBe(false);
    expect(validatePdfMagicBytes(null as any)).toBe(false);
  });
});
