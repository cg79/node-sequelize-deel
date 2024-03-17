const contractRoute = require("../routes/contractRoute");
const jobsRouter = require("../routes/jobsRoute");
const balancesRouter = require("../routes/balancesRoute");
const adminRouter = require("../routes/adminRoute");

const initializeApplicationRoutes = (app) => {
  app.use("/contracts", contractRoute.getRouter());
  app.use("/jobs", jobsRouter.getRouter());
  app.use("/balances", balancesRouter.getRouter());
  app.use("/admin", adminRouter.getRouter());
};

module.exports = { initializeApplicationRoutes };
