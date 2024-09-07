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

// Ruta para crear un nuevo curso
app.post("/cursos", (req, res) => {
  const { nombre, duracion } = req.body;

  if (!nombre || !duracion) {
    return res
      .status(400)
      .json({ error: "El nombre y la duración son requeridos" });
  }

  const nuevoCurso = {
    id: cursos.length + 1,
    nombre,
    duracion,
  };

  cursos.push(nuevoCurso);

  res.status(201).json({
    mensaje: "Curso creado exitosamente",
    curso: nuevoCurso,
  });
});

// Ruta para actualizar un curso
app.put("/curso/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, duracion } = req.body;

  const curso = cursos.find((c) => c.id === parseInt(id));

  if (!curso) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  curso.nombre = nombre || curso.nombre;
  curso.duracion = duracion || curso.duracion;

  res.json({
    mensaje: `Curso con ID: ${id} actualizado exitosamente`,
    curso,
  });
});

// Ruta para eliminar un curso
app.delete("/curso/:id", (req, res) => {
  const { id } = req.params;
  const indice = cursos.findIndex((c) => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  cursos.splice(indice, 1);

  res.json({
    mensaje: `Curso con ID: ${id} eliminado exitosamente`,
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
