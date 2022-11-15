class Customer {
  static schema = {
    type: "object",
    properties: {
      name: { type: "string", errorMessage: "must be of string type" },
      username: { type: "string", errorMessage: "must be of string type" },
      address: { type: "string", errorMessage: "must be of string type" },
      birthdate: { type: "string", errorMessage: "must be of string type" },
      email: { type: "string", errorMessage: "must be of string type" },
    },
    required: ["name", "username", "email"],
    additionalProperties: false,
  };

  constructor(id, name, username, address, birthdate, email) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.address = address;
    this.birthdate = birthdate;
    this.email = email;
  }
}

module.exports = Customer;
