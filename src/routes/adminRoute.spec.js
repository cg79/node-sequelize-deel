const request = require("supertest");
const app = require("../app");

jest.mock("../services/adminService", () => ({
  bestProfession: jest.fn().mockResolvedValue("Best profession result"),
  getClientsWithHighestPayments: jest
    .fn()
    .mockResolvedValue("Best clients result"),
}));

const adminController = require("../controllers/adminController");

describe("AdminController", () => {
  describe("GET /bestProfession", () => {
    it("should return the best profession", async () => {
      const mockProfile = { id: 1, username: "admin" };
      const mockQuery = { start: "2024-01-01", end: "2024-03-01" };

      const response = await request(app).get(
        "/admin/best-profession?profile_id=1&start=2024-01-01&end=2024-01-05"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual("Best profession result");
    });
  });

  describe("GET /bestClients", () => {
    it("should return the best clients", async () => {
      const mockProfile = { id: 1, username: "admin" };
      const mockQuery = { start: "2024-01-01", end: "2024-03-01" };

      const response = await request(app).get(
        "/admin/best-clients?profile_id=1&start=2024-01-01&end=2024-01-05"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual("Best clients result");
    });
  });
});
