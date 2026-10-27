import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// В production HTML пререндерен при сборке (scripts/prerender.js) — гидрируем, в dev рендерим с нуля
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
