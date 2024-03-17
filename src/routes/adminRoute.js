const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const balanceService = require("../services/balanceService");
const adminService = require("../services/adminService");

class AdminRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/best-profession", this.depositMoney.bind(this));
    this.router.get("/best-clients", this.depositMoney.bind(this));
  }

  async bestProfession(req, res, next) {
    try {
      debugger;
      const { profile } = req;
      const { start, end } = req.query;
      const startDate = Date.parse(start);
      const endDate = Date.parse(end);
      // const userId = req.params.userId;

      const response = await adminService.bestProfession(
        profile,
        startDate,
        endDate
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async bestClients(req, res, next) {
    try {
      const { profile } = req;
      const { start, end } = req.query;
      const startDate = Date.parse(start);
      const endDate = Date.parse(end);

      const response = await adminService.getClientsWithHighestPayments(
        profile,
        startDate,
        endDate
      );
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

module.exports = new AdminRouter();
