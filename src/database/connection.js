const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

module.exports = {
  connection,
  executeQuery: (query) =>
    new Promise((resolve, reject) =>
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
        }

        connection.query(query, (err, results) => {
          if (err) {
            connection.rollback();
            reject(err);
          }
          connection.commit();
          resolve(results);
        });
      })
    ),
};
