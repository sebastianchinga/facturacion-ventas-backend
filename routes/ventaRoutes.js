import express from 'express';
import { crear } from '../controllers/ventaController.js';

const router = express.Router();

router.post('/', crear);

export default router