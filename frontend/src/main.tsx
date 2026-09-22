import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './workspace.css'
import App from './App'
import { MotionProvider } from './components/MotionControl'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionProvider><App /></MotionProvider>
  </StrictMode>,
)
