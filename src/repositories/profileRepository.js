const { Profile } = require("../model");

class ProfileRepository {
  async getProfileById(id) {
    return await Profile.findByPk(id);
  }

  async updateProfileBalance(profile, balance, transaction) {
    return await profile.update({ balance }, { transaction });
  }
}

module.exports = new ProfileRepository();
