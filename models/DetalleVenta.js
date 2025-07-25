import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Venta from "./Venta.js";
import Producto from "./Producto.js";

const DetalleVenta = db.define('detalle_venta', {
    venta_id: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: Venta
        }
    },
    productos_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    subtotal: {
        type: DataTypes.DECIMAL
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    precio_unitario: {
        type: DataTypes.DECIMAL
    }
}, {
    timestamps: false,
})

export default DetalleVenta;