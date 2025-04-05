// src/controllers/productController.js
const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(products);
  });
};
