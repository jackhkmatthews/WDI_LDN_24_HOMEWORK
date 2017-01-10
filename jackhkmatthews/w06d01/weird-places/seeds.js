const mongoose = require('mongoose');
const Location = require('./models/location');
const config = require('./config/config');

mongoose.connect(config.db, () => console.log(`connected to ${config.db}`));

Location.collection.drop();

const ditch = new Location({
  'lat': '51.634943',
  'lng': '-0.110356',
  'name': 'ditch \'em',
  'student': 'Jack Matthews',
  'weirdness': 0,
  'picture': 'http://www.duboisswcd.org/dcswcd/images/ditch.jpg'
});

const catIsland = new Location({
  name: 'Cat Island',
  lat: '38.297914',
  lng: '141.417343',
  student: 'Henry',
  weirdness: 3,
  picture: 'https://cdn.theatlantic.com/assets/media/img/photo/2015/03/aoshima-japans-cat-island/c01_RTR4RUGT/main_1500.jpg'
});

const xmasIsland = new Location({
  lat: '-10.437005',
  lng: '105.691689',
  name: 'Christmas Island',
  student: 'Henry',
  weirdness: 2,
  picture: 'https://media-cdn.tripadvisor.com/media/photo-s/01/f7/d8/e3/filename-christmas-island.jpg'
});

const easterIsland = new Location({
  lat: '-27.105183',
  lng: '-109.348087',
  name: 'Easter Island',
  student: 'Henry',
  weirdness: 3,
  picture: 'https://cdn.arstechnica.net/wp-content/uploads/2016/02/6691281879_d67effd43f_b-640x427.jpg'
});

const bermudaTriangle = new Location({
  lat: '25.000340',
  lng: '-71.000021',
  name: 'Bermuda Triangle',
  student: 'Henry',
  weirdness: 3,
  picture: 'http://www.livescience.com/images/i/000/018/251/original/bermuda-shipwreck-02.jpg?interpolation=lanczos-none&downsize=660:*'
});

const reedFluteCave = new Location({
  lat: '25.304592',
  lng: '110.273567',
  name: 'Reed Flute Cave',
  student: 'Henry',
  weirdness: 3,
  picture: 'http://media.cntraveler.com/photos/565345806f74facb3e9e2fdb/master/w_2880,c_limit/reed-flute-cave-guilin-china-cr-getty.jpg'
});

const socotra = new Location({
  lat: '12.503034',
  lng: '53.816809',
  name: 'Socotra, Yemen',
  student: 'Henry',
  weirdness: 2,
  picture: 'http://media.cntraveler.com/photos/56556b9e659c4b48748660c4/master/w_2880,c_limit/dragon-trees-socotra-yemen.jpg'
});

const lochNess = new Location({
  lat: '57.331081',
  lng: '-4.422727',
  name: 'Loch Ness',
  student: 'Ed',
  weirdness: 3,
  picture: 'http://cdn.images.express.co.uk/img/dynamic/80/590x/Monster-635042.jpg'
});

const locations = [catIsland, ditch, lochNess, xmasIsland, easterIsland, bermudaTriangle, reedFluteCave, socotra];

for (const location of locations) {
  location.save((err, location) => {
    if (err) return console.log(err);
    return console.log(location);
  });
}
