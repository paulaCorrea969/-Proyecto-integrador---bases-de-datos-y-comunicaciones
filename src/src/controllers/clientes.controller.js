// src/controllers/clientes.controller.js
import db from '../config/db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error });
  }
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente', error });
  }
};

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
  const { nombre, correo, telefono } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)',
      [nombre, correo, telefono]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, telefono });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el cliente', error });
  }
};

// Actualizar un cliente existente
export const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?',
      [nombre, correo, telefono, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ id, nombre, correo, telefono });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el cliente', error });
  }
};

// Eliminar un cliente
export const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente', error });
  }
};
