const { v4 } = require("uuid");
const { executeQuery } = require("../database/connection");

class UserDao {
  static async list() {
    const sql = "SELECT * FROM User";
    const users = await executeQuery(sql);
    return users;
  }

  static async getById(id) {
    const sql = `SELECT * FROM User WHERE id = ?`;
    const [user] = await executeQuery({ sql, values: [id] });
    return user;
  }

  static async create(name, surname, email, cellphone) {
    const uuid = v4();
    const sql = `INSERT INTO User(id, name, surname, email, cellphone, createdAt) VALUES(?, ?, ?, ?, ?, current_timestamp())`;

    await executeQuery({
      sql,
      values: [uuid, name, surname, email, cellphone],
    });

    return uuid;
  }

  static async update(id, name, surname, email, cellphone) {
    const sql = `UPDATE User SET name= ?, surname= ?, email= ?, cellphone= ? WHERE id= ?`;
    await executeQuery({
      sql,
      values: [name, surname, email, cellphone, id],
    });
  }

  static async delete(id) {
    const sql = `DELETE FROM User WHERE id=?`;
    executeQuery({ sql, values: [id] });
  }
}

module.exports = UserDao;
