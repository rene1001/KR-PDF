/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_MAX_FILE_SIZE_MB?: string;
  readonly VITE_ENABLE_ADS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
