import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../assets/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditContainer = styled.div`/* ... igual que antes ... */`;
const FormCard = styled.div`/* ... */`;
const Title = styled.h2`/* ... */`;
const Label = styled.label`/* ... */`;
const Input = styled.input`/* ... */`;
const ButtonGroup = styled.div`/* ... */`;
const SaveButton = styled.button`/* ... */`;
const CancelButton = styled.button`/* ... */`;

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
    if (storedUser) {
      setForm({
        nombre: storedUser.nombre,
        apellido: storedUser.apellido,
        email: storedUser.email,
        password: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const backendURL = "https://proyecto5-vs2l.onrender.com/api";

      // Creamos payload solo con campos válidos
      const payload = { nombre: form.nombre, apellido: form.apellido };
      if (form.password.trim() !== "") payload.password = form.password;

      // PUT al backend usando email como identificador
      const response = await axios.put(
        `${backendURL}/users/${encodeURIComponent(form.email)}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Guardamos datos actualizados en localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Perfil actualizado exitosamente");
      navigate("/home", { replace: true }); // 🔹 Redirige al home
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Hubo un problema al guardar los cambios");
    }
  };

  return (
    <EditContainer>
      <FormCard>
        <Title>Editar Perfil</Title>

        <Label>Nombre</Label>
        <Input type="text" name="nombre" value={form.nombre} onChange={handleChange} />

        <Label>Apellido</Label>
        <Input type="text" name="apellido" value={form.apellido} onChange={handleChange} />

        <Label>Correo</Label>
        <Input type="email" name="email" value={form.email} readOnly />

        <Label>Contraseña</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Dejar vacío si no cambia"
        />

        <ButtonGroup>
          <CancelButton onClick={() => navigate("/profile")}>Cancelar</CancelButton>
          <SaveButton onClick={handleSave}>Guardar cambios</SaveButton>
        </ButtonGroup>
      </FormCard>
    </EditContainer>
  );
}

export default EditProfile;