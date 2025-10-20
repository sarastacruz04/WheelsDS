import React, { useState } from 'react';
import styled from 'styled-components';
import Colors from '../assets/Colors';
import Button from '../components/common/Button';
import { Link , useNavigate} from 'react-router-dom';


// --- Estilos generales ---
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.pageBackground};
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 50px 60px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 400px;
  border: 1px solid ${Colors.primary};
`;

const Title = styled.h1`
  color: ${Colors.primary};
  font-size: 26px;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
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
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    idUniversidad: '',
    correo: '',
    telefono: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    navigate('/add-photoProfile');
  };


  return (
    <PageWrapper>
      <Card>
        <Title>Registro</Title>

        <Form onSubmit={handleRegister}>
          <Row>
            <Input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Input
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </Row>

          <Input
            name="idUniversidad"
            placeholder="ID de la Universidad"
            value={formData.idUniversidad}
            onChange={handleChange}
          />

          <Input
            name="correo"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
          />

          <Input
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <Input
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
          />

          <Button text="Registrarse" $primary type="submit" />
        </Form>

        <Text>
          ¿Ya tienes una cuenta?
        </Text>
        <StyledLink to="/login">Inicia Sesión</StyledLink>
      </Card>
    </PageWrapper>
  );
};

export default Register;
