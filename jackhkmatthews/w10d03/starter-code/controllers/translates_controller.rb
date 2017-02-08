require_relative "../models/pig_latin"

post "/" do
  @title = "Translate"
  @input = params["text"]
  @translation = PigLatin.translate(params["text"])
  erb :home
end
