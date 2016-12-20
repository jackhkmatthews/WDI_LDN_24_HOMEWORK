const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', {title: 'Home'}));
router.get('/work', (req, res) => res.render('work', {title: 'Work'}));
router.get('/about', (req, res) => res.render('about', {title: 'About'}));
router.get('/contact', (req, res) => res.render('contact', {title: 'Contact'}));
router.get('/project', (req, res) => res.render('project', {title: 'Project'}));

module.exports.router = router;
