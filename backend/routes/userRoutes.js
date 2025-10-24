import express from "express";
import {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUserByEmail);
router.put("/:email", updateUserByEmail);

export default router;
