const User = require('../models/user');


function usersCreate(req, res){
  const user = new User(req.body);
  user.save(req.body, (err, user) =>{
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(400).json({message: 'send correct information'});
    res.status(201).json({
      message: 'user created!',
      user
    });
  });
}

function usersIndex(req, res){
  User.find({}, (err, users) => {
    if (err) return res.status(500).json({message: err});
    if (!users) return res.status(404).json({message: 'no users found :-('});
    return res.status(200).json({
      messge: 'users indexed!',
      users
    });
  });
}

function usersShow(req, res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found. Invalid ID'});
    return res.status(200).json({
      message: 'user shown!',
      user
    });
  });
}

function usersUpdate(req,res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found. Invalid ID'});

    for (const field in User.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      }
    }

    user.save((err, user)=>{
      if (err) return res.status(500).json({message: err});
      return res.status(200).json({
        message: 'user updated!',
        user
      });
    });

  });
}

function usersDelete(req, res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'no user found!'});

    user.remove((err, user) => {
      if (err) return res.status(500).json({message: err});
      return res.status(200).json({
        message: 'user deleted!',
        user
      });
    });
  });
}

module.exports = {
  create: usersCreate,
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
