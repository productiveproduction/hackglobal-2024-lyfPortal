import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Template from './Template'
import './index.css'

import { registerSW } from "virtual:pwa-register";

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Template />
  </StrictMode>,
)
