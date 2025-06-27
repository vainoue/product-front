import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import EditProfile from './pages/EditProfile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from './pages/AuthContext';

import './App.css'

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products" element={<PrivateRoute><Product /></PrivateRoute>}
          />
          <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>

      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2500} />
    </AuthProvider>
  );
}

export default App
