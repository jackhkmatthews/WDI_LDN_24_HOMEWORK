$(start);

function start() {

  const projects = {
    smoothScroll: function smoothScroll() {
      $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    }
  };

  projects.smoothScroll();

  const nav = {

    underline: function underline(){
      const url = window.location.href.split('/');
      const links = $('header nav a');
      $(links).removeClass('selected');
      if (url[4] === 'new'){
        $(links[3]).addClass('selected');
      } else if (url[3] === 'projects'){
        $(links[1]).addClass('selected');
      } else if (url[3] === ''){
        $(links[0]).addClass('selected');
      }
    }
  };

  nav.underline();
}
