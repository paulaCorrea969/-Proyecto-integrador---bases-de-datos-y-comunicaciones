import db from '../db/db.js';

export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

