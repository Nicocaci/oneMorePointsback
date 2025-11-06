import UsuarioService from '../service/usuario-service.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/jsonwebtoken.js';

class UsuarioController {
    async registro(req, res) {
        try {
            const { nombre, apellido, dni, localidad, email, contraseña, viajes, puntos, rol } = req.body;

            const existeUsuario = await UsuarioService.obtenerUnUsuario({ email });
            if (existeUsuario) {
                return res.status(400).json({ message: 'El email ya esta registrado' })
            }
            const hashContraseña = bcrypt.hashSync(contraseña, 10);

            const nuevoUsuario = await UsuarioService.crearUsuario({
                nombre,
                apellido,
                rol,
                dni,
                localidad,
                email,
                contraseña: hashContraseña,
                viajes,
                puntos
            });


            return res.status(200).json({
                message: 'Usuario registrado con exito',
                usuario: nuevoUsuario,
            }
            )
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { email, contraseña } = req.body;
            const usuario = await UsuarioService.obtenerUnUsuario({ email });
            if (!usuario) {
                return res.status(400).json({
                    message: 'No se encuentra ningun usuario registrado con ese email'
                })
            };
            const ok = await bcrypt.compare(contraseña, usuario.contraseña)
            if (!ok) {
                res.status(401).json({ message: 'Contraseña incorrecta' })
            }

            const token = generateToken({
                _id: usuario._id,
                email: usuario.email,
                rol: usuario.rol
            })

            res.cookie('access_token', token, {
                httpOnly: false,
                secure: true,         // ⬅️ false en localhost
                sameSite: 'none',       // ⬅️ Lax funciona bien en la mayoría de los casos sin requerir HTTPS
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
                domain: ".railway.app"
            });

            return res.status(200).json({
                message: 'Login correcto',
                usuario: {
                    _id: usuario._id,
                    email: usuario.email,
                    rol: usuario.rol
                },
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error de Login' + error.message });
        }
    }

    async cerrarSesion(req, res) {
        res.clearCookie('access_token', {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            path: "/",
            domain: ".railway.app"
        });
        res.status(200).json({ message: "LogOut exitoso" });
    }

    async eliminarUsuario(req, res) {
        try {
            const uId = req.params.uId;
            if (!uId) {
                return res.status(404).json({ message: "No se encontro ningun usuario para eliminar" })
            };
            const usuarioEliminado = await UsuarioService.eliminarUsuario(uId);
            if (!usuarioEliminado) {
                return res.status(404).json({ message: "No se encontro ningun usuario para eliminar" })
            }
            return res.status(200).json({ message: "Usuario eliminado con exito" });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async actualizarUsuario(req, res) {
        try {
            const uId = req.params.uId;
            const data = req.body;
            if (!uId) {
                return res.status(404).json({ message: "No se encontro ningun usuario para eliminar" })
            };
            const usuarioActualizado = await UsuarioService.actualizarUsuario(uId, data);
            if (!usuarioActualizado) {
                return res.stauts(404).json({ message: "Error al actualizar Usuario" })
            };
            return res.status(200).json({
                message: "Usuario actualizado con exito",
                usuario: usuarioActualizado
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario: ' + error.message });
        }
    }

    async obtenerUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.obtenerUsuarios();
            res.status(200).json(usuarios)
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios" })
        }
    }

    async obtenerUsuarioPorId(req, res) {
        try {
            const uId = req.params.uId;
            if (!uId) {
                return res.status(404).json({ message: "No se encontro ningun usuario para eliminar" })
            };

            const usuario = await UsuarioService.obtenerUsuarioPorId(uId);
            return res.status(200).json(usuario)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }

    async obtenerUsuarioPorEmail(req, res) {
        try {
            const {email} = req.query;
            if (!email) {
                return res.status(404).json({ message: "No se encontro ningún usuario con ese email" })
            }
            const usuario = await UsuarioService.obtenerUsuarioPorEmail(email);
            return res.status(200).json(usuario.viajes);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

export default new UsuarioController(); 