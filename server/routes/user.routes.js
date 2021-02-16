// inside of user.routes.js
const Users = require('../controllers/user.controllers');
//const { authenticate } = require('../config/jwt.config');
module.exports = app => {
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  //get("/api/users", authenticate, Users.getAll);
}
