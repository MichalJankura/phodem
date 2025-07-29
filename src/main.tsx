import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker for PWA
registerSW({
  onNeedRefresh() {
    // You can show a UI element to prompt users to refresh
    console.log('New content available, please refresh.')
  },
  onOfflineReady() {
    // You can show a UI element to inform users the app is ready for offline use
    console.log('App ready for offline use.')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
