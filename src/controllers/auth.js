const express = require("express");
const bcrypt = require("bcrypt");
const { Account } = require("../models");
const router = express.Router();
const saltRounds = 10;

// Alterar Futuramente para POST | Rotas de login e cadastro sao realizadas em post
router.get("/login", (req, res) => {
  return res.json("Login");
});

router.get("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });
  if (account) return res.jsonBadRequest(null, "Esta conta já existe");
  const hash = bcrypt.hashSync(password, saltRounds);
  const newAccount = await Account.create({ email, password: hash });

  return res.jsonOK(newAccount);
});

module.exports = router;
