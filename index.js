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

// Ruta para crear un nuevo estudiante
app.post("/estudiantes", (req, res) => {
  const { nombre, edad } = req.body; // Datos proporcionados por el cliente

  // Validamos que los datos obligatorios estén presentes
  if (!nombre || !edad) {
    return res
      .status(400)
      .json({ error: "El nombre y la edad son requeridos" });
  }

  // Creamos el nuevo estudiante
  const nuevoEstudiante = {
    id: estudiantes.length + 1, // Generamos un nuevo ID de forma incremental
    nombre,
    edad,
  };

  // Ruta para actualizar un estudiante
  app.put("/estudiante/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;

    const estudiante = estudiantes.find((e) => e.id === parseInt(id));

    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Actualizamos los datos del estudiante
    estudiante.nombre = nombre || estudiante.nombre;
    estudiante.edad = edad || estudiante.edad;

    res.json({
      mensaje: `Estudiante con ID: ${id} actualizado exitosamente`,
      estudiante,
    });
  });

  // Agregamos el nuevo estudiante al array de estudiantes
  estudiantes.push(nuevoEstudiante);

  // Devolvemos una respuesta exitosa con el estudiante creado
  res.status(201).json({
    mensaje: "Estudiante creado exitosamente",
    estudiante: nuevoEstudiante,
  });
});

// Ruta para eliminar un estudiante
app.delete("/estudiante/:id", (req, res) => {
  const { id } = req.params;
  const indice = estudiantes.findIndex((e) => e.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  // Eliminamos el estudiante del array
  estudiantes.splice(indice, 1);

  res.json({
    mensaje: `Estudiante con ID: ${id} eliminado exitosamente`,
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
