const contractRoute = require("../routes/contractRoute");

const initializeApplicationRoutes = (app) => {
  app.use("/contracts", contractRoute.getRouter());
};

module.exports = { initializeApplicationRoutes };
