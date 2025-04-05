const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para procesar JSON

// 🔹 Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pauliita4.', // Reemplaza con tu contraseña de MySQL
    database: 'techlogistics'
});

db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos MySQL');
    }
});

// 📌 Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 API de TechLogistics en funcionamiento');
});

// 📌 Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 📌 Obtener todos los productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 📌 Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, email, contraseña, tipo } = req.body;

    if (!nombre || !email || !contraseña || !tipo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO usuarios (nombre, email, contraseña, tipo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, email, contraseña, tipo], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Usuario agregado', id: result.insertId });
    });
});

// 📌 Agregar un nuevo producto
app.post('/productos', (req, res) => {
    console.log('📩 Recibiendo solicitud en /productos:', req.body); // 👀 Debug
    
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !precio || stock === undefined) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nombre, descripcion, precio, stock], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Producto agregado', id: result.insertId });
    });
});



// 📌 Actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        if (!id || !nombre || !precio || stock === undefined) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?';
        const [result] = await db.promise().query(sql, [nombre, descripcion, precio, stock, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado correctamente', id });
    } catch (error) {
        console.error('❌ ERROR DETECTADO:', error);
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
});

// 🔥 Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 API corriendo en http://localhost:${port}`);
});
app._router.stack.forEach((middleware) => {
    if (middleware.route) { 
        console.log(middleware.route.path); 
    }
});
