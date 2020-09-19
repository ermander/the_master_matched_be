const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints")
const oddsFetcher = require("./oddsFetcher/index")
const dotenv = require("dotenv")


// Express server
const server = express();

// Cors
server.use(cors())

// Dotenv configurations
dotenv.config();

// Server port 3002
const port = process.env.PORT;

// Express Routers
server.use("/odds", oddsFetcher)

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
