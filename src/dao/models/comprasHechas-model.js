import mongoose from "mongoose";

const ComprasSchema = new mongoose.Schema({
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'producto'},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    fecha: {type: Date}
})

const ComprasModel = mongoose.model('compras', ComprasSchema);

export default ComprasModel;