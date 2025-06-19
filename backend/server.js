const dotenv = require('dotenv');
dotenv.config(); // ✅ Cargar variables del archivo .env


console.log('🌐 URI cargada desde .env:', process.env.MONGO_URI);


console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const parquesRouter = require('../routes/parques');

app.use(cors());
app.use(express.json());
app.use('/api/parques', parquesRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));
