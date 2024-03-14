const jobService = require("./jobService");
const jobRepository = require("../repositories/jobRepository");
const { sequelize } = require("../model");
const contractRepository = require("../repositories/contractRepository");
const profileRepository = require("../repositories/profileRepository");

// Mocking the jobRepository methods
jest.mock("../repositories/jobRepository", () => ({
  findUnpaidJobsByUserId: jest.fn(),
}));

describe("JobService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findUnpaidJobsByUserId", () => {
    it("should call jobRepository with the correct userId", async () => {
      const userId = 123;
      const unpaidJobs = [{ id: 1, description: "Job 1", price: 100 }];
      jobRepository.findUnpaidJobsByUserId.mockResolvedValue(unpaidJobs);

      await jobService.findUnpaidJobsByUserId(userId);

      expect(jobRepository.findUnpaidJobsByUserId).toHaveBeenCalledWith(userId);
    });

    it("should return unpaid jobs returned by jobRepository", async () => {
      const userId = 123;
      const unpaidJobs = [{ id: 1, description: "Job 1", price: 100 }];
      jobRepository.findUnpaidJobsByUserId.mockResolvedValue(unpaidJobs);

      const result = await jobService.findUnpaidJobsByUserId(userId);

      expect(result).toEqual(unpaidJobs);
    });

    it("should throw an error if jobRepository throws an error", async () => {
      const userId = 123;
      const errorMessage = "Error fetching unpaid jobs";
      jobRepository.findUnpaidJobsByUserId.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(jobService.findUnpaidJobsByUserId(userId)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("payJob function", () => {
    it("should pay the job successfully", async () => {
      sequelize.transaction = jest.fn(() => ({
        commit: jest.fn().mockImplementation(() => {
          // console.log("aici");
          // debugger;
        }),
        rollback: jest.fn(),
      }));

      const contractorProfile = { id: 1, balance: 100 };
      const jobId = 123;
      const amount = 50;
      const job = { id: jobId, ContractId: 456, save: jest.fn() };
      const contract = { ContractorId: contractorProfile.id, ClientId: 789 };
      const clientProfile = { balance: 0, save: jest.fn() };

      jobRepository.getJobById = jest.fn().mockResolvedValue(job);
      contractRepository.getContractById = jest
        .fn()
        .mockImplementation((id) => {
          return contract;
        });
      // .mockResolvedValue(contract);
      profileRepository.updateProfileBalance = jest.fn();
      profileRepository.getProfileById = jest
        .fn()
        .mockResolvedValue(clientProfile);

      // Calling the function
      await jobService.payJob(contractorProfile, jobId, amount);

      // Assertions
      expect(sequelize.transaction).toHaveBeenCalled();
      expect(jobRepository.getJobById).toHaveBeenCalledWith(jobId, {
        transaction: expect.anything(),
      });
      expect(contractRepository.getContractById).toHaveBeenCalledWith(
        job.ContractId
      );
      expect(profileRepository.updateProfileBalance).toHaveBeenCalledWith(
        contractorProfile,
        contractorProfile.balance - amount,
        expect.anything()
      );
      expect(job.save).toHaveBeenCalledWith({ transaction: expect.anything() });
      expect(profileRepository.getProfileById).toHaveBeenCalledWith(
        contract.ClientId
      );
      expect(clientProfile.balance).toBe(amount);
      expect(clientProfile.save).toHaveBeenCalledWith({
        transaction: expect.anything(),
      });
      expect(sequelize.transaction).toHaveBeenCalled();
    });

    it("should throw an error for insufficient balance", async () => {
      const contractorProfile = { balance: 0 };
      // Calling the function and expecting it to throw an error
      await expect(
        jobService.payJob(contractorProfile, 123, 50)
      ).rejects.toThrow("Insufficient balance");
    });
  });
});
