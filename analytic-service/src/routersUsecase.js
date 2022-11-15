const SequelizeClient = require("./frameworks/db/sequelize");

const ManageCustomersUsecase = require("./usecases/manage-customers-usecases");
const SequelizeCustomersRepository = require("./repositories/sequelize-customers-repository");

const ManageAccountsUsecase = require("./usecases/manage-accounts-usecases");
const SequelizeAccountsRepository = require("./repositories/sequelize-accounts-repository");

const ManageAnalyticsUsecase = require("./usecases/manage-analytics-usecases");

const sequalizeClient = new SequelizeClient();
const sequalizeCustomersRepository = new SequelizeCustomersRepository(
  sequalizeClient
);
const manageCustomersUsecase = new ManageCustomersUsecase(
  sequalizeCustomersRepository
);

const sequalizeAccountsRepository = new SequelizeAccountsRepository(
  sequalizeClient
);
const manageAccountsUsecase = new ManageAccountsUsecase(
  sequalizeAccountsRepository
);

const manageAnalyticsUsecase = new ManageAnalyticsUsecase();

module.exports = {
  manageCustomersUsecase,
  manageAccountsUsecase,
  manageAnalyticsUsecase,
};
