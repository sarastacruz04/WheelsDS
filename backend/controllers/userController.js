import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/users.json");

const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data || "[]");
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registro
export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  const userExists = users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ message: "El usuario ya existe" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
};

// Login
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secretKey123",
    { expiresIn: "2h" }
  );

  res.json({
    message: "Inicio de sesión exitoso",
    token,
    user: {
      nombre: user.nombre || user.name,
      apellido: user.apellido || "",
      email: user.email,
      telefono: user.telefono || "",
      idUniversidad: user.idUniversidad || "",
    },
  });
};

// Obtener usuario por email
export const getUserByEmail = (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.email === req.params.email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

// Actualizar usuario por email
export const updateUserByEmail = (req, res) => {
  try {
    const users = readUsers();
    const index = users.findIndex((u) => u.email === req.params.email);
    if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

    const updatedUser = { ...users[index], ...req.body };
    if (!req.body.password) delete updatedUser.password;

    users[index] = updatedUser;
    saveUsers(users);

    res.json(users[index]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};
