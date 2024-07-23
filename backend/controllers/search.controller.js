const x = require("sqlite3");
const sqlite3 = x.verbose();

// Connect to a database (in this example, a new file-based database)
let db = new sqlite3.Database(
  "./mydatabase.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  }
);
module.exports = {
  getHistory: async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM histories", (error, row) => {
        if (error) {
          console.log(error);
          console.error(error.message);
          return reject(error.message);
        }
        console.log(row);
        return resolve(row);
      });
    });
  },
  addHistory: (record) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO histories (search) VALUES('${record}')`,
        (error, row) => {
          if (error) {
            console.log(error);
            console.error(error.message);
            return reject(error.message);
          }
          console.log(row);
          return resolve(row);
        }
      );
    });
  },
};
