// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../assets/Colors';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/Logo.png';
import Loader from '../components/common/Loader';
import FeedbackModal from '../components/common/FeedbackModal';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.white};
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 30px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  border: 1px solid ${Colors.primary};
`;

const Title = styled.h1`
  color: ${Colors.primary};
  font-size: 26px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 80%;
  padding: 12px;
  border: 1.8px solid ${Colors.primary};
  border-radius: 6px;
  font-size: 15px;
  margin-bottom: 15px;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const Text = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: ${Colors.primary};
`;

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  align-self: flex-start; /* Alinea el error a la izquierda */
  margin-top: -10px; /* Sube el texto para que no quede un gran espacio */
  margin-bottom: 15px;
  width: 80%;
`;

const Login = () => {
  const navigate = useNavigate();

  // Estados del formulario y validacion de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  
  //Estado para el loader y modal
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');

  //Verificar el login
  useEffect(() => {
    // Si tienes un token guardado, redirige al usuario para evitar que inicie sesión dos veces.
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); 
    }
  }, [navigate]);

  //Logica de Login
  const handleLogin = async (e) => {
    e.preventDefault();

  if (!email) {
      setErrorEmail('Por favor ingrese un correo electrónico');
      return;
    }
    if (!password) {
      setErrorPassword('Por favor ingrese una contraseña');
      return;
    }

    setLoading(true); // Muestra el loader

    //const loginData = { email, password };

    try {
      //const response = await axios.post('https://your-backend-api.com/login', loginData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Suponiendo que la respuesta contiene un token
      if (email === "admin@gmail.com" && password === "1234") {
          //Simular respuesta exitosa
          const fakeToken = 'simulated_jwt_token_12345';
          localStorage.setItem('token', fakeToken);
        
          // Mostrar modal de éxito antes de navegar
          setModalMessage('¡Bienvenido de vuelta!');
          setModalDetails('Serás redirigido a la página principal.');
          // Configura el modal para mostrar éxito, no error (usa "confirmation")
          setShowModal('yes');

          } else {
            // Simular respuesta de error de credenciales
            throw new Error('Credenciales inválidas');
      }

    } catch (error) {
      console.error('Error al autenticar:', error);
      
      // Mostrar modal de error si falla la simulación o la API real
      setModalMessage('Error de Sesión');
      setModalDetails('El correo electrónico o la contraseña no coinciden. Intenta nuevamente.');
      setShowModal('no'); // Muestra el modal de error
    
    } finally {
      setLoading(false); // Ocultar Loader
    }
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    if (showModal === 'yes') {
      navigate('/home'); // Redirige solo si el login fue exitoso
    }
    setShowModal(false); // Oculta el modal en cualquier caso
  };

  const isFormValid = email && password;

  return (
    <PageWrapper>

      {/* Renderizado Condicional del Loader */}
      {loading && <Loader />}
      
      <Card>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Campo de Email */}
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <ErrorText>{errorEmail}</ErrorText>}

          {/* Campo de Contraseña (Sin el botón de ojo por ahora, para usar tus estilos) */}
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && <ErrorText>{errorPassword}</ErrorText>}
          
          <div style={{ marginTop: '20px' }}>
            <Button text="Iniciar Sesión" $primary type="submit" disabled={!isFormValid || loading} // Deshabilitar si el formulario no es válido o si está cargando
            />
          </div>
        </form>

        <Text style={{ marginTop: '20px' }}>
          ¿No tienes cuenta?
          <br />
          {/* Usamos tu StyledLink para el registro */}
          <StyledLink to="/register">Regístrate</StyledLink>
        </Text>
      </Card>

      {/* Modal de Feedback */}
      {showModal && (
        <FeedbackModal 
          // Usamos el estado 'showModal' para determinar el tipo (confirmation o error)
          type={showModal} 
          message={modalMessage} 
          details={modalDetails} 
          onClose={handleCloseModal} 
        />
      )}
    </PageWrapper>
  );
};

export default Login;