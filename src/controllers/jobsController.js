const jobService = require("../services/jobService");
class JobsController {
  async getUnpaidJobs(req, res, next) {
    try {
      debugger;
      const { id: profileId } = req.profile;

      const response = await jobService.findUnpaidJobsByUserId(profileId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async payJob(req, res, next) {
    try {
      debugger;
      const {
        profile,
        body: { amount = 0 } = {},
        params: { job_id: jobId },
      } = req;

      const response = await jobService.payJob(profile, jobId, amount);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new JobsController();
