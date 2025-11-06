import express from "express";
import ViajeController from "../controller/viaje-controller.js";

const router = express.Router();

router.post("/crear-viaje", ViajeController.crearViaje);
router.get("/", ViajeController.obtenerViajes);
router.get("/:vId", ViajeController.obtenerViajeId);
router.put("/:vId", ViajeController.actualizarViaje);
router.delete("/:vId", ViajeController.borrarViaje);

export default router;