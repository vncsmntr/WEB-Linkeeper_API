// ** Importações
const express = require("express");
const authController = require("./controllers/auth");
const linkController = require('./controllers/link')
const db = require("./models");
const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");
// ** app se refere ao express
const app = express();

app.use(response);
app.use(checkJwt);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authController);
app.use('/link', linkController)

app.get("/", (req, res) => {
    return res.json("API Online");
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server Online");
    });
});