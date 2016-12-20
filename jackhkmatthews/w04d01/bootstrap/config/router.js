const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', {title: 'Home'}));
router.get('/projects', (req, res) => res.render('index', {title: 'Work'}));
router.get('/about', (req, res) => res.render('about', {title: 'About'}));
router.get('/contact', (req, res) => res.render('contact', {title: 'Contact'}));
router.get('/projects/:project', (req, res) => {
  const project = req.params.project;
  return res.render(`projects/${project}`, {title: 'Projects', layout: 'project-layout' });
});
module.exports.router = router;
