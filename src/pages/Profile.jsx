// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../assets/Colors";
import profilePhoto from "../assets/ProfilePhoto.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🆕 añadimos axios para llamar al backend

const ProfileContainer = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 3px solid ${colors.primary};
`;

const Name = styled.h2`
  color: ${colors.primary};
  margin-bottom: 10px;
`;

const Email = styled.p`
  color: ${colors.text};
  font-size: 15px;
  margin: 5px 0;
`;

const BackButton = styled.button`
  margin-top: 25px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 25px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #4a5d72;
  }
`;

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // 🆕 Obtener datos reales del backend según el email guardado
    const fetchUserData = async () => {
      try {
        const email = storedUser?.email;
        if (!email) return;
        const res = await axios.get(`http://localhost:5000/api/users/${email}`);
        if (res.data) setUser(res.data);
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ProfileContainer>
      <Card>
        <ProfileImage src={profilePhoto} alt="Foto de perfil" />
        <Name>{user?.nombre ? `${user.nombre} ${user.apellido}` : "Usuario"}</Name>
        <Email><strong>Correo:</strong> {user?.email || "Sin correo"}</Email>
        <Email><strong>Rol:</strong> {user?.role || "Pasajero"}</Email>

        <BackButton onClick={() => navigate("/home")}>← Volver</BackButton>

        {/* 🆕 Botón de Cerrar Sesión */}
        <BackButton
          style={{ backgroundColor: "#d9534f", marginTop: "10px" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Cerrar sesión
        </BackButton>
      </Card>
    </ProfileContainer>
  );
}

export default Profile;
