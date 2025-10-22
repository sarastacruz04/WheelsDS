import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import TripCard from "../trips/TripCard.jsx";
import { useDriver } from "../../contexts/DriverContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCar } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/Logo.png';
import profilePhoto from '../../assets/ProfilePhoto.png';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTACIÓN AÑADIDA

// --- Estilos de la Página ---
const HomeContainer = styled.div`
    padding: 20px 40px;
    background-color: #f0f4f7;
    min-height: 100vh;
    flex-grow: 1;

    @media (max-width: 768px) {
        padding: 20px;
        padding-bottom: 80px;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
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

const Greeting = styled.h2`
    color: ${colors.text};
    font-weight: 600;
    margin: 0;
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

const SearchBarContainer = styled.div`
    background-color: #dbe4eb;
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
`;

const TripCardGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3%;
    justify-content: flex-start;
`;

// --- Datos Ficticios ---
const mockTrips = [
    { id: 1, sector: "Colina", conductor: "Miguel Ordoñez", desde: "Calle 153", para: "Universidad", horaSalida: "7:30 AM", valor: "$10.000", cupos: 3 },
    { id: 2, sector: "Calle 116", conductor: "Sandra Torres", desde: "Carrera 15", para: "Universidad", horaSalida: "6:45 AM", valor: "$8.000", cupos: 2 },
    { id: 3, sector: "Samaria Chía", conductor: "Nicolás Cruz", desde: "Chía Centro", para: "Universidad", horaSalida: "6:00 AM", valor: "$15.000", cupos: 1 },
    { id: 4, sector: "Huertas Cajicá", conductor: "Sara Mora", desde: "Cajicá", para: "Universidad", horaSalida: "6:15 AM", valor: "$18.000", cupos: 4 },
    { id: 5, sector: "Cedritos", conductor: "Luisa Fernández", desde: "Calle 140", para: "Universidad", horaSalida: "7:10 AM", valor: "$9.000", cupos: 3 },
    { id: 6, sector: "Rosales", conductor: "Andrés Gutiérrez", desde: "Calle 72", para: "Universidad", horaSalida: "7:00 AM", valor: "$12.000", cupos: 2 },
];

function Home() {
    const { isDriver } = useDriver();
    const [userName, setUserName] = useState("Susana");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // ✅ Hook de navegación

    const handleReserve = (tripId) => {
        console.log(`Intentando reservar viaje con ID: ${tripId}`);
        alert(`Has intentado reservar un puesto en el viaje #${tripId}.`);
    };

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);

    // 🆕 NUEVO: Obtener el nombre real del usuario desde localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.nombre) {
            setUserName(`${storedUser.nombre} ${storedUser.apellido || ""}`);
        }
    }, []);

    return (
        <HomeContainer>
            {/* 🔹 Header con logo + saludo + foto de perfil */}
            <HeaderContainer>
                <LeftSection>
                    <Logo src={logo} alt="Campus GO Logo" />
                    <Greeting>¡Buen viaje {userName || "Pasajero"}!</Greeting>
                </LeftSection>

                {/* 🔹 Menú desplegable del perfil */}
                <ProfileContainer>
                    <ProfileImage 
                        src={profilePhoto} 
                        alt="Foto de perfil"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                    <DropdownMenu open={menuOpen}>
                        <DropdownItem onClick={() => navigate('/profile')}>Ver perfil</DropdownItem>
                        {/* ✅ NUEVO: Ir a editar perfil */}
                        <DropdownItem onClick={() => navigate('/edit-profile')}>Editar datos</DropdownItem>
                    </DropdownMenu>
                </ProfileContainer>
            </HeaderContainer>

            {/* 🔹 Barra de búsqueda */}
            <SearchBarContainer>
                <Selector>
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
                />

                <ActionButton>
                    <FontAwesomeIcon icon={faCar} />
                </ActionButton>
            </SearchBarContainer>

            {/* 🔹 Grid de tarjetas */}
            <TripCardGrid>
                {mockTrips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        sector={trip.sector}
                        conductor={trip.conductor}
                        desde={trip.desde}
                        para={trip.para}
                        horaSalida={trip.horaSalida}
                        valor={trip.valor}
                        cupos={trip.cupos}
                        onReserve={() => handleReserve(trip.id)}
                    />
                ))}
            </TripCardGrid>

            {isDriver && (
                <p
                    style={{
                        color: colors.details,
                        textAlign: "center",
                        marginTop: "30px",
                    }}
                >
                    Estás en modo Conductor. Tus viajes creados están en "Viajes Creados".
                </p>
            )}
        </HomeContainer>
    );
}

export default Home;
