import ViajeDao from "../dao/viaje-dao.js";


class ViajeRepository {
    async crearViaje(data) {
        try {
            const nuevoViaje = await ViajeDao.crearViaje(data);
            return nuevoViaje;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async obtenerViajes() {
        try {
            const viajes = await ViajeDao.obteneViajes();
            if (!viajes) throw new Error('No hay viajes disponibles');
            return viajes;
        } catch (error) {
            error.message = `Error interno del repository: ${error.message}`;
            throw error;
        }
    }
    async obtenerViajeId(vId) {
        try {
            const viajeId = await ViajeDao.obtenerViajeId(vId);
            if (!vId) throw new Error('No se encontró ningún ID');
            return viajeId;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async actualizarViaje(vId, data, options) {
        try {
            const viajeActualizado = await ViajeDao.actualizarViaje(vId, data, options);
            if (!vId) throw new Error('No se encontró ningún Error');
            return viajeActualizado;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async borrarViaje(vId) {
        try {
            const viajeBorrado = await ViajeDao.borrarViaje(vId);
            if (!vId) throw new Error('No se encontró ningún Error');
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
}

export default new ViajeRepository();