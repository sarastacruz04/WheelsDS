// src/features/reservations/ReservationSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Aquí guardaremos todas las reservas del usuario.
    // Usaremos un array para mayor simplicidad. En una app real, esto vendría de una API.
    reservations: [], 
};

// Función auxiliar para simular la generación de un ID y una categoría inicial (Pendiente)
let nextReservationId = 1;

const reservationTravelSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        // Acción para añadir una nueva reserva
        addReservation: (state, action) => {
            const newReservation = {
                id: nextReservationId++,
                status: 'Pendiente', // Estado inicial
                ...action.payload,   // Contiene trip y pickupAddress
                date: new Date().toLocaleDateString('es-CO'),
            };
            state.reservations.push(newReservation);
        },
        
        // Acción para eliminar una reserva por ID
        deleteReservation: (state, action) => {
            const idToDelete = action.payload;
            state.reservations = state.reservations.filter(
                reservation => reservation.id !== idToDelete
            );
        },
        
        // Acción futura para cambiar el estado (Aceptado/Rechazado)
        updateReservationStatus: (state, action) => {
            const { id, newStatus } = action.payload;
            const reservation = state.reservations.find(r => r.id === id);
            if (reservation) {
                reservation.status = newStatus;
            }
        },
    },
});

export const { addReservation, deleteReservation, updateReservationStatus } = reservationSlice.actions;

// Selector para obtener todas las reservas
export const selectReservations = (state) => state.reservations.reservations;

// Selector para obtener reservas filtradas
export const selectFilteredReservations = (status) => (state) => {
    return state.reservations.reservations.filter(r => r.status === status);
};

export default reservationTravelSlice.reducer;