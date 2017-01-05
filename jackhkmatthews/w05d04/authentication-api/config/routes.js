const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authentications = require('../controllers/authentications');

//new//////////////not needed with APIs
//edit////////////not need with APIs

//create and index
router.route('/users')
  .post(users.create)
  .get(users.index);

//show and update
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//register
router.route('/users/register')
  .post(authentications.register);

//login
router.route('/users/login')
  .post(authentications.login);



module.exports = router;
