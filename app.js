require("dotenv").config();
require("./database/client");

const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const plantRouter = require("./routes/plants");
const authenticationRouter = require("./routes/authentication");
const eventRouter = require("./routes/events");
const messageRouter = require("./routes/messages");

var app = express();

app.use(cors({ exposedHeaders: "x-authorization-token" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/plants", plantRouter);
app.use("/api/events", eventRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/messages", messageRouter);

module.exports = app;
