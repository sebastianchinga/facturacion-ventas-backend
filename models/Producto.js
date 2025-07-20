import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Producto = db.define('productos', {
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
})

export default Producto;