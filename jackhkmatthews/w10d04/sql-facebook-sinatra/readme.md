---
title: SQl Facebook
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Relational DBS, Server Applications
---

# SQl Facebook

### Objectives
*After this lesson, students will be able to:*

- Use SQL in a Sinatra Application
- Understand how SQL is used to access data
- Build a simple Facebook replica

### Preparation
*Before this lesson, students should already be able to:*

- Write basic SQL statements
- Write a basic Sinatra Application

## Anyone can make Facebook! - Intro (5 Mins)

*Send over starter-code*

We're going to create an app that allows us to manage a RESTful resource of `people`. We can think about it a little bit like making Facebook because this is basically how Facebook started!

Our starter-code currently looks like this:

```bash
.
├── Gemfile
├── Gemfile.lock
├── app.rb
└── facebook.sql

0 directories, 4 files
```

We should already have a database created from the previous lesson called `facebook`. However, if you dont then you can create one with:

```bash
$ CREATEDB facebook;
$ psql -d facebook -f facebook.sql
```

If you take a look at the code in `app.rb`, you can see that we're just connecting Ruby with our database at the moment and performing two SQL queries, one to list all of the people and one to insert a new record. 

## Create a run_sql method - (10 mins)

We're going to want make a number of different SQL statements. So we're going to want to make a method that we can re-use to connect to our database and run a SQL statements. 

At the bottom of our file, let's make this function:

```ruby 
def run_sql(sql)
  connection = PG.connect(dbname: 'facebook', host: 'localhost')
  result = connection.exec(sql)
  connection.close
  result
end
```

Let's test this function with:

```ruby 
require 'pg'

def run_sql(sql)
  connection = PG.connect(dbname: 'facebook', host: 'localhost')
  begin 
    result = connection.exec(sql)
  ensure
    connection.close
  end
  result
end

run_sql("select * from people").each do |row|
  puts "#{row['first']} #{row['last']}"
end
```

We can delete everything else in the file and test using:

```bash
$ ruby app.rb
```

Once you have tested this, you can delete this SQL query. 

## Sinatra setup and routing - (10 mins)

Next we want to setup our Sinatra application. Let's install `sinatra` by first adding the gem to the Gemfile:

```
source "https://rubygems.org"

gem "pg"
gem "sinatra"
```

Next we need to require `sinatra`, `sinatra/reloader` in our `app.rb`.

### Root route

To test that our app is running. Let's just create a root route in `app.rb`:

```ruby
get '/' do
  erb :home
end
```

#### Views directory 

We want to serve a `:home` view but don't have a views directory, so let's create one:

```bash
$ mkdir views
```

#### Layout.erb & home

Let's create a `layout.erb` and a `home.erb` file.

```bash
$ touch views/layout.erb
$ touch views/home.erb
```

Let's add some content to `layout.erb`:

```erb
<!DOCTYPE html>
<html>
<head>
  <title>Facebook</title>
</head>
<body>
  <header>
    <h1><a href="/">Facebook</a></h1>
    <nav>
      <ul>
        <li><a href="/people">People</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <%= yield %>
  </main> 
  <footer>
    &copy; Facebook
  </footer>
</body>
</html>
```

And in `home.erb` let's add: 

```erb
<h1>Home<h1>
```

Now let's fire up the app with:

```
$ ruby app.rb
```

And view the website at `http://localhost:4567/`.

## RESTful People Resource - Codealong (15 mins)

We've already added a `/people` link to our navigation. Now we need set it up. 

> **Note:** We're not going to create a seperate controller for the moment, but we could do!

### Views

Let's create the views folder for the people resource:

```bash
$ mkdir views/people
```

And the various RESTful views associated with this resource: 

```bash
$ touch views/people/index.erb
$ touch views/people/new.erb
$ touch views/people/edit.erb
$ touch views/people/show.erb
```

### INDEX

Now let's write the controller action for the index action.

**Ask class: What is the SQL that we're going to write?**

