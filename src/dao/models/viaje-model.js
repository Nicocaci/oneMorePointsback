import mongoose from "mongoose";

const ViajeSchema = new mongoose.Schema({
    destino: {
        type: String,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    pasajeros: [{type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}],
    puntos: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required:true
    }
})

const ViajeModel = mongoose.model('viaje', ViajeSchema)

export default ViajeModel;