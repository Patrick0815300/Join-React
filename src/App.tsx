import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { SignUpPage } from './pages/SignUpPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App