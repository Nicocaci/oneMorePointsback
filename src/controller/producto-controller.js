import ProductoService from "../service/producto-service.js";


class ProductoController {
    async crearProducto(req, res) {
        try {
            const { nombre, puntos } = req.body;

            // si subiste un archivo, Multer lo pone en req.file
            let imagen = null;
            if (req.file) {
                imagen = req.file.filename; // o la ruta completa: req.file.path
            }

            const nuevoProducto = await ProductoService.crearProducto({
                nombre,
                puntos,
                imagen,
            })
            return res.status(200).json({
                message: "Producto creado con éxito",
                producto: nuevoProducto,
            });
        } catch (error) {
            console.error(error);
        }
    }
    async obtenerProductos(req, res) {
        try {
            const productos = await ProductoService.obtenerProductos();
            return res.status(200).json({ productos: productos })
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }

    async obtenerUnProducto(req, res) {
        try {
            const prodId = req.params.prodId;
            if (!prodId) {
                return res.status(404).json({ message: "No se encontro ningun producto con ese ID" })
            };
            const producto = await ProductoService.obtenerUnProducto(prodId);
            return res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }
    async borrarProducto(req, res) {
        try {
            const prodId = req.params.prodId;
            if (!prodId) {
                return res.status(404).json({ message: "No se encontro nigun producto con ese ID" });
            };
            const productoEliminado = await ProductoService.borrarProducto(prodId);
            return res.status(200).json(productoEliminado);
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }
    async actualizarProducto(req, res) {
        try {
            const data = req.body;
            const prodId = req.params.prodId;
            if (!prodId) {
                return res.status(404).json({ message: "No se encontro nigun producto con ese ID" });
            };
            const productoActualizado = await ProductoService.actualizarProducto(prodId, data);
            return res.status(200).json({
                message: "Producto Actualizado",
                producto: productoActualizado
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error interno del controlador' + error.message
            })
        }
    }
}

export default new ProductoController();
