import UsuarioDAO from "../dao/usuario-dao.js";

class UsuarioRepository {
    async crearUsuario(dataU) {
        try {
            const nuevoUsuario = await UsuarioDAO.crearUsuario(dataU);
            return nuevoUsuario;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async obtenerUsuarios() {
        try {
            const usuarios = await UsuarioDAO.obtenerUsuarios();
            return usuarios;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async obtenerUsuarioPorId(uId) {
        try {
            const usuario = await UsuarioDAO.obtenerUsuarioPorId(uId);
            if (!usuario) throw new Error("No se encontro ningun usuario con ese ID");
            return usuario;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async obtenerUnUsuario(query) {
        try {
            const usuario = await UsuarioDAO.obtenerUnUsuario(query);
            return usuario;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }

    async obtenerUsuarioPorEmail(email) {
        try {
            const usuario = await UsuarioDAO.obtenerUsuarioPorEmail(email);
            return usuario;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async actualizarUsuario(uId, data) {
        try {
            const usuarioActualizado = await UsuarioDAO.actualizarUsuario(uId, data)
            if (!uId) throw new Error("No se encontro ningun usuario para actualizar.");
            return usuarioActualizado;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
    async eliminarUsuario(uId) {
        try {
            const usuario = await UsuarioDAO.eliminarUsuario(uId);
            if (!usuario) throw new Error("No se encontro ningun usuario para eliminar.");
            return usuario;
        } catch (error) {
            error.message = `Error interno del Repository: ${error.message}`;
            throw error;
        }
    }
}


export default new UsuarioRepository();