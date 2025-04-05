const API_URL = "http://localhost:3000/productos";

async function cargarProductos() {
  const lista = document.getElementById("lista-productos");

  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();

    productos.forEach((producto) => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - $${producto.precio} - Stock: ${producto.stock}`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    lista.innerHTML = "<li>Error al cargar los productos</li>";
  }
}

cargarProductos();
