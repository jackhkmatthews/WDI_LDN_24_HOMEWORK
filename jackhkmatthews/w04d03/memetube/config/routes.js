const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

//landing page
router.route('/')
  .get(videosController.home);

//index and create
router.route('/videos')
  .get(videosController.index)
  .post(videosController.create);

//new
router.route('/videos/new')
  .get(videosController.new);


// show, update and delete
router.route('/videos/:id')
  .get(videosController.show)
  .put(videosController.update)
  .delete(videosController.delete);

// Edit
router.route('/videos/:id/edit')
  .get(videosController.edit);





module.exports = router;
