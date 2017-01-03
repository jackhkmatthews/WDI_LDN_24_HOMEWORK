const Creator = require('../models/creator.js');
const Project = require('../models/project.js');

function creatorsNew(req, res) {
  res.render('creators/new');
}

function creatorsCreate(req, res) {
  console.log(req.body);
  const creator = new Creator(req.body.creator);
  creator.save((err, creator) => {
    if(err) return console.log(err);
    return res.redirect('/projects/new');
  });
}

function creatorsIndex(req, res) {
  Creator.find({}, (err, creators) => {
    if (err) return console.log(err);
    return res.render('creators/index', {creators});
  });
}

function creatorsShow(req, res) {
  const id = req.params.id;
  Creator.findById(id, (err, creator) => {
    if (err) return console.log(err);
    Project.find({'creator': id}, (err, projects) => {
      if (err) return console.log(err);
      console.log(projects);
      return res.render('creators/show', {creator: creator, projects: projects, layout: 'layout'});
    });
  });
}

function creatorsDelete(req, res) {
  const id = req.params.id;
  Creator.findByIdAndRemove(id, (err) => {
    if (err) return console.log(err);
    return res.redirect('/creators');
  });
}

function creatorsEdit(req, res) {
  const id = req.params.id;
  Creator.findById(id, (err, creator) => {
    if (err) return console.log(err);
    console.log(creator);
    return res.render('creators/edit', {creator});
  });
}

function creatorsUpdate(req, res) {
  const id = req.params.id;
  Creator.findById(id, (err, creator) => {
    if (err) return console.log(err);

    for (const field in Creator.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.creator[field] !== undefined) {
          creator[field] = req.body.creator[field];
        }
      }
    }

    creator.save((err, creator) => {
      if (err) return console.log(err);
      return res.redirect(`/creators/${creator._id}`);
    });
  });
}

module.exports = {
  new: creatorsNew,
  create: creatorsCreate,
  index: creatorsIndex,
  show: creatorsShow,
  delete: creatorsDelete,
  edit: creatorsEdit,
  update: creatorsUpdate
};
