const express = require("express");
const { getProfile } = require("../middleware/getProfile");
class JobsRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(getProfile);
    this.router.get("/unpaid", this.getUnpaidJobs.bind(this));
  }

  async getUnpaidJobs(req, res, next) {
    try {
      debugger;
      const { id: profileId } = req.profile;
      // add the function to get unpaid jobs
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

module.exports = new JobsRouter();
