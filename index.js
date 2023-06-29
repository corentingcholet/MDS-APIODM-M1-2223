// Express config
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Import Controllers
const PeopleController = require('./controllers/people.controller.js')
const FilmController = require('./controllers/film.controller.js')
const PlanetController = require('./controllers/planet.controller.js')
const StarshipController = require('./controllers/starship.controller.js')
const SpecieController = require('./controllers/specie.controller.js')
const VehicleController = require('./controllers/vehicle.controller.js')
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Star Wars REST API with Swagger",
      version: "0.1.0",
      description:
        "Welcome to the swapi, the Star Wars API! This documentation should help you familiarise yourself with the resources available and how to consume them with HTTP requests.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Corentin Goujon-Cholet",
        email: "corentingcholet@gmail.com",
      },
    },
    tags: [
      {
        "name": "People",
        "description": "API for peoples"
      },
      {
        "name": "Film",
        "description": "API for films"
      },
      {
        "name": "Planet",
        "description": "API for planets"
      },
      {
        "name": "Specie",
        "description": "API for species"
      },{
        "name": "Starship",
        "description": "API for starships"
      },
      {
        "name": "Vehicle",
        "description": "API for vehicles"
      }
    ],
    components: {
      schemas : {
        People : {
          type: "object",
          $ref : '#/definitions/people'
        },
        Film : {
          type: "object",
          $ref : '#/definitions/film'
        },
        Planet : {
          type: "object",
          $ref : '#/definitions/planet'
        },
        Specie : {
          type: "object",
          $ref : '#/definitions/specie'
        },
        Starship : {
          type: "object",
          $ref : '#/definitions/starship'
        },
        Vehicle : {
          type: "object",
          $ref : '#/definitions/vehicle'
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./controllers/*.controller.js", "./models/*.model.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.use(bodyParser.json());
app.use('/api/people', PeopleController)
app.use('/api/film', FilmController)
app.use('/api/planet', PlanetController)
app.use('/api/starship', StarshipController)
app.use('/api/specie', SpecieController)
app.use('/api/vehicle', VehicleController)

app.listen(port, () => {
  console.log(`Example app listening et http://localhost:${port}`)
})