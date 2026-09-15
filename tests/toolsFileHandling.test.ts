import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getMaxImagesCount,
  getMaxPdfToWordFilesCount,
  getMaxFileSize,
  validatePdfToWordFiles,
  validateImageToPdfFiles,
  validateImageUploadCount,
  DEFAULT_MAX_FILE_SIZE_BYTES,
} from '../src/utils/fileValidation';

describe('Tool File Handling Utilities - Environment Variables & Configurations', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.VITE_MAX_IMAGES_COUNT;
    delete process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT;
    delete process.env.VITE_MAX_FILE_SIZE;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('should resolve default MAX_IMAGES_COUNT of 50 when environment variable is unset', () => {
    expect(getMaxImagesCount()).toBe(50);
  });

  it('should parse VITE_MAX_IMAGES_COUNT from environment variables', () => {
    process.env.VITE_MAX_IMAGES_COUNT = '25';
    expect(getMaxImagesCount()).toBe(25);

    process.env.VITE_MAX_IMAGES_COUNT = '100';
    expect(getMaxImagesCount()).toBe(100);
  });

  it('should fallback gracefully to 50 when VITE_MAX_IMAGES_COUNT is invalid or non-positive', () => {
    process.env.VITE_MAX_IMAGES_COUNT = 'invalid_number';
    expect(getMaxImagesCount()).toBe(50);

    process.env.VITE_MAX_IMAGES_COUNT = '-10';
    expect(getMaxImagesCount()).toBe(50);

    process.env.VITE_MAX_IMAGES_COUNT = '0';
    expect(getMaxImagesCount()).toBe(50);
  });

  it('should resolve default MAX_PDF_TO_WORD_FILES_COUNT of 1 when unset', () => {
    expect(getMaxPdfToWordFilesCount()).toBe(1);
  });

  it('should parse VITE_MAX_PDF_TO_WORD_FILES_COUNT from environment variables', () => {
    process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT = '3';
    expect(getMaxPdfToWordFilesCount()).toBe(3);
  });

  it('should fallback gracefully to 1 when VITE_MAX_PDF_TO_WORD_FILES_COUNT is invalid', () => {
    process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT = 'not_a_number';
    expect(getMaxPdfToWordFilesCount()).toBe(1);

    process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT = '-2';
    expect(getMaxPdfToWordFilesCount()).toBe(1);
  });

  it('should resolve default MAX_FILE_SIZE of 50MB when unset', () => {
    expect(getMaxFileSize()).toBe(DEFAULT_MAX_FILE_SIZE_BYTES);
  });

  it('should parse VITE_MAX_FILE_SIZE from environment variables', () => {
    const tenMb = 10 * 1024 * 1024;
    process.env.VITE_MAX_FILE_SIZE = String(tenMb);
    expect(getMaxFileSize()).toBe(tenMb);
  });
});

