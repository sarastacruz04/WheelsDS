// Consume el estado de carga isLoaded y muestra el mapa con Autocomplete y Marker
import React, { useState } from 'react';
import { GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import { useGoogleMaps } from './GoogleMapsProvider'; 

// Estilos para el contenedor del mapa
const MapContainer = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MapComponent = () => {
    // Consumir el estado de carga del Provider
    const { isLoaded, loadError } = useGoogleMaps();

    const [autocomplete, setAutocomplete] = useState(null);
    const [place, setPlace] = useState(null);
    // Bogotá, Colombia
    const [center, setCenter] = useState({ lat: 4.7110, lng: -74.0721 }); 

    // Callback para guardar la instancia de Autocomplete
    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    // Se ejecuta cuando el usuario selecciona un lugar del dropdown de Autocomplete
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

                {/* Marcador*/}
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