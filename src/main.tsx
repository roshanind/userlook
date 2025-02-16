import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { makeServer } from './mock/server.ts';

import App from './App.tsx'

if (import.meta.env.MODE === "development") {
  makeServer();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
