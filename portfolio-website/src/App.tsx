import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const LabPage = lazy(() => import('./pages/LabPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import LoadingIndicator from './components/ui/LoadingIndicator';

// Loading component
const LoadingFallback = () => (
  <div className="min-h-[60vh]">
    <LoadingIndicator size="md" text="加载中..." />
  </div>
);

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
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
