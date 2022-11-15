const createExpressApp = require("./frameworks/http/express");
const createAnalyticsRouter = require("./http/analytic-router");
const createCustomersRouter = require("./http/customer-router");
const createAccountsRouter = require("./http/account-router");

const {
  manageAnalyticsUsecase,
  manageCustomersUsecase,
  manageAccountsUsecase,
} = require("./routersUsecase");

let routers = [
  createAnalyticsRouter(manageAnalyticsUsecase),
  createCustomersRouter(manageCustomersUsecase),
  createAccountsRouter(manageAccountsUsecase),
];

const app = createExpressApp(routers);
