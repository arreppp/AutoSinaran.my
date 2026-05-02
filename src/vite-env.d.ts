/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BILLPLZ_API_KEY: string
  readonly VITE_BILLPLZ_COLLECTION_ID: string
  readonly VITE_BILLPLZ_SANDBOX: string
  readonly VITE_APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
