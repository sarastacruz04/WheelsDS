import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/UserRoutes.js'; // ✅ Añadido
import carRoutes from './routes/CarRoutes.js';   // ✅ Añadido

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Configurar CORS
app.use(cors({
  origin: [
    "https://proyecto-5v76.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.options("*", cors()); // ✅ Preflight OPTIONS

// ✅ Rutas unificadas
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

// Raíz
app.get('/', (req, res) => {
  res.send('Backend del proyecto activo ✅');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('🔥 Error interno:', err.stack);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
