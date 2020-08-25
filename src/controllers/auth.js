const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models')
const router = express.Router();
const saltRounds = 10

// Alterar Futuramente para POST | Rotas de login e cadastro sao realizadas em post
router.get('/login', (req, res) => {
  return res.json('Login')
});

router.get('/cadastro', async (req, res) => {
  const email = 'vncsmntr@outlook.com';
  const password = 'root'
  
  const hash = bcrypt.hashSync(password, saltRounds)

  const result = await Account.create({email, password: hash});

  return res.json(result)
});

module.exports = router;