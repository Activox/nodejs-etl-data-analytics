class Account {
  static schema = {
    type: "object",
    properties: {
      username: { type: "string", errorMessage: "must be of string type" },
    },
    required: ["username"],
    additionalProperties: false,
  };

  constructor(id, username) {
    this.account_id = id;
    this.username = username;
  }
}

module.exports = Account;
