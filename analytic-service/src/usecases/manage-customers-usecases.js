const Customer = require("../entities/customer");

class ManageCustomersUsecase {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }
  async getCustomers() {
    return await this.customersRepository.getCustomers();
  }
}

module.exports = ManageCustomersUsecase;
