require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB!'))
  .catch(err => console.error('❌ Erro no MongoDB:', err));

// Debug de conexão
mongoose.connection.on('error', err => {
  console.error('❌ Erro de conexão:', err);
});

// Rotas
const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});