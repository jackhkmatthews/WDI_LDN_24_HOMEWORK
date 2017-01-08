const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authentications = require('../controllers/authentications');


////////////users////////////
//new and edit not required//

//index and create
router.route('/users')
  .post(users.new)
  .get(users.index);

//register
router.route('/users/register')
  .post(authentications.register);

//login
router.route('/users/login')
  .post(authentications.login);

//show and delete and update
router.route('/users/:id')
  .get(users.show)
  .delete(users.delete)
  .put(users.update);

module.exports = router;
