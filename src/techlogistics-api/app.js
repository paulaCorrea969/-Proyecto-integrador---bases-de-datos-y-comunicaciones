import express from 'express';
import clientesRoutes from './src/routes/clientes.routes.js';

const app = express();

app.use(express.json());
app.use('/api/src/routes', clientes.routes.js);

export default app;
