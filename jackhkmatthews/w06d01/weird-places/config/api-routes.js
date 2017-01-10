const express = require('express');
const router = express.Router();
const locations = require('../controllers/locations');

///////////////////////locations//////////////////////

//new and edit not required

//create and index
router.route('/locations')
  .post(locations.new)
  .get(locations.index);

//show
//edit
//update
//delete



module.exports = router;
