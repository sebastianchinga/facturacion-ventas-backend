import express from 'express';
import { confirmar, login, registro } from '../controllers/usuarioController.js';

const router = express.Router();


router.post('/', login)
router.post('/registrar', registro);
router.get('/confirmar/:token', confirmar)

export default router;