const PetDao = require("../DAO/pet");

class PetController {
  static async list(req, res) {
    try {
      const pets = await PetDao.list();
      console.log("Lista de pets recuperada");
      res.json(pets);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    const { userId, name, age, breed, description } = req.body;
    try {
      const id = await PetDao.create(userId, name, age, breed, description);
      console.log("Pet Criado com: Id:" + id);
      res.json({ id, userId, name, age, breed, description });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { userId, name, age, breed, description, status } = req.body;
    try {
      const pet = await PetDao.getById(id);
      if (!pet)
        return res
          .status(400)
          .json({ error: "Pet with id " + id + " Not Found" });

      await PetDao.update(id, userId, name, age, breed, description, status);
      console.log(
        "Pet updated:\n",
        id,
        userId,
        name,
        age,
        breed,
        description,
        status
      );
      res.json({ id, userId, name, age, breed, description, status });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async updateDescription(req, res) {
    const { id } = req.params;
    const { description } = req.body;
    try {
      const pet = await PetDao.getById(id);
      if (!pet)
        return res
          .status(400)
          .json({ error: "Pet with id " + id + " Not Found" });

      await PetDao.update(
        id,
        pet.userId,
        pet.name,
        pet.age,
        pet.breed,
        description,
        pet.status
      );

      res.json({
        id,
        userId: pet.userId,
        name: pet.name,
        age: pet.age,
        breed: pet.breed,
        description,
        status: pet.status,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const pet = await PetDao.getById(id);
      if (!pet)
        return res.status(400).json({ error: "Pet with id" + " Not Found" });

      await PetDao.update(
        id,
        pet.userId,
        pet.name,
        pet.age,
        pet.breed,
        pet.description,
        status
      );

      res.json({
        id,
        user: pet.userId,
        name: pet.name,
        age: pet.age,
        breed: pet.breed,
        description: pet.description,
        status,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const pet = await PetDao.getById(id);
      if (!pet)
        return res.status(400).json({ error: "Pet with id" + " Not Found" });

      await PetDao.delete(id);
      console.log(pet.name + " Deleted!!");
      res.status(200).json();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PetController;
