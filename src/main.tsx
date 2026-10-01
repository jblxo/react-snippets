import { createRoot } from 'react-dom/client'
import './log'
import './mocks'
import './styles.css'
import App from './App'

// StrictMode se přepíná v aplikaci (výchozí zapnutý, stejně jako v Next.js v dev módu).
createRoot(document.getElementById('root')!).render(<App />)
