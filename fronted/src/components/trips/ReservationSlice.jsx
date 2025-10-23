// src/features/reservations/ReservationSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    reservations: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const reservationTravelSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        // Tu acción de eliminación (ya no se usa addReservation si usas el Thunk)
        deleteReservation: (state, action) => {
            const idToDelete = action.payload;
            state.reservations = state.reservations.filter(
                reservation => reservation.id !== idToDelete
            );
        },
        // ... otras acciones síncronas si las tienes
    },
    // 🛑 2. Usa extraReducers para manejar los estados del Thunk
    extraReducers: (builder) => {
        builder
            .addCase(createReservation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reservations.push(action.payload); // Añade la reserva exitosa
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Fallo al realizar la reserva.';
            });
    },
});


// Función auxiliar para simular la generación de un ID y una categoría inicial (Pendiente)
let nextReservationId = 1;



// 🛑 1. Define el Thunk Asíncrono y EXPORTALO
export const createReservation = createAsyncThunk(
    'reservations/createReservation',
    async (reservationData, { rejectWithValue }) => {
        try {
            // 🛑 REEMPLAZA '/api/reservas' con la URL real de tu backend
            const response = await fetch('/api/reservas', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Agrega tu token de autorización si es necesario
                },
                body: JSON.stringify(reservationData),
            });
            
            if (!response.ok) {
                // Si la respuesta HTTP es 4xx o 5xx
                const errorData = await response.json();
                throw new Error(errorData.message || 'El servidor rechazó la reserva.');
            }

            const newReservation = await response.json();
            // Retorna la reserva devuelta por el servidor (con ID y status)
            return newReservation; 

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);




export const { deleteReservation, updateReservationStatus } = reservationTravelSlice.actions;

// Selector para obtener todas las reservas
export const selectReservations = (state) => state.reservations.reservations;
export const selectReservationStatus = (state) => state.reservations.status;

// Selector para obtener reservas filtradas
export const selectFilteredReservations = (status) => (state) => {
    return state.reservations.reservations.filter(r => r.status === status);
};

export default reservationTravelSlice.reducer;
