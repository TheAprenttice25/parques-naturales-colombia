const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema básico del parque
const ParqueSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: {
    pais: String,
    municipio: String
  },
  extension: String,
  atracciones: [String]
});

const Parque = mongoose.model('Parque', ParqueSchema);

// GET - Obtener todos los parques
router.get('/', async (req, res) => {
  const parques = await Parque.find();
  res.json(parques);
});

// POST - Crear nuevo parque
router.post('/', async (req, res) => {
  const parque = new Parque(req.body);
  await parque.save();
  res.json(parque);
});

// PUT - Actualizar parque
router.put('/:id', async (req, res) => {
  await Parque.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Parque actualizado' });
});

// DELETE - Eliminar parque
router.delete('/:id', async (req, res) => {
  await Parque.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Parque eliminado' });
});

module.exports = router;

