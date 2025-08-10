import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { SignUpPage } from './pages/SignUpPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { BoardPage } from './pages/BoardPage.tsx';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App