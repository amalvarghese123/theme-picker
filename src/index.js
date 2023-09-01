const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
let server;
const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () =>
      console.log(`Server started listening on PORT:${PORT}`)
    );
  } catch (err) {
    console.log("Couldn't connect to database", err);
  }
};
connectToDB();

const closeServer = (err) => {
  console.log("closing server", err);
  server.close(() => {
    process.exit(1);
  });
};
process.on("uncaughtException", closeServer);
process.on("unhandledRejection", closeServer);
