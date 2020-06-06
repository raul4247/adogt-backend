const { v4 } = require("uuid");
const { executeQuery } = require("../database/connection");

class PetDao {
  static async list() {
    const sql = "SELECT * FROM Pet";
    const pets = await executeQuery(sql);
    return pets;
  }

  static async getById(id) {
    const sql = `SELECT * FROM Pet WHERE id = ?`;
    const [pet] = await executeQuery({ sql, values: [id] });
    return pet;
  }

  static async create(userId, name, age, breed, description) {
    const uuid = v4();

    const sql = `INSERT INTO Pet(id, userId, name, age, breed, description, createdAt, status) VALUES(?, ?, ?, ?, ?, ?, current_timestamp(), ?)`;
    await executeQuery({
      sql,
      values: [uuid, userId, name, age, breed, description, "disponivel"],
    });

    return uuid;
  }

  static async update(id, userId, name, age, breed, description, status) {
    const sql = `UPDATE Pet SET userId=?, name=?, age=?, breed=?, description=?, status=? WHERE id=?`;
    await executeQuery({
      sql,
      values: [userId, name, age, breed, description, status, id],
    });
  }

  static async delete(id) {
    const sql = `DELETE FROM Pet WHERE id=?`;
    executeQuery({ sql, values: [id] });
  }

  static async getPetsByUser(userId) {
    const sql = `SELECT * FROM Pet WHERE userId=?`;
    const pets = await executeQuery({ sql, values: [userId] });
    return pets;
  }
}

module.exports = PetDao;
