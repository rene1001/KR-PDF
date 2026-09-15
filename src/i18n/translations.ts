import { Language } from '../types';

export interface Translations {
  // Brand & Nav
  brandName: string;
  brandTagline: string;
  navTools: string;
  navAllTools: string;
  navPdfToWord: string;
  navImageToPdf: string;
  navEditPdf: string;
  navMergePdf: string;
  navSplitPdf: string;
  navAbout: string;
  navContact: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaPdfToWord: string;
  heroCtaImageToPdf: string;
  heroCtaEditPdf: string;
  heroPrivacyPill: string;

  // Tools overview
  toolsSectionTitle: string;
  toolsSectionSubtitle: string;

  // Tool 1: PDF to Word
  pdfToWordTitle: string;
  pdfToWordDesc: string;
  pdfToWordH1: string;
  pdfToWordDropTitle: string;
  pdfToWordDropSubtitle: string;
  pdfToWordBtnChoose: string;
  pdfToWordProcessing: string;
  pdfToWordDone: string;
  pdfToWordDownload: string;
  pdfToWordConvertAnother: string;
  pdfToWordNotice: string;
  pdfToWordLimitations: string;

  // Tool 2: Image to PDF
  imageToPdfTitle: string;
  imageToPdfDesc: string;
  imageToPdfH1: string;
  imageToPdfDropTitle: string;
  imageToPdfDropSubtitle: string;
  imageToPdfBtnChoose: string;
  imageToPdfAddMore: string;
  imageToPdfClearAll: string;
  imageToPdfReorderHint: string;
  imageToPdfPageSize: string;
  imageToPdfOrientation: string;
  imageToPdfMargin: string;
  imageToPdfQuality: string;
  imageToPdfFileName: string;
  imageToPdfCreateBtn: string;
  imageToPdfCreating: string;
  imageToPdfDownload: string;
  imageToPdfConvertAnother: string;

  // Options
  optSizeA4: string;
  optSizeLetter: string;
  optSizeFit: string;
  optOrientPortrait: string;
  optOrientLandscape: string;
  optOrientAuto: string;
  optMarginNone: string;
  optMarginSmall: string;
  optMarginNormal: string;
  optQualityHigh: string;
  optQualityMedium: string;
  optQualityLow: string;

  // Tool 3: PDF Editor
  editorTitle: string;
  editorDesc: string;
  editorH1: string;
  editorDropTitle: string;
  editorDropSubtitle: string;
  editorBtnChoose: string;
  editorPages: string;
  editorPageOf: string;
  editorZoom: string;
  editorRotate: string;
  editorDeletePage: string;
  editorMoveLeft: string;
  editorMoveRight: string;
  editorAddPage: string;
  editorMergeBtn: string;
  editorSplitBtn: string;
  editorToolNavigate: string;
  editorToolText: string;
  editorToolHighlight: string;
  editorToolDraw: string;
  editorToolSignature: string;
  editorToolImage: string;
  editorAddTextPlaceholder: string;
  editorColor: string;
  editorFontSize: string;
  editorSignTitle: string;
  editorSignClear: string;
  editorSignApply: string;
  editorSignPrompt: string;
  editorSaveDownload: string;
  editorSaving: string;
  editorDownloadReady: string;

  // Merge & Split tools
  mergeTitle: string;
  mergeDesc: string;
  mergeH1: string;
  mergeDropTitle: string;
  mergeBtnMerge: string;
  mergeAddMore: string;
  splitTitle: string;
  splitDesc: string;
  splitH1: string;
  splitDropTitle: string;
  splitRangePrompt: string;
  splitBtnSplit: string;

  // Benefits
  benefit1Title: string;
  benefit1Desc: string;
  benefit2Title: string;
  benefit2Desc: string;
  benefit3Title: string;
  benefit3Desc: string;
  benefit4Title: string;
  benefit4Desc: string;
  benefit5Title: string;
  benefit5Desc: string;
  benefit6Title: string;
  benefit6Desc: string;

  // SEO & Guides
  howItWorksTitle: string;
  faqTitle: string;
  relatedToolsTitle: string;

  // Common UI
  dropOrClick: string;
  fileLimitsHint: string;
  adPlaceholder: string;
  adBadge: string;
  loading: string;
  success: string;
  errorGeneral: string;
  errorFileSize: string;
  errorInvalidFormat: string;
  errorCorruptPdf: string;
  privacyBadgeText: string;
  freeForeverBadge: string;
  noRegistrationBadge: string;

  // Cookie banner
  cookieNotice: string;
  cookieAccept: string;
  cookieDecline: string;
  cookieSettings: string;
  cookiePolicyLink: string;

  // Footer & Legal
  footerDesc: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  footerAbout: string;
  footerContact: string;
  footerSitemap: string;

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactName: string;
  contactEmail: string;
  contactSubject: string;
  contactMessage: string;
  contactSubmit: string;
  contactSuccess: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'KR PDF',
    brandTagline: 'Free Online PDF Tools',
    navTools: 'Tools',
    navAllTools: 'All Tools',
    navPdfToWord: 'PDF to Word',
    navImageToPdf: 'Image to PDF',
    navEditPdf: 'Edit PDF',
    navMergePdf: 'Merge PDF',
    navSplitPdf: 'Split PDF',
    navAbout: 'About',
    navContact: 'Contact',

    heroBadge: '100% Free • No Sign-up Required • Instant Processing',
    heroTitle: 'Free Online PDF Tools for',
    heroTitleHighlight: 'Everyone, Everywhere',
    heroSubtitle: 'Convert, edit, create, and organize PDF documents in seconds. 100% private in-browser processing with no registration or hidden fees.',
    heroCtaPdfToWord: 'Convert PDF to Word',
    heroCtaImageToPdf: 'Images to PDF',
    heroCtaEditPdf: 'Edit PDF Online',
    heroPrivacyPill: 'Zero Cloud Storage — Your documents never leave your browser',

    toolsSectionTitle: 'Fast & Powerful PDF Tools',
    toolsSectionSubtitle: 'Choose an online tool below to get started immediately without creating an account.',

    pdfToWordTitle: 'PDF to Word Converter',
    pdfToWordDesc: 'Convert PDF documents into fully editable Microsoft Word (.docx) files.',
    pdfToWordH1: 'Convert PDF to Word Online for Free',
    pdfToWordDropTitle: 'Drop your PDF here',
    pdfToWordDropSubtitle: 'or click to browse from your device',
    pdfToWordBtnChoose: 'Choose PDF File',
    pdfToWordProcessing: 'Converting PDF to Word document...',
    pdfToWordDone: 'Conversion completed successfully!',
    pdfToWordDownload: 'Download Word Document (.docx)',
    pdfToWordConvertAnother: 'Convert Another PDF',
    pdfToWordNotice: 'Our converter extracts text, paragraphs, headings and images into an editable DOCX format directly in your browser for maximum privacy.',
    pdfToWordLimitations: 'Note: Heavily scanned or rasterized documents will extract text with best-effort optical parsing. Standard vector & text PDFs produce pristine formatting.',

    imageToPdfTitle: 'Image to PDF Converter',
    imageToPdfDesc: 'Convert JPG, PNG, WEBP and GIF images into a clean, unified PDF document.',
    imageToPdfH1: 'Convert JPG, PNG & Images to PDF Online',
    imageToPdfDropTitle: 'Drop your images here',
    imageToPdfDropSubtitle: 'Supports JPG, PNG, WEBP (up to 50 images)',
    imageToPdfBtnChoose: 'Choose Images',
    imageToPdfAddMore: 'Add More Images',
    imageToPdfClearAll: 'Clear All',
    imageToPdfReorderHint: 'Drag or click arrows to reorder pages before generating your PDF.',
    imageToPdfPageSize: 'Page Size',
    imageToPdfOrientation: 'Orientation',
    imageToPdfMargin: 'Margins',
    imageToPdfQuality: 'Image Quality',
    imageToPdfFileName: 'File Name',
    imageToPdfCreateBtn: 'Generate PDF Document',
    imageToPdfCreating: 'Combining images into PDF...',
    imageToPdfDownload: 'Download Your PDF',
    imageToPdfConvertAnother: 'Convert More Images',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'Fit to Image',
    optOrientPortrait: 'Portrait',
    optOrientLandscape: 'Landscape',
    optOrientAuto: 'Auto (Per Image)',
    optMarginNone: 'No Margin',
    optMarginSmall: 'Small Margin',
    optMarginNormal: 'Standard Margin',
    optQualityHigh: 'High (100% Quality)',
    optQualityMedium: 'Medium (Balanced 80%)',
    optQualityLow: 'Low (Compressed 60%)',

