import db from '../config/db.js';

export const getAllClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};
export const createCliente = async (cliente) => {
  const { nombre, email, telefono } = cliente;
  const [result] = await db.query(
    'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
    [nombre, email, telefono]
  );
  return { id: result.insertId, ...cliente };
};

export const updateCliente = async (id, cliente) => {
  const { nombre, email, telefono } = cliente;
  await db.query(
    'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
    [nombre, email, telefono, id]
  );
  return { id, ...cliente };
};

export const deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};
