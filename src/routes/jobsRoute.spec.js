const express = require("express");

const ProfileService = require("../services/profileService");
const { HTTP_CODE } = require("../services/errorCodes");

jest.mock("../services/profileService");

const supertest = require("supertest");
const jobsRoute = require("./jobsRoute");

describe("JobsRouter", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use("/", jobsRoute.getRouter());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /unpaid", () => {
    it("should return unpaid jobs", async () => {
      //NOTE: only getProfileById is mocked; the getConstractById is doing a real request by calling the database
      // NOTE: now it crashes because there is no implementation
      const mockProfile = { id: 1, firstName: "John", lastName: "Doe" };

      ProfileService.getProfileById.mockResolvedValue(mockProfile);

      const response = await supertest(app).get("/unpaid?profile_id=1");

      expect(response.status).toBe(HTTP_CODE.OK);
      expect(response.body.id).toBeGreaterThan(0);
    });
  });
});
