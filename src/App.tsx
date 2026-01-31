import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './pages/HomePage';
import AirlineDetailPage from './pages/AirlineDetailPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import { AdminPanel } from './pages/admin/AdminPanel';
import { LoginPage } from './pages/admin/LoginPage';
import { initGA, initYM, trackPageView } from './utils/analytics';

// Admin password from env or default
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || '/admin-secret-panel';

// Block default /admin path for security
const BLOCKED_ADMIN_PATH = '/admin';

// Analytics initialization
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
const YM_COUNTER_ID = import.meta.env.VITE_YM_COUNTER_ID;

// Track page views component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Неверный пароль');
    }
  };

  // Check for saved auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Initialize analytics
    if (GA_TRACKING_ID) {
      initGA(GA_TRACKING_ID);
    }
    if (YM_COUNTER_ID) {
      initYM(YM_COUNTER_ID);
    }
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/airline/:id" element={<AirlineDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          
          {/* Admin routes */}
          {/* Explicitly block /admin for security */}
          <Route path={BLOCKED_ADMIN_PATH} element={<Navigate to="/" replace />} />
          
          <Route
            path={ADMIN_URL}
            element={
              isAdminAuthenticated ? (
                <AdminPanel />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
