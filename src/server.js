const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints")
const dotenv = require("dotenv")

// Routes
const oddsFetcher = require("./odds-data/index")
const sportRoute = require("./profit-tracker/sport/index")
const casinoRoute = require("./profit-tracker/casino/index");
const bookmakers = require("./profit-tracker/bookmakers/index")
const paymentsRoute = require("./profit-tracker/payments/index")
const transactionsRoute = require("./profit-tracker/transactions/index")
const usersRoute = require("./profit-tracker/users/index")
const authRoute = require("./auth/index");

// Express server
const server = express();

// Cors
server.use(cors())

// Dotenv configurations
dotenv.config();

// Server port 3002
const port = process.env.PORT;

// Express Routers
server.use(express.json());
server.use("/", authRoute)
server.use("/odds-data", oddsFetcher)
server.use("/profit-tracker", sportRoute)
server.use("/profit-tracker", casinoRoute)
server.use("/profit-tracker", bookmakers)
server.use("/profit-tracker", paymentsRoute)
server.use("/profit-tracker", transactionsRoute)
server.use("/profit-tracker", usersRoute)

// Auth Route Middlewares
server.use('/user/', authRoute)

// Preview of the current endpoints into the terminal 
console.log(listEndpoints(server));

// MongoDB connection
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 3003;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`working on port ${port}`);
    })
  );
  mongoose.connection.on("connected", () => {
  console.log("connected to atlas");
});