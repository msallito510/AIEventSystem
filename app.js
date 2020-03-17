const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/auth");
const eventRouter = require("./routes/events");

const app = express();
require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);


app.use("/", usersRouter);
app.use("/events", eventRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// database.js
// const mongoose = require("mongoose");
const dbPath = process.env.MONGO_URL;
mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Works!!!!");
  })
  .catch(error => {
    console.log(error);
  });

app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60 * 1000 }, // 60 seconds
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      resave: true,
      saveUninitialized: false,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
