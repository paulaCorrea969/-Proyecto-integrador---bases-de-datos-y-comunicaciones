import { useEffect, useState } from 'react';
import { obtenerClientes } from '../services/clientesAPI';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerClientes();
      setClientes(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>{JSON.stringify(cliente)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
