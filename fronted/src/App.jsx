import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserRole } from './features/users/UserSlice.jsx';

// Importa las páginas
import LandingPage from './pages/LandingPage.jsx';  
import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorLogin.jsx';
import Register from './pages/Register.jsx';
import AddPhotoProfile from './pages/AddPhotoProfile.jsx';
import CarQuestion from './pages/CarQuestion.jsx';
import RegisterCar from './pages/RegisterCar.jsx';
import CarPhoto from './pages/CarPhoto.jsx';
import SoatPhoto from './pages/SoatPhoto.jsx';
import Home from './components/home/Home.jsx'; //Pasajero Home
import DriverHome from './components/home/DriverHome.jsx'; // 🛑 Nueva vista de Conductor
import RoleSwitch from './components/common/RoleSwitch.jsx'; // 🛑 Nuevo componente de rol
import NavigationMenu from './components/header/NavigationMenu.jsx';
import { selectToken } from './features/users/UserSlice.jsx';
import ReservedTravelTittle from './components/home/ReservedTravelTittle.jsx';
import CurrentTravel from './components/home/CurrentTravel.jsx';
import RoleBasedHome from './components/home/RoleBasedHome.jsx';

// 🔹 Importamos la nueva página de perfil
import Profile from './pages/Profile.jsx';
// ✅ NUEVA IMPORTACIÓN
import EditProfile from './pages/EditProfile.jsx';

function Layout({ children }) {
  const location = useLocation();
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;

  // Rutas donde NO se muestra el menú
  const hideMenuRoutes = [
    '/', '/login', '/register', 
    '/add-photoProfile', '/car-question', 
    '/register-car', '/car-photo', '/soat-photo'
  ];

  const hideMenu = hideMenuRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {isAuthenticated && !hideMenu && <NavigationMenu />}
      {children}
    </>
  );
}

function App() {
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;

  // 🛑 Componente Helper para rutas protegidas
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🔹 Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-photoProfile" element={<AddPhotoProfile />} />
          <Route path="/car-question" element={<CarQuestion />} />
          <Route path="/register-car" element={<RegisterCar />} />
          <Route path="/car-photo" element={<CarPhoto />} />
          <Route path="/soat-photo" element={<SoatPhoto />} />

          {/* 🔹 Página principal */}
          <Route path="/home" element={<ProtectedRoute element={<RoleBasedHome />} />} />

          {/* Rutas de Perfil */}
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />

          {/* Rutas de Menú (Viajes) */}
          <Route path="/reserved-trips" element={<ProtectedRoute element={<ReservedTrips />} />} />
          <Route path="/created-trips" element={<ProtectedRoute element={<CreatedTrips />} />} />
          <Route path="/create-trip" element={<ProtectedRoute element={<CreateTrip />} />} />

          {/* Ruta Catch-all (redirige a /home si está autenticado o a / si no) */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />} />


          

          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
