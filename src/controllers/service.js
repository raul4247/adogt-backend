const UserDao = require("../DAO/user");
const PetDao = require("../DAO/pet");

class ServiceController {
  static async getPetsByUser(req, res) {
    const { id } = req.params;

    const user = await UserDao.getById(id);
    if (!user)
      return res
        .status(400)
        .json({ error: "User with id " + id + " Not Found" });

    try {
      const pets = await PetDao.getPetsByUser(id);
      console.log("Pets do" + user.email + "recuperados!!");
      res.json(pets);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ServiceController;
