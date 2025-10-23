// fronted/src/components/home/RoleBasedHome.jsx (NUEVO ARCHIVO)

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/users/UserSlice.jsx';
import Home from './Home.jsx'; // Vista de Pasajero
import DriverHome from './DriverHome.jsx'; // Vista de Conductor

/**
 * Componente que renderiza la vista principal (Home) basada en el rol del usuario.
 */
function RoleBasedHome() {
    const role = useSelector(selectUserRole);

    // Si el rol es 'conductor', muestra DriverHome, de lo contrario, muestra Home (Pasajero)
    if (role === 'conductor') {
        return <DriverHome />;
    }
    
    // Asumimos que cualquier otro rol (incluyendo 'pasajero') ve la vista de pasajero
    return <Home />;
}

export default RoleBasedHome;