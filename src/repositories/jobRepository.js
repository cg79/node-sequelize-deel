const Sequelize = require("sequelize");
const { Job, Contract } = require("../model");
const { CONTRACT_STATUS } = require("./contractStatus");

class JobRepository {
  async findUnpaidJobsByUserId(userId) {
    return Job.findAll({
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
  }

  async getJobById(jobId) {
    return Job.findByPk(jobId);
  }
}

module.exports = new JobRepository();
