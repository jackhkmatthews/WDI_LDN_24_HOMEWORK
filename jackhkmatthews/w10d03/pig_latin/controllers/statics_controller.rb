get "/" do
  @title = "Translate"
  erb :home
end

get "/*" do
  @title = "Translate"
  erb :home
end
