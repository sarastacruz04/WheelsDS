//Sirve para mostrar modales de retroalimentación al usuario con diferentes tipos de mensajes e íconos.
import React from 'react';
import PropTypes from 'prop-types';
import yesIcon from '../../assets/Yes.webp';
import noIcon from '../../assets/No.png';
import questionIcon from '../../assets/Question.png'; 
import colors from '../../assets/Colors';
import { Text, Title } from './CommonStyles';
import Button from './Button'; 

const FeedbackModal = ({ type, message, details, onClose, onConfirm }) => {
  let icon;
  let confirmLabel = 'Aceptar';
  let cancelLabel = 'Cancelar';

  switch (type) {
    case 'yes':
      icon = yesIcon;
      confirmLabel = '¡Listo!';
      cancelLabel = null;
      break;
    case 'no':
    case 'error': // 🛑 NUEVO: Usaremos 'error' para el mensaje de carro
      icon = noIcon;
      confirmLabel = 'Aceptar'; // Cambiamos a 'Aceptar' para el error de carro
      cancelLabel = 'Cancelar'; // Mantenemos 'Cancelar'
      break;
    case 'question':
      icon = questionIcon;
      confirmLabel = 'Aceptar'; // Usamos 'Aceptar' para la confirmación de rol
      break;
    default:
      icon = yesIcon;
  }

  // Si el tipo es 'error' o 'no', no queremos el botón principal, sino solo el de cerrar/aceptar
  const showCancelButton = type === 'question' || type === 'no';
  const showConfirmButton = type === 'question'; // Solo muestra Confirmar en 'question'

  return (
    <div style={styles.modalOverlay}>
      {/* ... (Tu modalContainer y el icono siguen iguales) */}
      <div style={{ ...styles.modalContainer, ...styles[type] }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={icon} alt={`${type} icon`} style={styles.modalIcon} />
        </div>
        <Title>{message}</Title>
        <Text>{details}</Text>
        <div style={styles.buttonContainer}>
          
          {/* Lógica de botones para 'question' (Aceptar y Cancelar) */}
          {type === 'question' && (
            <>
              <Button text={cancelLabel} onClick={onClose} primary={false} />
              <Button text={confirmLabel} onClick={onConfirm} primary={true} />
            </>
          )}

          {/* Lógica de botones para 'no'/'error' (Cancelar y Aceptar) */}
          {(type === 'no' || type === 'error') && (
            <>
              <Button text="Cancelar" onClick={onClose} primary={false} /> {/* El botón secundario es Cancelar */}
              <Button text="Aceptar" onClick={onClose} primary={true} />  {/* El botón principal es Aceptar, pero ambos cierran en este caso */}
            </>
          )}

          {/* Lógica para 'yes' (solo el botón principal) */}
          {type === 'yes' && (
            <Button text={confirmLabel} onClick={onClose} primary={true} />
          )}

        </div>
      </div>
    </div>
  );
};

//Estilo del fondo del aviso y del modal
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }, // Asegura que el modal esté por encima de otros elementos
  modalContainer: {
    backgroundColor: colors.background,
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0px 11px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: '#000000',
    maxWidth: '400px',
    width: '100%',
  }, // Estilo base del modal
  yes: {
    border: `3px solid ${colors.primary}`,
  },
  no: {
    border: `3px solid ${colors.third}`,
  },
  question: {
    border: `3px solid ${colors.detail}`,
  }, 
  error: {
    border: `3px solid ${colors.third}`, 
  }, // Estilos específicos por tipo
  modalIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  }, // Estilo del icono
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
};

// Tipos para las props
FeedbackModal.propTypes = {
  type: PropTypes.oneOf(['yes', 'no', 'question', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func, // onConfirm es opcional para el tipo yes
};

export default FeedbackModal;
