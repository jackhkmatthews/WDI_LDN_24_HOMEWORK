const express = require('express');
const router = express.Router();
const users = require('../controllers/users');


////////////users////////////
//new and edit not required//

//index and create
router.route('/users')
  .post(users.new)
  .get(users.index);

//show and delete and update
router.route('/users/:id')
  .get(users.show)
  .delete(users.delete)
  .post(users.update);

module.exports = router;
