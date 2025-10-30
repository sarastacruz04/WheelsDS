// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Configuración CORS
const allowedOrigins = [
  "https://proyecto9-c03h.onrender.com",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("No permitido por CORS"));
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

// ✅ Schema actualizado con datos del carro
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  idUniversidad: String,
  email: { type: String, required: true, unique: true },
  telefono: String,
  password: { type: String, required: true },

  // 🚗 Campos del carro NUEVOS
  placa: { type: String, default: "" },
  cupos: { type: Number, default: 0 },
  marca: { type: String, default: "" },
  modelo: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


// ✅ Registro
app.post("/api/users/register", async (req, res) => {
  try {
    const { nombre, apellido, idUniversidad, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existente = await User.findOne({ email });
    if (existente) return res.status(400).json({ message: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      apellido,
      idUniversidad,
      email,
      telefono,
      password: hashedPassword,
      placa: req.body.placa || "",
      cupos: req.body.cupos || 0,
      marca: req.body.marca || "",
      modelo: req.body.modelo || ""
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
    console.error(error);
  }
});


// ✅ Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Correo o contraseña incorrectos" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Correo o contraseña incorrectos" });

    res.json({
      message: "Login exitoso",
      user: {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        idUniversidad: user.idUniversidad,
        telefono: user.telefono,

        // ✅ También enviamos datos del carro en login
        placa: user.placa,
        cupos: user.cupos,
        marca: user.marca,
        modelo: user.modelo,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


// ✅ Obtener usuario
app.get("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});


// ✅ Editar usuario con datos del carro
app.put("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const campos = ["nombre", "apellido", "idUniversidad", "telefono", "placa", "cupos", "marca", "modelo"];

    campos.forEach(campo => {
      if (req.body[campo] !== undefined) user[campo] = req.body[campo];
    });

    if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);

    await user.save();
    res.json({ message: "Usuario actualizado correctamente", user });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Raíz
app.get("/", (req, res) => {
  res.send("✅ Backend funcionando 🚀");
});

// Servidor
app.listen(PORT, () =>
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`)
);
