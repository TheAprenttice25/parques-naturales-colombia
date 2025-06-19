const express = require('express');
const router = express.Router();
const Parque = require('../models/Parque');

router.get('/', async (req, res) => {
  const parques = await Parque.find();
  res.json(parques);
});

router.post('/', async (req, res) => {
  const nuevo = new Parque(req.body);
  await nuevo.save();
  res.json(nuevo);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Parque.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  await Parque.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Parque eliminado' });
});

module.exports = router;
