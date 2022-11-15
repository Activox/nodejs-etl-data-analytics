const Analytic = require("../entities/analytic");
const fs = require("fs");
const convert = require("xml-js");
const csv = require("csv-parser");

const analyticsModel = require("../repositories/mongodb-analytics-repository");
const SequelizeClient = require("../frameworks/db/sequelize");
const customerRepository = require("../repositories/sequelize-customers-repository");

class ManageAnalyticsUsecase {
  constructor() {
    const sequalizeClient = new SequelizeClient();
    this.customerRepository = new customerRepository(sequalizeClient);
  }

  async getAnalytics() {
    // get customer investment from xml file
    console.log(`processing XML File`);
    const xmlFile = fs.readFileSync("../app/src/assets/file.xml");

    const json_data = JSON.parse(
      convert.xml2json(xmlFile, { compact: true, spaces: 4 })
    );

    const transactions = await this.cleanJsonStructure(json_data);

    const grouped_transactions = await this.groupBy(
      transactions,
      (transaction) => transaction.name
    );

    const customer_transactions_info = await this.calculateCustomerInvestment(
      grouped_transactions
    );

    const saved_customer_transactions = await this.saveAnalytics(
      customer_transactions_info
    );
    console.log(`finished with XML File`);
    // get customer investment from CSV File
    console.log(`processing CSV File`);
    const csvFile = await this.readCsvFile();

    const grouped_transactions_csv = await this.groupBy(
      csvFile,
      (transaction) => transaction.email
    );

    const customer_transactions_info_from_csv =
      await this.calculaCustomerInvestmentFromCsv(grouped_transactions_csv);

    const saved_customer_transactions_csv = await this.saveAnalytics(
      customer_transactions_info_from_csv
    );
    console.log(`finished with CSV File`);
    const total_customer_transactions = {
      ...saved_customer_transactions,
      ...saved_customer_transactions_csv,
    };

    return total_customer_transactions;
  }

  async readCsvFile() {
    const results = await new Promise((resolve) => {
      let data_csv = [];
      fs.createReadStream("../app/src/assets/group-a.csv")
        .pipe(csv())
        .on("data", (data) => {
          data_csv.push(data);
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve(data_csv);
        });
    }).then((data) => {
      return data;
    });
    return results;
  }

  async saveAnalytics(data) {
    let saved_customer_transactions = [];
    for (const [element_key, element] of Object.entries(data)) {
      const analytic = new Analytic(
        undefined,
        element.name,
        element.username,
        element.sell_count,
        element.buy_count,
        element.min_investment,
        element.max_investment,
        element.total_stock
      );
      const customer_analytic = new analyticsModel(analytic);
      const saved_record = await customer_analytic.save();

      saved_customer_transactions.push(saved_record);
    }
    return saved_customer_transactions;
  }

  async calculaCustomerInvestmentFromCsv(data) {
    let customer_transaction = null,
      actual_customer = null,
      customer_transactions_info = [];
    for (const [customer_email, customer_transactions] of Object.entries(
      Object.fromEntries(data)
    )) {
      if (actual_customer !== customer_email) {
        if (customer_transaction !== null) {
          customer_transactions_info.push(customer_transaction);
        }
        customer_transaction = {
          name: null,
          username: null,
          sell_count: 0,
          buy_count: 0,
          min_investment: 0,
          max_investment: 0,
          total_stock: 0,
        };
        actual_customer = customer_email;
      }

      for (const [element_key, element] of Object.entries(
        customer_transactions
      )) {
        if (customer_transaction["username"] === null) {
          const customer_info = await this.customerRepository.getCustomer({
            email: customer_email,
          });

          customer_transaction["username"] =
            customer_info[0].dataValues.username;
          customer_transaction["name"] = customer_info[0].dataValues.name;
        }

        if (
          customer_transaction["min_investment"] === 0 &&
          customer_transaction["max_investment"] === 0
        ) {
          customer_transaction["min_investment"] = Number(element.stock_price);
          customer_transaction["max_investment"] = Number(element.stock_price);
        }

        customer_transaction["sell_count"] +=
          element.transaction_type === "SELL" ? 1 : 0;
        customer_transaction["buy_count"] +=
          element.transaction_type === "BUY" ? 1 : 0;
        customer_transaction["min_investment"] =
          Number(element.stock_price) < customer_transaction["min_investment"]
            ? Number(element.stock_price)
            : customer_transaction["min_investment"];
        customer_transaction["max_investment"] =
          Number(element.stock_price) > customer_transaction["max_investment"]
            ? Number(element.stock_price)
            : customer_transaction["max_investment"];
        customer_transaction["total_stock"] =
          element.transaction_type === "SELL"
            ? customer_transaction["total_stock"] - Number(element.total_stock)
            : customer_transaction["total_stock"] + Number(element.total_stock);
      }
    }
    return customer_transactions_info;
  }

  async calculateCustomerInvestment(data) {
    let customer_transaction = null,
      actual_customer = null,
      customer_transactions_info = [];
    for (const [customer, customer_transactions] of Object.entries(
      Object.fromEntries(data)
    )) {
      if (actual_customer !== customer) {
        if (customer_transaction !== null) {
          customer_transactions_info.push(customer_transaction);
        }
        customer_transaction = {
          name: customer,
          username: null,
          sell_count: 0,
          buy_count: 0,
          min_investment: 0,
          max_investment: 0,
          total_stock: 0,
        };
        actual_customer = customer;
      }

      for (const [element_key, element] of Object.entries(
        customer_transactions
      )) {
        if (customer_transaction["username"] === null) {
          const customer_info = await this.customerRepository.getCustomer({
            name: customer,
            address: element.address,
            birthdate: element.birthdate,
          });

          customer_transaction["username"] =
            customer_info[0].dataValues.username;
        }

        if (
          customer_transaction["min_investment"] === 0 &&
          customer_transaction["max_investment"] === 0
        ) {
          customer_transaction["min_investment"] = Number(element.stock_price);
          customer_transaction["max_investment"] = Number(element.stock_price);
        }

        customer_transaction["sell_count"] += element.code === "SELL" ? 1 : 0;
        customer_transaction["buy_count"] += element.code === "BUY" ? 1 : 0;
        customer_transaction["min_investment"] =
          Number(element.stock_price) < customer_transaction["min_investment"]
            ? Number(element.stock_price)
            : customer_transaction["min_investment"];
        customer_transaction["max_investment"] =
          Number(element.stock_price) > customer_transaction["max_investment"]
            ? Number(element.stock_price)
            : customer_transaction["max_investment"];
        customer_transaction["total_stock"] =
          element.code === "SELL"
            ? customer_transaction["total_stock"] - Number(element.stock)
            : customer_transaction["total_stock"] + Number(element.stock);
      }
    }
    return customer_transactions_info;
  }

  async cleanJsonStructure(data) {
    let transactions = [];
    for (const [transaction_key, transaction] of Object.entries(
      data.transactions
    )) {
      for (const [element_key, element] of Object.entries(transaction)) {
        transactions.push({
          total: element.stock_price._text,
          stock_price: element.stock_price._text,
          name: element.name._text,
          address: element.address._text,
          date: element.date._text,
          stock: element.stock._text,
          code: element.code._text,
          company: element.company._text,
          birthdate: element.birthdate._text,
        });
      }
    }
    return transactions;
  }

  async groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}

module.exports = ManageAnalyticsUsecase;
