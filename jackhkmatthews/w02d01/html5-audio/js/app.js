console.log('js loaded');
var body;
////////////////////////////////////
//soundboard////////////////////////
///////////////////////////////////


//want to create soundboard object and generate html from javascript
//most of css will be kept seperate

//give soundboard a title
//create soundtrack html audio tag with source
//create 16 audio html audio tags with appropriate IDs
//create backing track button
  //make it listen for clicks
    //once clicked play backing song (will be applause to begin with)
//create mute button for backing track
  //make it listen for clicks
    //once clicked mute soundtrack audio
//volume slider for backing track
  //when slide should change backing track volume
//create soundboard grid 4 x 4
  //give each cell apropariate ID in relation to what audio will be played
  //make each cell listen for clicks
    //once clicked should play appropriate sound


//required variables of soundboard object
//title, base, height, width, backing track, sound bites

var Soundboard = Soundboard || {};

Soundboard.title                      = 'Daft Punk';
Soundboard.gridBase                   = 4;
Soundboard.width                      = 400;
Soundboard.backingTrack               = {
  name: 'backing track',
  location: 'file/files.wav'
};
Soundboard.soundBitesObject           = {
  after: 'daft-punk/sounds/after.wav',
  better: 'daft-punk/sounds/better.wav',
  do_it: 'daft-punk/sounds/do_it.wav',
  ever: 'daft-punk/sounds/ever.wav',
  faster: 'daft-punk/sounds/faster.wav',
  harder: 'daft-punk/sounds/harder.wav',
  hour: 'daft-punk/sounds/hour.wav',
  make_it: 'daft-punk/sounds/make_it.wav',
  makes_us: 'daft-punk/sounds/makes_us.wav',
  more_than: 'daft-punk/sounds/more_than.wav',
  never: 'daft-punk/sounds/never.wav',
  our: 'daft-punk/sounds/our.wav',
  over: 'daft-punk/sounds/over.wav',
  stronger: 'daft-punk/sounds/stronger.wav',
  work_is: 'daft-punk/sounds/work_is.wav',
  work_it: 'daft-punk/sounds/work_it.wav'
};
Soundboard.soundBitesLocationArray    = Object.values(Soundboard.soundBitesObject);
Soundboard.soundBitesNameArray        = Object.keys(Soundboard.soundBitesObject);
Soundboard.numberOfSoundBites         = Soundboard.soundBitesLocationArray.length;

Soundboard.start = function(){
  console.log('soundboard started');
  body = document.getElementsByTagName('body')[0];
  Soundboard.createTitle();
  Soundboard.createAudioTags();
  Soundboard.createGrid();
  Soundboard.makeCellsListen();
};

Soundboard.createTitle = function (){
  var title = document.createElement('h1');
  title.innerHTML = Soundboard.title;
  body.appendChild(title);
};

Soundboard.createAudioTags = function(){
  for (var i = 0; i < Soundboard.numberOfSoundBites; i++) {
    var biteAudioTag = document.createElement('audio');
    biteAudioTag.src = Soundboard.soundBitesLocationArray[i];
    biteAudioTag.setAttribute('class', Soundboard.soundBitesNameArray[i]);
    body.appendChild(biteAudioTag);
  }
  var backingAudioTag = document.createElement('audio');
  backingAudioTag.src = Soundboard.backingTrack.location;
  backingAudioTag.setAttribute('id', Soundboard.backingTrack.name);
  body.appendChild(backingAudioTag);
};

Soundboard.createGrid = function(){
  var grid = document.createElement('ul');
  grid.style.width = Soundboard.width + 'px';
  for (var i = 0; i < Soundboard.numberOfSoundBites; i++) {
    var cell = document.createElement('li');
    cell.setAttribute('class', Soundboard.soundBitesNameArray[i]);
    cell.style.width = (Soundboard.width / Soundboard.gridBase)  + 'px';
    cell.style.height = cell.style.width;
    cell.style.lineHeight = cell.style.height;
    cell.innerHTML = Soundboard.soundBitesNameArray[i];
    grid.appendChild(cell);
  }
  body.appendChild(grid);
};

Soundboard.makeCellsListen = function(){
  for (var i = 0; i < Soundboard.numberOfSoundBites; i++) {
    var cell = document.querySelector('li.' + Soundboard.soundBitesNameArray[i]);
    cell.addEventListener('click', Soundboard.playAudio);
  }
};

Soundboard.playAudio = function(){
  var audio = document.querySelector('audio.' + this.className);
  audio.play();
};

window.onload = Soundboard.start;
