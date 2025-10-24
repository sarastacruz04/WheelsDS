import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import profilePhoto from '../../assets/ProfilePhoto.png';
import iconHome from "../../assets/Home.png";
import iconReservedTravel from "../../assets/ReservedTravel.png";
import iconCurrentTravel from "../../assets/CurrentTravel.png";

// --- Estilos de la Página ---
const HomeContainer = styled.div`
    background-color: ${colors.white};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px 40px 0;
  background-color: ${colors.white};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    padding: 20px 40px;
    background-color: #f0f4f7;

    @media (max-width: 768px) {
        padding: 20px;
        padding-bottom: 80px;
    }
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

const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
`;

const ProfileImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${colors.details};
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background: ${colors.white};
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    width: 150px;
    display: ${({ open }) => (open ? "block" : "none")};
    z-index: 10;
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    color: ${colors.text};
    font-size: 14px;
    border-bottom: 1px solid #eee;

    &:hover {
        background-color: ${colors.background};
    }

    &:last-child {
        border-bottom: none;
    }
`;

const SwitchButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.details};
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 25px;
  border-bottom: 2px solid ${colors.details};
  padding-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? colors.primary : colors.text)};
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: ${colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ active }) => (active ? colors.primary : "transparent")};
    transition: background-color 0.3s;
  }
`;

const GreetingLeft = styled.h2`
  color: ${colors.text};
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

// ✅ NUEVO: contenedor y botón "Crear tramo"
const GreetingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const CreateButton = styled.button`
  background-color: ${colors.primary}; /* 🔵 Azul */
  color: ${colors.white}; /* ⚪ Blanco */
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: ${colors.details};
    transform: scale(1.03);
  }
`;

function DriverHome() {
  const [userName, setUserName] = useState("Conductor");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.nombre) {
      setUserName(`${storedUser.nombre} ${storedUser.apellido || ""}`);
    }
  }, []);

  return (
    <HomeContainer>
      <HeaderContainer>
        <LeftSection>
          <Logo src={logo} alt="Campus GO Logo" />
        </LeftSection>

        <ProfileContainer>
          <ProfileImage
            src={profilePhoto}
            alt="Foto de perfil"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <SwitchButton onClick={() => navigate('/home')}>
            Cambiar a Pasajero
          </SwitchButton>
          <DropdownMenu open={menuOpen}>
            <DropdownItem onClick={() => navigate('/profile')}>
              Ver perfil
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/edit-profile')}>
              Editar datos
            </DropdownItem>
          </DropdownMenu>
        </ProfileContainer>
      </HeaderContainer>

      <NavMenu>
        <NavButton $active={activeTab === "home"} onClick={() => setActiveTab("home")}>
          <img src={iconHome} alt="home" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
          Inicio
        </NavButton>
        <NavButton $active={activeTab === "reserved"} onClick={() => setActiveTab("reserved")}>
          <img src={iconReservedTravel} alt="reserved" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
          Viajes creados
        </NavButton>
        <NavButton $active={activeTab === "current"} onClick={() => setActiveTab("current")}>
          <img src={iconCurrentTravel} alt="current" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
          Viaje actual
        </NavButton>
      </NavMenu>

      <ContentWrapper>
        {activeTab === "home" && (
          <GreetingContainer>
            <GreetingLeft>¡Hola {userName || "Conductor"}! 🚗</GreetingLeft>
            <CreateButton onClick={() => navigate('/create-trip')}>
              + Crear tramo
            </CreateButton>
          </GreetingContainer>
        )}

        {activeTab === "reserved" && (
          <h3 style={{ textAlign: "center", color: colors.text }}>
            📋 Aquí podrás ver los viajes que has creado.
          </h3>
        )}

        {activeTab === "current" && (
          <h3 style={{ textAlign: "center", color: colors.text }}>
            🛣️ Aquí verás tu viaje en curso.
          </h3>
        )}
      </ContentWrapper>
    </HomeContainer>
  );
}

export default DriverHome;
