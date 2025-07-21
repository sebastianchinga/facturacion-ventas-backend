import express from 'express';
import generarPDF from '../helpers/generarPDF.js';
import DetalleVenta from '../models/DetalleVenta.js';
import Producto from '../models/Producto.js';
import Venta from '../models/Venta.js';

const router = express.Router();

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    const detalleVentas = await DetalleVenta.findAll({
        where: { venta_id: id },
        include: [
            {
                model: Venta,
                as: 'venta',
                attributes: ['nombre', 'fecha', 'total']
            },

            {
                model: Producto,
                as: 'producto',
                attributes: ['nombre']
            }
        ]
    })
    const venta = detalleVentas[0].venta;

    const ventaFormateada = {
        nombre: venta.nombre,
        fecha: venta.fecha,
        total: venta.total,
        productos: detalleVentas.map(detalle => ({
            nombre: detalle.producto.nombre,
            precio_unitario: parseFloat(detalle.precio_unitario),
            cantidad: detalle.cantidad,
            subtotal: parseFloat(detalle.subtotal)
        }))
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=factura.pdf");

    generarPDF(
        ventaFormateada,
        (data) => res.write(data),
        () => res.end()
    );

})

export default router