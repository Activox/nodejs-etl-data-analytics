const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.ANALYTIC_MYSQL_NAME}:${process.env.ANALYTIC_MONGODB_PORT}/analytics`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

let tableName = "customer_investment_insight";

const AnalyticsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  sell_count: {
    type: Number,
    default: 0,
  },
  buy_count: {
    type: Number,
    default: 0,
  },
  min_investment: {
    type: Number,
    default: 0,
  },
  max_investment: {
    type: Number,
    default: 0,
  },
  total_stock: {
    type: Number,
    default: 0,
  },
});

const analytics = mongoose.model(tableName, AnalyticsSchema);

module.exports = analytics;
