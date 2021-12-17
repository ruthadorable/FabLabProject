require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rfs = require("rotating-file-stream");
const debug = require("debug")("monprojetdemo:config");
const favicon = require("serve-favicon");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt_options = require("./jwt_generator").options;
const jwt_secret = require("./jwt_generator").secret;
const { User } = require("./models/schema");

const jwt_passport_opts = {};
jwt_passport_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwt_passport_opts.secretOrKey = jwt_secret;
jwt_passport_opts.issuer = jwt_options.issuer;
jwt_passport_opts.audience = jwt_options.audience;
passport.use(
  new JwtStrategy(jwt_passport_opts, async function (jwt_payload, done) {
    const user = await User.findByPk(jwt_payload.sub);
    if (user != null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

const indexRouter = require("./routes/index");
const tokensRouter = require("./routes/tokens");

debug("Configuring app server");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1h", // rotate daily
  path: path.join(__dirname, "log"),
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(logger("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/tokens", tokensRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

debug("App server configured");

module.exports = app;
