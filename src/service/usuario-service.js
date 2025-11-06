import UsuarioRepository from "../repository/usuario-repository.js";

class UsuarioService {
    async crearUsuario(dataU) {
        try {
            const nuevoUsuario = await UsuarioRepository.crearUsuario(dataU);
            return nuevoUsuario;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async obtenerUsuarios() {
        try {
            const usuarios = await UsuarioRepository.obtenerUsuarios();
            return usuarios;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async obtenerUsuarioPorId(uId) {
        try {
            const usuario = await UsuarioRepository.obtenerUsuarioPorId(uId);
            if (!usuario) throw new Error("No se encontró ningún usuario con ese ID");
            return usuario;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async obtenerUnUsuario(query) {
        try {
            const usuario = await UsuarioRepository.obtenerUnUsuario(query);
            return usuario;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async obtenerUsuarioPorEmail(email) {
        try {
            const usuario = await UsuarioRepository.obtenerUsuarioPorEmail(email);
            return usuario;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async actualizarUsuario(uId, data) {
        try {
            const usuarioActualizado = await UsuarioRepository.actualizarUsuario(uId, data);
            if (!usuarioActualizado) throw new Error("No se encontró ningún usuario para actualizar.");
            return usuarioActualizado;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }

    async eliminarUsuario(uId) {
        try {
            const usuario = await UsuarioRepository.eliminarUsuario(uId);
            if (!usuario) throw new Error("No se encontró ningún usuario para eliminar.");
            return usuario;
        } catch (error) {
            throw new Error(`Error interno del Service ${error.message}`);
        }
    }
}

export default new UsuarioService();
