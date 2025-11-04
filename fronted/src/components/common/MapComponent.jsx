// src/components/common/MapComponent.jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import { useGoogleMaps } from './GoogleMapsProvider'; 

const MapContainer = styled.div`
    width: 100%;
    height: 400px; /* Asegúrate de que tenga una altura definida */
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Modificar las props para aceptar onAddressSelect
const MapComponent = ({ onAddressSelect }) => { 
    const { services, isLoaded, loadError } = useGoogleMaps();
    const [autocomplete, setAutocomplete] = useState(null);
    const [place, setPlace] = useState(null);
    const [center, setCenter] = useState({ lat: 4.7110, lng: -74.0721 }); 

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const handleMapClick = useCallback((event) => {
        if (!services.geocoder) return; // Si el geocodificador no está cargado, salir

        const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        // 1. Mover el marcador al punto clicado
        setCenter(newLocation); 
        // Crear un objeto 'place' temporal solo para la posición del Marker
        setPlace({ geometry: { location: { lat: () => newLocation.lat, lng: () => newLocation.lng } } });

        // 2. Usar Geocodificación Inversa para obtener la dirección
        services.geocoder.geocode({ location: newLocation }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                
                if (onAddressSelect) {
                    onAddressSelect(address); // Llama a la función de prop con la nueva dirección
                }
                console.log("📍 Lugar seleccionado (Clic en mapa):", address);
            } else {
                console.error('Geocodificación inversa fallida:', status);
                if (onAddressSelect) {
                    onAddressSelect("Ubicación seleccionada (dirección no disponible)"); 
                }
            }
        });
    }, [services.geocoder, onAddressSelect]); // Dependencias para useCallback

    // Modificar onPlaceChanged para usar onAddressSelect
    const onPlaceChanged = () => {
        if (autocomplete) {
            const selectedPlace = autocomplete.getPlace();
            if (selectedPlace.geometry) {
                const newLocation = {
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                };
                setCenter(newLocation); 
                setPlace(selectedPlace); 
                
                // ✅ LLAMAR AL CALLBACK PASADO POR PROPS
                if (onAddressSelect) {
                    onAddressSelect(selectedPlace.formatted_address); 
                }
                
                console.log("📍 Lugar seleccionado:", selectedPlace.formatted_address);
            } else {
                console.error("El lugar seleccionado no tiene información geográfica.");
            }
        }
    };

    if (loadError) return <div>Error al cargar Google Maps. Verifica tu clave de API.</div>;
    if (!isLoaded) return <div>Cargando Mapa...</div>;

    return (
        <MapContainer>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={14}
                onClick={handleMapClick}
            >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        placeholder="Escribe una dirección para buscar..." 
                        style={{
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        width: '280px',
                        height: '40px',
                        padding: '0 15px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                        fontSize: '15px',
                        outline: 'none',
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 5,
                    }}
                    />
                </Autocomplete>

                {place && (
                    <Marker
                        position={{
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        }}
                    />
                )}
            </GoogleMap>
        </MapContainer>
    );
};

export default MapComponent;