```
"SELECT * FROM people"
```

We can use that here in the controller action with our run_sql method.

```ruby
# INDEX
get '/people' do
  sql = "SELECT * FROM people"
  @result = run_sql(sql)
  erb :"people/index"
end
```

Let's break this down a bit.

```ruby
sql = "SELECT * FROM people"
```

We're saving our SQL query to a variable `sql`. 

Next, we're running the SQL using our `run_sql` method and saving the value to an instance variable so that it can be used in the view:

```ruby
@result = run_sql(sql)
```

Finally, we're loading the erb template we want to render:

```ruby
erb :"people/index"
```

#### index.erb

Let's add some code inside our `index.erb`.

*Send over the code for speed, as the lesson is not primarily about erb*.

```erb
<h2>All members</h2>
<ul>
  <% @result.each do |person| %>
    <li>
      <a href="/people/<%= person['id'] %>">
        <%= person['first'] %> <%= person['last'] %>
      </a>
    </li>
  <% end %>
</ul>

<a href="/people/new">Create new user</a>
```

Now navigate to `http://localhost:4567/people` and you should see the people rendered! Amazing.

### NEW

Let's now move onto the NEW action. First, the controller action.

**Ask class: What is the SQL that we're going to write?**

We don't need any! Because the NEW action doesn't need any SQL.

```ruby
# NEW
get '/people/new' do
  erb :"people/new"
end
```

Next, we need to add some content to the view. It is of course, going to be a form to create a new person.

In `new.erb` add:

```erb
<h2>Create new user</h2>

<form action="/people" method="post">
  <input type="text" name="first" placeholder="First name">
  <input type="text" name="last" placeholder="Last name">
  <input type="text" name="city" placeholder="City">
  <input type="number" name="friends" placeholder="How many friends?">
  <input type="date" name="dob" placeholder="Date of birth">
  <input type="text" name="relationship" placeholder="Relationship">
  <button>Register</button>
</form>
```

Navigate to `http://localhost:4567/people/new` to test this out. 

### CREATE

You will not be able to add a new user, because the form is POSTing to `/people` (the CREATE action).

Let's write the controller action code for this.

**Ask class: What is the SQL that we're going to write?**

This one is a bit tricky. We first need to grab all of the different parts of the form body. Then we're going to use them to write an INSERT SQl command:

```sql
"INSERT INTO people (first, last, city, friends, dob, relationship) VALUES ('#{first}', '#{last}', '#{city}', '#{friends}', '#{dob}', '#{relationship}')"
```

This is quite fiddly to write because of the inverted commas. 

Let's use this now in a controller action:

```ruby 
# CREATE
post "/people" do
  first = params[:first]
  last  = params[:last]
  city  = params[:city]
  friends = params[:friends]
  dob = params[:dob]
  relationship = params[:relationship]
  sql = "INSERT INTO people (first, last, city, friends, dob, relationship) VALUES ('#{first}', '#{last}', '#{city}', '#{friends}', '#{dob}', '#{relationship}')"
  run_sql(sql)
  redirect "/people"
end
```

Now, test it out! You should be able to add new people!

### SHOW

Next up we need to write the controller code for the SHOW action.

**Ask class: What is the SQL that we're going to write?**

```
"SELECT * FROM people WHERE id = #{params[:id]}"
```

We're going to have to use the params to access the correct record from the database!


```ruby
# SHOW
get '/people/:id' do 
  sql = "SELECT * FROM people WHERE id = #{params[:id]}"
  @person = run_sql(sql)[0]
  erb :"people/show"
end
```

This line perhaps needs a bit of explaining:

```ruby 
@person = run_sql(sql)[0]
```

This is because the PG results object is an array. We nede to take the first result.

In `show.erb`, let's add:

