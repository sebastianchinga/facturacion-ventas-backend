import express from 'express';
import { cambiarPassword, confirmar, login, recuperar, registro, validar } from '../controllers/usuarioController.js';

const router = express.Router();


router.post('/', login);
router.post('/registrar', registro);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', recuperar);
router.route('/olvide-password/:token').get(validar).post(cambiarPassword);

export default router;