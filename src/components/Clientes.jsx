import { useEffect, useState } from 'react';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/clientes', nuevoCliente);
      alert(res.data.message);
      setClientes([...clientes, { ...nuevoCliente, id: res.data.id }]);
      setNuevoCliente({ nombre: '', correo: '', telefono: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Clientes registrados</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.correo} - {cliente.telefono}
          </li>
        ))}
      </ul>

      <h3>Agregar nuevo cliente</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={nuevoCliente.nombre} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" value={nuevoCliente.correo} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={handleChange} required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default Clientes;