    editorTitle: 'PDF Editor & Annotator',
    editorDesc: 'View, annotate, highlight, draw, sign, add text, rotate and reorganize pages.',
    editorH1: 'Free Online PDF Editor',
    editorDropTitle: 'Drop your PDF file here to edit',
    editorDropSubtitle: 'View, add text, draw, sign, rotate and organize pages',
    editorBtnChoose: 'Open PDF in Editor',
    editorPages: 'Pages',
    editorPageOf: 'Page {current} of {total}',
    editorZoom: 'Zoom',
    editorRotate: 'Rotate 90°',
    editorDeletePage: 'Delete Page',
    editorMoveLeft: 'Move Left',
    editorMoveRight: 'Move Right',
    editorAddPage: 'Add Blank Page',
    editorMergeBtn: 'Merge with PDF...',
    editorSplitBtn: 'Split / Extract Pages',
    editorToolNavigate: 'Select & Pan',
    editorToolText: 'Add Text',
    editorToolHighlight: 'Highlighter',
    editorToolDraw: 'Pen / Draw',
    editorToolSignature: 'Signature',
    editorToolImage: 'Add Image / Stamp',
    editorAddTextPlaceholder: 'Type your text here...',
    editorColor: 'Color',
    editorFontSize: 'Font Size',
    editorSignTitle: 'Draw Your Signature',
    editorSignClear: 'Clear Signature',
    editorSignApply: 'Use Signature',
    editorSignPrompt: 'Sign above with mouse or touch screen',
    editorSaveDownload: 'Download Modified PDF',
    editorSaving: 'Rendering and saving changes...',
    editorDownloadReady: 'Your edited PDF is ready!',

    mergeTitle: 'Merge PDF Files',
    mergeDesc: 'Combine multiple PDF files into one single organized document.',
    mergeH1: 'Merge PDF Files Online for Free',
    mergeDropTitle: 'Drop multiple PDFs to combine',
    mergeBtnMerge: 'Merge into Single PDF',
    mergeAddMore: 'Add More PDFs',

    splitTitle: 'Split PDF Pages',
    splitDesc: 'Extract individual pages or ranges from any PDF document.',
    splitH1: 'Split PDF Pages Online for Free',
    splitDropTitle: 'Drop your PDF file to split',
    splitRangePrompt: 'Page numbers to extract (e.g. 1-3, 5):',
    splitBtnSplit: 'Extract Pages to New PDF',

    benefit1Title: '100% Free Forever',
    benefit1Desc: 'No subscriptions, credit cards, or hidden paywalls. Enjoy unrestricted access to all features.',
    benefit2Title: 'No Registration Needed',
    benefit2Desc: 'Jump straight into converting or editing. No email, passwords, or verification hurdles.',
    benefit3Title: 'In-Browser Privacy',
    benefit3Desc: 'Files are processed locally in your web browser. No unauthorized copies are ever uploaded to cloud servers.',
    benefit4Title: 'Lightning Fast Speed',
    benefit4Desc: 'Instant processing powered by modern web technologies without long server queue waits.',
    benefit5Title: 'Cross-Device Compatible',
    benefit5Desc: 'Smooth responsive design tailored for smartphones, tablets, laptops, and desktop computers.',
    benefit6Title: 'Clean & Non-Intrusive',
    benefit6Desc: 'Enjoy a streamlined, distraction-free workflow with polite, standards-compliant advertising.',

    howItWorksTitle: 'How to Use KR PDF Tools',
    faqTitle: 'Frequently Asked Questions',
    relatedToolsTitle: 'Explore More PDF Tools',

    dropOrClick: 'Drag & drop files here, or click to browse',
    fileLimitsHint: 'Maximum file size: 50 MB. Fast & confidential.',
    adPlaceholder: 'Advertisement',
    adBadge: 'Ad',
    loading: 'Loading...',
    success: 'Success!',
    errorGeneral: 'An error occurred while processing your file. Please try again.',
    errorFileSize: 'File size exceeds the 50 MB limit.',
    errorInvalidFormat: 'Unsupported file format. Please upload a valid file.',
    errorCorruptPdf: 'The PDF file appears to be corrupted or password-protected.',
    privacyBadgeText: 'Private & Secure Browser Processing',
    freeForeverBadge: '100% Free',
    noRegistrationBadge: 'No Sign-up',

    cookieNotice: 'We use cookies and local storage to analyze site traffic and enhance your browsing experience. Advertising partners may collect anonymized data for personalized ads.',
    cookieAccept: 'Accept All',
    cookieDecline: 'Essential Only',
    cookieSettings: 'Preferences',
    cookiePolicyLink: 'Cookie Policy',

    footerDesc: 'KR PDF is an independent, free platform providing fast, accessible, and privacy-respecting PDF tools worldwide.',
    footerRights: 'All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerCookies: 'Cookie Policy',
    footerAbout: 'About Us',
    footerContact: 'Contact',
    footerSitemap: 'Sitemap',

