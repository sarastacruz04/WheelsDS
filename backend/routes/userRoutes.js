import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserByEmail,   // ✅ Nuevo
  updateUserByEmail // ✅ Nuevo
} from "../controllers/userController.js";

const router = express.Router();

// 🔹 Rutas existentes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Nuevas rutas para perfil y edición
router.get("/:email", getUserByEmail);   // Obtener usuario por email
router.put("/:email", updateUserByEmail); // Actualizar datos del usuario

export default router;
