const express = require('express');
const router = express.Router();

// Alterar Futuramente para POST | Rotas de login e cadastro sao realizadas em post
router.get('/login', (req, res) => {
  return res.json('Login')
});

router.get('/cadastro', (req, res) => {
  return res.json('Cadastro')
});

module.exports = router;