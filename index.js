import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';
import productoRoutes from './routes/productoRoutes.js';

const app = express();
dotenv.config();

db.authenticate().then(() => console.log('Base de datos conectada')).catch(e => console.log(e))

app.use(express.json());

const dominiosPermitidos = [process.env.URL_FRONTEND];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }

}

app.use(cors(corsOptions));


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})