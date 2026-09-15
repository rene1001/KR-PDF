/**
 * Core utility functions for file validation, size limits, format checking,
 * and filename sanitization across KR PDF.
 */

export const DEFAULT_MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates that a file's size is within permissible limits.
 * Checks for both empty files (0 bytes) and exceeding max allowed bytes.
 */
export function validateFileSize(
  sizeInBytes: number,
  maxSizeBytes: number = DEFAULT_MAX_FILE_SIZE_BYTES
): FileValidationResult {
  if (sizeInBytes === undefined || sizeInBytes === null || isNaN(sizeInBytes)) {
    return { valid: false, error: 'Invalid file size provided.' };
  }

  if (sizeInBytes <= 0) {
    return { valid: false, error: 'File is empty (0 bytes).' };
  }

  if (sizeInBytes > maxSizeBytes) {
    const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `File size exceeds the maximum allowed limit of ${maxMb} MB.`,
    };
  }

  return { valid: true };
}

/**
 * Converts bytes into a readable formatted string (e.g., "1.2 MB").
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (!bytes || isNaN(bytes)) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(1));

  return `${value} ${sizes[i]}`;
}

const SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg'];
const SUPPORTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/svg+xml',
];

/**
 * Checks whether a given file is a valid PDF based on MIME type or extension.
 */
export function isPdfFile(file: { name: string; type?: string }): boolean {
  if (!file || !file.name) return false;

  const hasPdfExtension = /\.pdf$/i.test(file.name.trim());
  const hasPdfMime = file.type?.toLowerCase() === 'application/pdf';

  return hasPdfExtension || hasPdfMime;
}

/**
 * Checks whether a given file is a supported image format.
 */
export function isImageFile(file: { name: string; type?: string }): boolean {
  if (!file || !file.name) return false;

  const extMatch = file.name.trim().match(/\.([a-z0-9]+)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : '';

  const isExtSupported = SUPPORTED_IMAGE_EXTENSIONS.includes(ext);
  const isMimeSupported = Boolean(
    file.type &&
      (SUPPORTED_IMAGE_MIME_TYPES.includes(file.type.toLowerCase()) ||
        file.type.toLowerCase().startsWith('image/'))
  );

  return isExtSupported || isMimeSupported;
}

/**
 * Verifies if a file matches requested format categories ('pdf' | 'image').
 */
export function validateFileFormat(
  file: { name: string; type?: string },
  allowedTypes: Array<'pdf' | 'image'>
): FileValidationResult {
  if (!file || !file.name) {
    return { valid: false, error: 'Invalid file provided.' };
  }

  let matches = false;
  if (allowedTypes.includes('pdf') && isPdfFile(file)) {
    matches = true;
  }
  if (allowedTypes.includes('image') && isImageFile(file)) {
    matches = true;
  }

  if (!matches) {
    const formattedTypes = allowedTypes
      .map((t) => (t === 'pdf' ? 'PDF (.pdf)' : 'Images (.jpg, .png, .webp)'))
      .join(', ');
    return {
      valid: false,
      error: `Unsupported file format. Please upload: ${formattedTypes}.`,
    };
  }

  return { valid: true };
}

/**
 * Sanitizes a file name against path traversal, control characters, and reserved symbols.
 */
export function sanitizeFileName(fileName: string, fallback: string = 'document'): string {
  if (!fileName || typeof fileName !== 'string') {
    return fallback;
  }

  // Strip path traversal characters (../ or ..\)
  let clean = fileName.replace(/(\.\.[\/\\])+/g, '');

  // Strip illegal Windows / POSIX file system characters
  clean = clean.replace(/[/\\?%*:|"<>]/g, '_');

  // Strip non-printable ASCII / control characters
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  // Strip leading dots or multiple repeated dots
  clean = clean.replace(/^\.+/, '').replace(/\.{2,}/g, '.');

  clean = clean.trim();

  // If the result only consists of underscores or dots, use fallback
  if (!clean || /^[_.]+$/.test(clean)) {
    return fallback;
  }

  return clean;
}

/**
 * Verifies standard PDF magic header (%PDF-) in binary data.
 */
export function validatePdfMagicBytes(bytes: Uint8Array | ArrayBuffer): boolean {
  if (!bytes) return false;
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);

  if (uint8.length < 5) return false;

  // %PDF- is [0x25, 0x50, 0x44, 0x46, 0x2D]
  return (
    uint8[0] === 0x25 &&
    uint8[1] === 0x50 &&
    uint8[2] === 0x44 &&
    uint8[3] === 0x46 &&
    uint8[4] === 0x2d
  );
}

/**
 * Safely retrieves an environment variable in either Vite client-side (import.meta.env)
 * or Node.js / Vitest test runner (process.env).
 */
export function getEnvVariable(key: string, defaultValue: string = ''): string {
  // Check process.env first (supports runtime overrides in tests and Node server)
  try {
    if (typeof process !== 'undefined' && process.env) {
      const val = process.env[key];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        return String(val).trim();
      }
    }
  } catch {
    // Ignore error if process.env is unavailable
  }

  // Fallback to Vite client-side import.meta.env
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      const val = (import.meta as any).env[key];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        return String(val).trim();
      }
    }
  } catch {
    // Ignore error if import.meta is unavailable
  }

  return defaultValue;
}

/**
 * Returns the maximum allowed images count for ImageToPdfTool.
 * Defaults to 50 if unset, invalid, or non-positive.
 */
