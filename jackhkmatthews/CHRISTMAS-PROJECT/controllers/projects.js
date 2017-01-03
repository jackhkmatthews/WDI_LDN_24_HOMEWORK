const Project = require('../models/project.js');
const Creator = require('../models/creator.js');

function projectsHome(req, res) {
  Project
  .find({})
  .populate(['creator'])
  .exec((err, projects) => {
    if (err) return console.log(err);
    return res.render('home', {projects});
  });
}

function projectsNew(req, res) {
  Creator.find({}, (err, creators) => {
    if (err) return console.log(err);
    return res.render('projects/new', {error: null, creators });
  });
}

function projectsCreate(req, res) {
  console.log(req.body);
  const project = new Project(req.body.project);
  project.save((err, project) => {
    if(err) return console.log(err);
    return res.redirect('/projects');
  });
}

function projectsIndex(req, res) {
  Project
  .find({})
  .populate(['creator'])
  .exec((err, projects) => {
    if (err) return console.log(err);
    return res.render('projects/index', {projects});
  });
}

function projectsShow(req, res) {
  const id = req.params.id;
  Project
  .findById(id)
  .populate(['creator'])
  .exec((err, project) => {
    if (err) return console.log(err);
    console.log(project);
    return res.render('projects/show', { project: project, layout: 'projects/layout-projects' });
  });
}

function projectsDelete(req, res) {
  const id = req.params.id;
  Project.findByIdAndRemove(id, (err) => {
    if (err) return console.log(err);
    return res.redirect('/projects');
  });
}

function projectsEdit(req, res) {
  const id = req.params.id;
  Project
  .findById(id)
  .populate(['creator'])
  .exec((err, project) => {
    if (err) return console.log(err);
    Creator.find({}, (err, creators) => {
      if (err) console.log(err);
      return res.render('projects/edit', { project, creators });
    });
  });
}

function projectsUpdate(req, res) {
  const id = req.params.id;
  Project.findById(id, (err, project) => {
    if (err) return console.log(err);

    for (const field in Project.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.project[field] !== undefined) {
          project[field] = req.body.project[field];
        }
      }
    }

    project.save((err, project) => {
      if (err) return console.log(err);
      return res.redirect(`/projects/${project._id}`);
    });
  });
}

module.exports = {
  home: projectsHome,
  new: projectsNew,
  create: projectsCreate,
  index: projectsIndex,
  show: projectsShow,
  delete: projectsDelete,
  edit: projectsEdit,
  update: projectsUpdate
};
