const ProfileService = require("../services/profileService");
const ProfileRepository = require("../repositories/profileRepository");

jest.mock("../repositories/ProfileRepository");

describe("ProfileService", () => {
  let profileService;

  beforeEach(() => {
    profileService = ProfileService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfileById", () => {
    it("should retrieve a profile by ID", async () => {
      const mockProfile = { id: 1, firstName: "John", lastName: "Doe" };

      ProfileRepository.getProfileById.mockResolvedValue(mockProfile);

      const profile = await profileService.getProfileById(1);

      expect(profile).toEqual(mockProfile);
    });
  });
});
