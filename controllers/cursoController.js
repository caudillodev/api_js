// Importamos el módulo cursos
const cursos = require("../models/cursoModel");

// Ruta cursos
const obtenerCursos = (req, res) => {
  res.json({ mensaje: "Lista de cursos", cursos });
};

// Ruta cursos por ID
const obtenerCursoPorId = (req, res) => {
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
};

// Ruta para crear un nuevo curso
const crearCurso = (req, res) => {
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
};

// Ruta para actualizar un curso
const actualizarCurso = (req, res) => {
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
};

// Ruta para eliminar un curso
const eliminarCurso = (req, res) => {
  const { id } = req.params;
  const indice = cursos.findIndex((c) => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  cursos.splice(indice, 1);

  res.json({
    mensaje: `Curso con ID: ${id} eliminado exitosamente`,
  });
};

module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
};
