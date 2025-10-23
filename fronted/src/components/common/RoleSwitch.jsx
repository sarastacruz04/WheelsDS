// fronted/src/components/common/RoleSwitch.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, selectUserRole, selectHasCar } from '../../features/users/UserSlice.jsx';
import FeedbackModal from "./FeedbackModal.jsx"; // Asegúrate que la ruta sea correcta
import colors from '../../assets/Colors';

// --- Estilos para el interruptor de rol (adaptado de tu imagen) ---
const RoleToggle = styled.div`
    display: flex;
    background-color: #2c3e50; /* Color de fondo del interruptor */
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    margin-right: 15px; /* Separación del icono de perfil */
    border: 2px solid ${colors.white};
`;

const RoleIcon = styled.div`
    padding: 8px 12px;
    color: ${props => props.active ? colors.white : '#7f8c8d'};
    background-color: ${props => props.active ? colors.primary : 'transparent'};
    transition: background-color 0.3s, color 0.3s;
    font-size: 1.2rem;
    
    /* Simula los iconos de persona y carro que tienes en la imagen */
    &.person-icon::before {
        content: "👤"; 
    }
    &.car-icon::before {
        content: "🚗"; 
    }
`;

const RoleSwitch = () => {
    const dispatch = useDispatch();
    const currentRole = useSelector(selectUserRole);
    const hasCar = useSelector(selectHasCar);
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('confirm'); // 'confirm' o 'carError'

    const isConductor = currentRole === 'conductor';

    const handleSwitchClick = (newRole) => {
        if (newRole === currentRole) return; // No hacer nada si ya está en ese rol
        
        if (newRole === 'pasajero') {
            // Si cambia a pasajero, se hace directamente sin modal
            dispatch(setRole('pasajero'));
            // La navegación a Home se manejará en App.jsx
        } else {
            // Intenta cambiar a conductor
            if (!hasCar) {
                // 🛑 No tiene carro: muestra el modal de error
                setModalType('carError');
                setShowModal(true);
            } else {
                // ✅ Tiene carro: muestra el modal de confirmación
                setModalType('confirm');
                setShowModal(true);
            }
        }
    };
    
    // Acción que se ejecuta al presionar "Aceptar" en la modal de confirmación
    const handleConfirmChange = () => {
        dispatch(setRole('conductor'));
        setShowModal(false);
        // La navegación a DriverHome se manejará en App.jsx
    };
    
    // Acción que se ejecuta al presionar "Cancelar" en cualquier modal
    const handleCancel = () => {
        setShowModal(false);
        // Si cancela la transición a conductor, se queda en pasajero (pantalla actual)
    };

    return (
        <>
            <RoleToggle>
                <RoleIcon 
                    className="person-icon" 
                    active={!isConductor} 
                    onClick={() => handleSwitchClick('pasajero')}
                />
                <RoleIcon 
                    className="car-icon" 
                    active={isConductor} 
                    onClick={() => handleSwitchClick('conductor')}
                />
            </RoleToggle>

            {/* --- RENDERIZADO CONDICIONAL DEL MODAL --- */}
            {showModal && modalType === 'confirm' && (
                <FeedbackModal
                    type="confirm"
                    title="¿Está seguro que desea cambiar a modo Conductor?"
                    message="Esta acción afectará la manera en que usa la app."
                    onConfirm={handleConfirmChange}
                    onCancel={handleCancel}
                />
            )}

            {showModal && modalType === 'carError' && (
                <FeedbackModal
                    type="error"
                    title="No tienes un carro registrado."
                    message="Debes registrar un carro para cambiar a modo conductor."
                    onCancel={handleCancel} // El botón 'Aceptar' o 'Cancelar' actúa como cerrar
                />
            )}
        </>
    );
};

export default RoleSwitch;