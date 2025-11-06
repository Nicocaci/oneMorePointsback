import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    dni: {
        type: Number,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    contraseña: {
        type: String,
        required: true
    },
    puntos: {
        type: Number
    },
    viajes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'viaje', default: [] }],
    comprasHechas: { type: mongoose.Schema.Types.ObjectId, ref: 'compras' },
})

const UsuarioModel = mongoose.model('usuario', usuarioSchema);

export default UsuarioModel;