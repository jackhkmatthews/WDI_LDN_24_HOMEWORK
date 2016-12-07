console.log('js loaded');

var body;
var main;
var DaftPunkSoundboard     = new Soundboard('Daft Punk', 'daft-punk', 4, 400,
  'https://www.youtube.com/embed/WSttUkU015s',
  {
    'after': 'daft-punk/after.wav',
    'better': 'daft-punk/better.wav',
    'do it': 'daft-punk/do_it.wav',
    'ever': 'daft-punk/ever.wav',
    'faster': 'daft-punk/faster.wav',
    'harder': 'daft-punk/harder.wav',
    'hour': 'daft-punk/hour.wav',
    'make it': 'daft-punk/make_it.wav',
    'makes us': 'daft-punk/makes_us.wav',
    'more than': 'daft-punk/more_than.wav',
    'never': 'daft-punk/never.wav',
    'our': 'daft-punk/our.wav',
    'over': 'daft-punk/over.wav',
    'stronger': 'daft-punk/stronger.wav',
    'work is': 'daft-punk/work_is.wav',
    'work it': 'daft-punk/work_it.wav'
  },
  'daft-punk/daft-punk.jpg'
);
var HomerSimpsonSoundboard = new Soundboard('Homer Simpson', 'homer', 3, 400,
  'https://www.youtube.com/embed/Xqog63KOANc',
  {
    'doh!': 'homer-simpson/doh.mp3',
    'mbeernut': 'homer-simpson/mbeernut.mp3',
    'mburger': 'homer-simpson/mburger.mp3',
    'mchocola': 'homer-simpson/mchocola.mp3',
    'mcrumble': 'homer-simpson/mcrumble.mp3',
    'mmurinal': 'homer-simpson/mmurinal.mp3',
    'organized': 'homer-simpson/organized.mp3',
    'bash': 'homer-simpson/bash.mp3',
    'crap': 'homer-simpson/crap.mp3'
  },
  'homer-simpson/homer.jpeg'
);
var RapperSoundboard       = new Soundboard('Rappers', 'rappers', 3, 400, 'https://www.youtube.com/embed/z0cV9p2-VOg',
  {
    'Action': 'rappers/action_bronson.mp3',
    'Chains': 'rappers/two_chainz.mp3',
    'Biggie': 'rappers/biggie.mp3',
    'Chance': 'rappers/chance.mp3',
    'Brown': 'rappers/danny_brown.mp3',
    'Dizzee': 'rappers/dizzee.mp3',
    'Drake': 'rappers/drake.mp3',
    'Jayz': 'rappers/jayz.mp3',
    'Kanye': 'rappers/kanye.mp3',
    'Kendrick': 'rappers/kendrick.mp3',
    'Mchammer': 'rappers/mchammer.mp3',
    'Q': 'rappers/schoolboy_q.mp3'
  },
  'rappers/dizzee.jpg'
);

function Soundboard(title, className, gridBase, width, backingTrackUrl, soundBitesObject, backgroundImagePath){
  this.title                      = title;
  this.className                  = className;
  this.gridBase                   = gridBase;
  this.width                      = width;
  this.margin                     = ((this.width / this.gridBase) / 10);
  this.cellWidth                  = (this.width / this.gridBase) - (2 * this.margin);
  this.backingTrackUrl            = backingTrackUrl;
  this.soundBitesObject           = soundBitesObject;
  this.soundBitesLocationArray    = Object.values(soundBitesObject);
  this.directory                  = this.soundBitesLocationArray[0].split('/')[0];
  this.cellText                   = Object.keys(soundBitesObject);
  this.generateCellClassNames     = function() {
    var array =[];
    for (var i = 0; i < this.soundBitesLocationArray.length; i++) {
      var fileName = this.soundBitesLocationArray[i].split('/')[1];
      var className = fileName.split('.')[0];
      array.push(className);
    }
    return array;
  };
  this.cellClassNames             = this.generateCellClassNames();
  this.numberOfSoundBites         = Object.keys(soundBitesObject).length;
  this.backgroundImagePath        = backgroundImagePath;

  this.start = function start(){
    console.log('soundboard started');
    main = document.getElementsByTagName('main')[0];
    body = document.getElementsByTagName('body')[0];
    main.innerHTML = '';
    body.style.backgroundImage = 'url(../' + backgroundImagePath +')';
    this.createTitle();
    this.createGrid();
    this.playBackingTrack();
    this.makeCellsListen();
  };

  this.playBackingTrack = function playBackingTrack(){
    var iframe = document.createElement('iframe');
    iframe.src = this.backingTrackUrl + '?autoplay=1?controls=1';
    main.appendChild(iframe);
  };

  this.addToNav = function addToNav() {
    var element = document.createElement('h2');
    element.innerHTML = this.title;
    element.className = this.className;
    element.addEventListener('click', generate.bind(this));
    function generate(){
      this.start();
    }
    var nav = document.getElementById('nav');
    nav.appendChild(element);
  };

  this.createTitle = function createTitle(){
    var title = document.createElement('h1');
    title.innerHTML = this.title;
    title.className = this.className;
    main.appendChild(title);
  };

  this.createGrid = function createGrid(){
    var grid = document.createElement('ul');
    grid.style.width = this.width + 'px';
    grid.className = 'clearfix';
    for (var i = 0; i < this.numberOfSoundBites; i++) {
      var cell = document.createElement('li');
      cell.setAttribute('class', this.cellClassNames[i] + ' ' + this.className);
      cell.style.width = this.cellWidth  + 'px';
      cell.style.height = cell.style.width;
      cell.style.lineHeight = cell.style.height;
      cell.style.margin = this.margin + 'px';
      cell.innerHTML = this.cellText[i];
      grid.appendChild(cell);
    }
    main.appendChild(grid);
  };

  this.makeCellsListen = function makeCellsListen(){
    for (var i = 0; i < this.numberOfSoundBites; i++) {
      var cell = document.querySelector('li.' + this.cellClassNames[i]);
      cell.addEventListener('click', this.playAudio.bind(this));
    }
  };

  this.playAudio = function playAudio(e){
    var name = e.target.className.split(' ')[0];
    var index = this.cellClassNames.indexOf(name);
    new Audio(this.soundBitesLocationArray[index]).play();
  };
}

window.onload = app;

function app(){
  HomerSimpsonSoundboard.addToNav();
  RapperSoundboard.addToNav();
  DaftPunkSoundboard.addToNav();
  HomerSimpsonSoundboard.start();
}
