const app = require("../app");
const ProfileService = require("../services/profileService");
const { HTTP_CODE } = require("../services/errorCodes");

jest.mock("../services/profileService");

const supertest = require("supertest");

describe("ContractRouter", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /:id", () => {
    it("should return contract data if user has permission", async () => {
      //NOTE: only getProfileById is mocked; the getConstractById is doing a real request by calling the database
      const mockProfile = { id: 1, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/contracts/1?profile_id=1");

      expect(response.status).toBe(HTTP_CODE.OK);
      expect(response.body.id).toBeGreaterThan(0);
    });

    it("should return error if user doesn't have permission", async () => {
      const mockProfile = { id: 2, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/contracts/1?profile_id=2");

      expect(response.status).toBe(HTTP_CODE.PERMISSION_DENIED);
    });
  });

  describe("GET /contracts", () => {
    it("should return contracts for the profile user", async () => {
      const mockProfile = { id: 1, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/contracts/?profile_id=1");

      expect(response.status).toBe(HTTP_CODE.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
