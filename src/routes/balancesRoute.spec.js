const request = require("supertest");
const app = require("../app");
const balanceService = require("../services/balanceService");

jest.mock("../services/balanceService", () => ({
  depositMoney: jest
    .fn()
    .mockResolvedValue({ message: "Money deposited successfully" }),
}));

const balancesController = require("../controllers/balancesController");

describe("BalancesController", () => {
  describe("POST /depositMoney", () => {
    it("should deposit money for a user", async () => {
      const mockProfile = { id: 1, username: "testuser" };
      const mockAmount = 100;

      const response = await request(app)
        .post("/balances/deposit/1?profile_id=1")
        .send({ profile: mockProfile, amount: mockAmount });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Money deposited successfully",
      });
    });

    it("should handle errors", async () => {
      const mockProfile = { id: 1, username: "testuser" };
      const mockAmount = 100;
      const errorMessage = "Error depositing money";

      jest
        .spyOn(balanceService, "depositMoney")
        .mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post("/balances/deposit/1?profile_id=1")
        .send({ profile: mockProfile, amount: mockAmount });

      expect(response.statusCode).toBe(500);
    });
  });
});
