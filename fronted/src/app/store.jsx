//Se usa Redux Toolkit para configurar la tienda global de estado de la aplicación
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/users/UserSlice';
import reservationTravel from "../components/trips/ReservationSlice.jsx";

export const store = configureStore({
  reducer: {
    user: userSlice,
    reservation: reservationTravel
  },
});
