const { Profile, Contract, Job } = require("../model");

class ProfileRepository {
  async getProfileById(id) {
    return Profile.findByPk(id);
  }

  async updateProfileBalance(profile, balance, transaction) {
    return profile.update({ balance }, { transaction });
  }
}

module.exports = new ProfileRepository();
