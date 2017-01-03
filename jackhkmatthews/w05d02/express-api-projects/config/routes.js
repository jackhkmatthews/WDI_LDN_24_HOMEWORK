const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.js');
const projectsController = require('../controllers/projects.js');

////////////////users//////////////////////
//index and create
router.route('/users')
  .get(usersController.index)
  .post(usersController.create);

//delete and show and update
router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

////////////////projects//////////////////////
//index and create
router.route('/projects')
  .get(projectsController.index)
  .post(projectsController.create);

//delete and show and update
router.route('/projects/:id')
  .get(projectsController.show)
  .put(projectsController.update)
  .delete(projectsController.delete);

module.exports = router;
