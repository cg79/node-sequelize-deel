const contractRoute = require("../routes/contractRoute");
const jobsRouter = require("../routes/jobsRoute");

const initializeApplicationRoutes = (app) => {
  app.use("/contracts", contractRoute.getRouter());
  app.use("/jobs", jobsRouter.getRouter());
};

module.exports = { initializeApplicationRoutes };
