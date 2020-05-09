const { Router } = require("express");
const UserController = require("./controllers/user");
const PetController = require("./controllers/pet");
const ServiceController = require("./controllers/service");

const router = Router();
// User Routes
router.get("/user", UserController.list);
router.get("/user/:id", UserController.getById);
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
// Pet Routes
router.get("/pet", PetController.list);
router.get("/pet/:id", PetController.getById);
router.post("/pet", PetController.create);
router.put("/pet/:id", PetController.update);
router.put("/pet/:id/description", PetController.updateDescription);
router.put("/pet/:id/status", PetController.updateStatus);
router.delete("/pet/:id", PetController.delete);
// Service Routes
router.get("/getPetsByUser/:id", ServiceController.getPetsByUser);

module.exports = router;