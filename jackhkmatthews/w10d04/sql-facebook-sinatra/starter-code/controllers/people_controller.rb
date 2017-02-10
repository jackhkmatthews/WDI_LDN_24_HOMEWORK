def run_sql(sql)
  connection = PG.connect(dbname: 'facebook', host: 'localhost')
  begin
    result = connection.exec(sql)
  ensure
    connection.close
  end
  result
end

# index
get '/people' do
  @result = run_sql("SELECT * FROM people")
  erb :"people/index"
end

# new
get '/people/new' do
  erb :"people/new"
end

# create
post '/people' do
  first = params[:first]
  last = params[:last]
  city = params[:city]
  friends = params[:friends]
  dob = params[:dob]
  relationship = params[:relationship]
  sql = "INSERT INTO people (first, last, city, friends, dob, relationship) VALUES ('#{first}', '#{last}', '#{city}', '#{friends}', '#{dob}', '#{relationship}')"
  @result = run_sql(sql)
  redirect '/people'
end

# show
get '/people/:id' do
  sql = "SELECT * FROM people WHERE id = #{params[:id]}"
  @person = run_sql(sql)[0]
  erb :"people/show"
end

# edit
get '/people/:id/edit' do
  sql = "SELECT * FROM people WHERE id = #{params[:id]}"
  @person = run_sql(sql)[0]
  erb :"people/edit"
end

# update
put '/people/:id' do
  id = params[:id]
  first = params[:first]
  last  = params[:last]
  city  = params[:city]
  friends = params[:friends]
  dob = params[:dob]
  relationship = params[:relationship]
  sql = "UPDATE people SET first='#{first}', last='#{last}', city='#{city}', friends='#{friends}', dob='#{dob}', relationship='#{relationship}' WHERE id=#{id}"
  run_sql(sql)
  redirect "/people/#{id}"
end

# delete
delete '/people/:id' do
  sql = "DELETE FROM people WHERE id = #{params[:id]}"
  run_sql(sql)
  redirect '/people'
end
