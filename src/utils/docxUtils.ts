import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun } from 'docx';

interface PageContent {
  pageNumber: number;
  paragraphs: string[];
  images?: string[];
}

/**
 * Generate a clean Microsoft Word .docx file from extracted PDF paragraphs and layout
 */
export async function createDocxFromPdfData(
  pages: PageContent[],
  documentTitle: string = 'Converted Document'
): Promise<Blob> {
  const docChildren: Paragraph[] = [];

  // Document Title Header
  docChildren.push(
    new Paragraph({
      text: documentTitle.replace(/\.[^/.]+$/, ''),
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    })
  );

  pages.forEach((page) => {
    // Add page indicator divider if multi-page
    if (pages.length > 1) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `--- Page ${page.pageNumber} ---`,
              bold: true,
              color: '10B981',
              size: 20, // 10pt
            }),
          ],
          spacing: { before: 200, after: 150 },
        })
      );
    }

    // Embed images if available (e.g. scanned page fallback or embedded graphics)
    if (page.images && page.images.length > 0) {
      page.images.forEach((imgDataUrl) => {
        try {
          const base64Index = imgDataUrl.indexOf('base64,');
          if (base64Index !== -1) {
            const base64 = imgDataUrl.substring(base64Index + 7);
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let b = 0; b < binaryString.length; b++) {
              bytes[b] = binaryString.charCodeAt(b);
            }
            docChildren.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: bytes,
                    type: 'png',
                    transformation: {
                      width: 500,
                      height: 650,
                    },
                  }),
                ],
                spacing: { before: 100, after: 100 },
                alignment: AlignmentType.CENTER,
              })
            );
          }
        } catch (e) {
          // Gracefully continue if image buffer parsing fails
        }
      });
    }

    // Add each extracted paragraph
    page.paragraphs.forEach((text) => {
      if (!text || text.trim() === '') return;

      // Detect possible heading lines (e.g. short uppercase or title case)
      const isShort = text.length < 50;
      const isHeader = isShort && (text === text.toUpperCase() || text.endsWith(':'));

      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: text,
              bold: isHeader,
              size: isHeader ? 28 : 22, // 14pt or 11pt
              font: 'Calibri',
            }),
          ],
          spacing: {
            before: isHeader ? 180 : 80,
            after: isHeader ? 120 : 80,
            line: 276, // 1.15 line spacing
          },
        })
      );
    });
  });

  const doc = new Document({
    title: documentTitle,
    description: 'Converted from PDF with KR PDF (https://kr-pdf.org)',
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
