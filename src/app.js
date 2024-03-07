const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { initializeApplicationRoutes } = require("./routes/initialize");
const { errorHandler } = require("./errorHandler/errorHandler");

const app = express();
app.use(bodyParser.json());
app.use(errorHandler);

initializeApplicationRoutes(app);

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
// NOTE: this is a route and should be part of a specific "contracts route"
// for this i plan to create a contract repository, contract service, the contract route + unit test and integration test with supertest

//  */
// app.get('/contracts/:id',getProfile ,async (req, res) =>{
//     const {Contract} = req.app.get('models')
//     const {id} = req.params
//     const contract = await Contract.findOne({where: {id}})
//     if(!contract) return res.status(404).end()
//     res.json(contract)
// })
module.exports = app;
