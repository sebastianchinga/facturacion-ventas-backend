import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";
import confirmarCuenta from '../helpers/confirmarCuenta.js';
import generarJWT from '../helpers/generarJWT.js';
import generarToken from '../helpers/generarToken.js';
import recuperarCuenta from '../helpers/recuperarCuenta.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error('Confirma tu cuenta');
        return res.status(400).json({ msg: error.message })
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    } else {
        const error = new Error('Password incorrecto');
        return res.status(400).json({ msg: error.message })
    }

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
        res.json({ msg: 'Cuenta confirmada' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const recuperar = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('Esta cuenta no existe');
        return res.status(400).json({ msg: error.message })
    }

    usuario.token = generarToken();
    try {
        await recuperarCuenta(usuario);
        await usuario.save();
        res.json({ msg: 'Te hemos enviado instrucciones a tu e-mail' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const validar = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Este token es inválido');
        return res.status(400).json({ msg: error.message })
    }

    res.json(usuario);
}

export const cambiarPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Este token es inválido');
        return res.status(400).json({ msg: error.message })
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    try {
        await usuario.save();
        res.json({msg: 'Password modificado'});
    } catch (error) {
        res.status(400).json(error);
    }


}

export const perfil = async (req, res) => {
    const {usuario} = req;
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
    })
    
}