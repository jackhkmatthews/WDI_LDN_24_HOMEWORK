const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

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



module.exports = router;
