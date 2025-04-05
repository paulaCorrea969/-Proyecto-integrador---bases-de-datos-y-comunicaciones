import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes); // Aquí agregas la ruta

export default app;
