import ViajeService from "../service/viaje-service.js";
import UsuarioService from '../service/usuario-service.js';

class ViajeController {
    async crearViaje(req, res) {
        try {
            const { destino, check_in, check_out, pasajeros, precio } = req.body;

            // Validamos el precio
            const precioNumber = Number(precio);
            if (isNaN(precioNumber) || precioNumber <= 0) {
                return res.status(400).json({ message: "El precio debe ser un número mayor a 0" });
            }
            

            //Calcular Puntos (1USD = 1 PUNTOS)
            const puntosNumber = precioNumber;
            // Crear el viaje
            const nuevoViaje = await ViajeService.crearViaje({
                destino,
                check_in,
                check_out,
                pasajeros,
                puntos: puntosNumber,
                precio: precioNumber
            });

            // Asegurarse que pasajeros sea un array
            const pasajerosArray = Array.isArray(pasajeros) ? pasajeros : [pasajeros];

            // Actualizar cada usuario: agregar viaje y sumar puntos
            await Promise.all(
                pasajerosArray.map(id =>
                    UsuarioService.actualizarUsuario(
                        id,
                        {
                            $push: { viajes: nuevoViaje._id },
                            $inc: { puntos: puntosNumber }
                        },
                        { new: true } // devuelve el usuario actualizado
                    )
                )
            );

            // Popular los pasajeros en el viaje
            const viajePopulate = await nuevoViaje.populate('pasajeros');

            return res.status(200).json({
                message: 'Viaje creado con éxito',
                viaje: viajePopulate
            });
        } catch (error) {
            console.error("❌ Error en crearViaje:", error);
            res.status(500).json({
                message: 'Error interno del controlador: ' + error.message
            });
        }
    }

    async obtenerViajes(req, res) {
        try {
            const viajes = await ViajeService.obtenerViajes();
            return res.status(200).json(viajes);
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }
    async obtenerViajeId(req, res) {
        try {
            const vId = req.params.vId;
            if (!vId) {
                return res.status(404).json("No se encontró ningún viaje con ese ID")
            }
            const viajeId = await ViajeService.obtenerViajeId(vId);
            return res.status(200).json(viajeId)
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            });
        }
    }
    async actualizarViaje(req, res) {
        try {
            const vId = req.params.vId;
            const data = req.body;
            if (!vId) {
                return res.status(404).json("No se encontró ningún viaje con ese ID")
            }
            const viajeActualizado = await ViajeService.actualizarViaje(vId, data);
            return res.status(200).json(viajeActualizado);
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            });
        }
    }
    async borrarViaje(req, res) {
        try {
            const vId = req.params.vId;
            if (!vId) {
                return res.status(404).json("No se encontró ningún viaje con ese ID")
            }
            const borrarViaje = await ViajeService.borrarViaje(vId);
            if (!borrarViaje) {
                return res.status(404).json("No se encontró ningún viaje para eliminar")
            }
            return res.status(200).json({ message: "Usuario eliminado con exito" })
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            });
        }
    }
}

export default new ViajeController();