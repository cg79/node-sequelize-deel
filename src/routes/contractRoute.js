const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const contractService = require("../services/contractService");
const contractController = require("../controllers/contractController");

class ContractRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/:id", contractController.getConstractById);
    this.router.get("/", contractController.getConstracts);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ContractRouter();
