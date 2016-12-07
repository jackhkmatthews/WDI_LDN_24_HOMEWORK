var tweets         = window.tweets;
var newTweet       = {
  created_at: '',
  name: 'Jack Matthews',
  screen_name: 'jackhkm',
  text: '',
  user_thumbnail: 'http://facehoff.herokuapp.com/50/50'
};
var feed           = {
  tweets: window.tweets,
  newTweet: {
    created_at: '2016-12-07 14:11:39 +0000',
    name: 'Jack Matthews',
    screen_name: 'jackhkm',
    text: '',
    user_thumbnail: 'http://facehoff.herokuapp.com/50/50'
  },

  createStreamItem: function createStreamItem(name, screen_name, created_at, text, user_thumbnail ){

    //creating content div
    var $content = $(document.createElement('div')).addClass('content');
    var $fullname = $(document.createElement('strong')).html(name);
    var $span1 = $(document.createElement('span')).html('&rlm;');
    var $span2 = $(document.createElement('span')).html('@');
    var $b = $(document.createElement('b')).html(screen_name);
    var $span3 = $(document.createElement('span')).html('&nbsp;&middot;&nbsp;');
    var millisecondsAgo = (Date.now() - Date.parse(created_at));
    var weeksAgo = parseInt(millisecondsAgo/604800000);
    console.log(weeksAgo);
    var daysAgo = Math.floor((weeksAgo*(604800000))/(604800000/7));
    var hoursAgo = Math.floor((daysAgo*(604800000/7))/(604800000/(7*24)));
    var $small = $(document.createElement('small')).addClass('time').html(millisecondsAgo + + 'l' + weeksAgo + ' weeks, ' + daysAgo + ' days and ' + hoursAgo + ' hours ago.');
    var $p = $(document.createElement('p')).html(text);
    $content.append([$fullname, $span1, $span2, $b, $span3, $small, $p]);

    //a tag and img
    var $a = $(document.createElement('a')).attr('href', '#');
    var $img = $(document.createElement('img'));
    $img.attr('src', user_thumbnail);
    $img.attr('alt', 'user image goaes here');
    $a.append($img);

    //tweet div
    var $div = $(document.createElement('div')).addClass('tweet');
    $div.append([$a, $content]);

    //creating stream item
    var $li = $(document.createElement('li')).addClass('stream-item');
    $li.append($div);

    return($li);
  },

  postNewTweet: function postNewTweet(e){
    e.preventDefault();
    feed.updateNewTweet();
    console.log(feed.newTweet.created_at);
    var html = feed.createStreamItem(this.name, this.screen_name, feed.newTweet.created_at, this.text, this.user_thumbnail);
    $('.stream-items').prepend(html);
  },

  updateNewTweet: function updateNewTweet(){
    newTweet.text = $('#new-tweet-input').val();
  },

  updateFeed: function updateFeed(){
    $.each(tweets.reverse(), feed.appendTweets);
  },

  appendTweets: function appendTweets(){
    console.log(this.created_at);
    var child = feed.createStreamItem(this.name, this.screen_name, this.created_at, this.text, this.user_thumbnail);
    $('.stream-items').prepend(child);
  },

  makeSubmitListen: function makeSubmitListen(){
    $('[type="submit"]').on('click', feed.postNewTweet.bind(newTweet));
  },

  makeFormListen: function makeFormListen(){
    $('#new-tweet-input').on('keydown', feed.updateCharatersLeft);
  },

  updateCharatersLeft: function updateCharatersLeft(){
    var charactersUsed = $(this).val().length;
    var charactersLeft = (140 - charactersUsed);
    $('.tweet-counter').html(charactersLeft);
  }

};

$(start);

function start() {
  feed.updateFeed();
  feed.makeSubmitListen();
  feed.makeFormListen();
}
