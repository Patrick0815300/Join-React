import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import AuthForm from './components/Auth/AuthForm'
import Login from './components/Auth/Login'

import { Navbar } from './components/Shared/Navbar.tsx';
import { Header } from './components/Shared/Header.tsx';
import { SignUpPage } from './pages/SignUpPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { BoardPage } from './pages/BoardPage.tsx';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App