import axios from 'axios';

const API_URL = 'http://localhost:3003/api/clientes';

export const obtenerClientes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearCliente = async (datos) => {
  const response = await axios.post(API_URL, datos);
  return response.data;
};
