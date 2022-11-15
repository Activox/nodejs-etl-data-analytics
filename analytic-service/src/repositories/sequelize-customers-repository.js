const { DataTypes } = require("sequelize");

class SequelizeCustomersRepository {
  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "customers";

    if (test) {
      tableName += "_test";
    }

    const columns = {
      name: DataTypes.STRING,
      username: { type: DataTypes.STRING, primaryKey: true },
      address: DataTypes.STRING,
      birthdate: DataTypes.STRING,
      email: DataTypes.STRING,
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.customerModel = sequelizeClient.sequelize.define(
      tableName,
      columns,
      options
    );
  }

  async getCustomer(customer_data) {
    const { name, email } = customer_data;
    const where = {
      ...(name && { name: name }),
      ...(email && { email: email }),
    };
    const customer = await this.customerModel.findAll({
      where: where,
    });

    return customer;
  }

  async getCustomers() {
    const customer = await this.customerModel.findAll({
      raw: true,
    });
    return customer;
  }
}

module.exports = SequelizeCustomersRepository;
