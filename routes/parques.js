const express = require('express');
const router = express.Router();

// Ruta GET básica
router.get('/', (req, res) => {
  res.json({ mensaje: 'API de parques funcionando' });
});

module.exports = router;
