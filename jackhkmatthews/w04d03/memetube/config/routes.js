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

//delete







module.exports = router;
