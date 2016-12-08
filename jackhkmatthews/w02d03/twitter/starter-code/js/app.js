function timeSince(milliSecs) {

  var seconds = Math.floor((Date.parse(new Date()) - milliSecs) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }
  return 'Just now';
}

$(start);

function start() {
  feed.updateFeed();
  feed.makeSubmitListen();
  feed.makeFormListen();
  feed.makeNewTweetBannerListen();
}

var tweets         = window.tweets;
var feed           = {
  tweets: window.tweets,
  newTweet: {
    created_at: '',
    name: 'Jack Matthews',
    screen_name: 'jackhkm',
    text: '',
    user_thumbnail: 'https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/10631166_10153788079528428_7008510206964561499_o.jpg'
  },
  newTweetElement: '',

  updateFeed: function updateFeed(){
    $.each(tweets.reverse(), feed.appendTweets);
  },

  appendTweets: function appendTweets(){
    var child = feed.createStreamItem(this.name, this.screen_name, this.created_at, this.text, this.user_thumbnail);
    $('.stream-items').prepend(child);
  },

  createStreamItem: function createStreamItem(name, screenName, createdAt, text, userThumbnail, newTweetFlag ){

    //creating content div
    var $content = $(document.createElement('div')).addClass('content');
    var $fullname = $(document.createElement('strong')).html(name);
    var $span1 = $(document.createElement('span')).html('&rlm;');
    var $span2 = $(document.createElement('span')).html('@');
    var $b = $(document.createElement('b')).html(screenName);
    var $span3 = $(document.createElement('span')).html('&nbsp;&middot;&nbsp;');
    var timeHtml = timeSince(Date.parse(createdAt));
    var $small = $(document.createElement('small')).addClass('time').html(timeHtml);
    $small.attr('data', Date.parse(createdAt));
    var $p = $(document.createElement('p')).html(text);
    $content.append([$fullname, $span1, $span2, $b, $span3, $small, $p]);

    //a tag and img
    var $a = $(document.createElement('a')).attr('href', '#');
    var $img = $(document.createElement('img'));
    $img.attr('src', userThumbnail);
    $img.attr('alt', 'user image goaes here');
    $a.append($img);

    //tweet div
    var $div = $(document.createElement('div')).addClass('tweet');
    $div.append([$a, $content]);

    //creating stream item
    var $li = $(document.createElement('li')).addClass('stream-item ' + newTweetFlag);
    $li.append($div);

    return($li);
  },

  makeSubmitListen: function makeSubmitListen(){
    $('[type="submit"]').on('click', function(e){
      e.preventDefault();
      if ($('#new-tweet-input').val().length > 0 && $('#new-tweet-input').val().length < 141){
        feed.updateNewTweet();
        feed.updateForm();
        feed.createNewTweetElement();
        $('#new-tweets-bar').slideDown();
      }
    });
  },

  updateNewTweet: function updateNewTweet(){
    feed.newTweet.text = $('#new-tweet-input').val();
    feed.newTweet.created_at = new Date();
  },

  updateForm: function updateForm(){
    $('#new-tweet-input').val('');
    $('.tweet-counter').html(140);
    $('.tweet-counter').css('color', '#8899a6');
  },

  createNewTweetElement: function createNewTweetElement(){
    feed.newTweetElement = feed.createStreamItem(feed.newTweet.name, feed.newTweet.screen_name, feed.newTweet.created_at, feed.newTweet.text, feed.newTweet.user_thumbnail, 'new-tweet');
  },

  makeFormListen: function makeFormListen(){
    $('#new-tweet-input').on('keydown', feed.updateCharatersLeft);
  },

  updateCharatersLeft: function updateCharatersLeft(){
    var charactersUsed = $(this).val().length;
    var charactersLeft = (140 - charactersUsed);
    if (charactersLeft < 0){
      $('.tweet-counter').css('color', 'rgba(255, 0, 0, 0.69)');
    } else {
      $('.tweet-counter').css('color', '#8899a6');
    }
    $('.tweet-counter').html(charactersLeft);
  },

  makeNewTweetBannerListen: function makeNewTweetBannerListen(){
    $('#new-tweets-bar').on('click', feed.showNewTweet);
  },

  showNewTweet: function showNewTweet(){
    $(feed.newTweetElement).hide().prependTo($('.stream-items')).slideDown('slow', function(){
      setTimeout(function(){
        $('#new-tweets-bar').slideUp('slow');
      }, 2000);
    });
  }

};
