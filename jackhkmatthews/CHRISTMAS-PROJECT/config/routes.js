const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.js');
const creatorsController = require('../controllers/creators.js');

//project routes

//home page
router.get('/', projectsController.home);

//new
router.get('/projects/new', projectsController.new);

//create and index
router.route('/projects')
  .post(projectsController.create)
  .get(projectsController.index);

//show and delete and update
router.route('/projects/:id')
  .get(projectsController.show)
  .delete(projectsController.delete)
  .put(projectsController.update);

//edit
router.route('/projects/:id/edit')
  .get(projectsController.edit);

//creator routes
//new
router.get('/creators/new', creatorsController.new);

//create and index
router.route('/creators')
  .post(creatorsController.create)
  .get(creatorsController.index);

//show and delete and update
router.route('/creators/:id')
  .get(creatorsController.show)
  .delete(creatorsController.delete)
  .put(creatorsController.update);

//edit
router.route('/creators/:id/edit')
  .get(creatorsController.edit);

module.exports = router;
