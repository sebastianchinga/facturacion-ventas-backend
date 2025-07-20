import Producto from "../models/Producto.js";

export const listar = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(400).json({ msg: 'Hubo un error al traer los productos' });
    }
}