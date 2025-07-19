import express from 'express';
import { cambiarPassword, confirmar, login, perfil, recuperar, registro, validar } from '../controllers/usuarioController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', login);
router.post('/registrar', registro);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', recuperar);
router.route('/olvide-password/:token').get(validar).post(cambiarPassword);

router.get('/perfil', checkAuth, perfil)

export default router;