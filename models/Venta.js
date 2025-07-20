import db from '../config/db.js'
import { DataTypes } from 'sequelize'

const Venta = db.define('venta', {
    nombre: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    total: {
        type: DataTypes.DECIMAL
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
}, {
    timestamps: false
})

export default Venta;