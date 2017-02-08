# network = {
#   north: [
#     :n_Times_Square,
#     :n_34th,
#     :n_28th,
#     :n_23rd,
#     :Union_Square,
#     :n_8th
#   ],
#   L: [
#     :l_8th,
#     :l_6th,
#     :Union_Square,
#     :l_3rd,
#     :l_1st
#   ],
#   Six: [
#     :s_Grand_Central,
#     :s_33rd,
#     :s_28th,
#     :s_23rd,
#     :Union_Square,
#     :s_Astor_Place
#   ]
# }

#represent lines in memory
#present user with options and ask for response
  #origin
    #line
    #station
  #destination
    #line
    #station
#find origin in network object
#find destinatino in network object
#if on same line
  #find indexes of stations and report difference to user
#if on different lines
  #find indexes of origin and Union_Square
  #find indexes of destination and Union_Square
  #report sum of differences back to user


north = [
  "Times Square",
  "34th",
  "28th",
  "23rd",
  "Union Square",
  "8th"
],
l = [
  "8th",
  "6th",
  "Union Square",
  "3rd",
  "1st"
],
six = [
  "Grand Central",
  "33rd",
  "28th",
  "23rd",
  "Union Square",
  "Astor Place"
]

puts "Please enter details of your origin."
puts "Line (north, l or six)?"
origin_line = gets.chomp
puts "Station (e.g, 8th, Grand Central, Union Square, etc )?"
origin_station = gets.chomp
puts "Please enter details of your destination."
puts "Line (north, l or six)?"
destination_line = gets.chomp
puts "Station (e.g, 8th, Grand Central, Union Square, etc )?"
destination_station = gets.chomp

case origin_line
when "north" then puts "north!"
when "l" then puts "l!"
when "six" then puts "six!"
end
