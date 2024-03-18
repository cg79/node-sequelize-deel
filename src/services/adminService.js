const profileRepository = require("../repositories/profileRepository");
const jobRepository = require("../repositories/jobRepository");
const { sequelize, Profile, Contract, Job } = require("../model");

class AdminService {
  async bestProfession(startTime, endTime) {
    try {
      debugger;
      const result = await sequelize.query(
        `
        SELECT p.profession, SUM(j.balance) AS totalEarned
        FROM Profiles p
        INNER JOIN Contracts c ON p.id = c.ContractorId
        INNER JOIN Jobs j ON c.id = j.ContractId
        WHERE p.type = 'contractor' AND j.paymentDate BETWEEN :startTime AND :endTime
        GROUP BY p.profession
        ORDER BY totalEarned DESC
        LIMIT 1;
      `,
        {
          replacements: { startTime, endTime },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length > 0) {
        return result[0].profession;
      } else {
        return null; // No results found
      }
    } catch (error) {
      console.error("Error finding most profitable profession:", error);
      throw error;
    }
  }

  async getClientsWithHighestPayments(startTime, endTime, limit = 2) {
    const result = await sequelize.query(
      `
    SELECT p.firstName, p.lastName, SUM(j.price) AS totalPaid
    FROM Profiles p
    INNER JOIN Contracts c ON p.id = c.ClientId
    INNER JOIN Jobs j ON c.id = j.ContractId
    WHERE p.type = 'client' AND j.paymentDate BETWEEN :startTime AND :endTime
    GROUP BY p.id
    ORDER BY totalPaid DESC
    LIMIT :limit;
  `,
      {
        replacements: { startTime, endTime, limit },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return result.map((client) => ({
      firstName: client.firstName,
      lastName: client.lastName,
      totalPaid: client.totalPaid,
    }));
  }
}

module.exports = new AdminService();
