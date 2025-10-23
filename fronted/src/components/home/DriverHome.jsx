// fronted/src/components/home/DriverHome.jsx

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectName } from '../../features/users/UserSlice.jsx';
// Importa tus componentes de la vista de conductor (Crear viaje, Viajes Pendientes, etc.)
// import CreateTripBlock from '../trips/CreateTrip.jsx'; 
// import PendingTripsBlock from '../trips/PendingTrips.jsx'; 

const Container = styled.div`
    padding: 20px 40px;
    background-color: #f0f4f7;
    min-height: 80vh;
`;

const WelcomeBanner = styled.div`
    background-color: #bdc3c7;
    padding: 30px;
    border-radius: 8px;
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
`;

const ContentGrid = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

function DriverHome() {
    const username = useSelector(selectName); // Usar selectName

    return (
        <Container>
            <WelcomeBanner>
                ¡Buen viaje {username || 'Conductor'}!
            </WelcomeBanner>
            
            {/* Contenido principal del conductor (basado en image_580f99.png) */}
            <ContentGrid>
                {/* Aquí iría tu componente para crear viajes
                <CreateTripBlock /> 
                */}
                <div style={{ padding: '50px', backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', width: '45%' }}>
                    Crea un viaje
                </div>

                {/* Aquí iría tu componente para ver viajes pendientes
                <PendingTripsBlock />
                */}
                <div style={{ padding: '50px', backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', width: '45%' }}>
                    Viajes Pendientes
                </div>
            </ContentGrid>
            
            {/* Aquí iría la lógica de las pestañas Viajes Creados y Viajes en Curso */}
        </Container>
    );
}

export default DriverHome;