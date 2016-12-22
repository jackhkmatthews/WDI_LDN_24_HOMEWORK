const Video = require('../models/video.js');

function videosHome(req, res) {
  res.render('home');
}

function videosIndex(req, res) {
  Video.find({}, (err, videos) => {
    if (err) return console.log(err);
    return res.render('index', {videos});
  });
}

function videosNew(req, res) {
  res.render('new');
}

function videosCreate(req, res){
  const video = new Video(req.body.video);
  video.save((err, video) => {
    if (err) return console.log(err);
    res.redirect('/videos');
  });
}

function videosShow(req, res){
  Video.findById(req.params.id, (err, video) => {
    if (err) return console.log(err);
    if (!video) return console.log('No video found');
    return res.render('show', { video });
  });
}

function videoEdit(req, res){
  Video.findById(req.params.id, (err, video) => {
    if (err) return console.log(err);
    if (!video) return console.log('No video found');
    return res.render('edit', { video });
  });
}

function videoUpdate(req, res){
  Video.findByIdAndUpdate(req.params.id, req.body.video, { new: true }, (err, video) => {
    if (err) return console.log(err);
    if (!video) return console.log('No video found');
    return res.redirect(`/videos/${video._id}`);
  });
}

function videosDelete(req, res) {
  Video.findByIdAndRemove(req.params.id, err => {
    if (err) return console.log(err);
    return res.redirect('/videos');
  });
}

module.exports = {
  home: videosHome,
  index: videosIndex,
  new: videosNew,
  create: videosCreate,
  show: videosShow,
  edit: videoEdit,
  update: videoUpdate,
  delete: videosDelete
};
