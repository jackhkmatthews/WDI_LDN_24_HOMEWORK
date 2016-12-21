const express = require('express');
const router = express.Router();

const quotes = [
  {
    imgSource: 'https://pbs.twimg.com/profile_images/440582747510558721/PGqHqrHY.jpeg',
    person: 'Alex Turner',
    artist: 'Arctic Monkeys',
    quote: '"Yeah but his bird thinks it\'s amazing, though.  So all that\'s left.  Is the proof that love\'s not only blind but deaf"',
    id: 1
  },
  {
    imgSource: 'https://www.the-plug.com/sites/the-plug.com/files/styles/events_full/public/events/2358/kano%201.jpg?itok=OKLTbIC7',
    person: 'Kane Robinson',
    artist: 'Kano',
    quote: '"My art\'s a major artery, can\'t function without it"',
    id: 2
  },
  {
    imgSource: 'https://cdn.theculturetrip.com/wp-content/uploads/2016/08/1401x788-cb-1_byshayan-asgharnia_remedialmediallc.jpg',
    person: 'Charles Bradley',
    artist: 'Charles Bradley',
    quote: '"I gave my love so easy and free.  You took my emotion.  Now get away from me"',
    id: 3
  }
];

//routes
router.get('/', (req, res) => res.render('home'));
router.get('/quotes', (req, res) => res.render('index', {quotes}));
router.get('/quotes/:id', (req, res) => res.render('show'));

module.exports = router;
