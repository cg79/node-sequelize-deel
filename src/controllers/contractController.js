const contractService = require("../services/contractService");

class ContractController {
  async getConstractById(req, res, next) {
    try {
      debugger;
      const { id: profileId } = req.profile;
      const contractId = req.params.id;
      const response = await contractService.viewContract(
        contractId,
        profileId
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getConstracts(req, res, next) {
    try {
      const { id: profileId } = req.profile;
      const response = await contractService.getContracts(profileId);

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

module.exports = new ContractController();
