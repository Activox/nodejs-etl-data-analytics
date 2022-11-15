const { Sequelize } = require("sequelize");

class SequelizeClient {
  constructor() {
    const dialect = process.env.DIALECT;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const database = process.env.SEQUELIZE_DATABASE;

    const host = process.env.SEQUELIZE_HOST;
    const port = process.env.SEQUELIZE_MYSQL_PORT;

    this.sequelize = new Sequelize(database, username, password, {
      dialect: dialect,
      host: host,
      port: port,
    });
  }

  syncDatabase() {
    var syncOptions = {
      alter: false,
    };

    this.sequelize.sync(syncOptions).catch((error) => {
      console.log("Couldn't sync database", error);
    });
  }
}

module.exports = SequelizeClient;
