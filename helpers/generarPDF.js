import PDFDocument from "pdfkit-table";

const generarPDF = (venta, dataCallback, endCallback) => {
    const doc = new PDFDocument();

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    // --- TÍTULO ---
    doc.fontSize(25).text('Factura de Venta', { align: 'center' });
    doc.moveDown();

    // --- DATOS DEL CLIENTE ---
    doc.fontSize(12).text(`Cliente: ${venta.nombre}`);
    doc.text(`Fecha: ${venta.fecha}`);
    doc.moveDown();

    // --- TABLA CABECERA ---
    doc.fontSize(14).text('Detalle de productos:', { underline: true });
    doc.moveDown(0.5);

    const tableTop = doc.y;
    const itemSpacing = 25;

    // Cabeceras
    doc.font('Helvetica-Bold');
    doc.text('Producto', 50, tableTop, { width: 220 });
    doc.text('Precio', 270, tableTop, { width: 100, align: 'right' });
    doc.text('Cantidad', 370, tableTop, { width: 100, align: 'right' });
    doc.text('Subtotal', 470, tableTop, { width: 100, align: 'right' });
    doc.moveDown();

    // --- TABLA FILAS ---
    doc.font('Helvetica');
    let y = tableTop + 20;

    const productos = venta.productos;

    // Iterando
    for (const producto of productos) {
        doc.text(`${producto.nombre}`, 50, y, { width: 220 });
        doc.text(`S/ ${producto.precio_unitario}`, 270, y, {width: 100, align: 'right'});
        doc.text(`${producto.cantidad}`, 370, y, {width: 100, align: 'right'});
        doc.text(`S/ ${producto.subtotal}`, 470, y, {width: 100, align: 'right'});
        y += itemSpacing;
    }

    // --- TOTAL ---

    doc.moveTo(50, y + 10).lineTo(550, y + 10).stroke();
    doc.font('Helvetica-Bold');
    doc.text('Total:', 370, y + 20, { width: 100, align: 'right' });
    doc.text(`S/ ${venta.total}`, 470, y + 20, { width: 100, align: 'right' });

    doc.end()
}

export default generarPDF;