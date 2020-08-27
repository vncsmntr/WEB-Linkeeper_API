const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Account } = require("../models");
const { accountSignUp } = require("../validators/account");
const { getMessage } = require("../helpers/messages");

const saltRounds = 10;
// Alterar Futuramente para POST | Rotas de login e cadastro sao realizadas em post
router.get("/login", (req, res) => {
  return res.jsonOK();
});

router.get("/sign-up", accountSignUp, async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });
  if (account)
    return res.jsonBadRequest(null, getMessage("account.signup.email_exists"));
  const hash = bcrypt.hashSync(password, saltRounds);
  const newAccount = await Account.create({ email, password: hash });

  return res.jsonOK(newAccount, getMessage("account.signup.success"));
});

module.exports = router;
