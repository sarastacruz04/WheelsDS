import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Registro de usuario (no cambia)
export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, idUniversidad, email, telefono, password, placa, cupos, marca, modelo } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({
      nombre,
      apellido,
      idUniversidad,
      email,
      telefono,
      password: hashedPassword,
      // Campos del carro inicializados
      placa: placa || "",
      cupos: cupos || 0,
      marca: marca || "",
      modelo: modelo || ""
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 🔹 Login de usuario (no cambia)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 🔹 Obtener usuario por email (no cambia)
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 🔹 Actualizar usuario por email (aquí agregamos los campos del carro)
export const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { nombre, apellido, idUniversidad, telefono, password, placa, cupos, marca, modelo } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Mantener lo antiguo
    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (idUniversidad) user.idUniversidad = idUniversidad;
    if (telefono) user.telefono = telefono;
    if (password) user.password = await bcrypt.hash(password, 10);

    // 🔹 Campos del carro
    if (placa) user.placa = placa;
    if (cupos !== undefined) user.cupos = cupos;
    if (marca) user.marca = marca;
    if (modelo) user.modelo = modelo;

    await user.save();

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};