const ProfileRepository = require("../repositories/profileRepository");
class ProfileService {
  async getProfileById(id) {
    debugger;
    return await ProfileRepository.getProfileById(id);
  }
}

module.exports = new ProfileService();
