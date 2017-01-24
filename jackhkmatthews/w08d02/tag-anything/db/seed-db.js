const mongoose = require('./connection');
const seedData = require('./seeds');

const Product = mongoose.model('Product');

Product.remove().then(() => {
  Product.create(seedData).then(() => {
    process.exit();
  });
});
