import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import { I18nProvider, I18nErrorBoundary } from './i18n';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const LabPage = lazy(() => import('./pages/LabPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import LoadingIndicator from './components/ui/LoadingIndicator';

// Loading component
const LoadingFallback = () => {
  // Note: We can't use useTranslation here as this component might render before I18nProvider
  // So we'll keep the fallback text or use a simple loading indicator
  return (
    <div className="min-h-[60vh]">
      <LoadingIndicator size="md" text="Loading..." />
    </div>
  );
};

// AnimatedRoutes component to handle route transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Error handler for I18n system
  const handleI18nError = (error: Error) => {
    console.error('I18n System Error:', error);
    // In production, you might want to send this to an error reporting service
  };

  return (
    <ErrorBoundary>
      <I18nErrorBoundary>
        <I18nProvider onError={handleI18nError}>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <AnimatedRoutes />
              </Suspense>
            </Layout>
          </Router>
        </I18nProvider>
      </I18nErrorBoundary>
    </ErrorBoundary>
  );
}

export default App;
