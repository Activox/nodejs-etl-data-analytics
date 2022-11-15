const Account = require("../entities/customer");

class ManageAccountsUsecase {
  constructor(accountsRepository) {
    this.accountsRepository = accountsRepository;
  }

  async getAccounts() {
    return await this.accountsRepository.getAccounts();
  }
}

module.exports = ManageAccountsUsecase;
