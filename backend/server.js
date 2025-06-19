require('dotenv').config();

console.log('🌐 URI cargada desde .env:', process.env.MONGO_URI);


console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const parquesRouter = require('./routes/parques');

app.use(cors());
app.use(express.json());
app.use('/api/parques', parquesRouter);

mongoose.connect('mongodb://localhost:27017/parques_colombia', {

  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));
}).catch(err => console.error('❌ Error conectando a MongoDB:', err));


