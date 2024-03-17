const balanceService = require("../services/balanceService");

class BalancesController {
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
}

module.exports = new BalancesController();
