const jobService = require("./jobService");
const jobRepository = require("../repositories/jobRepository");

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
});
