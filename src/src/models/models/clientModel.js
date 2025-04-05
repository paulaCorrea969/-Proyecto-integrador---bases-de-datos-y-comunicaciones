import db from '../config/db.js';

export const getAllClients = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM clientes', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getClientById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

export const createClient = (cliente) => {
  const { nombre, email, telefono } = cliente;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, ...cliente });
      }
    );
  });
};

export const updateClient = (id, cliente) => {
  const { nombre, email, telefono } = cliente;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre, email, telefono, id],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id, ...cliente });
      }
    );
  });
};

export const deleteClient = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve({ message: 'Cliente eliminado' });
    });
  });
};
