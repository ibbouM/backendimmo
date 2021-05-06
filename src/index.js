// Importation des modules
const express = require("express");
const mongoose = require("mongoose");

const housingRouter = require("./routers/housings");
const customerRouter = require("./routers/customers");
const mailgunRouter = require("./routers/mailgun");

const cors = require("cors");
require("dotenv").config();

console.log(process.env.CONNECTION_URI, process.env.PORT);

// Connexion a la bdd atlas
const optionsMongoose = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.CONNECTION_URI, optionsMongoose)
  .then(() => {
    console.log("Connexion a Atlas réussi");
  })
  .catch((error) => {
    console.log("Connexion a Atlas échoué", error);
  });

// Initialisation des variables
const port = process.env.PORT || 8080;

// Création du server
const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//Definition des middleware

app.use(express.json());
app.use(cors());

app.use(housingRouter);
app.use(customerRouter);
app.use(mailgunRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
