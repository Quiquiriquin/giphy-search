var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// main
const x = require("sqlite3");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const sqlite3 = x.verbose();

// Connect to a database (in this example, a new file-based database)
const db = new sqlite3.Database("mydatabase.db");

// Define the SQL statement to create a table
const createTableSql = `
    CREATE TABLE IF NOT EXISTS searchs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        search TEXT NOT NULL
    )
`;

// Execute the SQL statement to create the table
db.run(createTableSql, function (err) {
  if (err) {
    return console.error("Error creating table:", err.message);
  }
  console.log("Table created successfully");
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database connection closed");
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

module.exports = app;
