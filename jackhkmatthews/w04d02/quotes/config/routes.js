const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

//routes


//index (no show)
router.get('/', (req, res) => res.redirect('/quotes'));
router.get('/quotes', quotesController.index);

//edit
router.get('/quotes/:id/edit', quotesController.edit);

//update
router.put('/quotes/:id', (req, res) => {
  const id = req.params.id;
  const index = quotes.findIndex(quote => {
    return quote.id === parseInt(req.params.id);
  });
  const quote = req.body.quote;
  quote.id = id;
  quotes[index] = quote;
  res.redirect('/');
});

module.exports = router;
