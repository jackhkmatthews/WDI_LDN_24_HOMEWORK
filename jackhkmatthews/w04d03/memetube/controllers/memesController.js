const Meme = require('../models/meme.js');

function memesHome(req, res) {
  res.render('home');
}

function memesIndex(req, res) {
  Meme.find({}, (err, memes) => {
    if (err) return console.log(err);
    return res.render('index', {memes});
  });
}

function memesNew(req, res) {
  res.render('new');
}

function memesCreate(req, res){
  const meme = new Meme(req.body.meme);
  meme.save((err, meme) => {
    if (err) return console.log(err);
    console.log(meme);
    res.redirect('/');
  });
}

module.exports = {
  home: memesHome,
  index: memesIndex,
  new: memesNew,
  create: memesCreate
};
