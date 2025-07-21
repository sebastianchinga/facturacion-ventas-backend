import Producto from "./Producto.js";
import Venta from "./Venta.js";
import DetalleVenta from "./DetalleVenta.js";

Venta.hasMany(DetalleVenta, { foreignKey: 'venta_id', as: 'detalles' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id', as: 'venta' });

Producto.hasMany(DetalleVenta, { foreignKey: 'productos_id', as: 'detalles' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'productos_id', as: 'producto' });
