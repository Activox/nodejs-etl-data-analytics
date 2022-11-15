const express = require("express");
const appRoot = require("app-root-path");
const Customer = require("../entities/customer");

function createCustomersRouter(manageCustomerUsecase) {
  const router = express.Router();

  router.get("/customers", async (req, res) => {
    const customers = await manageCustomerUsecase.getCustomers();
    res.status(200).send(customers);
  });

  return router;
}

module.exports = createCustomersRouter;
