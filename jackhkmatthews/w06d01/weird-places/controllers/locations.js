const Location = require('../models/location');

function locationsNew(req, res){
  console.log('posted to new');
  const location = new Location(req.body);
  location.save((err, location) => {
    if (err) return res.status(500).json({messsage: err});
    if (!location) return res.status(400).json({message: 'invalid data'});
    return res.status(200).json({
      message: 'location saved!',
      location
    });
  });
}

function locationsIndex(req, res){
  console.log('wanted to index');
  Location.find({}, (err, locations) => {
    if (err) return res.status(500).json({messsage: err});
    if (!locations) return res.status(404).json({message: 'no locations found'});
    return res.status(200).json({
      message: 'locations shown!',
      locations
    });
  });
}

module.exports = {
  new: locationsNew,
  index: locationsIndex
};
