import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const usersFilePath = path.join(process.cwd(), "backend", "users.json");

// 🔹 POST /api/cars
router.post("/", (req, res) => {
  const { placa, cupos, marca, modelo, userId } = req.body;
  if (!placa || !cupos || !marca || !modelo || !userId) {
    return res.status(400).json({ message: "Faltan datos del vehículo o del usuario." });
  }

  try {
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    const userIndex = usersData.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    usersData[userIndex].car = { placa, cupos, marca, modelo };
    usersData[userIndex].role = "conductor";
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), "utf8");

    res.status(200).json({ message: "Vehículo registrado correctamente.", user: usersData[userIndex] });
  } catch (error) {
    console.error("❌ Error al guardar los datos del carro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
