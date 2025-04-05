import * as ClientModel from '../models/clientModel.js';

export const getClients = async (req, res) => {
  try {
    const clientes = await ClientModel.getAllClients();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const addClient = async (req, res) => {
  try {
    const nuevoCliente = req.body;
    const clienteCreado = await ClientModel.createClient(nuevoCliente);
    res.status(201).json(clienteCreado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};
