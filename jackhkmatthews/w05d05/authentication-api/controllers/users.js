const User = require('../models/user');

function usersNew(req, res){
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(400).json({message: 'please submit proper information'});
    return res.status(201).json({
      message: 'user created!!!',
      user
    });
  });
}

function usersIndex(req, res){
  User.find({}, (err, users) => {
    if (err) return res.status(500).json({message: err});
    if (!users) return res.status(404).json({message: 'no users in DB'});
    return res.status(200).json({
      message: 'users index!',
      users
    });
  });
}

function usersShow(req, res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found :('});
    return res.status(200).json({
      message: 'user shown!',
      user
    });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found at that id'});
    return res.status(200).json({
      message: 'user removed!',
      user
    });
  });
}

function usersUpdate(req, res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found at that id'});

    for (const field in User.schema.paths) {
      if ((field !== '_id') && (field !== '_v')) {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      }
    }

    user.save((err, user) => {
      if (err) return res.status(500).json({message: err});
      return res.status(200).json({
        message: 'user updated!',
        user
      });
    });

  });
}

module.exports = {
  new: usersNew,
  index: usersIndex,
  show: usersShow,
  delete: usersDelete,
  update: usersUpdate
};
