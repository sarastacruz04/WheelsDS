import styled from 'styled-components';
import colors from '../../assets/Colors';

// Contenedor principal del Header
export const NavContainer = styled.nav`
    background-color: ${colors.white}; /* Fondo blanco para la barra principal */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 80px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Sección del logo
export const Logo = styled.img`
    height: 40px; 
    cursor: pointer;
`;

// Contenedor del menú central (Inicio, Viajes)
export const CentralMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        /* Ocultar en móvil para mostrar solo los iconos */
        display: none; 
    }
`;

// Item individual del menú
export const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 8px 15px;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;
    user-select: none; /* Previene selección de texto */

    /* Estilo del ítem cuando está activo */
    background-color: ${({ active }) => (active ? colors.background : 'transparent')};
    color: ${({ active }) => (active ? colors.detail : colors.text)};

    &:hover {
        background-color: ${colors.lightGray};
    }
`;

// Icono dentro del MenuItem
export const MenuIcon = styled.span`
    font-size: 24px;
    color: ${({ active }) => (active ? colors.primary : colors.detail)};
    margin-bottom: 4px;
`;

// Texto del MenuItem
export const MenuText = styled.span`
    font-size: 14px;
    font-weight: 500;
`;

// Contenedor de los iconos de rol y perfil (esquina superior derecha)
export const RightIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

// Iconos de rol (Pasajero/Conductor)
export const RoleIcon = styled.div`
    cursor: pointer;
    font-size: 26px;
    color: ${({ active, isDriver }) => (active ? (isDriver ? colors.primary : colors.third) : colors.details)};
    transition: color 0.3s;
    
    &:hover {
        color: ${({ isDriver }) => (isDriver ? colors.primaryHover : colors.thirdHover)};
    }
`;

// Icono de perfil
export const ProfileIcon = styled.div`
    cursor: pointer;
    font-size: 26px; 
    color: ${colors.details}; 
    /* Aquí puedes usar el componente ProfilePhoto.jsx más adelante */
`;