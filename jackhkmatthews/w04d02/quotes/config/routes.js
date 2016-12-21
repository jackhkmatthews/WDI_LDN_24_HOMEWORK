const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

//routes

//home
router.get('/', quotesController.landing);

//index
router.get('/quotes', quotesController.index);

//edit
router.get('/quotes/:id/edit', quotesController.edit);

//update
router.put('/quotes/:id', quotesController.update);

//new
router.get('/quotes/new', quotesController.new);

//create
router.post('/quotes', quotesController.create);

//delete
router.delete('/quotes/:id', quotesController.delete);

module.exports = router;
