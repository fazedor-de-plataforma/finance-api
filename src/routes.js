const { Router } = require("express");
const UserController = require("./controllers/UserController");
const TransactionController = require("./controllers/TransactionController");

const routes = Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", UserController.auth);

routes.post("/transaction", TransactionController.create);
routes.get("/transactions", TransactionController.get);
routes.delete("/transaction/:id", TransactionController.delete);

module.exports = routes;