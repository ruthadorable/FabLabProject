const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("monprojetdemo:config");
const app = express();
debug("Configuring app server");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{

    res.send('This is from backend')
})

const port=process.env.PORT || 5000;
app.listen(port ,()=> `Server running on port ${port}`);

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