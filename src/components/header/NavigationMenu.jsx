import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt, faRoad, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'; 
import { useDriver } from '../../contexts/DriverContext.jsx';
import FeedbackModal from '../common/FeedbackModal'; 
import logo from '../../assets/Logo.png'; 

import { 
    NavContainer, 
    Logo, 
    CentralMenu, 
    MenuItem, 
    MenuIcon, 
    MenuText, 
    RightIcons, 
    RoleIcon, 
    ProfileIcon 
} from './NavigationStyle'; 

function NavigationMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [isLogged, setIsLogged] = useState(false);
    const [showRegisterCarModal, setShowRegisterCarModal] = useState(false);
    const [showToggleModeModal, setShowToggleModeModal] = useState(false);
    
    
    const { isDriver, toggleDriverMode } = useDriver();

    // Lógica DUMMY para verificar si el usuario tiene un carro registrado (simulación)
    // En una aplicación real, esta función haría un 'fetch' al backend.
    const verifyCarRegistration = async () => {
        // Simulación: asume que el usuario tiene carro si hay un token.
        // **REEMPLAZAR con la lógica de tu Header.jsx original**
        return localStorage.getItem('hasCar') === 'true'; 
    };

    const confirmToggleDriverMode = async () => {
        // 1. Si el usuario intenta cambiar a Conductor
        if (!isDriver) {
            const hasCar = await verifyCarRegistration();
            if (!hasCar) {
                // Muestra modal si no tiene carro
                setShowRegisterCarModal(true);
                return; // No abre el modal de confirmación
            }
        }
        // 2. Muestra modal de confirmación si tiene carro o si intenta cambiar a Pasajero
        setShowToggleModeModal(true);
    };

    const handleToggleDriverMode = () => {
        toggleDriverMode(); // Cambia el estado del contexto
        navigate('/home'); // Redirige a Home para refrescar la vista
    };

    // Efecto para verificar la autenticación (si hay token)
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
        if (!token && path !== '/') { // Si no hay token y no estás en la página de Login
            navigate('/');
        }
    }, [path, navigate]);

    // Opciones de menú dinámicas
    const menuOptions = [
        { path: '/home', icon: faHome, text: 'Inicio' },
        { 
            path: isDriver ? '/created-trips' : '/reserved-trips', 
            icon: faMapMarkerAlt, 
            text: isDriver ? 'Viajes Creados' : 'Viajes Reservados' 
        },
        { path: '/current-trips', icon: faRoad, text: 'Viajes en Curso' },
    ];
    
    // Si el usuario no está logueado, no renderiza el menú
    if (!isLogged) return null;

    return (
        <>
            <NavContainer>
                <Logo src={logo} alt="Campus Go Logo" onClick={() => navigate('/home')} />

                {/* --- Menú Central Horizontal --- */}
                <CentralMenu>
                    {menuOptions.map(item => (
                        <MenuItem 
                            key={item.path} 
                            active={path === item.path}
                            onClick={() => navigate(item.path)}
                        >
                            <MenuIcon active={path === item.path}>
                                <FontAwesomeIcon icon={item.icon} />
                            </MenuIcon>
                            <MenuText>{item.text}</MenuText>
                        </MenuItem>
                    ))}
                    
                    {/* Opción Adicional para Crear Viaje (Solo Conductor) */}
                    {isDriver && (
                        <MenuItem 
                            active={path === '/create-trip'}
                            onClick={() => navigate('/create-trip')}
                        >
                            <MenuIcon active={path === '/create-trip'}>
                                {/* Usamos el icono que mencionaste en Header.jsx */}
                                <AiOutlineCar />
                            </MenuIcon>
                            <MenuText>Crear Viaje</MenuText>
                        </MenuItem>
                    )}

                </CentralMenu>

                {/* --- Iconos de Rol y Perfil (Superior Derecha) --- */}
                <RightIcons>
                    {/* Selector de Rol Pasajero */}
                    <RoleIcon 
                        active={!isDriver} 
                        isDriver={false}
                        onClick={isDriver ? confirmToggleDriverMode : null} // Solo clic si está en modo Driver
                    >
                        <AiOutlineUser />
                    </RoleIcon>
                    
                    {/* Selector de Rol Conductor */}
                    <RoleIcon 
                        active={isDriver} 
                        isDriver={true}
                        onClick={!isDriver ? confirmToggleDriverMode : null} // Solo clic si está en modo Pasajero
                    >
                        <AiOutlineCar />
                    </RoleIcon>

                    {/* Icono de Perfil */}
                    <ProfileIcon onClick={() => navigate('/pagina-principal')}>
                        <FontAwesomeIcon icon={faUserCircle} /> 
                        {/* Aquí usarías tu componente <ProfilePhoto> si lo tuvieras listo */}
                    </ProfileIcon>
                </RightIcons>

            </NavContainer>

            {/* --- Modales de Feedback (usando tu componente común) --- */}
            
            {showRegisterCarModal && (
                <FeedbackModal
                    type="question"
                    message="No tienes un carro registrado."
                    details="Para cambiar a modo conductor, primero debes registrar un carro."
                    onClose={() => setShowRegisterCarModal(false)}
                    onConfirm={() => {
                        setShowRegisterCarModal(false);
                        navigate('/registrar-carro');
                    }}
                />
            )}

            {showToggleModeModal && (
                <FeedbackModal
                    type="question"
                    message={`¿Estás seguro de cambiar a modo ${isDriver ? 'Pasajero' : 'Conductor'}?`}
                    details={`Este cambio afectará la forma en que usas la aplicación.`}
                    onClose={() => setShowToggleModeModal(false)}
                    onConfirm={() => {
                        setShowToggleModeModal(false);
                        handleToggleDriverMode(); 
                    }}
                />
            )}
        </>
    );
}

export default NavigationMenu;