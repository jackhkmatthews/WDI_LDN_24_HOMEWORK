console.log('js loaded');
var body;
var main;


//todo:
// 1. auto generate navigation within functions
// 2. remove audio tags from DOM with improved click event logic
// 3. different button styles for each page
// 4. names on buttons
// 5. font styling
// 6. name annonymouse functions

function Soundboard(title, className, gridBase, width, backingTrackObject, soundBitesObject, backgroundImagePath){
  this.title                      = title;
  this.className                  = className;
  this.gridBase                   = gridBase;
  this.width                      = width;
  this.margin                     = ((this.width / this.gridBase) / 10);
  this.cellWidth                  = (this.width / this.gridBase) - (2 * this.margin);
  this.backingTrack               = backingTrackObject;
  this.soundBitesObject           = soundBitesObject;
  this.soundBitesLocationArray    = Object.values(soundBitesObject);
  this.soundBitesNameArray        = Object.keys(soundBitesObject);
  this.numberOfSoundBites         = Object.keys(soundBitesObject).length;
  this.backgroundImagePath        = backgroundImagePath;

  this.start = function(){
    console.log('soundboard started');
    main = document.getElementsByTagName('main')[0];
    body = document.getElementsByTagName('body')[0];
    main.innerHTML = '';
    body.style.backgroundImage = 'url(../' + backgroundImagePath +')';
    this.createTitle();
    this.createAudioTags();
    this.createGrid();
    this.makeCellsListen();
  };

  this.createTitle = function (){
    var title = document.createElement('h1');
    title.innerHTML = this.title;
    main.appendChild(title);
  };

  this.createAudioTags = function(){
    for (var i = 0; i < this.numberOfSoundBites; i++) {
      var biteAudioTag = document.createElement('audio');
      biteAudioTag.src = this.soundBitesLocationArray[i];
      biteAudioTag.setAttribute('class', this.soundBitesNameArray[i]);
      main.appendChild(biteAudioTag);
    }
    var backingAudioTag = document.createElement('audio');
    backingAudioTag.src = this.backingTrack.location;
    backingAudioTag.setAttribute('id', this.backingTrack.name);
    main.appendChild(backingAudioTag);
  };

  this.createGrid = function(){
    var grid = document.createElement('ul');
    grid.style.width = this.width + 'px';
    grid.className = 'clearfix';
    for (var i = 0; i < this.numberOfSoundBites; i++) {
      var cell = document.createElement('li');
      cell.setAttribute('class', this.soundBitesNameArray[i] + ' ' + this.className);
      cell.style.width = this.cellWidth  + 'px';
      cell.style.height = cell.style.width;
      cell.style.lineHeight = cell.style.height;
      cell.style.margin = this.margin + 'px';
      cell.innerHTML = this.soundBitesNameArray[i];
      grid.appendChild(cell);
    }
    main.appendChild(grid);
  };

  this.makeCellsListen = function(){
    for (var i = 0; i < this.numberOfSoundBites; i++) {
      var cell = document.querySelector('li.' + this.soundBitesNameArray[i]);
      cell.addEventListener('click', this.playAudio);
    }
  };

  this.playAudio = function(){
    console.log(this.className);
    var audio = document.querySelector('audio.' + this.className.split(' ')[0]);
    audio.play();
  };
}

window.onload = app;

function app(){
  createHomerBoardAndStart();
  document.getElementById('homer').addEventListener('click', createHomerBoardAndStart);
  document.getElementById('rappers').addEventListener('click', createRapperBoardAndStart);
  document.getElementById('daft').addEventListener('click', createDaftPunkBoardAndStart);
};

function createDaftPunkBoardAndStart(){
  var DaftPunkSoundboard = new Soundboard('Daft Punk', 'daft-punk', 4, 400,
    {
      name: 'backing track',
      location: 'file/files.wav'
    },
    {
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
    },
    'daft-punk/daft-punk.jpg'
  );
  DaftPunkSoundboard.start();
}

function createHomerBoardAndStart(){
  var HomerSimpsonSoundboard = new Soundboard('Homer Simpson', 'homer', 3, 400,
    {
      name: 'backing track',
      location: 'file/files.wav'
    },
    {
      doh: 'homer-simpson/doh.mp3',
      doh2: 'homer-simpson/doh.mp3',
      mbeernut: 'homer-simpson/mbeernut.mp3',
      mburger: 'homer-simpson/mburger.mp3',
      mchocola: 'homer-simpson/mchocola.mp3',
      mcrumble: 'homer-simpson/mcrumble.mp3',
      mmurinal: 'homer-simpson/mmurinal.mp3',
      organized: 'homer-simpson/organized.mp3',
      organized2: 'homer-simpson/organized.mp3'
    },
    'homer-simpson/homer.jpeg'
  );
  HomerSimpsonSoundboard.start();
}

function createRapperBoardAndStart(){
  var RapperSoundboard = new Soundboard('Rappers', 'rappers', 4, 400,
    {
      name: 'backing track',
      location: 'file/files.wav'
    },
    {
      two_chains: 'rappers/two_chainz.mp3',
      biggie: 'rappers/biggie.mp3',
      chance: 'rappers/chance.mp3',
      danny_brown: 'rappers/danny_brown.mp3',
      dizzee: 'rappers/dizzee.mp3',
      drake: 'rappers/drake.mp3',
      jayz: 'rappers/jayz.mp3',
      kanye: 'rappers/kanye.mp3',
      kendrick: 'rappers/kendrick.mp3',
      mchammer: 'rappers/mchammer.mp3',
      schoolboy_q: 'rappers/schoolboy_q.mp3',
      action_bronson: 'rappers/action_bronson.mp3'
    },
    'rappers/dizzee.jpg'
  );
  RapperSoundboard.start();
}
