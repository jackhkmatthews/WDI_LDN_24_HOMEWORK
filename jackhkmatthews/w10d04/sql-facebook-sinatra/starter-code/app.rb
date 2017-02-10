require "pg"
require "sinatra"
require "sinatra/reloader"

Dir[File.dirname(__FILE__) + "/controllers/*rb"].each { |file| require file}

get '/' do
  erb :home
end

# db = PG.connect(:dbname =>'facebook', :host => 'localhost')

# begin
#   continue = true
#   while continue
#     puts "What operation do you want to perform?"
#     puts "\t 1. Display all people"
#     puts "\t 2. Add new person"
#     puts "\t 3. Quit"
#
#     case gets.chomp
#     when "1"
#       db.exec("select * from people") do |result|
#         result.each do |row|
#           puts "#{row['first']} #{row['last']}"
#         end
#       end
#     when "2"
#       print "Full name: "
#       name = gets.chomp.split
#       print "Dob: "
#       dob = gets.chomp
#       print "Relationship: "
#       relationship = gets.chomp
#       print "City: "
#       city = gets.chomp
#
#       sql = "insert into people ( first, last, dob, relationship, city) values ('#{name[0]}', '#{name[1]}', '#{dob}', '#{relationship}', '#{city}' )"
#       db.exec(sql)
#     when "3" then continue = false
#     else
#       puts "Please try again."
#     end
#   end
# ensure
#   db.close
# end


#
# run_sql("select * from people").each do |row|
#   puts "#{row["first"]} #{row["last"]}"
# end