export function getMaxImagesCount(envOverride?: string | number): number {
  const raw = envOverride !== undefined ? String(envOverride) : getEnvVariable('VITE_MAX_IMAGES_COUNT', '50');
  const parsed = parseInt(raw, 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : 50;
}

/**
 * Returns the maximum allowed PDF files count for PdfToWordTool.
 * Defaults to 1 if unset, invalid, or non-positive.
 */
export function getMaxPdfToWordFilesCount(envOverride?: string | number): number {
  const raw = envOverride !== undefined ? String(envOverride) : getEnvVariable('VITE_MAX_PDF_TO_WORD_FILES_COUNT', '1');
  const parsed = parseInt(raw, 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * Returns the maximum allowed file size in bytes.
 * Defaults to 50 MB (52,428,800 bytes).
 */
export function getMaxFileSize(envOverride?: string | number): number {
  const raw = envOverride !== undefined ? String(envOverride) : getEnvVariable('VITE_MAX_FILE_SIZE', String(DEFAULT_MAX_FILE_SIZE_BYTES));
  const parsed = parseInt(raw, 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_FILE_SIZE_BYTES;
}

/**
 * Validates file count against maximum image upload limits for ImageToPdfTool.
 */
export function validateImageUploadCount(
  incomingCount: number,
  currentCount: number = 0,
  maxAllowedCount: number = getMaxImagesCount()
): { valid: boolean; error?: string; remainingSlots: number } {
  const remainingSlots = Math.max(0, maxAllowedCount - currentCount);

  if (incomingCount <= 0) {
    return {
      valid: false,
      error: 'No image files selected.',
      remainingSlots,
    };
  }

  if (currentCount >= maxAllowedCount) {
    return {
      valid: false,
      error: `Maximum image limit reached (${maxAllowedCount} images). You cannot add more images.`,
      remainingSlots: 0,
    };
  }

  if (currentCount + incomingCount > maxAllowedCount) {
    return {
      valid: false,
      error: `Cannot add ${incomingCount} images. Maximum limit is ${maxAllowedCount} images (only ${remainingSlots} slot${remainingSlots > 1 ? 's' : ''} remaining).`,
      remainingSlots,
    };
  }

  return { valid: true, remainingSlots };
}

export interface MinimalFileInfo {
  name: string;
  type?: string;
  size?: number;
}

/**
 * Core validation logic for PdfToWordTool:
 * - Checks that exactly 1 file (or within VITE_MAX_PDF_TO_WORD_FILES_COUNT) is provided
 * - Checks that file format is PDF (.pdf or application/pdf)
 * - Checks that file size is within limits (>0 and <= maxFileSize)
 */
export function validatePdfToWordFiles<T extends MinimalFileInfo>(
  files: T[],
  options?: {
    maxCount?: number;
    maxSizeBytes?: number;
  }
): {
  valid: boolean;
  file?: T;
  error?: string;
} {
  const maxCount = options?.maxCount ?? getMaxPdfToWordFilesCount();
  const maxSizeBytes = options?.maxSizeBytes ?? getMaxFileSize();

  if (!files || files.length === 0) {
    return { valid: false, error: 'No PDF file selected.' };
  }

  if (files.length > maxCount) {
    return {
      valid: false,
      error: `Please select only ${maxCount} PDF file at a time for conversion.`,
    };
  }

  const file = files[0];

  if (!isPdfFile(file)) {
    return {
      valid: false,
      error: 'Invalid file format. Please select a valid PDF document (.pdf).',
    };
  }

  if (file.size !== undefined) {
    const sizeCheck = validateFileSize(file.size, maxSizeBytes);
    if (!sizeCheck.valid) {
      return {
        valid: false,
        error: sizeCheck.error,
      };
    }
  }

  return { valid: true, file };
}

/**
 * Core validation logic for ImageToPdfTool:
 * - Filters for supported image formats
 * - Validates total count against VITE_MAX_IMAGES_COUNT
 * - Validates individual file sizes
 */
export function validateImageToPdfFiles<T extends MinimalFileInfo>(
  incomingFiles: T[],
  currentCount: number = 0,
  options?: {
    maxCount?: number;
    maxSizeBytes?: number;
  }
): {
  valid: boolean;
  validFiles: T[];
  rejectedFiles: Array<{ file: T; reason: string }>;
  error?: string;
} {
  const maxCount = options?.maxCount ?? getMaxImagesCount();
  const maxSizeBytes = options?.maxSizeBytes ?? getMaxFileSize();

  if (!incomingFiles || incomingFiles.length === 0) {
    return {
      valid: false,
      validFiles: [],
      rejectedFiles: [],
      error: 'No image files selected.',
    };
  }

  const validFiles: T[] = [];
  const rejectedFiles: Array<{ file: T; reason: string }> = [];

  for (const file of incomingFiles) {
    if (!isImageFile(file)) {
      rejectedFiles.push({
        file,
        reason: 'Unsupported format. Supported: JPG, PNG, WEBP, GIF, BMP, SVG.',
      });
      continue;
    }

    if (file.size !== undefined) {
      const sizeCheck = validateFileSize(file.size, maxSizeBytes);
      if (!sizeCheck.valid) {
        rejectedFiles.push({
          file,
          reason: sizeCheck.error || 'File size exceeds allowed limit.',
        });
        continue;
      }
    }

    validFiles.push(file);
  }

  if (validFiles.length === 0) {
    return {
      valid: false,
      validFiles: [],
      rejectedFiles,
      error: rejectedFiles[0]?.reason || 'No valid image files found.',
    };
  }

  // Check upload count constraints
  const countCheck = validateImageUploadCount(validFiles.length, currentCount, maxCount);
  if (!countCheck.valid) {
    return {
      valid: false,
      validFiles,
      rejectedFiles,
      error: countCheck.error,
    };
  }

  return {
    valid: true,
    validFiles,
    rejectedFiles,
  };
}

