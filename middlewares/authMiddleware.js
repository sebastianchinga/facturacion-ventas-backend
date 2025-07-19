import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';
dotenv.config();

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.PALABRA_SECRETA);
            req.usuario = await Usuario.findOne({ where: { id: decoded.id } });
            return next();
        } catch (error) {
            return res.status(400).json({ msg: 'Token inválido' })
        }
    }

    if (!token) {
        return res.status(400).json({ msg: 'Token inexistente' })
    }

    next()
}

export default checkAuth