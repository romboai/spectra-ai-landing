/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_API_KEY: string
  readonly VITE_HUBSPOT_LIST_ID: string
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 