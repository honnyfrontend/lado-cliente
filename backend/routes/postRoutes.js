const express = require('express');
const Post = require('../models/Post');
const upload = require('../config/cloudinary');
const router = express.Router();

// Cria um novo post
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    const newPost = await Post.create({
      description,
      images,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ error: 'Erro ao criar post.' });
  }
});

// Lista todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
});

// Deleta um post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json({ message: 'Post deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar post:', err);
    res.status(500).json({ error: 'Erro ao deletar post.' });
  }
});

module.exports = router;