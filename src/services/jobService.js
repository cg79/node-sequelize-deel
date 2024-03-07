const jobRepository = require("../repositories/jobRepository");
const profileRepository = require("../repositories/profileRepository");
const contractRepository = require("../repositories/contractRepository");

const CustomError = require("../errorHandler/customError");
const { HTTP_CODE } = require("../services/errorCodes");

const { sequelize } = require("../model");

class JobService {
  async findUnpaidJobsByUserId(userId) {
    return jobRepository.findUnpaidJobsByUserId(userId);
  }

  async payJob(contractorProfile, jobId, amount) {
    debugger;
    let transaction;

    if (contractorProfile.balance < amount) {
      throw new Error("Insufficient balance");
    }

    try {
      // Start transaction
      transaction = await sequelize.transaction();

      const job = await jobRepository.getJobById(jobId, { transaction });
      if (!job) {
        throw new Error("Job not found");
      }

      const contract = await contractRepository.getContractById(job.ContractId);
      if (!contract) {
        throw new Error("Contract not found");
      }

      if (contract.ContractorId !== contractorProfile.id) {
        throw new CustomError(
          "why would you want to pay for a job which is not yours?",
          HTTP_CODE.PRECONDITION_FAILED
        );
      }

      const newBalance = contractorProfile.balance - amount;
      await profileRepository.updateProfileBalance(
        contractorProfile,
        newBalance,
        transaction
      );

      job.paid = true;
      job.paymentDate = new Date();
      await job.save({ transaction });

      const clientProfile = await profileRepository.getProfileById(
        contract.ClientId
      );
      clientProfile.balance = clientProfile.balance + amount;
      await clientProfile.save({ transaction });

      // Commit transaction
      await transaction.commit();

      return job;
    } catch (error) {
      // Rollback transaction if any error occurs
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new JobService();
