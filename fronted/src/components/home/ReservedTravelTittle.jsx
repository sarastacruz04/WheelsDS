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

const Content = styled.div`
  margin-top: 40px;
`;

const TripCard = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReservedTravel = () => {
  const navigate = useNavigate();

  const reservedTrips = [
    { id: 1, destino: "Universidad", desde: "Calle 153", hora: "7:30 AM", conductor: "Miguel Ordoñez" },
    { id: 2, destino: "Universidad", desde: "Calle 116", hora: "6:45 AM", conductor: "Sandra Torres" },
  ];

  return (
    <PageContainer>
      <HeaderContainer>
        <LeftSection>
          <Logo src={logo} onClick={() => navigate("/home")} />
          <Greeting>Viajes reservados</Greeting>
        </LeftSection>
        <ProfileImage src={profilePhoto} alt="Perfil" />
      </HeaderContainer>

      <Content>
        {reservedTrips.map((trip) => (
          <TripCard key={trip.id}>
            <div>
              <strong>{trip.desde}</strong> → {trip.destino}
              <p>Hora: {trip.hora}</p>
              <p>Conductor: {trip.conductor}</p>
            </div>
            <button style={{ background: colors.primary, color: "white", border: "none", borderRadius: "6px", padding: "8px 12px" }}>
              Cancelar
            </button>
          </TripCard>
        ))}
      </Content>
    </PageContainer>
  );
};

export default ReservedTravel;
