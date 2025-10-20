// src/pages/LandingPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import logo from '../assets/Logo.png';
import Colors from '../assets/Colors';


//Fondo general de la página
const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${Colors.Background};
`;

const Card = styled.div`
    background-color: ${Colors.white};
    padding: 80px 100px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 190px;
  margin-bottom: 40px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    align-items: center;
`;
 
const LandingPage = () => {
  return (
    <PageWrapper>
      <Card>
        <Logo src={logo} alt="Logo" />
        <ButtonsContainer>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button text="Iniciar Sesión" $primary />
          </Link>

          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button text="Registrarse" />
          </Link>
        </ButtonsContainer>
      </Card>
    </PageWrapper>
  );
};

export default LandingPage;
