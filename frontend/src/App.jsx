import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AIAssistant from './pages/AIAssistant';
import Resumes from './pages/Resumes';
import Templates from './pages/Templates';

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
  );
}

export default App; 