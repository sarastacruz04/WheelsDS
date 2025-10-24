import express from "express";
import {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserByEmail
} from "../controllers/userController.js";

const router = express.Router();

// 🔹 Rutas existentes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Nuevas rutas para perfil y edición
router.get("/:email", getUserByEmail);
router.put("/:email", updateUserByEmail);

export default router;
