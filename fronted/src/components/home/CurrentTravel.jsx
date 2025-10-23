import React from "react";
import styled from "styled-components";
import colors from "../../assets/Colors.jsx";
import logo from "../../assets/Logo.png";
import profilePhoto from "../../assets/ProfilePhoto.png";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  padding: 20px 40px;
  background-color: #f0f4f7;
  min-height: 100vh;
  flex-grow: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-top: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  height: 45px;
  cursor: pointer;
`;

const Greeting = styled.h2`
  color: ${colors.text};
  font-weight: 600;
  margin: 0;
`;

const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${colors.details};
`;

const TripCard = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const CurrentTrips = () => {
  const navigate = useNavigate();

  const currentTrips = [
    { id: 1, destino: "Universidad", desde: "Cajicá", hora: "6:15 AM", estado: "En curso" },
    { id: 2, destino: "Universidad", desde: "Chía", hora: "6:30 AM", estado: "En curso" },
  ];

  return (
    <PageContainer>
      <HeaderContainer>
        <LeftSection>
          <Logo src={logo} onClick={() => navigate("/home")} />
          <Greeting>Viajes en curso</Greeting>
        </LeftSection>
        <ProfileImage src={profilePhoto} alt="Perfil" />
      </HeaderContainer>

      {currentTrips.map((trip) => (
        <TripCard key={trip.id}>
          <strong>{trip.desde}</strong> → {trip.destino}
          <p>Hora: {trip.hora}</p>
          <p>Estado: {trip.estado}</p>
        </TripCard>
      ))}
    </PageContainer>
  );
};

export default CurrentTrips;
