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
import RegisterCar from './pages/RegisterCar.jsx';
import CarPhoto from './pages/CarPhoto.jsx';
import SoatPhoto from './pages/SoatPhoto.jsx';
import Home from './components/home/Home.jsx';
import NavigationMenu from './components/header/NavigationMenu.jsx';
import { selectToken } from './features/users/UserSlice.jsx';

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

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-photoProfile" element={<AddPhotoProfile />} />
          <Route path="/car-question" element={<CarQuestion />} />
          <Route path="/register-car" element={<RegisterCar />} />
          <Route path="/car-photo" element={<CarPhoto />} />
          <Route path="/soat-photo" element={<SoatPhoto />} />


          <Route path="/home" element={<Home />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/reserved-trips" element={isAuthenticated ? <ReservedTrips /> : <Navigate to="/" />} />
          <Route path="/created-trips" element={isAuthenticated ? <CreatedTrips /> : <Navigate to="/" />} />
          <Route path="/create-trip" element={isAuthenticated ? <CreateTrip /> : <Navigate to="/" />} />
          <Route path="/navigation-menu" element={isAuthenticated ? <NavigationMenu /> : <Navigate to="/" />} />
      
      </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;

