import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usuarioRouter from "./router/usuario-router.js";
import productoRouter from "./router/producto-router.js";
import viajeRouter from "./router/viaje-router.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = [
  "http://localhost:5173",
  "https://onemorepointsfront-production.up.railway.app",
];

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado con MongoDB"))
  .catch(() => console.log("Error al conectar con MongoDB"));

// 🔹 ES Modules: __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (por ejemplo, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS no permitido por este dominio"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Carpeta uploads en la raíz
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.get("/", (req, res) => res.send("Estamos On"));
app.use("/api/usuario", usuarioRouter);
app.use("/api/producto", productoRouter);
app.use("/api/viaje", viajeRouter);

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
