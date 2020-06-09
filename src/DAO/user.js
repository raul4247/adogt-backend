const { v4 } = require("uuid");
const { executeQuery } = require("../database/connection");
const hashPassword = require("../configuration/hashPassword");
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

  static async getUserByEmail(email) {
    const sql = `SELECT * FROM User WHERE email = ?`;
    const [user] = await executeQuery({ sql, values: [email] });
    return user;
  }

  static async create(name, surname, email, cellphone, password) {
    const uuid = v4();
    const hashedPassword = await hashPassword(password); // hash password with bcrypt
    const sql = `INSERT INTO User(id, name, surname, email, password, cellphone, createdAt) VALUES(?, ?, ?, ?, ?, ?, current_timestamp())`;

    await executeQuery({
      sql,
      values: [uuid, name, surname, email, hashedPassword, cellphone],
    });

    return { uuid, hashedPassword };
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
