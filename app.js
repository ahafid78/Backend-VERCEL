const express = require("express");
// const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;

// Ne pas oublier l'installation des middlewares (dans le terminal avec la commande : npm install nom-middleware --save-dev) et l'importation avec : (const nom-middleware = require('nom-depende-middleware'))
app
  .use(favicon(__dirname + "/favicon.ico"))
  // .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello !");
});

// Ici, nous placerons nos futurs points de terminison

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findAllPokemonByPK")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// On ajoute la gestion des erreurs 404

// app.use(({ res }) => {
//   const message =
//     "Impossible de trouver la ressource demandée ! Vous pouvez essayer ube autre URL";
//   res.status(404).json({ message });
// });

const errorHandler = (req, res, next) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message, data: error });
  next();
};
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
