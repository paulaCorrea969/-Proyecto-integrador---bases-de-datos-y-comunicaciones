import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ mensaje: 'Lista de clientes' });
});

export default router;
