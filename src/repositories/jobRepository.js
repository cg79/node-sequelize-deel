const Sequelize = require("sequelize");
const { Job, Contract } = require("../model");
const { CONTRACT_STATUS } = require("./contractStatus");

class JobRepository {
  async findUnpaidJobsByUserId(userId) {
    debugger;
    const unpaidJobs = await Job.findAll({
      include: [
        {
          model: Contract,
          where: {
            status: CONTRACT_STATUS.IN_PROGRESS,
            [Sequelize.Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
          },
        },
      ],
      where: {
        paid: null,
      },
    });
    return unpaidJobs;
  }
}

module.exports = new JobRepository();
