// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------
// ✅ 1. Configuración CORS
// ----------------------------------------------------
const allowedOrigins = [
  "https://proyecto9-c03h.onrender.com",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman o requests sin origin
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("No permitido por CORS"));
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// ----------------------------------------------------
// ✅ 2. Conexión a MongoDB Atlas
// ----------------------------------------------------
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// ----------------------------------------------------
// ✅ 3. Esquema y modelo de usuarios
// ----------------------------------------------------
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  idUniversidad: String,
  email: { type: String, required: true, unique: true },
  telefono: String,
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ----------------------------------------------------
// ✅ 4. Rutas de usuarios
// ----------------------------------------------------

// Registro
app.post("/api/users/register", async (req, res) => {
  try {
    const { nombre, apellido, idUniversidad, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      apellido,
      idUniversidad,
      email,
      telefono,
      password: hashedPassword,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Faltan campos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Correo o contraseña incorrectos" });

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Correo o contraseña incorrectos" });

    res.status(200).json({
      message: "Login exitoso",
      user: {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        idUniversidad: user.idUniversidad,
        telefono: user.telefono,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Obtener usuario
app.get("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Editar usuario
app.put("/api/users/:email", async (req, res) => {
  try {
    const { nombre, apellido, idUniversidad, telefono, password } = req.body;

    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Sobrescribir solo si vienen valores válidos
    if (typeof nombre === "string") user.nombre = nombre;
    if (typeof apellido === "string") user.apellido = apellido;
    if (typeof idUniversidad === "string") user.idUniversidad = idUniversidad;
    if (typeof telefono === "string") user.telefono = telefono;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const safeUser = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      idUniversidad: user.idUniversidad,
      telefono: user.telefono,
    };

    res.json({ message: "Usuario actualizado correctamente", user: safeUser });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
// Raíz
app.get("/", (req, res) => {
  res.send("✅ Backend funcionando correctamente 🚀");
});

// ----------------------------------------------------
// ✅ 5. Servidor
// ----------------------------------------------------
app.listen(PORT, () =>
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`)
);
