import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { AppLayout } from './components/layout/AppLayout';
import { getUser } from './api/supabase/user';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { DashboardContainer } from './components/containers/DashboardContainer';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!user;

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routen mit Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            <Route
              path="dashboard"
              element={isAuthenticated ? <DashboardContainer /> : <Navigate to="/login" replace />}
            />
            <Route
              path="tasks"
              element={isAuthenticated ? <SignUpPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="contacts"
              element={isAuthenticated ? <SignUpPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="legal"
              element={isAuthenticated ? <SignUpPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="privacy"
              element={isAuthenticated ? <SignUpPage /> : <Navigate to="/login" replace />}
            />
          </Route>

          {/* Öffentliche Routen ohne Layout */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
