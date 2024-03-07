const express = require("express");
const { getProfile } = require("../middleware/getProfile");
class ContractRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/:id", this.getConstractById.bind(this));
  }

  async getConstractById(req, res, next) {
    try {
      res.json("works");
    } catch (error) {
      console.log(error);
      // NOTE: i will add proper error handling
      // NOTE: the contract repository and route should be created
      next(error);
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ContractRouter();
