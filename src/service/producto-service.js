import ProductoRepository from "../repository/producto-repository.js";

class ProductoService{
            async crearProducto(data) {
            try {
                const nuevoProducto = await ProductoRepository.crearProducto(data);
                return nuevoProducto;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async obtenerProductos(){
            try {
                const productos = await ProductoRepository.obtenerProductos();
                if(!productos) throw new Error("No hay ningun producto disponible");
                return productos;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async obtenerUnProducto(prodId) {
            try {
                const producto = await ProductoRepository.obtenerUnProducto(prodId);
                if(!producto) throw new Error("No se encontro ningun producto con ese ID");
                return producto;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async borrarProducto(prodId) {
            try {
                const borrarProducto = await ProductoRepository.borrarProducto(prodId);
                if(!prodId) throw new Error ("No se encontro nigunn producto para eliminar");
                return borrarProducto;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
        async actualizarProducto (prodId, data) {
            try {
                const productoActualizado = await ProductoRepository.actualizarProducto(prodId, data);
                if(!prodId) throw new Error("No se encontro ningun producto con ese Id");
                return productoActualizado;
            } catch (error) {
                error.message = `Error interno del Service: ${error.message}`;
                throw error;
            }
        }
}

export default new ProductoService();