const User = require('../models/user');
// const Project = require('../models/project');

function usersIndex(req, res) {
  User
  .find({})
  .populate(['projects'])
  .exec((err, users) => {
    if (err) return res.json({message: err});
    return res.json(users);
  });
}

function usersCreate(req, res) {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'please send correct info'});
    return res.status(201).json(user);
  });
}

function usersShow(req, res) {
  const id = req.params.id;
  User
  .findById(id)
  .populate(['projects'])
  .exec((err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'user not found'});
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res) {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({message: 'user not found'});
    for (const field in User.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      }
    }
    user.save((err, user) => {
      if (err) return console.log(err);
      return res.json(user);
    });
  });
}

function usersDelete(req, res) {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found'});
    return res.status(200).json({message: 'user deleted'});
  });
}


module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
