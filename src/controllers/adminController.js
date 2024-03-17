const adminService = require("../services/adminService");

class AdminController {
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
}

module.exports = new AdminController();
