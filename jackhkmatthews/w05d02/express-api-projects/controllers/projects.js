const Project = require('../models/project');

function projectsIndex(req, res) {
  Project.find({}, (err, projects) => {
    if (err) return res.json({message: err});
    return res.json(projects);
  });
}

function projectsCreate(req, res) {
  const project = new Project(req.body);
  project.save((err, project) => {
    if (err) return res.status(500).json({message: err});
    if (!project) return res.status(404).json({message: 'please send correct info'});
    return res.status(201).json(project);
  });
}

function projectsShow(req, res) {
  const id = req.params.id;
  Project.findById(id, (err, project) => {
    if (err) return res.status(500).json({message: err});
    if (!project) return res.status(404).json({message: 'project not found'});
    return res.status(200).json(project);
  });
}

function projectsUpdate(req, res) {
  const id = req.params.id;
  Project.findById(id, (err, project) => {
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json({message: 'project not found'});
    for (const field in Project.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body[field] !== undefined) {
          project[field] = req.body[field];
        }
      }
    }
    project.save((err, project) => {
      if (err) return console.log(err);
      return res.json(project);
    });
  });
}

function projectsDelete(req, res) {
  const id = req.params.id;
  Project.findByIdAndRemove(id, (err, project) => {
    if (err) return res.status(500).json({message: err});
    if (!project) return res.status(404).json({message: 'no project found'});
    return res.status(200).json({message: 'project deleted'});
  });
}


module.exports = {
  index: projectsIndex,
  create: projectsCreate,
  show: projectsShow,
  update: projectsUpdate,
  delete: projectsDelete
};
