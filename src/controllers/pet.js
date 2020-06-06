const PetDao = require("../DAO/pet");

class PetController {
  static async list(req, res) {
    try {
      const pets = await PetDao.list();
      res.json(pets);
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const pet = await PetDao.getById(id);
      if (!pet) return res.status(400).json();

      res.json(pet);
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async create(req, res) {
    const { userId, name, age, breed, description } = req.query;
    try {
      const id = await PetDao.create(userId, name, age, breed, description);
      res.json({ id, userId, name, age, breed, description });
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { userId, name, age, breed, description, status } = req.query;
    try {
      const pet = await PetDao.getById(id);
      if (!pet) return res.status(400).json();

      await PetDao.update(id, userId, name, age, breed, description, status);
      res.json({ id, userId, name, age, breed, description, status });
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }

  static async updateDescription(req, res) {
    const { id } = req.params;
    const { description } = req.query;
    try {
      const pet = await PetDao.getById(id);
      if (!pet) return res.status(400).json();

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
      res.status(500).json();
    }
  }

  static async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.query;
    try {
      const pet = await PetDao.getById(id);
      if (!pet) return res.status(400).json();

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
      res.status(500).json();
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const pet = await PetDao.getById(id);
      if (!pet) return res.status(400).json();

      await PetDao.delete(id);
      res.status(200).json();
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  }
}

module.exports = PetController;
