const { Contract } = require("../model");

class ContractRepository {
  async getContractById(id) {
    return await Contract.findByPk(id);
  }
}

module.exports = new ContractRepository();