describe('PdfToWordTool - File Format Validation', () => {
  it('should accept valid PDF files by file extension (.pdf, .PDF)', () => {
    const validPdfs = [
      { name: 'document.pdf', size: 1024 },
      { name: 'CONTRACT.PDF', size: 2048 },
      { name: 'annual-report.2026.pdf', size: 5000 },
    ];

    validPdfs.forEach((file) => {
      const result = validatePdfToWordFiles([file]);
      expect(result.valid).toBe(true);
      expect(result.file).toEqual(file);
      expect(result.error).toBeUndefined();
    });
  });

  it('should accept valid PDF files by MIME type (application/pdf)', () => {
    const file = { name: 'unnamed-blob', type: 'application/pdf', size: 2048 };
    const result = validatePdfToWordFiles([file]);
    expect(result.valid).toBe(true);
  });

  it('should reject non-PDF file formats (images, docx, txt, exe)', () => {
    const nonPdfs = [
      { name: 'photo.jpg', type: 'image/jpeg', size: 1024 },
      { name: 'image.png', type: 'image/png', size: 1024 },
      { name: 'document.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 1024 },
      { name: 'notes.txt', type: 'text/plain', size: 500 },
      { name: 'malicious.pdf.exe', size: 1024 },
      { name: 'archive.zip', type: 'application/zip', size: 5000 },
    ];

    nonPdfs.forEach((file) => {
      const result = validatePdfToWordFiles([file]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid file format');
    });
  });

  it('should reject empty files (0 bytes size)', () => {
    const emptyPdf = { name: 'empty.pdf', size: 0 };
    const result = validatePdfToWordFiles([emptyPdf]);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('should reject PDF files exceeding maximum file size', () => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const oversizedPdf = { name: 'large.pdf', size: 6 * 1024 * 1024 };
    const result = validatePdfToWordFiles([oversizedPdf], { maxSizeBytes: maxSize });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the maximum allowed limit');
  });
});

describe('PdfToWordTool - Maximum Upload Count Validation', () => {
  it('should accept 1 PDF file when max count is 1 (default)', () => {
    const files = [{ name: 'doc1.pdf', size: 1024 }];
    const result = validatePdfToWordFiles(files);
    expect(result.valid).toBe(true);
  });

  it('should reject when 0 files are passed', () => {
    const result = validatePdfToWordFiles([]);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('No PDF file selected');
  });

  it('should reject multiple PDF files when max count is 1', () => {
    const files = [
      { name: 'doc1.pdf', size: 1024 },
      { name: 'doc2.pdf', size: 2048 },
    ];
    const result = validatePdfToWordFiles(files, { maxCount: 1 });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('only 1 PDF file at a time');
  });

  it('should support customized max upload count from environment variable', () => {
    const files = [
      { name: 'doc1.pdf', size: 1024 },
      { name: 'doc2.pdf', size: 2048 },
      { name: 'doc3.pdf', size: 3072 },
    ];

    // With maxCount = 3, 3 files should be accepted
    const resultAllowed = validatePdfToWordFiles(files, { maxCount: 3 });
    expect(resultAllowed.valid).toBe(true);

    // With maxCount = 2, 3 files should be rejected
    const resultExceeded = validatePdfToWordFiles(files, { maxCount: 2 });
    expect(resultExceeded.valid).toBe(false);
    expect(resultExceeded.error).toContain('only 2 PDF file');
  });
});

describe('ImageToPdfTool - File Format Validation', () => {
  it('should accept all supported image formats (JPG, PNG, WEBP, GIF, BMP, SVG)', () => {
    const validImages = [
      { name: 'photo.jpg', size: 1024 },
      { name: 'graphic.jpeg', size: 2048 },
      { name: 'screenshot.png', size: 3072 },
      { name: 'banner.webp', size: 4096 },
      { name: 'animation.gif', size: 1024 },
      { name: 'diagram.bmp', size: 5000 },
      { name: 'vector.svg', size: 800 },
      { name: 'UPPERCASE.PNG', size: 1200 },
      { name: 'MIXED.JpG', size: 1500 },
    ];

    const result = validateImageToPdfFiles(validImages);
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(validImages.length);
    expect(result.rejectedFiles.length).toBe(0);
  });

  it('should accept images by MIME type even without clear extension', () => {
    const mimeImages = [
      { name: 'blob-image-1', type: 'image/jpeg', size: 1024 },
      { name: 'blob-image-2', type: 'image/png', size: 2048 },
      { name: 'blob-image-3', type: 'image/webp', size: 3072 },
    ];

    const result = validateImageToPdfFiles(mimeImages);
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(3);
  });

  it('should reject non-image file formats (PDF, DOCX, ZIP, EXE)', () => {
    const nonImages = [
      { name: 'document.pdf', type: 'application/pdf', size: 1024 },
      { name: 'file.docx', size: 2048 },
      { name: 'archive.zip', size: 3072 },
      { name: 'script.sh', size: 500 },
    ];

    const result = validateImageToPdfFiles(nonImages);
    expect(result.valid).toBe(false);
    expect(result.validFiles.length).toBe(0);
    expect(result.rejectedFiles.length).toBe(4);
    expect(result.error).toContain('Unsupported format');
  });

  it('should segregate mixed batches (valid images kept, invalid rejected)', () => {
    const mixedBatch = [
      { name: 'photo1.jpg', size: 1000 },
      { name: 'document.pdf', size: 2000 }, // invalid
      { name: 'photo2.png', size: 1500 },
      { name: 'data.xlsx', size: 3000 },   // invalid
      { name: 'photo3.webp', size: 1200 },
    ];

    const result = validateImageToPdfFiles(mixedBatch);
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(3);
    expect(result.rejectedFiles.length).toBe(2);
    expect(result.validFiles.map((f) => f.name)).toEqual(['photo1.jpg', 'photo2.png', 'photo3.webp']);
    expect(result.rejectedFiles.map((r) => r.file.name)).toEqual(['document.pdf', 'data.xlsx']);
  });

  it('should reject individual images with size = 0 bytes', () => {
    const files = [
      { name: 'valid.jpg', size: 1024 },
      { name: 'corrupted_empty.jpg', size: 0 },
    ];

    const result = validateImageToPdfFiles(files);
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(1);
    expect(result.validFiles[0].name).toBe('valid.jpg');
    expect(result.rejectedFiles.length).toBe(1);
    expect(result.rejectedFiles[0].reason).toContain('empty');
  });
});

describe('ImageToPdfTool - Maximum Upload Count Validation (VITE_MAX_IMAGES_COUNT)', () => {
  it('should accept batch upload within default limit of 50 images', () => {
    const files = Array.from({ length: 50 }, (_, i) => ({
      name: `img_${i + 1}.jpg`,
      size: 1024,
    }));

    const result = validateImageToPdfFiles(files, 0, { maxCount: 50 });
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(50);
  });

  it('should reject initial upload exceeding limit of 50 images', () => {
    const files = Array.from({ length: 51 }, (_, i) => ({
      name: `img_${i + 1}.jpg`,
      size: 1024,
    }));

    const result = validateImageToPdfFiles(files, 0, { maxCount: 50 });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Cannot add 51 images');
    expect(result.error).toContain('Maximum limit is 50 images');
  });

  it('should reject incremental uploads that exceed the remaining capacity', () => {
    // User already has 45 images loaded
    const currentCount = 45;
    const incomingFiles = Array.from({ length: 10 }, (_, i) => ({
      name: `new_img_${i + 1}.png`,
      size: 1024,
    }));

    const result = validateImageToPdfFiles(incomingFiles, currentCount, { maxCount: 50 });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('only 5 slots remaining');
  });

  it('should allow incremental uploads that fit within remaining capacity', () => {
    // User already has 45 images loaded, adds 5 images
    const currentCount = 45;
    const incomingFiles = Array.from({ length: 5 }, (_, i) => ({
      name: `new_img_${i + 1}.png`,
      size: 1024,
    }));

    const result = validateImageToPdfFiles(incomingFiles, currentCount, { maxCount: 50 });
    expect(result.valid).toBe(true);
    expect(result.validFiles.length).toBe(5);
  });

  it('should reject any additions when currentCount is already at maximum capacity', () => {
    const currentCount = 50;
    const incomingFiles = [{ name: 'one_more.jpg', size: 1024 }];

    const result = validateImageToPdfFiles(incomingFiles, currentCount, { maxCount: 50 });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Maximum image limit reached');
  });

  it('should dynamically enforce custom VITE_MAX_IMAGES_COUNT from environment', () => {
    // Custom limit of 10 configured in environment
    const customLimit = 10;
    const files10 = Array.from({ length: 10 }, (_, i) => ({
      name: `photo_${i}.jpg`,
      size: 1024,
    }));
    const files11 = Array.from({ length: 11 }, (_, i) => ({
      name: `photo_${i}.jpg`,
      size: 1024,
    }));

    expect(validateImageToPdfFiles(files10, 0, { maxCount: customLimit }).valid).toBe(true);
    const rejectedResult = validateImageToPdfFiles(files11, 0, { maxCount: customLimit });
    expect(rejectedResult.valid).toBe(false);
    expect(rejectedResult.error).toContain(`Maximum limit is ${customLimit} images`);
  });

  it('should calculate remaining slots accurately via validateImageUploadCount helper', () => {
    expect(validateImageUploadCount(5, 0, 50).remainingSlots).toBe(50);
    expect(validateImageUploadCount(5, 20, 50).remainingSlots).toBe(30);
    expect(validateImageUploadCount(5, 50, 50).remainingSlots).toBe(0);
    expect(validateImageUploadCount(0, 10, 50).valid).toBe(false);
  });

  it('should implicitly read process.env.VITE_MAX_IMAGES_COUNT in validateImageToPdfFiles when options omitted', () => {
    process.env.VITE_MAX_IMAGES_COUNT = '3';
    const files = [
      { name: 'img1.jpg', size: 100 },
      { name: 'img2.jpg', size: 100 },
      { name: 'img3.jpg', size: 100 },
      { name: 'img4.jpg', size: 100 },
    ];
    // 4 files with limit 3 should fail
    const result = validateImageToPdfFiles(files);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Maximum limit is 3 images');

    // 3 files should succeed
    const validResult = validateImageToPdfFiles(files.slice(0, 3));
    expect(validResult.valid).toBe(true);
  });

  it('should implicitly read process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT in validatePdfToWordFiles when options omitted', () => {
    process.env.VITE_MAX_PDF_TO_WORD_FILES_COUNT = '2';
    const twoPdfs = [
      { name: 'doc1.pdf', size: 1000 },
      { name: 'doc2.pdf', size: 1000 },
    ];
    // 2 files allowed when env is 2
    expect(validatePdfToWordFiles(twoPdfs).valid).toBe(true);

    const threePdfs = [
      ...twoPdfs,
      { name: 'doc3.pdf', size: 1000 },
    ];
    // 3 files rejected
    const result = validatePdfToWordFiles(threePdfs);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('only 2 PDF file');
  });
});

