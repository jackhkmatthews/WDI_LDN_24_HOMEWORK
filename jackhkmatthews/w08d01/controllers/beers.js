const Beer = require('../models/beer');

function beersCreate(req, res){
  const beer = new Beer(req.body);
  beer
  .save((err, user) => {
    if (err) return res.status(500).json({
      message: 'something went wrong',
      err: err
    });
    return res.status(200).json({
      message: 'beer created',
      user: user
    });
  });
}

function beersIndex(req, res){
  var regex = new RegExp(req.params.searchTerm, 'i');
  Beer
  .find({name: regex}, (err, beers) => {
    if (err) return res.status(500).json({
      message: 'something went wrong',
      err: err
    });
    if (!beers) return res.status(404).json({message: 'no beers found'});
    return res.status(200).json({
      message: 'all the beers',
      beers: beers
    });
  });
}

function beersShow(req, res){
  Beer
  .findById(req.params.id, (err, beer) => {
    if (err) return res.status(500).json({
      message: 'something went wrong',
      err: err
    });
    if (!beer) return res.status(404).json({
      message: 'no beer found'
    });
    return res.status(200).json({
      message: 'beer shown!',
      beer: beer
    });
  });
}

function beersUpdate(req, res){
  Beer
  .findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, beer) => {
    if (err) return res.status(500).json({
      message: 'something went wrong',
      err: err
    });
    if (!beer) return res.status(404).json({message: 'no beer found'});
    return res.status(200).json({
      message: 'user updated',
      beer: beer
    });
  });
}

function beersDelete(req, res){
  Beer
  .findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).message({
      message: 'something went wrong',
      err: err
    });
    return res.status(200).json({message: 'beer deleted'});
  });
}

module.exports = {
  create: beersCreate,
  index: beersIndex,
  show: beersShow,
  update: beersUpdate,
  delete: beersDelete
};
