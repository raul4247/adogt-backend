const UserDao = require("../DAO/user");

class UserController {
  static async list(req, res) {
    try {
      const users = await UserDao.list();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserDao.getById(id);
      if (!user) return res.status(400).json();

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async create(req, res) {
    const { name, surname, email, cellphone, password } = req.query;
    try {
      const { id, hashedPassword } = await UserDao.create(
        name,
        surname,
        email,
        cellphone,
        password
      );

      res.json({ id, name, surname, email, cellphone, hashedPassword });
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, surname, email, cellphone } = req.query;
    try {
      const user = await UserDao.getById(id);
      if (!user) return res.status(400).json();

      await UserDao.update(id, name, surname, email, cellphone);
      res.json({ id, name, surname, email, cellphone });
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await UserDao.getById(id);
      if (!user) return res.status(400).json();

      await UserDao.delete(id);
      res.status(200).json();
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }
}

module.exports = UserController;
