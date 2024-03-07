const { Profile } = require("../model");

class ProfileRepository {
  async getProfileById(id) {
    return await Profile.findByPk(id);
  }
}

module.exports = new ProfileRepository();
