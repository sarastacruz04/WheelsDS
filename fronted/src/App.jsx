import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Importa las páginas
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorLogin.jsx';
import Register from './pages/Register.jsx';
import AddPhotoProfile from './pages/AddPhotoProfile.jsx';
import CarQuestion from './pages/CarQuestion.jsx';
import VerifyCar from './pages/VerifyCar.jsx';
import RegisterCar from './pages/RegisterCar.jsx';
import CarPhoto from './pages/CarPhoto.jsx';
import SoatPhoto from './pages/SoatPhoto.jsx';
import Home from './components/home/Home.jsx';
import NavigationMenu from './components/header/NavigationMenu.jsx';
import { selectToken } from './features/users/UserSlice.jsx';
import ReservedTravelTittle from './components/home/ReservedTravelTittle.jsx';
import CurrentTravel from './components/home/CurrentTravel.jsx';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import HomeDriver from './components/home/HomeDriver.jsx';

// Rutas protegidas de ejemplo
import ReservedTrips from './components/trips/ReservedTrips.jsx';
import CreatedTrips from './components/trips/CreatedTrips.jsx';
import CreateTrip from './components/trips/CreateTrip.jsx';

function Layout({ children }) {
  const location = useLocation();
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;

  // Rutas donde NO se muestra el menú
  const hideMenuRoutes = [
    '/',
    '/login',
    '/register',
    '/add-photoprofile',
    '/car-question',
    '/verify-car',
    '/register-car',
    '/car-photo',
    '/soat-photo'
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

  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🔹 Rutas públicas */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          <Route path="/add-photoProfile" element={<AddPhotoProfile />} />
          <Route path="/car-question" element={<CarQuestion />} />
          <Route path="/verify-car" element={<VerifyCar />} />
          <Route path="/register-car" element={<RegisterCar />} />
          <Route path="/car-photo" element={<CarPhoto />} />
          <Route path="/soat-photo" element={<SoatPhoto />} />

          {/* 🔹 Rutas protegidas */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/home-driver" element={isAuthenticated ? <HomeDriver /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/reserved-trips" element={isAuthenticated ? <ReservedTrips /> : <Navigate to="/login" />} />
          <Route path="/created-trips" element={isAuthenticated ? <CreatedTrips /> : <Navigate to="/login" />} />
          <Route path="/create-trip" element={isAuthenticated ? <CreateTrip /> : <Navigate to="/login" />} />
          <Route path="/navigation-menu" element={isAuthenticated ? <NavigationMenu /> : <Navigate to="/login" />} />

          {/* 🔹 Rutas auxiliares */}
          <Route path="/reserved-travelTittle" element={<ReservedTravelTittle />} />
          <Route path="/current-travel" element={<CurrentTravel />} />

          {/* 🔹 Ruta catch-all */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
