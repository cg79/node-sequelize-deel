const profileRepository = require("../repositories/profileRepository");
const jobRepository = require("../repositories/jobRepository");

class AdminService {
  async bestProfession(clientProfile, startTime, endTime) {
    try {
      // Query to find the profession that earned the most money within the specified time range
      const result = await Profile.findAll({
        include: [
          {
            model: Contract,
            include: [
              {
                model: Job,
                where: {
                  paymentDate: {
                    $between: [startTime, endTime], // Filter by payment date within the specified range
                  },
                  paid: true, // Only consider paid jobs
                },
                attributes: [
                  [
                    sequelize.fn("sum", sequelize.col("price")),
                    "totalEarnings",
                  ],
                ], // Calculate total earnings for each profession
              },
            ],
          },
        ],
        attributes: ["profession"],
        group: ["Profile.profession"],
        order: [[sequelize.literal("totalEarnings"), "DESC"]], // Order by total earnings in descending order
        limit: 1, // Limit the result to one row
      });

      // Extract and return the most profitable profession
      if (result.length > 0) {
        return result[0].profession;
      } else {
        return "No jobs found within the specified time range.";
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getClientsWithHighestPayments(startTime, endTime, limit = 2) {
    try {
      // Query to find the clients who paid the most for jobs within the specified time period
      const result = await Profile.findAll({
        include: [
          {
            model: Contract,
            include: [
              {
                model: Job,
                where: {
                  paymentDate: {
                    $between: [startTime, endTime], // Filter by payment date within the specified range
                  },
                  paid: true, // Only consider paid jobs
                },
                attributes: [],
                required: true, // Ensure that the job exists
              },
            ],
            attributes: [],
            required: true, // Ensure that the contract exists
          },
        ],
        attributes: [
          "id",
          "firstName",
          "lastName",
          [sequelize.literal('SUM("Contract.Jobs.price")'), "totalPayment"],
        ],
        group: ["Profile.id"],
        order: [[sequelize.literal("totalPayment"), "DESC"]], // Order by total payment in descending order
        limit, // Limit the result to the specified number of clients
      });

      // Extract and return the required client information
      return result.map((client) => ({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        totalPayment: client.totalPayment,
      }));
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

module.exports = new AdminService();
