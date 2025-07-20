import DetalleVenta from "../models/DetalleVenta.js";
import Producto from "../models/Producto.js";
import Venta from "../models/Venta.js";

export const crear = async (req, res) => {

    const { cliente, productos, total } = req.body;

    try {
        const venta = new Venta({
            nombre: cliente.nombre,
            dni: cliente.dni,
            email: cliente.email,
            telefono: cliente.telefono,
            total: Number(total)
        })
        const ventaGuardada = await venta.save();

        for (const producto of productos) {
            producto.precio = Number(producto.precio) // Convertimos a numero

            // Creamos un objeto nuevo
            const detalleVenta = new DetalleVenta({
                venta_id: ventaGuardada.id,
                productos_id: producto.id,
                cantidad: producto.cantidad,
                precio_unitario: parseFloat(producto.precio),
                subtotal: producto.precio * producto.cantidad,
            })

            // Guardamos el detalle de la venta
            await detalleVenta.save();

            // Restamos el stock del producto
            producto.stock = producto.stock - producto.cantidad;

            // Excluimos el campo cantidad
            const { cantidad, ...datos } = producto;

            // Finalmente actualizamos
            await Producto.update(datos, {
                where: {id: producto.id}
            })

            // Respondemos con un mensaje
            res.json({msg: 'Venta creada'});

        }

    } catch (error) {
        res.json({ msg: 'Hubo un error al realizar la compra' })
    }
}