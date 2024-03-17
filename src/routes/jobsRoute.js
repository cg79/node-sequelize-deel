const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const jobsController = require("../controllers/jobsController");
class JobsRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/unpaid", jobsController.getUnpaidJobs);
    this.router.post("/:job_id/pay", jobsController.payJob);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new JobsRouter();
