const express = require("express");

const ContractRouter = require("./contractRoute");
const ProfileService = require("../services/profileService");
const { HTTP_CODE } = require("../services/errorCodes");

jest.mock("../services/profileService");

const supertest = require("supertest");

describe("ContractRouter", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use("/", ContractRouter.getRouter());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /:id", () => {
    it("should return contract data if user has permission", async () => {
      const mockProfile = { id: 1, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/1?profile_id=1");

      expect(response.status).toBe(HTTP_CODE.OK);
      expect(response.body.id).toBeGreaterThan(0);
    });

    it("should return error if user doesn't have permission", async () => {
      const mockProfile = { id: 888, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/1?profile_id=888");

      expect(response.status).toBe(HTTP_CODE.PERMISSION_DENIED);
    });
  });
});
