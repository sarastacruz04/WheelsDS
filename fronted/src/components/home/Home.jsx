import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import TripCard from "../trips/TripCard.jsx";
import { useDriver } from "../../contexts/DriverContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCar} from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/Logo.png';
import profilePhoto from '../../assets/ProfilePhoto.png';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTACIÓN AÑADIDA
import iconHome from "../../assets/Home.png";
import iconReservedTravel from "../../assets/ReservedTravel.png";
import iconCurrentTravel from "../../assets/CurrentTravel.png";
import ReservedTravel from '../trips/ApiReserveTravel.jsx';


// --- Estilos de la Página ---
const HomeContainer = styled.div`
    background-color: ${colors.white}; /* Fondo blanco para la parte superior (Header) */
    min-height: 100vh;
    display: flex; /* Para que su hijo principal ocupe todo el espacio */
    flex-direction: column; /* Organizar el contenido en columna */
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px 40px 0; /* padding arriba y a los lados */
  background-color: ${colors.white}; /* Asegura que el header siempre sea blanco */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
    flex-grow: 1; /* Permite que este contenedor use todo el espacio vertical restante */
    padding: 20px 40px;
    background-color: #f0f4f7; /* Color de fondo para las tarjetas de viaje (similar al gris claro/azul pálido) */

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

// 🟩 Barra de búsqueda
const SearchBarContainer = styled.div`
    background-color: #d8e2ed; /* Azul más claro para el saludo y búsqueda */
    border-radius: 10px;
    padding: 20px;
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
    gap: 20px; /* Espacio entre las tarjetas */
    justify-content: flex-start;

    & > div {
        /* Estilos aplicados a cada TripCard dentro del grid */
        flex-basis: calc(25% - 15px); /* 25% menos el espacio para el gap. (4 tarjetas por fila) */
        min-width: 200px; /* Asegurar que no sean demasiado pequeñas en pantallas medianas */
    }

    @media (max-width: 1200px) {
        & > div {
            flex-basis: calc(33.333% - 13.333px); /* 3 por fila */
        }
    }

    @media (max-width: 768px) {
        & > div {
            flex-basis: calc(50% - 10px); /* 2 por fila */
        }
    }

    @media (max-width: 500px) {
        & > div {
            flex-basis: 100%; /* 1 por fila */
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


// --- Datos Ficticios ---
const mockTrips = [
    { id: 1, sector: "Colina", conductor: "Miguel Ordoñez", desde: "Calle 153", para: "Universidad", horaSalida: "7:30 AM", valor: "$10.000", cupos: 3 },
    { id: 2, sector: "Calle 116", conductor: "Sandra Torres", desde: "Carrera 15", para: "Universidad", horaSalida: "6:45 AM", valor: "$8.000", cupos: 2 },
    { id: 3, sector: "Samaria Chía", conductor: "Nicolás Cruz", desde: "Chía Centro", para: "Universidad", horaSalida: "6:00 AM", valor: "$15.000", cupos: 1 },
    { id: 4, sector: "Huertas Cajicá", conductor: "Sara Mora", desde: "Cajicá", para: "Universidad", horaSalida: "6:15 AM", valor: "$18.000", cupos: 4 },
    { id: 5, sector: "Cedritos", conductor: "Luisa Fernández", desde: "Calle 140", para: "Universidad", horaSalida: "7:10 AM", valor: "$9.000", cupos: 3 },
    { id: 6, sector: "Rosales", conductor: "Andrés Gutiérrez", desde: "Calle 72", para: "Universidad", horaSalida: "7:00 AM", valor: "$12.000", cupos: 2 },
    { id: 7, sector: "Usaquén", conductor: "Pedro Páramo", desde: "Calle 118", para: "Universidad", horaSalida: "6:50 AM", valor: "$11.000", cupos: 1 },
    { id: 8, sector: "Chapinero", conductor: "Elena Ochoa", desde: "Calle 63", para: "Universidad", horaSalida: "7:20 AM", valor: "$10.500", cupos: 3 },
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

    // Función que se ejecuta al hacer clic en el botón '+' de la tarjeta
    const handleReserveStart = (trip) => {
        setSelectedTrip(trip);
        setIsReserving(true);
    };

    // Función para volver al estado inicial (Home) después de terminar la reserva
    const handleReservationFinish = () => {
        setIsReserving(false);
        setSelectedTrip(null);
        setActiveTab("home"); // Asegura que vuelva a la pestaña de inicio
    };

    //Función para manejar la búsqueda
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

// Si isReserving es true, renderizamos el componente ReserveTrip
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
                    <DropdownMenu open={menuOpen}>
                        <DropdownItem onClick={() => navigate('/profile')}>Ver perfil</DropdownItem>
                        <DropdownItem onClick={() => navigate('/edit-profile')}>Editar datos</DropdownItem>
                    </DropdownMenu>
                </ProfileContainer>
            </HeaderContainer>

            {/* 🔹 Menú interno */}
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


            {/* ContentWrapper: Nuevo contenedor para el fondo de las tarjetas */}
        <ContentWrapper>
            {/* 🔁 Contenido dinámico */}
            {activeTab === "home" && (
                <>
                {/* 🔹 Barra de búsqueda con saludo a la izquierda - Fondo Azul Claro */}
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

                {/* Grid de tarjetas - El color de fondo es el de ContentWrapper */}
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

            {isDriver && (
                <p style={{ color: colors.details, textAlign: 'center', marginTop: '30px' }}>
                Estás en modo Conductor. Tus viajes creados están en "Viajes Creados".
                </p>
            )}
        </ContentWrapper>
    </HomeContainer>
);
}

export default Home;