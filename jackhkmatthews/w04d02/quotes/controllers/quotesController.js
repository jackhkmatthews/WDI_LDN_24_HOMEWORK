const quotes = require('../data/quotes.js');

//index (no show)
function quotesIndex(req, res){
  res.render('index', {quotes});
}

//edit
function quotesEdit(req, res) {
  const quote = quotes.filter(quote => {
    return quote.id === parseInt(req.params.id);
  });
  const index = quotes.findIndex(quote => {
    return quote.id === parseInt(req.params.id);
  });
  return res.render('edit', {
    'quoteToEdit': quote,
    'index': index,
    'quotes': quotes
  });
}

//update
function quotesUpdate(req, res) {
  const id = req.params.id;
  const index = quotes.findIndex(quote => {
    return quote.id === parseInt(req.params.id);
  });
  const quote = req.body.quote;
  quote.id = id;
  quotes[index] = quote;
  res.redirect('/');
}

module.exports = {
  index: quotesIndex,
  edit: quotesEdit,
  update: quotesUpdate
};
