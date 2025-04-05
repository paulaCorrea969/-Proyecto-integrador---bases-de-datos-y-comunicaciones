// src/models/productModel.js
const db = require('../config/db');

exports.getAllProducts = (callback) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
