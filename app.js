const createError = require("http-errors");
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/auth");
const eventRouter = require("./routes/events");
const profileRouter = require("./routes/profile");
const actionRouter = require("./routes/action");
const finderRoute = require("./routes/finder");
const app = express();
require("dotenv").config();
const flash = require('connect-flash');






// view engine setup
hbs.registerPartials(__dirname + "/views/partials");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use("/", indexRouter);

app.use("/", usersRouter);
app.use("/events", eventRouter);
app.use("/action", actionRouter);
app.use("/profile", profileRouter);
app.use("/finder", finderRoute);
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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Works!!!!");
    // Init stream

  })
  .catch(error => {
    console.log(error);
  });

app.use(
  session({
    secret: "basic-auth-secret",
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
