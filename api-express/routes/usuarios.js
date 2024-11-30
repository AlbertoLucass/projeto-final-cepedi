const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repositories/usuarioRepository');

// Get all users
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioRepository.findAll();
    console.log('Usuarios encontrados:', usuarios);
    res.json({ usuarios });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get user by id
router.get('/:id', async (req, res) => {
  console.log(`Buscando usuario pelo id: ${req.params.id}`); // Debug log
  const user = await usuarioRepository.findById(req.params.id);
  console.log(user); // Debug fetched data
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


// Create a new user
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log do corpo da requisição
    const user = await usuarioRepository.create(req.body);
    console.log('Usuario criado:', user); // Log do usuário criado
    res.json({ user });
  } catch (error) {
    console.error('Erro ao criar usuario:', error); // Log de erro
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update a user
router.put('/:id', (req, res) => {
  const user = usuarioRepository.update(req.params.id, req.body);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
router.delete('/:id', (req, res) => {
  const user = usuarioRepository.remove(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
