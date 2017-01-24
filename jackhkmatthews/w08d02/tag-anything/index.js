const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/connection');
const app = express();

const Product = mongoose.model('Product');

app.use(bodyParser.json({urlencoded: true}));
app.use('/', express.static('public'));
app.use('/', express.static('bower_components'));

app.get('/api/products', (req, res) => {
  Product.find().then((products) => {
    res.json(products);
  });
});

app.get('/api/products/:name', (req, res) => {
  Product.findOne({name: req.params.name}).then((product) => {
    res.json(product);
  });
});

app.delete('/api/products/:name', (req, res) => {
  Product.findOneAndRemove({name: req.params.name}).then(() => {
    res.json({success: true});
  });
});

app.patch('/api/products/:name', (req, res) => {
  Product.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then((product) => {
    res.json(product);
  });
});


app.post('/api/products', (req, res) => {
  Product.create(req.body).then((product) => {
    res.json(product);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000, () => console.log('express runnign on port 3000'));
