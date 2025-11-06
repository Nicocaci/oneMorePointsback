import ViajeModel from "./models/viaje-model.js";

class ViajeDao {
    async crearViaje(data) {
        try {
            const nuevoViaje = new ViajeModel(data);
            await nuevoViaje.save();
            return nuevoViaje;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
async obteneViajes() {
    try {
        const usuarios = await ViajeModel.find().populate('pasajeros')
        return usuarios;
    } catch (error) {
        throw new Error(`Error interno del DAO: ${error.message}`);
    }
}

    async obtenerViajeId(vId) {
        try {
            const viaje = await ViajeModel.findById(vId);
            if (!vId) throw new Error("No se encontro ningun viaje con ese ID");
            return viaje;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async actualizarViaje(vId, data, options = {new : true}) {
        try {
            const viajeActualizado = await ViajeModel.findByIdAndUpdate(vId, data, options);
            if (!vId) throw new Error("No se encontró ningun viaje con ese ID");
            return viajeActualizado;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async borrarViaje(vId) {
        try {
            const viajeEliminado = await ViajeModel.findByIdAndDelete(vId);
            if (!vId) throw new Error("No se encontró ningun viaje con ese ID");
            return viajeEliminado;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
}

export default new ViajeDao();