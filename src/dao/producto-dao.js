import ProductoModel from "./models/producto-model.js";

class ProductoDao {
    async crearProducto(data) {
        try {
            const nuevoProducto = new ProductoModel(data);
            await nuevoProducto.save();
            return nuevoProducto;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerProductos() {
        try {
            const productos = await ProductoModel.find();
            if (!productos) throw new Error("No hay ningun producto disponible");
            return productos;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async obtenerUnProducto(prodId) {
        try {
            const producto = await ProductoModel.findById(prodId);
            if (!producto) throw new Error("No se encontro ningun producto con ese ID");
            return producto;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async borrarProducto(prodId) {
        try {
            const borrarProducto = await ProductoModel.findByIdAndDelete(prodId);
            if (!prodId) throw new Error("No se encontro nigunn producto para eliminar");
            return borrarProducto;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
    async actualizarProducto(prodId, data) {
        try {
            const productoActualizado = await ProductoModel.findByIdAndUpdate(prodId, data, { new: true });
            if (!prodId) throw new Error("No se encontro ningun producto con ese Id");
            return productoActualizado;
        } catch (error) {
            error.message = `Error interno del DAO: ${error.message}`;
            throw error;
        }
    }
}

export default new ProductoDao();