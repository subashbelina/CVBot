import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateResume = lazy(() => import('./pages/CreateResume'));
const EditResume = lazy(() => import('./pages/EditResume'));
const ViewResume = lazy(() => import('./pages/ViewResume'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Resumes = lazy(() => import('./pages/Resumes'));
const Templates = lazy(() => import('./pages/Templates'));

const DEFAULT_SEO = {
  title: 'CVBot - AI Resume Builder',
  description:
    'Build ATS-friendly resumes with AI suggestions, modern templates, and quick export tools using CVBot.',
  path: '/dashboard',
};

const SEO_ROUTES = [
  {
    pattern: /^\/$/,
    title: 'CVBot - AI Resume Builder',
    description:
      'Create professional, ATS-friendly resumes with AI-powered writing suggestions and polished templates.',
    path: '/',
  },
  {
    pattern: /^\/dashboard$/,
    title: 'Dashboard - CVBot',
    description: 'Track resume activity, manage drafts, and continue editing from your CVBot dashboard.',
    path: '/dashboard',
  },
  {
    pattern: /^\/templates$/,
    title: 'Resume Templates - CVBot',
    description:
      'Browse professional resume templates including modern, classic, minimalist, and executive styles.',
    path: '/templates',
  },
  {
    pattern: /^\/create$/,
    title: 'Create Resume - CVBot',
    description:
      'Start building your resume with guided sections, AI suggestions, and a clean live preview experience.',
    path: '/create',
  },
  {
    pattern: /^\/resumes$/,
    title: 'My Resumes - CVBot',
    description: 'View, organize, and manage all your resumes in one place with CVBot.',
    path: '/resumes',
  },
  {
    pattern: /^\/ai-assistant$/,
    title: 'AI Resume Assistant - CVBot',
    description:
      'Improve your resume writing with CVBot AI prompts for summaries, achievements, and role-focused content.',
    path: '/ai-assistant',
  },
  {
    pattern: /^\/profile$/,
    title: 'Profile - CVBot',
    description: 'Manage your personal profile and account details in CVBot.',
    path: '/profile',
  },
  {
    pattern: /^\/settings$/,
    title: 'Settings - CVBot',
    description: 'Update your CVBot preferences and app settings.',
    path: '/settings',
  },
];

function App() {
  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppRoutes />
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const matched = SEO_ROUTES.find((route) => route.pattern.test(location.pathname)) || DEFAULT_SEO;
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, '');
    const canonicalPath = matched.path || location.pathname;
    const canonicalUrl = `${siteUrl}${canonicalPath}`;

    document.title = matched.title;
    updateMeta('description', matched.description);
    updateMeta('robots', 'index, follow, max-image-preview:large');
    updateMeta('author', 'CVBot');

    updateMeta('property=og:type', 'website');
    updateMeta('property=og:site_name', 'CVBot');
    updateMeta('property=og:title', matched.title);
    updateMeta('property=og:description', matched.description);
    updateMeta('property=og:url', canonicalUrl);

    updateMeta('name=twitter:card', 'summary_large_image');
    updateMeta('name=twitter:title', matched.title);
    updateMeta('name=twitter:description', matched.description);

    updateLink('canonical', canonicalUrl);
  }, [location.pathname]);

  return null;
}

function updateMeta(selector, content) {
  const [attr, value] = selector.split('=');
  const query = value ? `meta[${attr}="${value}"]` : `meta[name="${selector}"]`;
  let tag = document.head.querySelector(query);

  if (!tag) {
    tag = document.createElement('meta');
    if (value) {
      tag.setAttribute(attr, value);
    } else {
      tag.setAttribute('name', selector);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function updateLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-gray-500">Loading...</div>}>
      <SeoManager />
      <Routes>
        {/* All routes are now public */}
        <Route path="/" element={<Home />} />
        <Route path="/resumes" element={<Resumes />} />

        {/* Main app routes with layout */}
        <Route element={<Layout />}>
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateResume />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/edit/:id" element={<EditResume />} />
          <Route path="/view/:id" element={<ViewResume />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App; 