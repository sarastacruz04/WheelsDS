import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, selectUserRole, selectHasCar } from '../../features/users/UserSlice.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt, faRoad, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'; 
import FeedbackModal from '../common/FeedbackModal.jsx'; 
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
} from './NavigationStyle.jsx'; 

function NavigationMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    // 🛑 USAR REDUX PARA EL ESTADO DEL ROL
    const dispatch = useDispatch();
    const role = useSelector(selectUserRole);
    const hasCar = useSelector(selectHasCar); // Lee si el usuario tiene carro
    const isConductor = role === 'conductor'; // 🛑 Variable derivada de Redux

    const [isLogged, setIsLogged] = useState(false);

    // 🛑 Modales: Usaremos un solo estado de modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // 'confirm' o 'carError'
    const [pendingRole, setPendingRole] = useState(null); // Almacena el rol al que se intenta cambiar

    const confirmToggleMode = (targetRole) => {
        setPendingRole(targetRole);
        
        if (targetRole === 'conductor') {
            // Si intenta cambiar a Conductor
            if (!hasCar) {
                // 🛑 No tiene carro: Muestra modal de error (usando el tipo 'error' del FeedbackModal)
                setModalType('carError');
                setShowModal(true);
                return; 
            }
        }
        
        // 🛑 Muestra modal de confirmación si tiene carro o si intenta cambiar a Pasajero
        setModalType('confirm');
        setShowModal(true);
    };

    const handleConfirmChange = () => {
        setShowModal(false);
        if (pendingRole) {
            dispatch(setRole(pendingRole)); // 🛑 CAMBIA EL ROL EN REDUX
            
            // 🛑 Lógica de redirección según el requerimiento:
            if (pendingRole === 'conductor') {
                navigate('/conductor-home'); // O la ruta que definas para el inicio del conductor
            } else {
                navigate('/home'); // Redirige a Home de Pasajero
            }
        }
    };

    // Función para manejar la cancelación (vuelve a la vista actual, /home en caso de error)
    const handleCancel = () => {
        setShowModal(false);
        // Si cancela, el usuario se queda en la vista actual. 
        // Si el modal de error aparece en otra ruta, al cancelar debería ir a /home.
        if (modalType === 'carError') {
             navigate('/home'); 
        }
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
            path: isConductor ? '/created-trips' : '/reserved-trips', 
            icon: faMapMarkerAlt, 
            text: isConductor ? 'Viajes Creados' : 'Viajes Reservados' 
        },
        { path: '/current-trips', icon: faRoad, text: 'Viajes en Curso' },
        // Si es conductor y no está en la pestaña "Crear Viaje", muestra la opción
        ...(isConductor ? [{ path: '/create-trip', icon: AiOutlineCar, text: 'Crear Viaje' }] : [])
    ];
    
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
                </CentralMenu>

                {/* --- Iconos de Rol y Perfil (Superior Derecha) --- */}
                <RightIcons>
                    {/* Selector de Rol Pasajero */}
                    <RoleIcon 
                        active={!isConductor} 
                        isDriver={false}
                        // Clic solo si está en modo Conductor (para cambiar a Pasajero)
                        onClick={isConductor ? () => confirmToggleMode('pasajero') : null} 
                    >
                        <AiOutlineUser />
                    </RoleIcon>
                    
                    {/* Selector de Rol Conductor */}
                    <RoleIcon 
                        active={isConductor} 
                        isDriver={true}
                        // Clic solo si está en modo Pasajero (para cambiar a Conductor)
                        onClick={!isConductor ? () => confirmToggleMode('conductor') : null} 
                    >
                        <AiOutlineCar />
                    </RoleIcon>

                    {/* Icono de Perfil */}
                    <ProfileIcon onClick={() => navigate('/pagina-principal')}>
                        <FontAwesomeIcon icon={faUserCircle} /> 
                    </ProfileIcon>
                </RightIcons>

            </NavContainer>

            {/* --- Modales de Feedback (usando tu componente común) --- */}
            
            {/* 🛑 MODAL DE CONFIRMACIÓN DE CAMBIO DE ROL */}
            {showModal && modalType === 'confirm' && (
                <FeedbackModal
                    type="question" // Usa el tipo 'question' para la confirmación
                    message={`¿Estás seguro de cambiar a modo ${pendingRole === 'conductor' ? 'Conductor' : 'Pasajero'}?`}
                    details={`Esta acción afectará la forma en que usas la aplicación.`}
                    onClose={handleCancel} // Cancelar
                    onConfirm={handleConfirmChange} // Aceptar
                />
            )}

            {/* 🛑 MODAL DE ERROR DE CARRO */}
            {showModal && modalType === 'carError' && (
                <FeedbackModal
                    type="error" // Usa el tipo 'error' que definimos
                    message="No tienes un carro registrado."
                    details="Debes registrar un carro para cambiar a modo conductor."
                    onClose={handleCancel} // Tanto Aceptar como Cancelar llaman a handleCancel
                    // No necesitas onConfirm ya que ambos botones cierran la modal y redirigen
                />
            )}
        </>
    );
}

export default NavigationMenu;