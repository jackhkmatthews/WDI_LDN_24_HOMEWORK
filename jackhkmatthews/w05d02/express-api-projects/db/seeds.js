const mongoose = require('mongoose');
const User = require('../models/user');
const Project = require('../models/project');

const databaseUrl = process.env.MONGOLAB_UBI || 'mongodb://localhost:27017/express-api-projects';

mongoose.connect(databaseUrl, () => {
  return console.log(`connect to db: ${databaseUrl}`);
});

const user1 = new User({
  'name': 'Jack',
  'twitter': '@jackhkmathews',
  'github': 'jackhkmatthews',
  'image': 'https://pbs.twimg.com/profile_images/809364026916478976/m6kXQ2-N.jpg',
  'bio': 'Junior Web Developer currently completing the General Assembly London Wed Development Immersive course.',
  'portfolio': 'jackhkmatthews.com'
});

user1.save((err) => {
  if (err) return console.log(err);
  return console.log(user1);
});

const project1 = new Project({
  'name': 'My cool project'
});

project1.save((err) => {
  if (err) return console.log(err);
  return console.log(project1);
});
