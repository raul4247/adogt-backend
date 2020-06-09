const { Router } = require("express");
const UserController = require("./controllers/user");
const PetController = require("./controllers/pet");
const ServiceController = require("./controllers/service");
const passport = require("passport");
const { local, bearer } = require("./configuration/security");

const router = Router();
// User Routes
router.get("/user", UserController.list);
router.get("/user/:id", UserController.getById);
router.get("/user/getByEmail/:email", UserController.getByEmail);
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/user/login", local, UserController.login);
// Pet Routes
router.get("/pet", PetController.list);
router.post("/pet", PetController.create);
router.put("/pet/:id", PetController.update);
router.put("/pet/:id/description", PetController.updateDescription);
router.put("/pet/:id/status", PetController.updateStatus);
router.delete("/pet/:id", PetController.delete);
// Service Routes
router.get("/getPetsByUser/:id", ServiceController.getPetsByUser);

module.exports = router;
