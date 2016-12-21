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
    res.redirect('/memes');
  });
}

function memesShow(req, res){
  Meme.findById(req.params.id, (err, meme) => {
    if (err) return console.log(err);
    if (!meme) return console.log('No meme found');
    return res.render('show', { meme });
  });
}

function memeEdit(req, res){
  Meme.findById(req.params.id, (err, meme) => {
    if (err) return console.log(err);
    if (!meme) return console.log('No meme found');
    return res.render('edit', { meme });
  });
}

function memeUpdate(req, res){
  Meme.findByIdAndUpdate(req.params.id, req.body.meme, { new: true }, (err, meme) => {
    if (err) return console.log(err);
    if (!meme) return console.log('No meme found');
    return res.redirect(`/memes/${meme._id}`);
  });
}

function memesDelete(req, res) {
  Meme.findByIdAndRemove(req.params.id, err => {
    if (err) return console.log(err);
    return res.redirect('/memes');
  });
}

module.exports = {
  home: memesHome,
  index: memesIndex,
  new: memesNew,
  create: memesCreate,
  show: memesShow,
  edit: memeEdit,
  update: memeUpdate,
  delete: memesDelete
};
