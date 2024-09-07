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

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
