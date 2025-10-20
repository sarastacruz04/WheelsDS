//Hace que la API de Google Maps esté disponible en toda la aplicación mediante Context API de React  
// src/components/common/googlemapsprovider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const LIBRARIES = ['places', 'geometry'];

const GoogleMapsContext = createContext();


export const GoogleMapsProvider = ({ children }) => {
    // Carga el script de Google Maps usando tu clave de entorno
    const { isLoaded, loadError } = useLoadScript({
        // ⚠️ IMPORTANTE: VITE_API_KEY debe estar definido en tu archivo .env
        googleMapsApiKey: import.meta.env.VITE_API_KEY, 
        libraries: LIBRARIES,
    });

    const [services, setServices] = useState({
        geocoder: null,
        directionsService: null,
        placesService: null,
    });

    useEffect(() => {
        if (isLoaded) {
            setServices({
                geocoder: new window.google.maps.Geocoder(),
                directionsService: new window.google.maps.DirectionsService(),
                placesService: new window.google.maps.places.PlacesService(document.createElement('div')),
            });
        }
    }, [isLoaded]);

    return (
        <GoogleMapsContext.Provider value={{ services, isLoaded, loadError }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

export const useGoogleMaps = () => {
    return useContext(GoogleMapsContext);
};