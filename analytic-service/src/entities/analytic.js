class Customer {
  static schema = {
    type: "object",
    properties: {
      name: { type: "string", errorMessage: "must be of string type" },
      username: { type: "string", errorMessage: "must be of string type" },
      sell_count: { type: "integer", errorMessage: "must be of integer type" },
      buy_count: { type: "integer", errorMessage: "must be of integer type" },
      min_investment: {
        type: "integer",
        errorMessage: "must be of integer type",
      },
      max_investment: {
        type: "integer",
        errorMessage: "must be of integer type",
      },
      total_stock: {
        type: "integer",
        errorMessage: "must be of integer type",
      },
    },
    required: ["name", "username"],
    additionalProperties: false,
  };

  constructor(
    id,
    name,
    username,
    sell_count,
    buy_count,
    min_investment,
    max_investment,
    total_stock
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.sell_count = sell_count;
    this.buy_count = buy_count;
    this.min_investment = min_investment;
    this.max_investment = max_investment;
    this.total_stock = total_stock;
  }
}

module.exports = Customer;