```erb
<h2><%= @person['first'] %> <%= @person['last'] %></h2>

<ul>
  <li>DOB: <%= @person['dob'] %></li>
  <li>Relationship: <%= @person['relationship'] %></li>
  <li>Friends: <%= @person['friends'] %></li>
  <li>City: <%= @person['city'] %></li>
  <li><a href="/people/<%= @person['id'] %>/edit">Edit</a></li>
  <li>
    <form method="post" action="/people/<%= @person['id'] %>">
      <input type="hidden" name="_method" value="delete">
      <button>Delete</button>
    </form>
  </li>
</ul>
```

### EDIT 

Next, let's create a form to edit a user.

**Ask class: What is the SQL that we're going to write?**

It's going to be the same as the SHOW action!

```sql
"SELECT * FROM people WHERE id = #{params[:id]}"
```

In the controller action:

```ruby
# EDIT
get '/people/:id/edit' do
  sql = "SELECT * FROM people WHERE id = #{params[:id]}"
  @person = run_sql(sql)[0]
  erb :"people/edit"
end
```

And in `edit.erb`:

```erb
<h2>Edit User <%= "#{@person['first']} #{@person['last']}" %></h2>

<form action="/people/<%= @person['id'] %>" method="post">
  <input type="text" name="first" placeholder="First name" value="<%= @person['first'] %>">
  <input type="text" name="last" placeholder="Last name" value="<%= @person['last'] %>">
  <input type="text" name="city" placeholder="City" value="<%= @person['city'] %>">
  <input type="number" name="friends" placeholder="How many friends?" value="<%= @person['friends'] %>">
  <input type="date" name="dob" placeholder="Date of birth" value="<%= @person['dob'] %>">
  <input type="text" name="relationship" placeholder="Relationship" value="<%= @person['relationship'] %>">
  <button>Update</button>
</form>
```

### UPDATE

#### Method-override 

In order to use the `PUT` and `DELETE` actions in Sinatra, we need to enable `method-override` in Rack. In a classic Sinatra application, the `:method_override` option is set as true by default. 

However, in our edit form we do need to add:

```erb
<input type="hidden" name="_method" name="put">
```

Our UPDATE controller action will need to contain some SQL. 

**Ask class: What is the SQL that we're going to write?**

```sql
"UPDATE people SET first='#{first}', last='#{last}', city='#{city}', friends='#{friends}', dob='#{dob}', relationship='#{relationship}' WHERE id='#{id}'"
```

This is a little tricky. Let's incorporate that SQL into our UPDATE controller action.

```ruby
# UPDATE
put '/people/:id' do 
  id = params[:id]
  first = params[:first]
  last  = params[:last]
  city  = params[:city]
  friends = params[:friends]
  dob = params[:dob]
  relationship = params[:relationship]
  sql = "UPDATE people SET first='#{first}', last='#{last}', city='#{city}', friends='#{friends}', dob='#{dob}', relationship='#{relationship}' WHERE id='#{id}'"
  run_sql(sql)
  redirect "/people/#{id}"
end
```

You should now be able to edit a user!

### DELETE

Finally, we have the delete action.

We've actually already added the code for the DELETE action on the SHOW page:

```erb
<form method="post" action="/people/<%= @person['id'] %>">
  <input type="hidden" name="_method" value="delete">
  <button>Delete</button>
</form>
```

We just need to setup the controller action. 

**Ask class: What is the SQL that we're going to write?**

```sql
"DELETE FROM people WHERE id = #{params[:id]}"
```

Let's use this in our DELETE action.

```ruby
# DELETE
delete '/people/:id' do 
  sql = "DELETE FROM people WHERE id = #{params[:id]}"
  run_sql(sql)
  redirect '/people'
end
```

## Conclusion (5 mins)

There is quite a bit of typing in this lesson. We're covering quite a bit of material considering that you have only just started looking at SQL.

However, in the next few lessons we're going to look at some tools that will help us to write SQL and sometimes even write our SQL for us!

> **Note:** The Independent Practise has been skipped as there is a lot of "we do" in this lesson.

- Ask some questions
- See if anyone learned what they were supposed to
- See if you did a good job by teaching them stuff

