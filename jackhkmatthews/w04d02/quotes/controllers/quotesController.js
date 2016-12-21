const quotes = require('../data/quotes.js');

//landing
function quotesLanding(req, res) {
  res.render('home');
}

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
  const id = parseInt(req.params.id);
  const index = quotes.findIndex(quote => {
    return quote.id === parseInt(req.params.id);
  });
  const quote = req.body.quote;
  quote.id = id;
  quotes[index] = quote;
  res.redirect('/');
}

//new
function quotesNew(req, res){
  return res.render('new', { quotes });
}

//create
function quotesCreate(req, res){
  const id = (quotes.length +1);
  const quote = req.body.quote;
  quote.id = id;
  quotes[quotes.length] = quote;
  res.redirect('/');
}

//delete
function quotesDelete(req, res){
  const index = quotes.findIndex(quote => {
    return quote.id === parseInt(req.params.id);
  });
  quotes.splice(index, 1);
  res.redirect('/');
}

module.exports = {
  landing: quotesLanding,
  index: quotesIndex,
  edit: quotesEdit,
  update: quotesUpdate,
  new: quotesNew,
  create: quotesCreate,
  delete: quotesDelete
};
