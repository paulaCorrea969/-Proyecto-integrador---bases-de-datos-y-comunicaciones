import db from '../config/db.js';

// Obtener todos los clientes
export const getAllClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

// Crear un nuevo cliente
export const createCliente = async (cliente) => {
  const { nombre, correo, telefono } = cliente;
  const [result] = await db.query(
    'INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)',
    [nombre, correo, telefono]
  );
  return { id: result.insertId, ...cliente };
};

// Actualizar un cliente
export const updateCliente = async (id, cliente) => {
  const { nombre, correo, telefono } = cliente;
  await db.query(
    'UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?',
    [nombre, correo, telefono, id]
  );
  return { id, ...cliente };
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};
