import express from 'express';
import { listar } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listar);

export default router;