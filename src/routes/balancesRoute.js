const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const balanceService = require("../services/balanceService");
const balancesController = require("../controllers/balancesController");

class BalancesRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/deposit/:userId", balancesController.depositMoney);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new BalancesRouter();
