import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import TripCard from "../trips/TripCard.jsx";
import { useDriver } from "../../contexts/DriverContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCar } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/Logo.png';
import profilePhoto from '../../assets/ProfilePhoto.png';
import { useNavigate } from 'react-router-dom';
import iconHome from "../../assets/Home.png";
import iconReservedTravel from "../../assets/ReservedTravel.png";
import iconCurrentTravel from "../../assets/CurrentTravel.png";
import ReservedTravel from '../trips/ApiReserveTravel.jsx';

// fronted/src/components/home/Home.jsx (NUEVO ESTILO)

const CenteredContent = styled.div`
    max-width: 1280px; /* Limita el ancho del contenido interno */
    margin: 0 auto;    /* Centra el contenido en la pantalla */
    width: 100%;       /* Asegura que ocupe todo el espacio disponible hasta el max-width */
    padding: 0 40px;   /* Añade un margen interno de 40px a los lados para diseño */
    
    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

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
  padding: 20px 0 0;
  background-color: ${colors.white};
  overflow-x: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    padding: 20px 0;
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
    gap: 15px; /* 🔹 Añadido espacio entre foto y botón */
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

// 🆕 🔹 Botón para cambiar a modo conductor
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

// 🟩 Menú de navegación interno
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

const SearchBarContainer = styled.div`
    background-color: #d8e2ed;
    border-radius: 10px;
    padding: 20px 0;
    margin-bottom: 30px;
    display: flex;
    gap: 15px;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const Selector = styled.select`
    padding: 10px 15px;
    border: 1px solid ${colors.details};
    border-radius: 8px;
    background-color: ${colors.white};
    color: ${colors.text};
    flex-grow: 1;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid ${colors.details};
  border-radius: 8px;
  flex-grow: 2;
`;

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a5d72;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TripCardGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;

    & > div {
        flex-basis: calc(25% - 15px);
        min-width: 200px;
    }

    @media (max-width: 1200px) {
        & > div {
            flex-basis: calc(33.333% - 13.333px);
        }
    }

    @media (max-width: 768px) {
        & > div {
            flex-basis: calc(50% - 10px);
        }
    }

    @media (max-width: 500px) {
        & > div {
            flex-basis: 100%;
        }
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

const mockTrips = [
    { id: 1, sector: "Colina", conductor: "Miguel Ordoñez", desde: "Calle 153", para: "Universidad", horaSalida: "7:30 AM", valor: "$10.000", cupos: 3 },
    { id: 2, sector: "Calle 116", conductor: "Sandra Torres", desde: "Carrera 15", para: "Universidad", horaSalida: "6:45 AM", valor: "$8.000", cupos: 2 },
    { id: 3, sector: "Samaria Chía", conductor: "Nicolás Cruz", desde: "Chía Centro", para: "Universidad", horaSalida: "6:00 AM", valor: "$15.000", cupos: 1 },
    { id: 4, sector: "Huertas Cajicá", conductor: "Sara Mora", desde: "Cajicá", para: "Universidad", horaSalida: "6:15 AM", valor: "$18.000", cupos: 4 },
];

function Home() {
    const { isDriver } = useDriver();
    const [userName, setUserName] = useState("Susana");
    const [menuOpen, setMenuOpen] = useState(false);
    const [sector, setSector] = useState("");
    const [puestos, setPuestos] = useState("");
    const [filteredTrips, setFilteredTrips] = useState(mockTrips);
    const [activeTab, setActiveTab] = useState("home");
    const navigate = useNavigate();
    const [isReserving, setIsReserving] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleReserveStart = (trip) => {
        setSelectedTrip(trip);
        setIsReserving(true);
    };

    const handleReservationFinish = () => {
        setIsReserving(false);
        setSelectedTrip(null);
        setActiveTab("home");
    };

    const handleSearch = () => {
        const filtered = mockTrips.filter(
        (trip) =>
            (sector === "" || trip.sector === sector) &&
            (puestos === "" || trip.cupos >= parseInt(puestos))
        );
        setFilteredTrips(filtered);
    };

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.nombre) {
          setUserName(`${storedUser.nombre} ${storedUser.apellido || ""}`);
      }
    }, []);

    if (isReserving && selectedTrip) {
        return (
            <HomeContainer>
                <ReservedTravel
                    trip={selectedTrip} 
                    onFinishReservation={handleReservationFinish} 
                />
            </HomeContainer>
        );
    }

return (
        <HomeContainer>
            <CenteredContent>
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
                        <SwitchButton onClick={() => navigate('/car-question')}>
                            Cambiar a Conductor
                        </SwitchButton> {/* 🆕 Nuevo botón */}
                        <DropdownMenu open={menuOpen}>
                            <DropdownItem onClick={() => navigate('/profile')}>Ver perfil</DropdownItem>
                            <DropdownItem onClick={() => navigate('/edit-profile')}>Editar datos</DropdownItem>
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
                        Viajes reservados
                    </NavButton>
                    <NavButton $active={activeTab === "current"} onClick={() => setActiveTab("current")}>
                        <img src={iconCurrentTravel} alt="current" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
                        Viajes en curso
                    </NavButton>
                </NavMenu>
            </CenteredContent>

            <ContentWrapper>
                <CenteredContent>

                    {activeTab === "home" && (
                        <>
                        <SearchBarContainer>
                            <GreetingLeft>¡Buen viaje {userName || "Pasajero"}!</GreetingLeft>

                            <Selector value={sector} onChange={(e) => setSector(e.target.value)}>
                                <option value="">Sectores</option>
                                <option value="Colina">Colina</option>
                                <option value="Calle 116">Calle 116</option>
                                <option value="Samaria Chía">Samaria Chía</option>
                                <option value="Huertas Cajicá">Huertas Cajicá</option>
                            </Selector>

                            <SearchInput
                                type="number"
                                placeholder="Cantidad de puestos disponibles"
                                min="1"
                                value={puestos}
                                onChange={(e) => setPuestos(e.target.value)}
                            />

                            <ActionButton onClick={handleSearch}>
                                <FontAwesomeIcon icon={faCar} /> Buscar
                            </ActionButton>
                        </SearchBarContainer>

                        <TripCardGrid>
                            {filteredTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                sector={trip.sector}
                                conductor={trip.conductor}
                                desde={trip.desde}
                                para={trip.para}
                                horaSalida={trip.horaSalida}
                                valor={trip.valor}
                                cupos={trip.cupos}
                                onReserve={() => handleReserveStart(trip)}
                            />
                            ))}
                        </TripCardGrid>
                        </>
                    )}

                    {activeTab === "reserved" && (
                        <h3 style={{ textAlign: "center", color: colors.text }}>
                            🚗 Aquí verás tus viajes reservados.
                        </h3>
                    )}

                    {activeTab === "current" && (
                        <h3 style={{ textAlign: "center", color: colors.text }}>
                            🛣️ Aquí verás tus viajes en curso.
                        </h3>
                    )}
                </CenteredContent>
            </ContentWrapper>
        </HomeContainer>
);
}

export default Home;
