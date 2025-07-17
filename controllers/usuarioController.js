import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";
import confirmarCuenta from '../helpers/confirmarCuenta.js';

export const login = async (req, res) => {
    res.json({ msg: 'Hola' })
}

export const registro = async (req, res) => {
    const { email } = req.body;
    const usuarioFind = await Usuario.findOne({ where: { email } });

    if (usuarioFind) {
        const error = new Error('Este usuario ya se registró');
        return res.status(400).json({ msg: error.message })
    }

    const usuario = new Usuario(req.body);
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt)

    try {
        await confirmarCuenta(usuario);
        await usuario.save();
        res.json({ msg: 'Revisa tu e-mail para confirmar tu cuenta' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token inválido');
        return res.status(400).json({ msg: error.message })
    }

    usuario.confirmado = true;
    usuario.token = null;

    try {
        await usuario.save();
        res.json({msg: 'Cuenta confirmada'})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}