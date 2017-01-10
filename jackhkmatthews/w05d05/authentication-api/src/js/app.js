console.log('js loaded');

function App() {

  this.apiUrl = 'http://localhost:3000/api';
  this.numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'];

  this.init = function init(){
    this.$main = $('main');
    this.$body = $('body');
    this.clearMain();
    this.landingPage();
    this.$body.on('submit', 'form', this.handleForm.bind(this));
    $('.usersIndex').on('click', this.usersIndex.bind(this));
    $('.logout').on('click', this.logout.bind(this));
    $('.register').on('click', this.register.bind(this));
    $('.landingPage').on('click', this.landingPage.bind(this));
    $('.usersDelete').on('click', this.usersDelete.bind(this));
    if(this.getToken()){
      this.loggedInState();
    } else {
      this.loggedOutState();
    }
  };

  this.clearMain = function(){
    this.$main.html('');
  };

  this.landingPage = function landingPage(e){
    if (e) e.preventDefault;
    console.log('hi');
    this.$main.html(`
      <div class="jumbotron">
        <h1 class="display-3">Welcome to WDI Yearbook</h1>
        <p class="lead">A simple MEN stack web app, with authorisation, to display the members of WDI 24</p>
        <hr class="my-4">
      </div>
    `);
  };

  this.usersIndex = function usersIndex(){
    const url    = `${this.apiUrl}/users`;

    this.ajaxRequest(url, 'get', null, data => {
      this.clearMain();
      this.$main.html(`
        <div id="accordion" role="tablist" aria-multiselectable="true" class=" container">
          <div class="row">
            <div class="col"></div>
            <div class="col align-self-center usersAccordian"></div>
            <div class="col"></div>
          </div>
        </div>`);
      const $usersAccordian = $('.usersAccordian');
      $.each(data.users, (i, user) => {
        $usersAccordian.append(`
          <div class="card">
            <div class="card-header" role="tab" id="heading${i}">
              <h5 class="mb-0">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                  ${user.username}
                </a>
              </h5>
            </div>

            <div id="collapse${i}" class="collapse" role="tabpanel" aria-labelledby="heading${i}">
              <div class="card-block">
                <p>${user.firstName}</p>
                <p>${user.lastName}</p>
                <p>${user.email}</p>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary usersEdit" data-id="${user._id}">Edit</button>
                  <button type="button" class="btn btn-danger usersDelete" data-id="${user._id}">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `);
      });
    });
  };

  this.usersDelete = function usersDelete(e){
    e.preventDefault();

    const url = `${this.apiUrl}/users/${$(e.target).attr('data-id')}`;

    this.ajaxRequest(url, 'get', null, this.usersIndex());
  };

  this.logout = function logout(){
    this.clearLocalStorage();
    this.clearMain();
    this.landingPage();
    this.loggedOutState();
  };

  this.register = function register(){
    console.log('clicked');
    $('.modal').modal('show');
  };

  this.handleForm = function handleForm(e){
    if (e) e.preventDefault();

    const url    = `${this.apiUrl}${$(e.target).attr('action')}`;
    const method = $(e.target).attr('method');
    const data   = $(e.target).serialize();

    console.log(url, method, data);

    this.ajaxRequest(url, method, data, data => {
      if (data.token) this.setToken(data.token);
      if ($('.modal').hasClass('show')) $('.modal').modal('hide');
      this.loggedInState();
    });

  };

  this.ajaxRequest = function ajaxRequest(url, method, data, callback){
    $.ajax({
      url,
      method,
      data,
      beforeSend: this.setRequestHeader.bind(this)
    })
    .done(callback)
    .fail( data => {
      console.log(`fail ${data}`);
    });
  };

  this.loggedInState = function loggedInState(){
    $('.loggedIn').show();
    $('.loggedOut').hide();
  };

  this.loggedOutState = function loggedOutState(){
    $('.loggedIn').hide();
    $('.loggedOut').show();
  };

  this.setRequestHeader = function(xhr) {
    return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
  };

  this.setToken = function(token){
    return window.localStorage.setItem('token', token);
  };

  this.getToken = function(){
    return window.localStorage.getItem('token');
  };

  this.clearLocalStorage = function(){
    return window.localStorage.clear();
  };


}

const yearbook = new App();

$(yearbook.init.bind(yearbook));