    contactTitle: 'Contact KR PDF Support',
    contactSubtitle: 'Have questions, feedback, or need assistance? We are here to help.',
    contactName: 'Your Name',
    contactEmail: 'Your Email Address',
    contactSubject: 'Subject',
    contactMessage: 'Message',
    contactSubmit: 'Send Message',
    contactSuccess: 'Thank you! Your message has been sent successfully.',
  },

  fr: {
    brandName: 'KR PDF',
    brandTagline: 'Outils PDF Gratuits en Ligne',
    navTools: 'Outils',
    navAllTools: 'Tous les outils',
    navPdfToWord: 'PDF en Word',
    navImageToPdf: 'Image en PDF',
    navEditPdf: 'Modifier PDF',
    navMergePdf: 'Fusionner PDF',
    navSplitPdf: 'Diviser PDF',
    navAbout: 'À propos',
    navContact: 'Contact',

    heroBadge: '100% Gratuit • Sans Inscription • Traitement Immédiat',
    heroTitle: 'Des outils PDF gratuits pour',
    heroTitleHighlight: 'tous, partout dans le monde',
    heroSubtitle: 'Convertissez, modifiez, créez et organisez vos fichiers PDF en quelques secondes. Traitement sécurisé directement dans votre navigateur, sans inscription ni frais cachés.',
    heroCtaPdfToWord: 'Convertir PDF en Word',
    heroCtaImageToPdf: 'Images en PDF',
    heroCtaEditPdf: 'Modifier un PDF en ligne',
    heroPrivacyPill: 'Confidentialité totale — Vos fichiers ne quittent jamais votre appareil',

    toolsSectionTitle: 'Outils PDF rapides et performants',
    toolsSectionSubtitle: 'Sélectionnez un outil ci-dessous pour démarrer instantanément sans créer de compte.',

    pdfToWordTitle: 'Convertisseur PDF en Word',
    pdfToWordDesc: 'Convertissez vos documents PDF en fichiers Microsoft Word (.docx) modifiables.',
    pdfToWordH1: 'Convertir un PDF en Word gratuitement en ligne',
    pdfToWordDropTitle: 'Déposez votre fichier PDF ici',
    pdfToWordDropSubtitle: 'ou cliquez pour sélectionner depuis votre appareil',
    pdfToWordBtnChoose: 'Choisir un fichier PDF',
    pdfToWordProcessing: 'Conversion du PDF en document Word...',
    pdfToWordDone: 'Conversion terminée avec succès !',
    pdfToWordDownload: 'Télécharger le document Word (.docx)',
    pdfToWordConvertAnother: 'Convertir un autre PDF',
    pdfToWordNotice: 'Notre convertisseur extrait le texte, les paragraphes et les images au format DOCX directement dans votre navigateur.',
    pdfToWordLimitations: 'Note : Pour les PDF scannés, la reconnaissance optique tente d\'extraire le texte au mieux. Les PDF textuels standards garantissent une mise en page optimale.',

    imageToPdfTitle: 'Convertisseur Image en PDF',
    imageToPdfDesc: 'Transformez vos images JPG, PNG et WEBP en un document PDF unique et soigné.',
    imageToPdfH1: 'Convertir JPG, PNG et Images en PDF en ligne',
    imageToPdfDropTitle: 'Déposez vos images ici',
    imageToPdfDropSubtitle: 'Prend en charge JPG, PNG, WEBP (jusqu\'à 50 images)',
    imageToPdfBtnChoose: 'Choisir des images',
    imageToPdfAddMore: 'Ajouter d\'autres images',
    imageToPdfClearAll: 'Tout effacer',
    imageToPdfReorderHint: 'Glissez ou cliquez sur les flèches pour réordonner les pages avant de générer le PDF.',
    imageToPdfPageSize: 'Format de page',
    imageToPdfOrientation: 'Orientation',
    imageToPdfMargin: 'Marges',
    imageToPdfQuality: 'Qualité d\'image',
    imageToPdfFileName: 'Nom du fichier',
    imageToPdfCreateBtn: 'Créer le PDF',
    imageToPdfCreating: 'Assemblage des images en PDF...',
    imageToPdfDownload: 'Télécharger le PDF',
    imageToPdfConvertAnother: 'Convertir d\'autres images',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'Adapter à l\'image',
    optOrientPortrait: 'Portrait',
    optOrientLandscape: 'Paysage',
    optOrientAuto: 'Auto (Selon l\'image)',
    optMarginNone: 'Sans marge',
    optMarginSmall: 'Petite marge',
    optMarginNormal: 'Marge standard',
    optQualityHigh: 'Haute (100% Qualité)',
    optQualityMedium: 'Moyenne (Équilibrée 80%)',
    optQualityLow: 'Basse (Compressée 60%)',

    editorTitle: 'Éditeur & Annotateur PDF',
    editorDesc: 'Visualisez, annotez, surlignez, dessinez, signez, ajoutez du texte et réorganisez les pages.',
    editorH1: 'Éditeur PDF gratuit en ligne',
    editorDropTitle: 'Déposez votre fichier PDF à modifier ici',
    editorDropSubtitle: 'Consultez, annotez, dessinez, signez et réorganisez vos pages',
    editorBtnChoose: 'Ouvrir le PDF dans l\'éditeur',
    editorPages: 'Pages',
    editorPageOf: 'Page {current} sur {total}',
    editorZoom: 'Zoom',
    editorRotate: 'Rotation 90°',
    editorDeletePage: 'Supprimer la page',
    editorMoveLeft: 'Déplacer vers la gauche',
    editorMoveRight: 'Déplacer vers la droite',
    editorAddPage: 'Ajouter une page blanche',
    editorMergeBtn: 'Fusionner avec un PDF...',
    editorSplitBtn: 'Diviser / Extraire des pages',
    editorToolNavigate: 'Sélectionner & Déplacer',
    editorToolText: 'Ajouter du texte',
    editorToolHighlight: 'Surligneur',
    editorToolDraw: 'Crayon / Dessin',
    editorToolSignature: 'Signature',
    editorToolImage: 'Insérer une image',
    editorAddTextPlaceholder: 'Tapez votre texte ici...',
    editorColor: 'Couleur',
    editorFontSize: 'Taille',
    editorSignTitle: 'Dessinez votre signature',
    editorSignClear: 'Effacer',
    editorSignApply: 'Appliquer la signature',
    editorSignPrompt: 'Signez avec votre souris ou au doigt sur écran tactile',
    editorSaveDownload: 'Télécharger le PDF modifié',
    editorSaving: 'Génération du nouveau document PDF...',
    editorDownloadReady: 'Votre PDF modifié est prêt !',

    mergeTitle: 'Fusionner des PDF',
    mergeDesc: 'Combinez plusieurs fichiers PDF en un seul document ordonné.',
    mergeH1: 'Fusionner des fichiers PDF gratuitement en ligne',
    mergeDropTitle: 'Déposez plusieurs PDF pour les fusionner',
    mergeBtnMerge: 'Fusionner en un seul PDF',
    mergeAddMore: 'Ajouter d\'autres PDF',

    splitTitle: 'Diviser un PDF',
    splitDesc: 'Extrayez des pages spécifiques ou des plages depuis un document PDF.',
    splitH1: 'Diviser des pages PDF gratuitement en ligne',
    splitDropTitle: 'Déposez votre fichier PDF à diviser',
    splitRangePrompt: 'Numéros de pages à extraire (ex : 1-3, 5) :',
    splitBtnSplit: 'Extraire les pages vers un nouveau PDF',

    benefit1Title: '100% Gratuit à vie',
    benefit1Desc: 'Aucun abonnement, carte bancaire ou paywall. Accédez à tous les outils librement.',
    benefit2Title: 'Aucune inscription',
    benefit2Desc: 'Accédez directement à vos conversions et modifications sans avoir à fournir d\'email.',
    benefit3Title: 'Confidentialité totale',
    benefit3Desc: 'Vos fichiers sont traités localement dans votre navigateur sans être stockés sur nos serveurs.',
    benefit4Title: 'Vitesse instantanée',
    benefit4Desc: 'Bénéficiez d\'une rapidité optimale sans temps d\'attente ni file de traitement serveur.',
    benefit5Title: 'Compatible tous écrans',
    benefit5Desc: 'Parfaitement adapté aux smartphones, tablettes Android et iOS ainsi qu\'aux ordinateurs.',
    benefit6Title: 'Interface propre & claire',
    benefit6Desc: 'Profitez d\'une expérience fluide avec des publicités discrètes et conformes aux normes.',

    howItWorksTitle: 'Comment utiliser les outils KR PDF',
    faqTitle: 'Foire Aux Questions (FAQ)',
    relatedToolsTitle: 'Autres outils PDF recommandés',

    dropOrClick: 'Glissez-déposez vos fichiers ici, ou cliquez pour parcourir',
    fileLimitsHint: 'Taille max : 50 Mo. Rapide, confidentiel et sécurisé.',
    adPlaceholder: 'Publicité',
    adBadge: 'Annonce',
    loading: 'Chargement en cours...',
    success: 'Opération réussie !',
    errorGeneral: 'Une erreur s\'est produite lors du traitement du fichier.',
    errorFileSize: 'Le fichier dépasse la taille maximale autorisée (50 Mo).',
    errorInvalidFormat: 'Format de fichier non pris en charge.',
    errorCorruptPdf: 'Le document PDF est corrompu ou protégé par mot de passe.',
    privacyBadgeText: 'Traitement local sécurisé dans le navigateur',
    freeForeverBadge: '100% Gratuit',
    noRegistrationBadge: 'Sans inscription',

    cookieNotice: 'Nous utilisons des cookies pour mesurer notre audience et améliorer votre expérience. Nos partenaires publicitaires peuvent collecter des données anonymisées.',
    cookieAccept: 'Tout accepter',
    cookieDecline: 'Essentiels uniquement',
    cookieSettings: 'Préférences',
    cookiePolicyLink: 'Politique des cookies',

    footerDesc: 'KR PDF est une plateforme libre et indépendante d\'outils PDF simples, rapides et respectueux de la vie privée.',
    footerRights: 'Tous droits réservés.',
    footerPrivacy: 'Politique de confidentialité',
    footerTerms: 'Conditions d\'utilisation',
    footerCookies: 'Gestion des cookies',
    footerAbout: 'À propos',
    footerContact: 'Contact',
    footerSitemap: 'Plan du site',

    contactTitle: 'Contacter l\'équipe KR PDF',
    contactSubtitle: 'Une question, une suggestion ou une remarque ? Écrivez-nous directement.',
    contactName: 'Votre nom',
    contactEmail: 'Votre adresse email',
    contactSubject: 'Sujet',
    contactMessage: 'Votre message',
    contactSubmit: 'Envoyer le message',
    contactSuccess: 'Merci ! Votre message a bien été envoyé.',
  },

  es: {
    brandName: 'KR PDF',
    brandTagline: 'Herramientas PDF Gratuitas en Línea',
    navTools: 'Herramientas',
    navAllTools: 'Todas las herramientas',
    navPdfToWord: 'PDF a Word',
    navImageToPdf: 'Imagen a PDF',
    navEditPdf: 'Editar PDF',
    navMergePdf: 'Unir PDF',
    navSplitPdf: 'Dividir PDF',
    navAbout: 'Acerca de',
    navContact: 'Contacto',

    heroBadge: '100% Gratis • Sin Registro • Procesamiento Inmediato',
    heroTitle: 'Herramientas PDF en línea gratuitas para',
    heroTitleHighlight: 'todos en cualquier lugar',
    heroSubtitle: 'Convierte, edita y organiza tus archivos PDF en segundos. Procesamiento seguro en tu navegador, sin registro ni costes ocultos.',
    heroCtaPdfToWord: 'Convertir PDF a Word',
    heroCtaImageToPdf: 'Imágenes a PDF',
    heroCtaEditPdf: 'Editar PDF Online',
    heroPrivacyPill: 'Privacidad total — Tus archivos nunca salen de tu navegador',

    toolsSectionTitle: 'Herramientas PDF rápidas y potentes',
    toolsSectionSubtitle: 'Selecciona una herramienta a continuación para empezar sin necesidad de registrarte.',

    pdfToWordTitle: 'Convertidor de PDF a Word',
    pdfToWordDesc: 'Convierte documentos PDF a archivos editables de Microsoft Word (.docx).',
    pdfToWordH1: 'Convertir PDF a Word gratis en línea',
    pdfToWordDropTitle: 'Arrastra tu archivo PDF aquí',
    pdfToWordDropSubtitle: 'o haz clic para buscar en tu dispositivo',
    pdfToWordBtnChoose: 'Seleccionar archivo PDF',
    pdfToWordProcessing: 'Convirtiendo PDF a documento Word...',
    pdfToWordDone: '¡Conversión completada con éxito!',
    pdfToWordDownload: 'Descargar documento Word (.docx)',
    pdfToWordConvertAnother: 'Convertir otro PDF',
    pdfToWordNotice: 'Convierte texto y párrafos a formato DOCX directamente en tu navegador para garantizar tu privacidad.',
    pdfToWordLimitations: 'Los documentos escaneados intentarán reconocer el texto. Los PDF con texto nativo ofrecen una maquetación ideal.',

    imageToPdfTitle: 'Convertidor de Imagen a PDF',
    imageToPdfDesc: 'Convierte imágenes JPG, PNG y WEBP en un archivo PDF ordenado y limpio.',
    imageToPdfH1: 'Convertir JPG, PNG e imágenes a PDF en línea',
    imageToPdfDropTitle: 'Arrastra tus imágenes aquí',
    imageToPdfDropSubtitle: 'Admite JPG, PNG, WEBP (hasta 50 imágenes)',
    imageToPdfBtnChoose: 'Elegir imágenes',
    imageToPdfAddMore: 'Añadir más imágenes',
    imageToPdfClearAll: 'Limpiar todo',
    imageToPdfReorderHint: 'Arrastra las miniaturas para ordenar las páginas antes de generar el PDF.',
    imageToPdfPageSize: 'Tamaño de página',
    imageToPdfOrientation: 'Orientación',
    imageToPdfMargin: 'Márgenes',
    imageToPdfQuality: 'Calidad de imagen',
    imageToPdfFileName: 'Nombre del archivo',
    imageToPdfCreateBtn: 'Generar documento PDF',
    imageToPdfCreating: 'Uniendo imágenes en PDF...',
    imageToPdfDownload: 'Descargar PDF',
    imageToPdfConvertAnother: 'Convertir más imágenes',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'Ajustar a imagen',
    optOrientPortrait: 'Vertical',
    optOrientLandscape: 'Horizontal',
    optOrientAuto: 'Automático',
    optMarginNone: 'Sin márgenes',
    optMarginSmall: 'Margen pequeño',
    optMarginNormal: 'Margen estándar',
    optQualityHigh: 'Alta (100% Calidad)',
    optQualityMedium: 'Media (Equilibrada 80%)',
    optQualityLow: 'Baja (Comprimida 60%)',

    editorTitle: 'Editor de PDF Online',
    editorDesc: 'Visualiza, añade texto, dibuja, firma, rota y reorganiza páginas de tu PDF.',
    editorH1: 'Editor de PDF gratuito en línea',
    editorDropTitle: 'Arrastra tu PDF aquí para editarlo',
    editorDropSubtitle: 'Añade texto, dibuja, firma, resalta y rota páginas',
    editorBtnChoose: 'Abrir PDF en el editor',
    editorPages: 'Páginas',
    editorPageOf: 'Página {current} de {total}',
    editorZoom: 'Zoom',
    editorRotate: 'Rotar 90°',
    editorDeletePage: 'Eliminar página',
    editorMoveLeft: 'Mover a la izquierda',
    editorMoveRight: 'Mover a la derecha',
    editorAddPage: 'Añadir página en blanco',
    editorMergeBtn: 'Unir con otro PDF...',
    editorSplitBtn: 'Dividir / Extraer páginas',
    editorToolNavigate: 'Seleccionar & Mover',
    editorToolText: 'Añadir texto',
    editorToolHighlight: 'Resaltador',
    editorToolDraw: 'Lápiz / Dibujar',
    editorToolSignature: 'Firma digital',
    editorToolImage: 'Insertar imagen',
    editorAddTextPlaceholder: 'Escribe tu texto aquí...',
    editorColor: 'Color',
    editorFontSize: 'Tamaño',
    editorSignTitle: 'Dibuja tu firma',
    editorSignClear: 'Borrar',
    editorSignApply: 'Usar firma',
    editorSignPrompt: 'Firma con el ratón o con el dedo en pantalla táctil',
    editorSaveDownload: 'Descargar PDF modificado',
    editorSaving: 'Generando nuevo archivo PDF...',
    editorDownloadReady: '¡Tu PDF editado está listo!',

    mergeTitle: 'Unir archivos PDF',
    mergeDesc: 'Combina varios documentos PDF en un solo archivo.',
    mergeH1: 'Unir archivos PDF online gratis',
    mergeDropTitle: 'Arrastra varios PDF para combinarlos',
    mergeBtnMerge: 'Unir en un solo PDF',
    mergeAddMore: 'Añadir más archivos',

    splitTitle: 'Dividir PDF',
    splitDesc: 'Extrae páginas individuales o rangos de cualquier PDF.',
    splitH1: 'Dividir páginas PDF gratis online',
    splitDropTitle: 'Arrastra tu PDF para extraer páginas',
    splitRangePrompt: 'Páginas a extraer (ej: 1-3, 5):',
    splitBtnSplit: 'Extraer a un nuevo PDF',

    benefit1Title: '100% Gratis para siempre',
    benefit1Desc: 'Sin suscripciones ni barreras de pago.',
    benefit2Title: 'Sin necesidad de registro',
    benefit2Desc: 'Usa cualquier herramienta al instante sin registrarte.',
    benefit3Title: 'Privacidad total en navegador',
    benefit3Desc: 'Tus archivos se procesan en tu navegador y no se guardan en el servidor.',
    benefit4Title: 'Velocidad inmediata',
    benefit4Desc: 'Tecnología ultrarrápida sin colas de espera.',
    benefit5Title: 'Funciona en móviles',
    benefit5Desc: 'Diseño adaptable para teléfonos, tablets y computadoras.',
    benefit6Title: 'Limpio y profesional',
    benefit6Desc: 'Sin ventanas emergentes intrusivas ni publicidad molesta.',

    howItWorksTitle: 'Cómo usar las herramientas KR PDF',
    faqTitle: 'Preguntas Frecuentes',
    relatedToolsTitle: 'Otras herramientas útiles',

    dropOrClick: 'Arrastra archivos aquí o haz clic para buscar',
    fileLimitsHint: 'Tamaño máx: 50 MB. Rápido y seguro.',
    adPlaceholder: 'Publicidad',
    adBadge: 'Anuncio',
    loading: 'Cargando...',
    success: '¡Completado con éxito!',
    errorGeneral: 'Ocurrió un error al procesar el archivo.',
    errorFileSize: 'El archivo supera el límite de 50 MB.',
    errorInvalidFormat: 'Formato de archivo no compatible.',
    errorCorruptPdf: 'El PDF está dañado o protegido con contraseña.',
    privacyBadgeText: 'Procesamiento seguro en tu navegador',
    freeForeverBadge: '100% Gratis',
    noRegistrationBadge: 'Sin registro',

    cookieNotice: 'Usamos cookies para mejorar tu experiencia de navegación y analizar nuestro tráfico.',
    cookieAccept: 'Aceptar todas',
    cookieDecline: 'Solo necesarias',
    cookieSettings: 'Preferencias',
    cookiePolicyLink: 'Política de cookies',

    footerDesc: 'KR PDF es una plataforma libre y gratuita de herramientas PDF rápidas y seguras en todo el mundo.',
    footerRights: 'Todos los derechos reservados.',
    footerPrivacy: 'Política de Privacidad',
    footerTerms: 'Términos de Servicio',
    footerCookies: 'Política de Cookies',
    footerAbout: 'Sobre nosotros',
    footerContact: 'Contacto',
    footerSitemap: 'Mapa del sitio',

    contactTitle: 'Contacto KR PDF',
    contactSubtitle: '¿Tienes alguna duda o sugerencia? Escríbenos directamente.',
    contactName: 'Tu nombre',
    contactEmail: 'Tu correo electrónico',
    contactSubject: 'Asunto',
    contactMessage: 'Mensaje',
    contactSubmit: 'Enviar mensaje',
    contactSuccess: '¡Gracias! Tu mensaje ha sido enviado.',
  },

  pt: {
    brandName: 'KR PDF',
    brandTagline: 'Ferramentas PDF Online Gratuitas',
    navTools: 'Ferramentas',
    navAllTools: 'Todas as ferramentas',
    navPdfToWord: 'PDF para Word',
    navImageToPdf: 'Imagem para PDF',
    navEditPdf: 'Editar PDF',
    navMergePdf: 'Juntar PDF',
    navSplitPdf: 'Dividir PDF',
    navAbout: 'Sobre',
    navContact: 'Contato',

    heroBadge: '100% Gratuito • Sem Registro • Processamento Imediato',
    heroTitle: 'Ferramentas PDF gratuitas para',
    heroTitleHighlight: 'todos no mundo inteiro',
    heroSubtitle: 'Converta, edite e organize arquivos PDF em segundos. Processamento seguro no seu navegador sem cadastro ou taxas.',
    heroCtaPdfToWord: 'Converter PDF para Word',
    heroCtaImageToPdf: 'Imagens para PDF',
    heroCtaEditPdf: 'Editar PDF Online',
    heroPrivacyPill: 'Privacidade Total — Seus arquivos não saem do seu navegador',

    toolsSectionTitle: 'Ferramentas PDF rápidas e confiáveis',
    toolsSectionSubtitle: 'Escolha uma ferramenta abaixo para começar sem criar conta.',

    pdfToWordTitle: 'Conversor PDF para Word',
    pdfToWordDesc: 'Converta documentos PDF em arquivos Microsoft Word (.docx) editáveis.',
    pdfToWordH1: 'Converter PDF para Word online grátis',
    pdfToWordDropTitle: 'Arraste seu arquivo PDF aqui',
    pdfToWordDropSubtitle: 'ou clique para selecionar do dispositivo',
    pdfToWordBtnChoose: 'Escolher arquivo PDF',
    pdfToWordProcessing: 'Convertendo PDF para Word...',
    pdfToWordDone: 'Conversão concluída com sucesso!',
    pdfToWordDownload: 'Baixar documento Word (.docx)',
    pdfToWordConvertAnother: 'Converter outro PDF',
    pdfToWordNotice: 'Extrai texto e estrutura diretamente no seu navegador com privacidade total.',
    pdfToWordLimitations: 'PDFs escaneados terão reconhecimento de texto da melhor forma possível.',

    imageToPdfTitle: 'Conversor Imagem para PDF',
    imageToPdfDesc: 'Transforme imagens JPG, PNG e WEBP em um documento PDF limpo.',
    imageToPdfH1: 'Converter JPG, PNG e Imagens para PDF online',
    imageToPdfDropTitle: 'Arraste suas imagens aqui',
    imageToPdfDropSubtitle: 'Suporta JPG, PNG, WEBP (até 50 imagens)',
    imageToPdfBtnChoose: 'Escolher imagens',
    imageToPdfAddMore: 'Adicionar mais imagens',
    imageToPdfClearAll: 'Limpar tudo',
    imageToPdfReorderHint: 'Arraste as imagens para ordenar antes de criar o PDF.',
    imageToPdfPageSize: 'Tamanho da página',
    imageToPdfOrientation: 'Orientação',
    imageToPdfMargin: 'Margens',
    imageToPdfQuality: 'Qualidade da imagem',
    imageToPdfFileName: 'Nome do arquivo',
    imageToPdfCreateBtn: 'Criar documento PDF',
    imageToPdfCreating: 'Gerando PDF...',
    imageToPdfDownload: 'Baixar PDF',
    imageToPdfConvertAnother: 'Converter mais imagens',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'Ajustar à imagem',
    optOrientPortrait: 'Retrato',
    optOrientLandscape: 'Paisagem',
    optOrientAuto: 'Automático',
    optMarginNone: 'Sem margem',
    optMarginSmall: 'Margem pequena',
    optMarginNormal: 'Margem padrão',
    optQualityHigh: 'Alta (100% Qualidade)',
    optQualityMedium: 'Média (Equilibrada 80%)',
    optQualityLow: 'Baixa (Comprimida 60%)',

    editorTitle: 'Editor de PDF Online',
    editorDesc: 'Visualize, anote, desenhe, assine e organize páginas do seu PDF.',
    editorH1: 'Editor de PDF gratuito online',
    editorDropTitle: 'Arraste seu PDF aqui para editar',
    editorDropSubtitle: 'Adicione texto, desenhe, assine e rotacione páginas',
    editorBtnChoose: 'Abrir PDF no editor',
    editorPages: 'Páginas',
    editorPageOf: 'Página {current} de {total}',
    editorZoom: 'Zoom',
    editorRotate: 'Rotacionar 90°',
    editorDeletePage: 'Excluir página',
    editorMoveLeft: 'Mover para esquerda',
    editorMoveRight: 'Mover para direita',
    editorAddPage: 'Adicionar página em branco',
    editorMergeBtn: 'Juntar com outro PDF...',
    editorSplitBtn: 'Dividir / Extrair páginas',
    editorToolNavigate: 'Mover & Navegar',
    editorToolText: 'Adicionar texto',
    editorToolHighlight: 'Destacar texto',
    editorToolDraw: 'Desenhar / Caneta',
    editorToolSignature: 'Assinatura',
    editorToolImage: 'Inserir imagem',
    editorAddTextPlaceholder: 'Digite o texto aqui...',
    editorColor: 'Cor',
    editorFontSize: 'Tamanho',
    editorSignTitle: 'Desenhe sua assinatura',
    editorSignClear: 'Limpar',
    editorSignApply: 'Usar assinatura',
    editorSignPrompt: 'Assine com o mouse ou tela de toque',
    editorSaveDownload: 'Baixar PDF modificado',
    editorSaving: 'Gerando novo PDF...',
    editorDownloadReady: 'Seu PDF editado está pronto!',

    mergeTitle: 'Juntar arquivos PDF',
    mergeDesc: 'Combine vários documentos PDF em um único arquivo.',
    mergeH1: 'Juntar arquivos PDF online grátis',
    mergeDropTitle: 'Arraste vários PDFs para combinar',
    mergeBtnMerge: 'Juntar em um só PDF',
    mergeAddMore: 'Adicionar mais PDFs',

    splitTitle: 'Dividir PDF',
    splitDesc: 'Extraia páginas de qualquer arquivo PDF.',
    splitH1: 'Dividir páginas PDF online grátis',
    splitDropTitle: 'Arraste seu PDF para dividir',
    splitRangePrompt: 'Páginas a extrair (ex: 1-3, 5):',
    splitBtnSplit: 'Extrair páginas para novo PDF',

    benefit1Title: '100% Gratuito',
    benefit1Desc: 'Sem custos ou assinaturas ocultas.',
    benefit2Title: 'Sem registro',
    benefit2Desc: 'Use imediatamente sem criar conta.',
    benefit3Title: 'Privacidade garantida',
    benefit3Desc: 'Processamento direto no seu navegador sem envio a servidores.',
    benefit4Title: 'Super rápido',
    benefit4Desc: 'Tecnologia moderna sem filas.',
    benefit5Title: 'Compatível com celular',
    benefit5Desc: 'Funciona perfeitamente em Android, iPhone e computadores.',
    benefit6Title: 'Design limpo',
    benefit6Desc: 'Interface simples e publicidade não intrusiva.',

    howItWorksTitle: 'Como usar o KR PDF',
    faqTitle: 'Perguntas Frequentes',
    relatedToolsTitle: 'Mais ferramentas úteis',

    dropOrClick: 'Arraste os arquivos aqui ou clique para selecionar',
    fileLimitsHint: 'Tamanho máx: 50 MB. Rápido e privado.',
    adPlaceholder: 'Publicidade',
    adBadge: 'Anúncio',
    loading: 'Carregando...',
    success: 'Sucesso!',
    errorGeneral: 'Ocorreu um erro ao processar o arquivo.',
    errorFileSize: 'O arquivo ultrapassa o limite de 50 MB.',
    errorInvalidFormat: 'Formato não suportado.',
    errorCorruptPdf: 'O PDF está corrompido ou protegido por senha.',
    privacyBadgeText: 'Processamento seguro no navegador',
    freeForeverBadge: '100% Grátis',
    noRegistrationBadge: 'Sem cadastro',

    cookieNotice: 'Usamos cookies para melhorar sua experiência e analisar o tráfego.',
    cookieAccept: 'Aceitar todos',
    cookieDecline: 'Apenas essenciais',
    cookieSettings: 'Preferências',
    cookiePolicyLink: 'Política de Cookies',

    footerDesc: 'KR PDF é uma plataforma livre de ferramentas PDF rápidas, seguras e gratuitas para o mundo inteiro.',
    footerRights: 'Todos os direitos reservados.',
    footerPrivacy: 'Política de Privacidade',
    footerTerms: 'Termos de Serviço',
    footerCookies: 'Política de Cookies',
    footerAbout: 'Sobre nós',
    footerContact: 'Contato',
    footerSitemap: 'Mapa do site',

    contactTitle: 'Fale com o suporte KR PDF',
    contactSubtitle: 'Envie suas dúvidas ou sugestões para nossa equipe.',
    contactName: 'Seu nome',
    contactEmail: 'Seu email',
    contactSubject: 'Assunto',
    contactMessage: 'Mensagem',
    contactSubmit: 'Enviar mensagem',
    contactSuccess: 'Obrigado! Sua mensagem foi enviada.',
  },

  de: {
    brandName: 'KR PDF',
    brandTagline: 'Kostenlose Online-PDF-Tools',
    navTools: 'Werkzeuge',
    navAllTools: 'Alle Werkzeuge',
    navPdfToWord: 'PDF in Word',
    navImageToPdf: 'Bild in PDF',
    navEditPdf: 'PDF bearbeiten',
    navMergePdf: 'PDF zusammenfügen',
    navSplitPdf: 'PDF teilen',
    navAbout: 'Über uns',
    navContact: 'Kontakt',

    heroBadge: '100% Kostenlos • Keine Registrierung • Sofortige Konvertierung',
    heroTitle: 'Kostenlose Online-PDF-Tools für',
    heroTitleHighlight: 'alle weltweit',
    heroSubtitle: 'Konvertieren, bearbeiten und organisieren Sie PDF-Dateien in Sekunden. 100% private Verarbeitung im Browser ohne Registrierung.',
    heroCtaPdfToWord: 'PDF in Word umwandeln',
    heroCtaImageToPdf: 'Bilder in PDF',
    heroCtaEditPdf: 'PDF online bearbeiten',
    heroPrivacyPill: 'Volle Privatsphäre — Ihre Dokumente verlassen niemals Ihren Browser',

    toolsSectionTitle: 'Schnelle & leistungsstarke PDF-Tools',
    toolsSectionSubtitle: 'Wählen Sie ein Tool aus, um sofort ohne Konto zu starten.',

    pdfToWordTitle: 'PDF in Word Konverter',
    pdfToWordDesc: 'Konvertieren Sie PDF-Dokumente in bearbeitbare Word-Dateien (.docx).',
    pdfToWordH1: 'PDF in Word online kostenlos umwandeln',
    pdfToWordDropTitle: 'PDF-Datei hier ablegen',
    pdfToWordDropSubtitle: 'oder klicken, um vom Gerät auszuwählen',
    pdfToWordBtnChoose: 'PDF-Datei auswählen',
    pdfToWordProcessing: 'PDF wird in Word umgewandelt...',
    pdfToWordDone: 'Konvertierung erfolgreich abgeschlossen!',
    pdfToWordDownload: 'Word-Dokument herunterladen (.docx)',
    pdfToWordConvertAnother: 'Weiteres PDF umwandeln',
    pdfToWordNotice: 'Extrahiert Text und Absätze direkt im Browser für maximale Datensicherheit.',
    pdfToWordLimitations: 'Gescannte Dokumente werden nach bestem Vermögen per Schrifterkennung verarbeitet.',

    imageToPdfTitle: 'Bild in PDF Konverter',
    imageToPdfDesc: 'Verwandeln Sie JPG, PNG und WEBP Bilder in ein sauberes PDF-Dokument.',
    imageToPdfH1: 'JPG, PNG & Bilder online in PDF konvertieren',
    imageToPdfDropTitle: 'Bilder hier ablegen',
    imageToPdfDropSubtitle: 'Unterstützt JPG, PNG, WEBP (bis zu 50 Bilder)',
    imageToPdfBtnChoose: 'Bilder auswählen',
    imageToPdfAddMore: 'Weitere Bilder hinzufügen',
    imageToPdfClearAll: 'Alle löschen',
    imageToPdfReorderHint: 'Bilder ziehen oder Pfeile nutzen, um Seiten vor dem Erstellen zu sortieren.',
    imageToPdfPageSize: 'Seitengröße',
    imageToPdfOrientation: 'Ausrichtung',
    imageToPdfMargin: 'Ränder',
    imageToPdfQuality: 'Bildqualität',
    imageToPdfFileName: 'Dateiname',
    imageToPdfCreateBtn: 'PDF-Dokument erstellen',
    imageToPdfCreating: 'Bilder werden zu PDF zusammengefügt...',
    imageToPdfDownload: 'PDF herunterladen',
    imageToPdfConvertAnother: 'Weitere Bilder umwandeln',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'An Bild anpassen',
    optOrientPortrait: 'Hochformat',
    optOrientLandscape: 'Querformat',
    optOrientAuto: 'Automatisch',
    optMarginNone: 'Kein Rand',
    optMarginSmall: 'Schmaler Rand',
    optMarginNormal: 'Standardrand',
    optQualityHigh: 'Hoch (100% Qualität)',
    optQualityMedium: 'Mittel (Ausgewogen 80%)',
    optQualityLow: 'Niedrig (Komprimiert 60%)',

    editorTitle: 'Online PDF-Editor',
    editorDesc: 'Anzeigen, Notizen machen, zeichnen, unterschreiben, drehen und Seiten ordnen.',
    editorH1: 'Kostenloser Online PDF-Editor',
    editorDropTitle: 'PDF hier ablegen zum Bearbeiten',
    editorDropSubtitle: 'Text einfügen, zeichnen, signieren und Seiten drehen',
    editorBtnChoose: 'PDF im Editor öffnen',
    editorPages: 'Seiten',
    editorPageOf: 'Seite {current} von {total}',
    editorZoom: 'Zoom',
    editorRotate: '90° drehen',
    editorDeletePage: 'Seite löschen',
    editorMoveLeft: 'Nach links',
    editorMoveRight: 'Nach rechts',
    editorAddPage: 'Leere Seite hinzufügen',
    editorMergeBtn: 'Mit weiterem PDF zusammenfügen...',
    editorSplitBtn: 'Seiten teilen / extrahieren',
    editorToolNavigate: 'Navigieren',
    editorToolText: 'Text hinzufügen',
    editorToolHighlight: 'Textmarker',
    editorToolDraw: 'Stift / Zeichnen',
    editorToolSignature: 'Unterschrift',
    editorToolImage: 'Bild einfügen',
    editorAddTextPlaceholder: 'Text hier eingeben...',
    editorColor: 'Farbe',
    editorFontSize: 'Schriftgröße',
    editorSignTitle: 'Unterschrift zeichnen',
    editorSignClear: 'Löschen',
    editorSignApply: 'Übernehmen',
    editorSignPrompt: 'Mit Maus oder Finger auf Touchscreen unterschreiben',
    editorSaveDownload: 'Bearbeitetes PDF herunterladen',
    editorSaving: 'Änderungen werden gerendert...',
    editorDownloadReady: 'Ihr PDF ist fertig!',

    mergeTitle: 'PDF zusammenfügen',
    mergeDesc: 'Kombinieren Sie mehrere PDF-Dateien zu einem Dokument.',
    mergeH1: 'PDF-Dateien online kostenlos zusammenfügen',
    mergeDropTitle: 'Mehrere PDFs hier ablegen',
    mergeBtnMerge: 'Zu einem PDF zusammenfügen',
    mergeAddMore: 'Weitere PDFs hinzufügen',

    splitTitle: 'PDF teilen',
    splitDesc: 'Einzelne Seiten aus einem PDF-Dokument extrahieren.',
    splitH1: 'PDF-Seiten online kostenlos teilen',
    splitDropTitle: 'PDF zum Teilen hier ablegen',
    splitRangePrompt: 'Zu extrahierende Seiten (z.B. 1-3, 5):',
    splitBtnSplit: 'In neues PDF extrahieren',

    benefit1Title: '100% Dauerhaft kostenlos',
    benefit1Desc: 'Keine Abos oder versteckte Kosten.',
    benefit2Title: 'Keine Registrierung',
    benefit2Desc: 'Sofort starten ohne E-Mail oder Passwort.',
    benefit3Title: 'Browser-Datenschutz',
    benefit3Desc: 'Ihre Dateien werden lokal verarbeitet und nicht gespeichert.',
    benefit4Title: 'Blitzschnell',
    benefit4Desc: 'Moderne Browser-Technologie ohne Wartezeiten.',
    benefit5Title: 'Mobilfreundlich',
    benefit5Desc: 'Funktioniert reibungslos auf Smartphones, Tablets und PCs.',
    benefit6Title: 'Angenehme Bedienung',
    benefit6Desc: 'Übersichtliche Oberfläche und dezente Werbung.',

    howItWorksTitle: 'So funktioniert KR PDF',
    faqTitle: 'Häufig gestellte Fragen',
    relatedToolsTitle: 'Weitere nützliche PDF-Tools',

    dropOrClick: 'Dateien hier ablegen oder klicken',
    fileLimitsHint: 'Max. Dateigröße: 50 MB. Sicher und vertraulich.',
    adPlaceholder: 'Werbung',
    adBadge: 'Anzeige',
    loading: 'Laden...',
    success: 'Erfolgreich!',
    errorGeneral: 'Fehler bei der Verarbeitung der Datei.',
    errorFileSize: 'Die Datei überschreitet 50 MB.',
    errorInvalidFormat: 'Nicht unterstütztes Format.',
    errorCorruptPdf: 'Das PDF ist beschädigt oder passwortgeschützt.',
    privacyBadgeText: 'Sichere Verarbeitung direkt im Browser',
    freeForeverBadge: '100% Kostenlos',
    noRegistrationBadge: 'Ohne Registrierung',

    cookieNotice: 'Wir nutzen Cookies zur Optimierung unseres Angebots und zur Reichweitenmessung.',
    cookieAccept: 'Alle akzeptieren',
    cookieDecline: 'Nur notwendige',
    cookieSettings: 'Einstellungen',
    cookiePolicyLink: 'Cookie-Richtlinie',

    footerDesc: 'KR PDF ist eine unabhängige Plattform für kostenlose, sichere und schnelle PDF-Werkzeuge.',
    footerRights: 'Alle Rechte vorbehalten.',
    footerPrivacy: 'Datenschutz',
    footerTerms: 'Nutzungsbedingungen',
    footerCookies: 'Cookie-Einstellungen',
    footerAbout: 'Über uns',
    footerContact: 'Kontakt',
    footerSitemap: 'Sitemap',

    contactTitle: 'KR PDF Support kontaktieren',
    contactSubtitle: 'Haben Sie Fragen oder Feedback? Schreiben Sie uns.',
    contactName: 'Ihr Name',
    contactEmail: 'Ihre E-Mail-Adresse',
    contactSubject: 'Betreff',
    contactMessage: 'Nachricht',
    contactSubmit: 'Nachricht senden',
    contactSuccess: 'Vielen Dank! Ihre Nachricht wurde gesendet.',
  },

  it: {
    brandName: 'KR PDF',
    brandTagline: 'Strumenti PDF Online Gratuiti',
    navTools: 'Strumenti',
    navAllTools: 'Tutti gli strumenti',
    navPdfToWord: 'PDF in Word',
    navImageToPdf: 'Immagini in PDF',
    navEditPdf: 'Modifica PDF',
    navMergePdf: 'Unisci PDF',
    navSplitPdf: 'Dividi PDF',
    navAbout: 'Chi siamo',
    navContact: 'Contatti',

    heroBadge: '100% Gratuito • Nessuna Registrazione • Elaborazione Istantanea',
    heroTitle: 'Strumenti PDF online gratuiti per',
    heroTitleHighlight: 'tutti in tutto il mondo',
    heroSubtitle: 'Converti, modifica e organizza documenti PDF in pochi secondi. Elaborazione sicura direttamente nel tuo browser, senza registrazione né costi nascosti.',
    heroCtaPdfToWord: 'Converti PDF in Word',
    heroCtaImageToPdf: 'Immagini in PDF',
    heroCtaEditPdf: 'Modifica PDF Online',
    heroPrivacyPill: 'Massima privacy — I tuoi documenti non lasciano mai il tuo dispositivo',

    toolsSectionTitle: 'Strumenti PDF veloci e affidabili',
    toolsSectionSubtitle: 'Scegli uno strumento qui sotto per iniziare subito senza creare un account.',

    pdfToWordTitle: 'Convertitore da PDF a Word',
    pdfToWordDesc: 'Converti i tuoi file PDF in documenti Microsoft Word (.docx) modificabili.',
    pdfToWordH1: 'Convertire PDF in Word gratis online',
    pdfToWordDropTitle: 'Trascina qui il file PDF',
    pdfToWordDropSubtitle: 'oppure fai clic per selezionarlo dal dispositivo',
    pdfToWordBtnChoose: 'Seleziona file PDF',
    pdfToWordProcessing: 'Conversione del PDF in Word in corso...',
    pdfToWordDone: 'Conversione completata con successo!',
    pdfToWordDownload: 'Scarica documento Word (.docx)',
    pdfToWordConvertAnother: 'Converti un altro PDF',
    pdfToWordNotice: 'Elaborazione locale nel browser per proteggere i tuoi dati personali.',
    pdfToWordLimitations: 'I documenti scansionati verranno elaborati al meglio.',

    imageToPdfTitle: 'Convertitore da Immagine a PDF',
    imageToPdfDesc: 'Converti immagini JPG, PNG e WEBP in un documento PDF pulito e ordinato.',
    imageToPdfH1: 'Convertire JPG, PNG e immagini in PDF online',
    imageToPdfDropTitle: 'Trascina qui le tue immagini',
    imageToPdfDropSubtitle: 'Supporta JPG, PNG, WEBP (fino a 50 immagini)',
    imageToPdfBtnChoose: 'Scegli immagini',
    imageToPdfAddMore: 'Aggiungi altre immagini',
    imageToPdfClearAll: 'Rimuovi tutte',
    imageToPdfReorderHint: 'Trascina o usa le frecce per riordinare le pagine prima della creazione.',
    imageToPdfPageSize: 'Formato pagina',
    imageToPdfOrientation: 'Orientamento',
    imageToPdfMargin: 'Margini',
    imageToPdfQuality: 'Qualità immagine',
    imageToPdfFileName: 'Nome del file',
    imageToPdfCreateBtn: 'Genera documento PDF',
    imageToPdfCreating: 'Unione immagini in PDF...',
    imageToPdfDownload: 'Scarica PDF',
    imageToPdfConvertAnother: 'Converti altre immagini',

    optSizeA4: 'A4 (210 × 297 mm)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'Adatta all\'immagine',
    optOrientPortrait: 'Verticale',
    optOrientLandscape: 'Orizzontale',
    optOrientAuto: 'Automatico',
    optMarginNone: 'Nessun margine',
    optMarginSmall: 'Margine piccolo',
    optMarginNormal: 'Margine standard',
    optQualityHigh: 'Alta (100% Qualità)',
    optQualityMedium: 'Media (Bilanciata 80%)',
    optQualityLow: 'Bassa (Compressa 60%)',

    editorTitle: 'Editor PDF Online',
    editorDesc: 'Visualizza, scrivi testo, disegna, firma, ruota e riorganizza le pagine del tuo PDF.',
    editorH1: 'Editor PDF gratuito online',
    editorDropTitle: 'Trascina qui il file PDF da modificare',
    editorDropSubtitle: 'Aggiungi testo, disegna, firma e ruota le pagine',
    editorBtnChoose: 'Apri PDF nell\'editor',
    editorPages: 'Pagine',
    editorPageOf: 'Pagina {current} di {total}',
    editorZoom: 'Zoom',
    editorRotate: 'Ruota 90°',
    editorDeletePage: 'Elimina pagina',
    editorMoveLeft: 'Sposta a sinistra',
    editorMoveRight: 'Sposta a destra',
    editorAddPage: 'Aggiungi pagina vuota',
    editorMergeBtn: 'Unisci a un altro PDF...',
    editorSplitBtn: 'Dividi / Estrai pagine',
    editorToolNavigate: 'Naviga & Sposta',
    editorToolText: 'Aggiungi testo',
    editorToolHighlight: 'Evidenziatore',
    editorToolDraw: 'Penna / Disegna',
    editorToolSignature: 'Firma',
    editorToolImage: 'Inserisci immagine',
    editorAddTextPlaceholder: 'Scrivi qui il testo...',
    editorColor: 'Colore',
    editorFontSize: 'Dimensione',
    editorSignTitle: 'Disegna la tua firma',
    editorSignClear: 'Cancella',
    editorSignApply: 'Applica firma',
    editorSignPrompt: 'Firma con il mouse o touch screen',
    editorSaveDownload: 'Scarica PDF modificato',
    editorSaving: 'Generazione nuovo PDF...',
    editorDownloadReady: 'Il tuo PDF modificato è pronto!',

    mergeTitle: 'Unisci file PDF',
    mergeDesc: 'Unisci più file PDF in un unico documento ordinato.',
    mergeH1: 'Unire file PDF online gratis',
    mergeDropTitle: 'Trascina più PDF da unire',
    mergeBtnMerge: 'Unisci in un unico PDF',
    mergeAddMore: 'Aggiungi altri PDF',

    splitTitle: 'Dividi PDF',
    splitDesc: 'Estrai pagine singole da qualsiasi documento PDF.',
    splitH1: 'Dividere pagine PDF gratis online',
    splitDropTitle: 'Trascina il PDF da dividere',
    splitRangePrompt: 'Pagine da estrarre (es. 1-3, 5):',
    splitBtnSplit: 'Estrai in un nuovo PDF',

    benefit1Title: '100% Sempre gratuito',
    benefit1Desc: 'Nessun abbonamento né costi nascosti.',
    benefit2Title: 'Nessuna registrazione',
    benefit2Desc: 'Usa subito gli strumenti senza account.',
    benefit3Title: 'Privacy nel browser',
    benefit3Desc: 'Elaborazione locale senza caricamento su server.',
    benefit4Title: 'Velocissimo',
    benefit4Desc: 'Nessuna attesa in coda di elaborazione.',
    benefit5Title: 'Ottimizzato per cellulari',
    benefit5Desc: 'Funziona su smartphone, tablet e computer.',
    benefit6Title: 'Semplice e chiaro',
    benefit6Desc: 'Interfaccia elegante con annunci non invasivi.',

    howItWorksTitle: 'Come usare KR PDF',
    faqTitle: 'Domande Frequenti',
    relatedToolsTitle: 'Altri strumenti consigliati',

    dropOrClick: 'Trascina i file qui o clicca per cercare',
    fileLimitsHint: 'Dimensione max: 50 MB. Veloce e sicuro.',
    adPlaceholder: 'Pubblicità',
    adBadge: 'Annuncio',
    loading: 'Caricamento...',
    success: 'Operazione riuscita!',
    errorGeneral: 'Si è verificato un errore durante l\'elaborazione.',
    errorFileSize: 'Il file supera il limite di 50 MB.',
    errorInvalidFormat: 'Formato non supportato.',
    errorCorruptPdf: 'Il PDF è danneggiato o protetto da password.',
    privacyBadgeText: 'Elaborazione locale sicura nel browser',
    freeForeverBadge: '100% Gratuito',
    noRegistrationBadge: 'Senza account',

    cookieNotice: 'Utilizziamo i cookie per migliorare l\'esperienza e monitorare il traffico.',
    cookieAccept: 'Accetta tutti',
    cookieDecline: 'Solo necessari',
    cookieSettings: 'Preferenze',
    cookiePolicyLink: 'Informativa Cookie',

    footerDesc: 'KR PDF è una piattaforma libera di strumenti PDF rapidi, sicuri e gratuiti.',
    footerRights: 'Tutti i diritti riservati.',
    footerPrivacy: 'Informativa sulla privacy',
    footerTerms: 'Termini di servizio',
    footerCookies: 'Gestione cookie',
    footerAbout: 'Chi siamo',
    footerContact: 'Contatti',
    footerSitemap: 'Mappa del sito',

    contactTitle: 'Contatta il supporto KR PDF',
    contactSubtitle: 'Hai domande o suggerimenti? Scrivici direttamente.',
    contactName: 'Il tuo nome',
    contactEmail: 'Il tuo indirizzo email',
    contactSubject: 'Oggetto',
    contactMessage: 'Messaggio',
    contactSubmit: 'Invia messaggio',
    contactSuccess: 'Grazie! Il tuo messaggio è stato inviato.',
  },

  ar: {
    brandName: 'KR PDF',
    brandTagline: 'أدوات PDF مجانية عبر الإنترنت',
    navTools: 'الأدوات',
    navAllTools: 'جميع الأدوات',
    navPdfToWord: 'تحويل PDF إلى Word',
    navImageToPdf: 'تحويل الصور إلى PDF',
    navEditPdf: 'تعديل PDF',
    navMergePdf: 'دمج PDF',
    navSplitPdf: 'تقسيم PDF',
    navAbout: 'من نحن',
    navContact: 'اتصل بنا',

    heroBadge: 'مجاني 100% • بدون تسجيل • معالجة فورية',
    heroTitle: 'أدوات PDF مجانية عبر الإنترنت للجميع',
    heroTitleHighlight: 'في أي مكان في العالم',
    heroSubtitle: 'قم بتحويل وتعديل وإنشاء وتنظيم ملفات PDF في ثوانٍ. معالجة آمنة تمامًا داخل متصفحك دون الحاجة لإنشاء حساب أو دفع رسوم خفية.',
    heroCtaPdfToWord: 'تحويل PDF إلى Word',
    heroCtaImageToPdf: 'تحويل الصور إلى PDF',
    heroCtaEditPdf: 'تعديل ملف PDF',
    heroPrivacyPill: 'خصوصية كاملة — ملفاتك لا تغادر جهازك أو متصفحك أبدًا',

    toolsSectionTitle: 'أدوات PDF سريعة وقوية',
    toolsSectionSubtitle: 'اختر أداة من الأدوات التالية للبدء فورًا دون الحاجة لإنشاء حساب.',

    pdfToWordTitle: 'محول PDF إلى Word',
    pdfToWordDesc: 'تحويل مستندات PDF إلى ملفات Microsoft Word قابلة للتعديل (.docx).',
    pdfToWordH1: 'تحويل PDF إلى Word مجانًا عبر الإنترنت',
    pdfToWordDropTitle: 'أسقط ملف PDF هنا',
    pdfToWordDropSubtitle: 'أو اضغط لاختيار ملف من جهازك',
    pdfToWordBtnChoose: 'اختر ملف PDF',
    pdfToWordProcessing: 'جاري تحويل PDF إلى مستند Word...',
    pdfToWordDone: 'تم التحويل بنجاح!',
    pdfToWordDownload: 'تحميل مستند Word (.docx)',
    pdfToWordConvertAnother: 'تحويل ملف آخر',
    pdfToWordNotice: 'يقوم المحول باستخراج النصوص والفقرات محلياً في متصفحك لضمان أقصى درجات الخصوصية والأمان.',
    pdfToWordLimitations: 'ملاحظة: بالنسبة للمستندات الممسوحة ضوئياً، يتم استخراج النصوص بأفضل دقة ممكنة.',

    imageToPdfTitle: 'محول الصور إلى PDF',
    imageToPdfDesc: 'تحويل صور JPG و PNG و WEBP إلى ملف PDF واحد منظم.',
    imageToPdfH1: 'تحويل صور JPG و PNG إلى PDF مجانًا',
    imageToPdfDropTitle: 'أسقط الصور هنا',
    imageToPdfDropSubtitle: 'يدعم JPG و PNG و WEBP (حتى 50 صورة)',
    imageToPdfBtnChoose: 'اختر الصور',
    imageToPdfAddMore: 'إضافة المزيد من الصور',
    imageToPdfClearAll: 'مسح الكل',
    imageToPdfReorderHint: 'اسحب الصور أو استخدم الأسهم لإعادة ترتيب الصفحات قبل إنشاء ملف PDF.',
    imageToPdfPageSize: 'حجم الصفحة',
    imageToPdfOrientation: 'اتجاه الصفحة',
    imageToPdfMargin: 'الهوامش',
    imageToPdfQuality: 'جودة الصور',
    imageToPdfFileName: 'اسم الملف',
    imageToPdfCreateBtn: 'إنشاء ملف PDF',
    imageToPdfCreating: 'جاري تجميع الصور في ملف PDF...',
    imageToPdfDownload: 'تحميل ملف PDF',
    imageToPdfConvertAnother: 'تحويل صور أخرى',

    optSizeA4: 'A4 (210 × 297 مم)',
    optSizeLetter: 'US Letter',
    optSizeFit: 'ملاءمة حجم الصورة',
    optOrientPortrait: 'عمودي',
    optOrientLandscape: 'أفقي',
    optOrientAuto: 'تلقائي (حسب كل صورة)',
    optMarginNone: 'بدون هوامش',
    optMarginSmall: 'هوامش صغيرة',
    optMarginNormal: 'هوامش قياسية',
    optQualityHigh: 'عالية (جودة 100%)',
    optQualityMedium: 'متوسطة (متوازنة 80%)',
    optQualityLow: 'منخفضة (مضغوطة 60%)',

    editorTitle: 'محرر ومعدل PDF',
    editorDesc: 'عرض، إضافة نصوص، تمييز، رسم، توقيع إلكتروني، تدوير وإعادة ترتيب الصفحات.',
    editorH1: 'محرر PDF مجاني عبر الإنترنت',
    editorDropTitle: 'أسقط ملف PDF هنا للبدء بالتعديل',
    editorDropSubtitle: 'أضف نصوصاً، ارسم، وقع إلكترونياً، قم بتدوير وإعادة ترتيب الصفحات',
    editorBtnChoose: 'فتح ملف PDF في المحرر',
    editorPages: 'الصفحات',
    editorPageOf: 'صفحة {current} من {total}',
    editorZoom: 'تكبير/تصغير',
    editorRotate: 'تدوير 90 درجة',
    editorDeletePage: 'حذف الصفحة',
    editorMoveLeft: 'تحريك لليسار',
    editorMoveRight: 'تحريك لليمين',
    editorAddPage: 'إضافة صفحة فارغة',
    editorMergeBtn: 'دمج مع ملف PDF آخر...',
    editorSplitBtn: 'تقسيم / استخراج صفحات',
    editorToolNavigate: 'تحديد وتصفح',
    editorToolText: 'إضافة نص',
    editorToolHighlight: 'تظليل / تمييز',
    editorToolDraw: 'قلم / رسم',
    editorToolSignature: 'توقيع إلكتروني',
    editorToolImage: 'إدراج صورة',
    editorAddTextPlaceholder: 'اكتب النص هنا...',
    editorColor: 'اللون',
    editorFontSize: 'حجم الخط',
    editorSignTitle: 'ارسم توقيعك',
    editorSignClear: 'مسح التوقيع',
    editorSignApply: 'استخدام التوقيع',
    editorSignPrompt: 'وقّع بواسطة الفأرة أو شاشة اللمس',
    editorSaveDownload: 'تحميل ملف PDF المعدل',
    editorSaving: 'جاري معالجة وحفظ التغييرات...',
    editorDownloadReady: 'ملف PDF المعدل جاهز للتحميل!',

    mergeTitle: 'دمج ملفات PDF',
    mergeDesc: 'دمج عدة ملفات PDF في مستند واحد منظم.',
    mergeH1: 'دمج ملفات PDF مجانًا عبر الإنترنت',
    mergeDropTitle: 'أسقط ملفات PDF المتعددة لدمجها',
    mergeBtnMerge: 'دمج في ملف PDF واحد',
    mergeAddMore: 'إضافة ملفات أخرى',

    splitTitle: 'تقسيم ملف PDF',
    splitDesc: 'استخراج صفحات محددة أو نطاقات من أي ملف PDF.',
    splitH1: 'تقسيم صفحات PDF مجانًا عبر الإنترنت',
    splitDropTitle: 'أسقط ملف PDF لتقسيمه',
    splitRangePrompt: 'أرقام الصفحات المراد استخراجها (مثال: 1-3, 5):',
    splitBtnSplit: 'استخراج الصفحات إلى PDF جديد',

    benefit1Title: 'مجاني 100% دائماً',
    benefit1Desc: 'بدون اشتراكات أو بطاقات ائتمانية أو رسوم خفية.',
    benefit2Title: 'بدون تسجيل',
    benefit2Desc: 'ابدأ التحويل والتعديل مباشرة دون الحاجة لبريد إلكتروني.',
    benefit3Title: 'خصوصية وأمان في المتصفح',
    benefit3Desc: 'تتم معالجة مستنداتك داخل متصفحك دون رفعها إلى خوادم خارجية.',
    benefit4Title: 'سرعة فائقة',
    benefit4Desc: 'معالجة فورية بدون الانتظار في طوابير السيرفرات.',
    benefit5Title: 'متوافق مع الهواتف الذكية',
    benefit5Desc: 'يعمل بسلاسة على أندرويد و iPhone والأجهزة اللوحية والحواسيب.',
    benefit6Title: 'واجهة مريحة ونظيفة',
    benefit6Desc: 'تجربة مستخدم سهلة وسريعة مع إعلانات غير مزعجة ومتوافقة.',

    howItWorksTitle: 'كيفية استخدام أدوات KR PDF',
    faqTitle: 'الأسئلة الشائعة',
    relatedToolsTitle: 'المزيد من أدوات PDF المقترحة',

    dropOrClick: 'اسحب الملفات هنا، أو اضغط للاختيار من جهازك',
    fileLimitsHint: 'الحد الأقصى للملف: 50 ميجابايت. سريع وآمن.',
    adPlaceholder: 'إعلان',
    adBadge: 'إعلان',
    loading: 'جاري التحميل...',
    success: 'تمت العملية بنجاح!',
    errorGeneral: 'حدث خطأ أثناء معالجة الملف. يرجى المحاولة مرة أخرى.',
    errorFileSize: 'حجم الملف يتجاوز الحد الأقصى (50 ميجابايت).',
    errorInvalidFormat: 'صيغة الملف غير مدعومة.',
    errorCorruptPdf: 'الملف تالف أو محمي بكلمة مرور.',
    privacyBadgeText: 'معالجة آمنة وخاصة داخل المتصفح',
    freeForeverBadge: 'مجاني 100%',
    noRegistrationBadge: 'بدون تسجيل',

    cookieNotice: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك وقياس عدد الزيارات.',
    cookieAccept: 'قبول الكل',
    cookieDecline: 'الضرورية فقط',
    cookieSettings: 'التفضيلات',
    cookiePolicyLink: 'سياسة ملفات تعريف الارتباط',

    footerDesc: 'منصة KR PDF منصة مجانية ومستقلة تقدم أدوات PDF سريعة وآمنة للمستخدمين حول العالم.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerPrivacy: 'سياسة الخصوصية',
    footerTerms: 'شروط الاستخدام',
    footerCookies: 'سياسة ملفات تعريف الارتباط',
    footerAbout: 'من نحن',
    footerContact: 'اتصل بنا',
    footerSitemap: 'خريطة الموقع',

    contactTitle: 'الاتصال بفريق دعم KR PDF',
    contactSubtitle: 'هل لديك سؤال أو ملاحظة أو اقتراح؟ تواصل معنا مباشرة.',
    contactName: 'اسمك الكريم',
    contactEmail: 'بريدك الإلكتروني',
    contactSubject: 'الموضوع',
    contactMessage: 'رسالتك',
    contactSubmit: 'إرسال الرسالة',
    contactSuccess: 'شكراً لك! تم إرسال رسالتك بنجاح.',
  },
};
