console.log('js has loaded');
const API = 'http://localhost:4000';

$(init);

function init() {
  usersIndex();
  $('.usersIndex').on('click', usersIndex);
  $('body').on('click', '.usersShow', usersShow);
  $('body').on('click', '.usersDelete', usersDelete);
  $('body').on('click', '.usersEdit', usersEdit);
  $('body').on('submit', '.usersUpdate', usersUpdate);
  $('.usersNew').on('click', usersNew);
  $('body').on('submit', '.usersCreate', usersCreate);
}

function usersIndex() {
  $.ajax({
    url: `${API}/users`,
    type: 'get'
  }).done(data => {
    $('main').html('<div class="users"></div>');
    $.each(data, (index, user) => {
      $('.users').prepend(`<div class='user-tile'>
      <img src='${user.image}'>
      <a class='usersShow' href="/users/${user._id}">
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);
    });
  });
}

function usersShow(e){
  e.preventDefault();
  $.ajax({
    url: `${API}${$(this).attr('href')}`,
    type: 'get'
  }).done(user => {
    $('main').html('<div class="users"></div>');
    $('.users').prepend(`
    <div class='user-tile'>
      <img id="userImage" src='${user.image}'>
      <a class='usersShow' href="/users/${user._id}">
        <h2 id="userName">${user.name}</h2>
      </a>
      <p id="userBio">${user.bio}</p>
      <p id="userGithub">${user.github}</p>
      <p id="userTwitter">${user.twitter}</p>
      <p id="userWebsite">${user.website}</p>
    </div>
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default usersEdit" data-id=${user._id}>Edit</button>
      <button type="button" class="btn btn-danger usersDelete" data-id=${user._id}>Delete</button>
    </div>`);
  });
}

function usersDelete(e){
  e.preventDefault();
  $.ajax({
    url: `${API}/users/${$(this).attr('data-id')}`,
    type: 'delete'
  }).done(() => {
    usersIndex();
  });
}

function usersEdit(){
  const userName = $('#userName').text();
  const userImage = $('#userImage').attr('src');
  const userGithub = $('#userGithub').text();
  const userBio = $('#userBio').text();
  const userWebsite = $('#userWebsite').text();
  const userTwitter = $('#userTwitter').text();
  const userId = $(this).attr('data-id');
  $('.modal-content').html(`
    <form method="put" action="#" class="usersUpdate" data-id="${userId}" href="/users/${userId}">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit User</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_name">Name</label>
          <input class="form-control" type="text" name="user[name]" id="user_name" value="${userName}">
        </div>
        <div class="form-group">
          <label for="user_image">Image</label>
          <input class="form-control" type="text" name="user[image]" id="user_image" value="${userImage}">
        </div>
        <div class="form-group">
          <label for="user_github">Github</label>
          <input class="form-control" type="text" name="user[github]" id="user_github" value="${userGithub}">
        </div>
        <div class="form-group">
          <label for="user_bio">Bio</label>
          <textarea class="form-control" name="user[bio]" id="user_bio">${userBio}</textarea>
        </div>
        <div class="form-group">
          <label for="user_website">Website</label>
          <input class="form-control" type="text" name="user[website]" id="user_website" value="${userWebsite}">
        </div>
        <div class="form-group">
          <label for="user_twitter">Twitter</label>
          <input class="form-control" type="text" name="user[twitter]" id="user_twitter" value="${userTwitter}">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary usersUpdate">Update</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersUpdate(e){
  e.preventDefault();
  $.ajax({
    url: `${API}/users/${$(this).attr('data-id')}`,
    type: 'put',
    data: $(this).serialize()
  }).done(() => {
    $('.modal').modal('hide');
    usersShow.bind(this)(e);
  });
}

function usersNew(){
  $('.modal-content').html(`
    <form method="post" action="${API}/users" class="usersCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add User</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_name">Name</label>
          <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name">
        </div>
        <div class="form-group">
          <label for="user_image">Image</label>
          <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image">
        </div>
        <div class="form-group">
          <label for="user_github">Github</label>
          <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="user_bio">Bio</label>
          <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio"></textarea>
        </div>
        <div class="form-group">
          <label for="user_website">Website</label>
          <input class="form-control" type="text" name="user[website]" id="user_website" placeholder="Website">
        </div>
        <div class="form-group">
          <label for="user_twitter">Twitter</label>
          <input class="form-control" type="text" name="user[twitter]" id="user_twitter" placeholder="Twitter">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersCreate(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(user => {

    $('.users').prepend(`
    <div class='user-tile'>
      <img src='${user.image}'>
      <a class='usersShow' href="/users/${user._id}">
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);

    $('.modal').modal('hide');
  });
}
