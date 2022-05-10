const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activities } = require("../db");
const { getAllCountries } = require("../Controllers/Controllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Rutas

// - [ ] __GET /countries__:
//   - En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//   - Obtener un listado de los paises.

router.get("/countries", async (req, res) => {
  const name = req.query.name;
  let full = await Country.findAll({ include: { model: Activities } });
  let allCountries = await getAllCountries();
  try {
    if (!full.length) {
      await Country.bulkCreate(allCountries);
    }
    if (name) {
      let countryName = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      countryName.length
        ? res.status(202).send(countryName)
        : res.status(404).send("Country not found");
    } else {
      let full = await Country.findAll({ include: { model: Activities } });
      res.status(202).json(full);
    }
  } catch (error) {
    console.log(error);
  }
});

// - [ ] __GET /countries/{idPais}__:
//   - Obtener el detalle de un país en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de país
//   - Incluir los datos de las actividades turísticas correspondientes

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const countryId = await Country.findByPk(id, {
        include: { model: Activities },
      });
      !countryId
        ? res.status(404).send("Id Not found")
        : res.status(200).json(countryId);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/activities", async (req, res) => {
  try {
    let activities = await Activities.findAll({ include: Country });
    if (activities) {
      return res.json(activities);
    } else {
      return res.send("Activity not found");
    }
  } catch (err) {
    console.log(error);
  }
});

// - [ ] __POST /activity__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//   - Crea una actividad turística en la base de datos
router.post("/activities", async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;
  try {
    let newActivities = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    console.log(newActivities);
    countries.forEach(async (country) => {
      let activityCountry = await Country.findOne({ where: { name: country } });
      await newActivities.addCountry(activityCountry);
    });

    return res.status(201).send(newActivities);
  } catch (error) {
    console.log(error);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
