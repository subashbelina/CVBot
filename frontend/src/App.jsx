import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-gray-500">Loading...</div>}>
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