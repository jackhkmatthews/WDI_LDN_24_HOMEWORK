require "sinatra"
require "sinatra/reloader" if development?

Dir[File.dirname(__FILE__) + "/controllers/*rb"].each { |file| require file}
