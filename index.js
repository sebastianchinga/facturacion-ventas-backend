import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';

const app = express();
dotenv.config();

db.authenticate().then(() => console.log('Base de datos conectada')).catch(e => console.log(e))

app.use(express.json());


app.use('/api/usuarios', usuarioRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})