import ViajeRepository from "../repository/viaje-repository.js";

class ViajeService {
        async crearViaje(data) {
            try {
                const nuevoViaje = await ViajeRepository.crearViaje(data);
                return nuevoViaje;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async obtenerViajes() {
            try {
                const viajes = await ViajeRepository.obtenerViajes();
                if (!viajes) throw new Error('No hay viajes disponibles');
                return viajes;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async obtenerViajeId(vId) {
            try {
                const viajeId = await ViajeRepository.obtenerViajeId(vId);
                if (!vId) throw new Error('No se encontró ningún ID');
                return viajeId;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async actualizarViaje(vId, data, options) {
            try {
                const viajeActualizado = await ViajeRepository.actualizarViaje(vId, data, options);
                if (!vId) throw new Error('No se encontró ningún Error');
                return viajeActualizado;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async borrarViaje(vId) {
            try {
                const viajeBorrado = await ViajeRepository.borrarViaje(vId);
                if (!vId) throw new Error('No se encontró ningún Error');
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
}

export default new ViajeService();