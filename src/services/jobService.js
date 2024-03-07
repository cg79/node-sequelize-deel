const jobRepository = require("../repositories/jobRepository");

class JobService {
  async findUnpaidJobsByUserId(userId) {
    return jobRepository.findUnpaidJobsByUserId(userId);
  }
}

module.exports = new JobService();
