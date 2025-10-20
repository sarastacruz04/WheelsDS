//Para saber si el usuario es conductor o pasajero
import React, { createContext, useContext, useState, useEffect } from 'react';


const DriverContext = createContext();


export const useDriver = () => {
  return useContext(DriverContext);
};

export const DriverProvider = ({ children }) => {
  // Inicializa guardando el modo en localStorage
  const [isDriver, setIsDriver] = useState(() => {
    // Si no está definido, asume 'Pasajero' (false)
    const storedMode = localStorage.getItem('isDriverMode');
    return storedMode === 'true';
  });

  // Guarda el estado en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('isDriverMode', isDriver);
  }, [isDriver]);

  // Función para cambiar el modo
  const toggleDriverMode = () => {
    setIsDriver(prevMode => !prevMode);
  };

  // El valor que se proveerá a los componentes hijos
  const contextValue = {
    isDriver,
    toggleDriverMode,
    // Puedes añadir más estados o funciones (ej. datos del carro) aquí
  };

  return (
    <DriverContext.Provider value={contextValue}>
      {children}
    </DriverContext.Provider>
  );
};