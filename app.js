const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./src/middlewares/error-handler");
const routes = require("./src/routes/v1");
const { RouteNotFound } = require("./src/errors/error-classes/errorClasses");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5000", "https://theme-picker.onrender.com/"],
  })
);
app.options("*", cors());

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new RouteNotFound(`Api Not found`));
});

// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.use(express.static("client/build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
// if (process.env.NODE_ENV === "production") {
// }

app.use(errorHandler);

module.exports = app;
