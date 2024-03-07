const { Contract } = require("../model");
const Sequelize = require("sequelize");
const { CONTRACT_STATUS } = require("./contractStatus");

class ContractRepository {
  async getContractById(id) {
    return await Contract.findByPk(id);
  }

  async getContractsByUserId(userId) {
    try {
      const contracts = await Contract.findAll({
        where: {
          [Sequelize.Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
          status: { [Sequelize.Op.not]: CONTRACT_STATUS.TERMINATED },
        },
      });
      return contracts;
    } catch (error) {
      throw new Error("Error fetching contracts: " + error.message);
    }
  }
}

module.exports = new ContractRepository();
