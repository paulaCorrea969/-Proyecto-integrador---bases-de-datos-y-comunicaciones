import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

