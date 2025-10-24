import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------
// ✅ 1. CORS primero y sin filtros problemáticos
// ----------------------------------------------------
const allowedOrigins = [
  "https://proyecto-5v76.vercel.app",
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Si es preflight → responder antes de pasar al resto
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// ----------------------------------------------------
// ✅ 2. Middlewares
// ----------------------------------------------------
app.use(express.json());

// ----------------------------------------------------
// ✅ 3. Soporte de rutas
// ----------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');

const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registro
app.post('/api/users/register', (req, res) => {
  const { nombre, apellido, idUniversidad, email, telefono, password } = req.body;
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const users = readUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const newUser = { nombre, apellido, idUniversidad, email, telefono, password };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Faltan campos' });

  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }

  res.status(200).json({
    message: 'Login exitoso',
    user: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      idUniversidad: user.idUniversidad,
      telefono: user.telefono
    }
  });
});

// Obtener usuario
app.get('/api/users/:email', (req, res) => {
  const { email } = req.params;
  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Editar usuario
app.put('/api/users/:email', (req, res) => {
  const { email } = req.params;
  const users = readUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users[idx] = { ...users[idx], ...req.body };
  saveUsers(users);
  res.json({ message: 'Usuario actualizado correctamente', user: users[idx] });
});

// Raíz
app.get('/', (req, res) => {
  res.send('✅ Backend funcionando correctamente 🚀');
});

// ----------------------------------------------------
// ✅ 4. Servidor
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
});
