import db from '../config/db.js'

// Obtener todos los clientes
export const getAllClientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' })
  }
}

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' })
  }
}

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  const { nombre, correo, telefono } = req.body
  try {
    const [result] = await db.query('INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)', [nombre, correo, telefono])
    res.status(201).json({ id: result.insertId, nombre, correo, telefono })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' })
  }
}

// Actualizar un cliente existente
export const updateCliente = async (req, res) => {
  const { nombre, correo, telefono } = req.body
  try {
    const [result] = await db.query('UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?', [nombre, correo, telefono, req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json({ id: req.params.id, nombre, correo, telefono })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' })
  }
}

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json({ message: 'Cliente eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' })
  }
}

  
  