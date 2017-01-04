var start = function start(){

  var lastRequest = '',

  $.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
  .done(function(data){
    var gifsArray = data.data;
    $.each(gifsArray, function(index, gifObject){
      $('ul').append('<img src="' + gifObject.images.fixed_height.url + '"  img>');
    });
  })
  .fail(function(){
  });

  $('button#go').on('click', function(e){
    e.preventDefault();
    $('ul').html('');
    var search = $('input').val();
    lastRequest = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC'
    $.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC')
      .done(function(data){
        var gifsArray = data.data;
        $.each(gifsArray, function(index, gifObject){
          $('ul').append('<img src="' + gifObject.images.fixed_height.url + '"  img>');
        });
      })
      .fail(function(){
        console.log('error');
      });
  });

  $('button#load').on('click', function(e){
    e.preventDefault();
    $('ul').html('');
    var search = $('input').val();
    $.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC')
      .done(function(data){
        var gifsArray = data.data;
        $.each(gifsArray, function(index, gifObject){
          $('ul').append('<img src="' + gifObject.images.fixed_height.url + '"  img>');
        });
      })
      .fail(function(){
        console.log('error');
      });
  });


};

$(start);
