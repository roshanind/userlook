import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { makeServer } from './mock/server.ts';

import App from './App.tsx'

// commenting the condition to run the server in production
// if (import.meta.env.MODE === "development") {
  makeServer();
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
