const profileRepository = require("../repositories/profileRepository");
const jobRepository = require("../repositories/jobRepository");

class BalanceService {
  async depositMoney(clientProfile, amount) {
    try {
      // Get the client's profile
      // const clientProfile = await profileRepository.getProfileById(clientId);

      // Calculate the total amount of unpaid jobs for the client
      const unpaidJobs = await jobRepository.findUnpaidJobsByUserId(clientId);
      const totalUnpaidAmount = unpaidJobs.reduce(
        (total, job) => total + job.price,
        0
      );

      // Calculate the maximum deposit amount (25% of total unpaid amount)
      const maxDepositAmount = totalUnpaidAmount * 0.25;

      // Check if the deposit amount exceeds the maximum allowed amount
      if (amount > maxDepositAmount) {
        throw new Error("Deposit amount exceeds the maximum allowed limit");
      }

      // Update the client's balance with the deposited amount
      const newBalance = clientProfile.balance + amount;
      await clientProfile.update({ balance: newBalance });

      return { newBalance };
    } catch (error) {
      throw new Error("Error depositing money: " + error.message);
    }
  }
}

module.exports = new BalanceService();
