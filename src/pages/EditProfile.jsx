// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../assets/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🆕 para comunicar con el backend

const EditContainer = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 90%;
`;

const Title = styled.h2`
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: ${colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SaveButton = styled.button`
  flex: 1;
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #4a5d72;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: ${colors.details};
  color: black;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #435d75ff;
  }
`;

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setForm(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🆕 Guardar cambios en backend
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${form.email}`, form);
      localStorage.setItem("user", JSON.stringify(form)); // actualizar localStorage
      alert("Perfil actualizado exitosamente");
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Hubo un problema al guardar los cambios");
    }
  };

  return (
    <EditContainer>
      <FormCard>
        <Title>Editar Perfil</Title>

        <Label>Nombre</Label>
        <Input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <Label>Apellido</Label>
        <Input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
        />

        <Label>Correo</Label>
        <Input
          type="email"
          name="email"
          value={form.email}
          readOnly // evitar cambiar el email base
        />

        <Label>Contraseña</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <ButtonGroup>
          <CancelButton onClick={() => navigate("/profile")}>
            Cancelar
          </CancelButton>
          <SaveButton onClick={handleSave}>
            Guardar cambios
          </SaveButton>
        </ButtonGroup>
      </FormCard>
    </EditContainer>
  );
}

export default EditProfile;
