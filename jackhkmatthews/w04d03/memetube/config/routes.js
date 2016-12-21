const express = require('express');
const router = express.Router();
const memesController = require('../controllers/memesController');

//landing page
router.route('/')
  .get(memesController.home);

//index and create
router.route('/memes')
  .get(memesController.index)
  .post(memesController.create);

//new
router.route('/memes/new')
  .get(memesController.new);


// show, update and delete
router.route('/memes/:id')
  .get(memesController.show)
  .put(memesController.update)
  .delete(memesController.delete);

// Edit
router.route('/memes/:id/edit')
  .get(memesController.edit);





module.exports = router;
