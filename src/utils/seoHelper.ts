import { Language, PageView, FaqItem } from '../types';

export function updatePageSeo(
  page: PageView,
  lang: Language,
  customTitle?: string,
  customDescription?: string,
  faqs?: FaqItem[]
) {
  if (typeof document === 'undefined') return;

  const defaultTitles: Record<PageView, string> = {
    home: 'KR PDF — Free Online PDF Tools (Convert, Edit, Merge)',
    'pdf-to-word': 'PDF to Word Converter — Convert PDF to DOCX Free Online',
    'image-to-pdf': 'Image to PDF Converter — Convert JPG & PNG to PDF Free',
    'edit-pdf': 'Free Online PDF Editor — Annotate, Sign, Draw & Organize',
    'merge-pdf': 'Merge PDF Files Online — Combine Multiple PDFs for Free',
    'split-pdf': 'Split PDF Pages Online — Extract Pages for Free',
    'privacy-policy': 'Privacy Policy — KR PDF',
    terms: 'Terms of Service — KR PDF',
    'cookie-policy': 'Cookie Policy — KR PDF',
    about: 'About KR PDF — Free Document Utilities',
    contact: 'Contact Support — KR PDF',
  };

  const defaultDescriptions: Record<PageView, string> = {
    home: 'Free, fast, and secure online PDF tools. Convert PDF to Word, Images to PDF, edit, merge and split files without registration.',
    'pdf-to-word': 'Convert PDF documents into fully editable Microsoft Word (.docx) files online for free. In-browser privacy, fast and secure.',
    'image-to-pdf': 'Convert JPG, PNG, and WEBP images into an organized PDF document online for free. Custom page sizes, orientation and margins.',
    'edit-pdf': 'Free online PDF editor to add text, highlight, draw, sign, rotate and delete pages without installing software.',
    'merge-pdf': 'Combine multiple PDF files into one clean document quickly and easily. Free online tool without file limits.',
    'split-pdf': 'Extract specific pages or page ranges from any PDF document online for free.',
    'privacy-policy': 'Read KR PDF privacy policy: 100% in-browser processing, zero unauthorized cloud document storage.',
    terms: 'Terms of Service and acceptable use conditions for KR PDF online tools.',
    'cookie-policy': 'How KR PDF uses cookies and local storage to provide fast, privacy-respecting service.',
    about: 'Learn about KR PDF mission: free, fast, accessible online PDF tools for everyone.',
    contact: 'Contact KR PDF customer support team for feedback, assistance or inquiries.',
  };

  const title = customTitle || defaultTitles[page] || 'KR PDF — Free Online PDF Tools';
  const description = customDescription || defaultDescriptions[page] || defaultDescriptions.home;

  // Set Title
  document.title = title;

  // Helper to set meta tags
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const attr = isProperty ? `property="${nameOrProperty}"` : `name="${nameOrProperty}"`;
    let element = document.querySelector(`meta[${attr}]`);
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', nameOrProperty);
      } else {
        element.setAttribute('name', nameOrProperty);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Update Dynamic JSON-LD structured data
  const existingLd = document.getElementById('dynamic-jsonld');
  if (existingLd) existingLd.remove();

  const script = document.createElement('script');
  script.id = 'dynamic-jsonld';
  script.type = 'application/ld+json';

  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'KR PDF',
      operatingSystem: 'All',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: typeof window !== 'undefined' ? window.location.origin : 'https://kr-pdf.org',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: typeof window !== 'undefined' ? window.location.href : 'https://kr-pdf.org',
        },
      ],
    },
  ];

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  script.text = JSON.stringify(schemas);
  document.head.appendChild(script);
}

export const updateSeoMeta = (page: PageView, lang: Language, t?: any) => {
  updatePageSeo(page, lang);
};
