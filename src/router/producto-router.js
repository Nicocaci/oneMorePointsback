import ProductoController from "../controller/producto-controller.js";
import express from "express";
import multer from "multer";

const router = express.Router();

// Configuración básica: guarda las imágenes en /uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // carpeta donde guardar las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post(
    "/crear-producto",
    upload.single("imagen"),
    (req, res) => ProductoController.crearProducto(req, res)
);
router.get("/", ProductoController.obtenerProductos);
router.get("/:prodId", ProductoController.obtenerUnProducto);
router.delete("/:prodId", ProductoController.borrarProducto);
router.put("/:prodId", ProductoController.actualizarProducto);

export default router;

