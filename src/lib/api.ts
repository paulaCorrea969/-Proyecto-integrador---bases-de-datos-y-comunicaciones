import { useState, useEffect } from 'react'
import api from '@/lib/api' // importa tu instancia Axios
// (importaciones de componentes UI)

type Order = {
  id: string
  client: string
  date: string
  status: string
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [newOrder, setNewOrder] = useState({ id: '', client: '', date: '', status: 'pendiente' })
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')

  // Obtener pedidos desde backend
  const fetchOrders = async () => {
    try {
      const res = await api.get('/clientes') // ajusta la ruta si usas otra
      setOrders(res.data)
    } catch (err) {
      console.error('Error al obtener pedidos', err)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewOrder({ ...newOrder, [name]: value })
  }

  // Guardar pedido en el backend
  const addOrder = async () => {
    if (newOrder.id && newOrder.client && newOrder.date) {
      try {
        const res = await api.post('/clientes', newOrder)
        setOrders([...orders, res.data])
        setNewOrder({ id: '', client: '', date: '', status: 'pendiente' })
      } catch (err) {
        console.error('Error al registrar pedido', err)
      }
    }
  }

  // Filtrar y ordenar
  const filteredOrders = orders.filter(order => filterStatus === 'all' || order.status === filterStatus)

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })

  // ... Resto del JSX igual
}

export default OrderManagement
