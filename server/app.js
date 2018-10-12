var createError = require("http-errors");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
 //routes
var indexRouter = require("./routes/index.routes");
var textRouter = require("./routes/text.routes");
 var app = express();
 // view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
 app.use(cors());
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 // Set up a whitelist and check against it:
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
//
// // Then pass them to cors:
// app.use(cors(corsOptions));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
 //Set up mongoose connection
const { MONGO_USER, MONGO_PASS, MONGO_URL } = process.env;
CONNECTION_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`;
 mongoose
  .connect(CONNECTION_URI)
  .then(() => console.log("Connected to Database"))
  .catch(e => console.error(e));
 app.use("/", indexRouter);
app.use("/text", textRouter);
 // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
   // render the error page
  res.status(err.status || 500);
  res.render("error");
});
 module.exports = app;
