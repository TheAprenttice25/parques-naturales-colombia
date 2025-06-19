const mongoose = require('mongoose');

const parqueSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: {
    pais: String,
    municipio: String
  },
  extension: String,
  atracciones: [String]
});

module.exports = mongoose.model('Parque', parqueSchema);
