/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RUN_MODE: string
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_URL_HOST: string
  readonly VITE_HOST: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
