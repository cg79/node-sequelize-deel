const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const balanceService = require("../services/balanceService");

class BalancesRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/deposit/:userId", this.depositMoney.bind(this));
  }

  async depositMoney(req, res, next) {
    try {
      debugger;
      const { profile } = req;
      const { amount } = req.body;
      // const userId = req.params.userId;

      const response = await balanceService.depositMoney(profile, amount);
      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new BalancesRouter();
