//Slice que maneja el estado del usuario
import { createSlice } from '@reduxjs/toolkit';

// El estado inicial que contiene la información del usuario logueado
const initialState = {
  id: null,
  name: null,
  token: null,
  photo: null,
  status: 'loading', 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Para actualizar solo el ID 
    setId: (state, action) => {
      state.id = action.payload;
    },
    // Para actualizar solo el nombre
    setName: (state, action) => {
      state.name = action.payload;
    },
    // Para actualizar solo el token 
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Guarda toda la data del usuario después de un login exitoso
    setUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.photo = action.payload.photo;
      state.status = 'success';
    },
    
    clearUser: (state) => {
      
      state.id = null;
      state.token = null;
      state.name = null;
      state.photo = null;
      state.status = 'loading';
    },
  },
});

// Exporta las acciones para que los componentes puedan hacer dispatch(setUserLogin(...))
export const { setId, setName, setToken, clearUser, setUserLogin } = userSlice.actions;

// Exporta los selectores para que los componentes puedan leer el estado (ej. useSelector(selectToken))
export const selectUser = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectToken = (state) => state.user.token;
export const selectPhoto = (state) => state.user.photo;


export default userSlice.reducer;