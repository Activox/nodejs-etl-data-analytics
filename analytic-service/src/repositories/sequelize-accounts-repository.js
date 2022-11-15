const { DataTypes } = require("sequelize");

class SequelizeAccountsRepository {
  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "accounts";

    if (test) {
      tableName += "_test";
    }

    const columns = {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.accountModel = sequelizeClient.sequelize.define(
      tableName,
      columns,
      options
    );
  }

  async getAccounts() {
    const accounts = await this.accountModel.findAll({
      raw: true,
    });

    return accounts;
  }
}

module.exports = SequelizeAccountsRepository;
