const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");

// Rutas de estudiantes
router.get("/", estudianteController.obtenerEstudiantes);
router.get("/:id", estudianteController.obtenerEstudiantePorId);
router.post("/", estudianteController.crearEstudiante);
router.put("/:id", estudianteController.actualizarEstudiante);
router.delete("/:id", estudianteController.eliminarEstudiante);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;
