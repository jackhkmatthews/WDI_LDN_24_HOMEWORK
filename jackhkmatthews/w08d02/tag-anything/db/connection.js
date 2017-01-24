var mongoose = require('mongoose');

const ProductsSchema = {
  name: String
};

mongoose.model('Product', ProductsSchema);

mongoose.connect('mongodb://localhost/tag-anything');

module.exports = mongoose;
