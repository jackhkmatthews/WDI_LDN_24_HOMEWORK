map = {
  :n => ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],
  :l => ["8th", "6th", "Union Square", "3rd", "1st"],
  :s => ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]
}

# User inputs origin line
puts "which line are you getting on at? (n, l or s)"
line_one = gets.chomp.downcase.to_sym

# User inputs origin station
puts "which station are you getting on at? The stations are #{map[line_one][1..-2].join(', ')} or #{map[line_one][-1]}."
station_one = gets.chomp.downcase

# User inputs departure line
puts "which line are you getting off at? (n, l or s)"
line_two = gets.chomp.downcase.to_sym

# User inputs departure station
puts "which station are you getting off at? The stations are #{map[line_two][1..-2].join(', ')} or #{map[line_two][-1]}."
station_two = gets.chomp.downcase

# If origin and destination line are the same
if line_one == line_two
#   return number of stops between .map{ |element| element.downcase}
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_one].map(&:downcase).index(station_two)).abs
# If orign and destinatino lines are different
else
  #   return number of stops for each station to union square and sum
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_one].map(&:downcase).index('union square')).abs + (map[line_two].map(&:downcase).index(station_two) - map[line_two].map(&:downcase).index('union square')).abs
end

puts "you will go though #{answer} stop#{answer == 1 ? '': 's'}. #{(answer != 0 && station_one != "union square" && station_two != "union square" && line_one != line_two) ? 'Change at Union Square': ''}"
