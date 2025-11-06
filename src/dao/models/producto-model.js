import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true
        },
        puntos: {
            type: Number,
            required: true
        },
        imagen:{
            type:String,
            required: true
        }

})

const ProductoModel = mongoose.model('producto', productoSchema);

export default  ProductoModel;