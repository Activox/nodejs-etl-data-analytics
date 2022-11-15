const express = require("express");
const appRoot = require("app-root-path");
const Account = require("../entities/account");

function createAccountsRouter(manageAccountUsecase) {
  const router = express.Router();

  router.get("/accounts", async (req, res) => {
    const accounts = await manageAccountUsecase.getAccounts();
    res.status(200).send(accounts);
  });
  return router;
}

module.exports = createAccountsRouter;
