import UsuarioModel from "./models/usuario-model.js";

class UsuarioDAO {
    async crearUsuario(dataU) {
        try {
            const nuevoUsuario = new UsuarioModel(dataU);
            await nuevoUsuario.save();
            return nuevoUsuario.populate('viajes');
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerUsuarios() {
        try {
            const usuarios = await UsuarioModel.find();
            return usuarios;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerUsuarioPorId(uId) {
        try {
            const usuario = await UsuarioModel.findById(uId).populate('viajes');
            if (!usuario) throw new Error("No se encontro ningun usuario con ese ID");
            return usuario;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerUnUsuario(query) {
        try {
            const usuario = await UsuarioModel.findOne(query);
            return usuario; // puede ser null, y eso está bien
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerUsuarioPorEmail(email) {
        try {
            const usuario = await UsuarioModel.findOne({ email }).populate('viajes')
            return usuario;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`
            throw error;
        }
    }

    async actualizarUsuario(uId, data) {
        try {
            const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(uId, data, { new: true });
            if (!usuarioActualizado) throw new Error("No se encontro ningun usuario para actualizar.");
            return usuarioActualizado;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async eliminarUsuario(uId) {
        try {
            const usuario = await UsuarioModel.findByIdAndDelete(uId);
            if (!usuario) throw new Error("No se encontro ningun usuario para eliminar.");
            return usuario;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
}

export default new UsuarioDAO();