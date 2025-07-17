import { DataTypes } from "sequelize";
import db from "../config/db.js";
import generarToken from "../helpers/generarToken.js";

const Usuario = db.define('usuarios', {
    nombre: {},
    email: {},
    password: {},
    token: {
        type: DataTypes.STRING,
        defaultValue: generarToken
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
})

export default Usuario;