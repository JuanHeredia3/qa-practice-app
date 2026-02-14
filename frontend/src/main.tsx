import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import { AppProviders } from './app/AppProviders'

import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
