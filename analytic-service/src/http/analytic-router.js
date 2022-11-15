const express = require("express");
const appRoot = require("app-root-path");
const Analytic = require("../entities/analytic");

function createAnalyticsRouter(manageAnalyticUsecase) {
  const router = express.Router();

  router.get("/analytics", async (req, res) => {
    const analytics = await manageAnalyticUsecase.getAnalytics();
    res.status(200).send(analytics);
  });
  return router;
}

module.exports = createAnalyticsRouter;
