//Componente reutilizable 
import React, { useRef, useState } from 'react';
import colors from '../../assets/Colors'; 

const AddPhoto = ({ onPhotoSelect, icon }) => {
    const fileInput = useRef(null);
    const [preview, setPreview] = useState(null);

    //Estilos
    const cardStyle = {
    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.156), rgba(0, 0, 0, 0.072))',
    borderRadius: '15px',
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.3)`,
    width: '90%',
    height:'15em',
    margin: '40px auto 40px',
    color: colors.detail,
    border: `1px solid ${colors.third}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
    flexDirection: 'column', 
    };

    //Estilo del icono dentro de la imagen
    const iconStyle = {
    width: '90px',
    height: '90px',
    fill: colors.details,
    cursor: 'pointer', 
    };

    const previewStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
    overflow:'hidden', 
  };

    const inputStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer', 
  };

  //Simulamos el click en el input file
    const handleClick = () => {
    fileInput.current.click(); 
  };

  //Manejamos el archivo seleccionado
    const handleFileChange = (event) => {
    const file = event.target.files[0];  //Coge la imagen seleccionada
    if (file) {
      const fileURL = URL.createObjectURL(file); // Creamos la URL temporal
      setPreview(fileURL); // La mostramos en el preview
      onPhotoSelect(file); // Pasamos la imagen seleccionada al componente padre
    }
  };

    return (
    <div style={cardStyle}>
      <input
        type="file"
        ref={fileInput}
        style={inputStyle}
        onChange={handleFileChange}
        accept="image/*" 
      />

      {/* Mostramos la vista previa o el icono de agregar foto */}
      {preview ? (
        <img src={preview} alt="Vista previa" style={previewStyle} />
      ) : (
        <img
          src={icon} style={iconStyle} onClick={handleClick}
        />
      )}
    </div>
  );
};

export default AddPhoto;
