const UserDao = require("../DAO/user");
const { generateWebToken } = require("../configuration/security");

class UserController {
  static async login(req, res) {
    try {
      const token = await generateWebToken(req.user);
      console.log(req.user.email + " logado!!");
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(401).send();
    }
  }
  static async list(req, res) {
    try {
      const users = await UserDao.list();
      console.log("Lista de usuarios recuperados");
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserDao.getById(id);
      if (!user)
        return res
          .status(400)
          .json({ error: "User with id " + id + " Not Found" });

      console.log("Usuario Recuperado", user);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getByEmail(req, res) {
    const { email } = req.params;

    try {
      const user = await UserDao.getUserByEmail(email);
      if (!user)
        return res
          .status(400)
          .json({ error: "User with id " + id + " Not Found" });

      console.log("Usuario Recuperado", user);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    const { name, surname, email, cellphone, password } = req.body;
    try {
      const { id, hashedPassword } = await UserDao.create(
        name,
        surname,
        email,
        cellphone,
        password
      );

      console.log(
        "Usuario Criado com: Id:" + id + " e senha:" + hashedPassword
      );
      res.json({
        id,
        name,
        surname,
        email,
        cellphone,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, surname, email, cellphone } = req.body;
    try {
      const user = await UserDao.getById(id);
      if (!user)
        return res
          .status(400)
          .json({ error: "User with id " + id + " Not Found" });

      await UserDao.update(id, name, surname, email, cellphone);

      console.log("User updated:\n", id, name, surname, email, cellphone);
      res.json({ id, name, surname, email, cellphone });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await UserDao.getById(id);
      if (!user)
        return res
          .status(400)
          .json({ error: "User with id " + id + " Not Found" });

      console.log(user.email + " Deleted!!");
      await UserDao.delete(id);
      res.status(200).json();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
