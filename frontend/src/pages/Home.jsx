import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  // Always redirect to dashboard for anonymous access
  return <Navigate to="/dashboard" replace />;
}

export default Home; 