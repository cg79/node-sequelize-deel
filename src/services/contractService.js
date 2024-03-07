const ContractRepository = require("../repositories/contractRepository");
const { HTTP_CODE } = require("../services/errorCodes");
const CustomError = require("../errorHandler/customError");

class ContractService {
  async getContractById(id) {
    return await ContractRepository.getContractById(id);
  }

  async viewContract(contractId, profileId) {
    debugger;
    const contract = await this.getContractById(contractId);
    if (!contract) {
      throw new Error("Contract not found");
    }
    const { ClientId, ContractorId } = contract;

    if (ClientId !== profileId && ContractorId !== profileId) {
      throw new CustomError(
        "You don't have permission to view this contract", // NOTE: it will be nice to have these messages as part of a "messages" file. same like HTTP_CODE
        HTTP_CODE.PERMISSION_DENIED
      );
    }
    return contract;
  }
}

module.exports = new ContractService();
