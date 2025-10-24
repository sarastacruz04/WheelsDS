import express from "express";
import {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();

// 🔹 Rutas existentes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUserByEmail);

// 🔹 Ruta PUT para actualizar usuario, incluyendo datos del carro
router.put("/:email", updateUserByEmail);

export default router;