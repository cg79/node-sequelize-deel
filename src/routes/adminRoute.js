const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const adminController = require("../controllers/adminController");

class AdminRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/best-profession", adminController.depositMoney);
    this.router.get("/best-clients", adminController.depositMoney);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AdminRouter();
