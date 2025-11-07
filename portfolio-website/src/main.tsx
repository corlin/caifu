import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { logPerformanceMetrics, reportWebVitals } from './utils/performance'

// Log performance metrics in development
logPerformanceMetrics();

// Report Web Vitals (optional - can be sent to analytics)
reportWebVitals((metric) => {
  if (import.meta.env.DEV) {
    console.log(metric);
  }
  // In production, send to analytics service
  // Example: sendToAnalytics(metric);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
