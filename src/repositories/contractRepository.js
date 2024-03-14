const { Contract } = require("../model");
const Sequelize = require("sequelize");
const { CONTRACT_STATUS } = require("./contractStatus");

class ContractRepository {
  async getContractById(id) {
    return await Contract.findByPk(id);
  }

  async getContractsByUserId(userId) {
    return Contract.findAll({
      where: {
        [Sequelize.Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
        status: { [Sequelize.Op.not]: CONTRACT_STATUS.TERMINATED },
      },
    });
  }
}

module.exports = new ContractRepository();
