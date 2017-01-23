const express = require('express');
const router = express.Router();
const beers = require('../controllers/beers');

router.route('/beers')
  .get(beers.index)
  .post(beers.create);

router.route('/beers/:id')
  .get(beers.show)
  .put(beers.update)
  .delete(beers.delete);

module.exports = router;
