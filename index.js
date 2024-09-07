// Cargar variables de entorno
require("dotenv").config();

// Importamos el módulo de Express
const express = require("express");

// Módulo para manejar rutas de archivos
const path = require("path");

// Creamos una instancia de la aplicación
const app = express();

// Definimos el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Simulamos una base de datos con listas de estudiantes y cursos
const estudiantes = [
  { id: 1, nombre: "Juan Pérez", edad: 20 },
  { id: 2, nombre: "Ana Gómez", edad: 22 },
];

const cursos = [
  { id: 1, nombre: "Curso de Node.js", duracion: "4 semanas" },
  { id: 2, nombre: "Curso de React", duracion: "6 semanas" },
];

// Creamos una ruta de ejemplo
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Ruta estudiantes
app.get("/estudiantes", (req, res) => {
  res.json({ mensaje: "Lista de estudiantes", estudiantes });
});

// Ruta estudiantes por ID
app.get("/estudiante/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parámetro 'id' de la URL
  const estudiante = estudiantes.find((e) => e.id === parseInt(id)); // Buscamos el estudiante por ID

  if (!estudiante) {
    // Si no se encuentra el estudiante, devolvemos un error 404
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  // Si se encuentra el estudiante, devolvemos la información
  res.json({
    mensaje: `Información del estudiante con ID: ${id}`,
    estudiante: estudiante,
  });
});

// Ruta cursos
app.get("/cursos", (req, res) => {
  res.json({ mensaje: "Lista de cursos", cursos });
});

// Ruta cursos por ID
app.get("/curso/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parámetro 'id' de la URL
  const curso = cursos.find((e) => e.id === parseInt(id)); // Buscamos el curso por ID

  if (!curso) {
    // Si no se encuentra el curso, devolvemos un error 404
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  // Si se encuentra el curso, devolvemos la información
  res.json({
    mensaje: `Información del curso con ID: ${id}`,
    curso: curso,
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
