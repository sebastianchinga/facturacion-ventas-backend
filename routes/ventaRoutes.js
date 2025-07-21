import express from 'express';
import { crear, listar } from '../controllers/ventaController.js';

const router = express.Router();

router.post('/', crear);

router.get('/', listar);


export default router