import UsuarioController from "../controller/usuario-controller.js";
import express from "express";

const router = express.Router();


router.post("/registro", UsuarioController.registro);
router.post("/iniciarsesion", UsuarioController.iniciarSesion);
router.post("/cerrarsesion", UsuarioController.cerrarSesion);
router.delete("/:uId", UsuarioController.eliminarUsuario);
router.put("/:uId", UsuarioController.actualizarUsuario);
router.get("/", UsuarioController.obtenerUsuarios);
router.get("/viajes", UsuarioController.obtenerUsuarioPorEmail);
router.get("/:uId", UsuarioController.obtenerUsuarioPorId);


export default router;

