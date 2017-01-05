console.log('js has loaded');

$(init);

const API = 'http://localhost:4000';

function init() {
  usersIndex();
  $('.usersIndex').on('click', usersIndex);

  $('.usersNew').on('click', usersNew);
  $('body').on('submit', '.usersCreate', usersCreate);
  $('body').on('click', '.usersShow', usersShow);
  $('body').on('click', '.usersDelete', usersDelete);
  $('body').on('click', '.usersEdit', usersEdit);
  $('body').on('submit', '.usersUpdate', usersUpdate);

  $('body').on('click', '.projectsNew', projectsNew);
  $('body').on('submit', '.projectsCreate', projectsCreate);
  $('body').on('click', '.projectsDelete', projectsDelete);
  $('body').on('click', '.projectsEdit', projectsEdit);
  $('body').on('submit', '.projectsUpdate', projectsUpdate);
}


//////////users/////////////
function usersIndex() {
  $.ajax({
    url: `${API}/users`,
    type: 'get'
  }).done(data => {
    $('main').html('<div class="users"></div>');
    $.each(data, (index, user) => {
      addUser('.users', user);
    });
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
    addUser('.users', user);
    $('.modal').modal('hide');
  });
}

function usersShow(e){
  e.preventDefault();
  $.ajax({
    url: `${API}${$(this).attr('href')}`,
    type: 'get'
  }).done(user => {
    $('main').html('<div class="users"></div>');
    addFullUser(user);
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

//////////projects/////////////
function projectsNew(){
  $('.modal-content').html(`
    <form method="post" action="${API}/users/${$(this).attr('data-id')}/projects" class="projectsCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Project</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="project_title">Title</label>
          <input class="form-control" type="text" name="project[title]" id="project_title" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="project_description">Description</label>
          <input class="form-control" type="text" name="project[description]" id="project_description" placeholder="Description">
        </div>
        <div class="form-group">
          <label for="project_github">Github</label>
          <input class="form-control" type="text" name="project[github]" id="project_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="project_website">Website</label>
          <input class="form-control" type="text" name="project[website]" id="project_website" placeholder="Website">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" href="/users/${$(this).attr('data-id')}">Create</button>
      </div>
    </form>`);
  $('.modal').modal('show');
}

function projectsCreate(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(project => {
    var index = 0;
    if ($('.project')) {
      index = parseInt($('.project:first').attr('id').split('t')[1]) + 1;
    }
    const userId = $('.usersShow').attr('href').split('/')[2];
    addProject('.projects', userId, project, index);
    $('.modal').modal('hide');
  });
}

function projectsDelete(e){
  e.preventDefault();
  $.ajax({
    url: `${API}/users/${$(this).attr('data-user')}/projects/${$(this).attr('data-project')}`,
    type: 'delete'
  }).done(() => {
    usersShow.bind(this)(e);
  });
}

function projectsEdit(e){
  const index = $(e.target).attr('data-index');
  const projectTitle = $(`#project${index} .title`).text();
  const projectDescription = $(`#project${index} .description`).text();
  const projectGithub = $(`#project${index} .github`).text();
  const projectWebsite = $(`#project${index} .website`).text();
  const userId = $(e.target).attr('data-user');
  const projectId = $(this).attr('data-project');
  $('.modal-content').html(`
    <form method="put" action="${API}/users/${userId}/projects/${projectId}" class="projectsUpdate" href="/users/${userId}">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit Project</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="project_title">Title</label>
          <input class="form-control" type="text" name="project[title]" id="project_title" value="${projectTitle}">
        </div>
        <div class="form-group">
          <label for="project_description">Description</label>
          <input class="form-control" type="text" name="project[description]" id="project_description" value="${projectDescription}">
        </div>
        <div class="form-group">
          <label for="project_github">Github</label>
          <input class="form-control" type="text" name="project[github]" id="project_github" value="${projectGithub}">
        </div>
        <div class="form-group">
          <label for="project_website">Website</label>
          <input class="form-control" type="text" name="project[website]" id="project_website" value="${projectWebsite}">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>`);
  $('.modal').modal('show');
}

function projectsUpdate(e){
  e.preventDefault();
  console.log($(this).serialize());
  $.ajax({
    url: $(this).attr('action'),
    type: 'put',
    data: $(this).serialize()
  }).done(() => {
    $('.modal').modal('hide');
    usersShow.bind(this)(e);
  });
}

//////////reusable functions/////////////
function addUser(selector, user){
  $(selector).prepend(`
    <div class="col-xs-12 col-sm-4">
      <div class="thumbnail profile">
        <a href="/users/${user._id}" class="usersShow">
          <img src="${user.image}" style="max-height: 200px">
        </a>
        <div class="caption">
          <h3 class="title">${user.name}</h3>
          <p>${user.bio}</p>
        </div>
      </div>
    </div>
  `);
}

function addFullUser(user){
  addUser('.users', user);
  addUserInfo('.profile .caption', user);
  addUserButtons('.profile', user);
  $('.projects').append(`
    <button type="button" class="btn btn-default projectsNew" data-id=${user._id}>New</button>
    `);
  $(user.projects).each((index, project) =>{
    const userId = user._id;
    addProject('.projects', userId, project, index);
  });
}

function addUserInfo(selector, user){
  $(selector).append(`
  <p id="userGithub">${user.github}</p>
  <p id="userTwitter">${user.twitter}</p>
  <p id="userWebsite">${user.website}</p>
  `);
}

function addUserButtons(selector, user){
  $(selector).append(`
  <div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default usersEdit" data-id=${user._id}>Edit</button>
  <button type="button" class="btn btn-danger usersDelete" data-id=${user._id}>Delete</button>
  </div>
  </div>
  <h1>projects</h1>
  <div class="projects">
  </div>
  `);
}

function addProject(selector, userId, project, index){
  $(selector).prepend(`
    <div class="project" id="project${index}">
    <h2 class="title">${project.title}</h2>
    <p class="description">${project.description}</p>
    <p class="github">${project.github}</p>
    <p class="website">${project.website}</p>
    <div class="btn-group" role="group" aria-label="...">
    <button type="button" class="btn btn-default projectsEdit" data-project="${project._id}" data-user="${userId}" data-index="${index}">Edit</button>
    <button type="button" class="btn btn-danger projectsDelete" data-project="${project._id}" data-user="${userId}" data-index="${index}" href="/users/${userId}">Delete</button>
    </div>
    </div>
    `);
}
