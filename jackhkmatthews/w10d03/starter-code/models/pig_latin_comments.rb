class PigLatin

  def self.translate(phrase)

  # splits phrase into words
  # for each word checks first if it meets a three letter rule
  # second if it meets a three letter rule
  # third is it matches any of the vowels
  # last is catch all
  # in each case word converted to array
  # and pushes approprate number of letters to back of word
  # removes those letters from front of word
  # then adds "ay" to end of word
  # new words replaces old elements in phrase array
  # this array joined and returned

    phrase.split(' ').map do |word|
      if meets_three_letter_rule?(word)
        word.chars.push(word.chars[0..2])[3..-1].join.concat("ay")
      elsif meets_two_letter_rule?(word)
        word.chars.push(word.chars[0..1])[2..-1].join.concat("ay")
      elsif /[aeiou]/.match(word[0])
        word.concat("ay")
      else
        word.chars.push(word.chars[0])[1..-1].join.concat("ay")
      end
    end.join(' ')
  end

  # use regex to check is first 3 characters of word match
  #any constonant and then qu, thr or school
  # returns truthy (match data) if match and falsy (nil)
  # if no match
  def self.meets_three_letter_rule?(word)
    /[b-df-hj-np-tv-z]qu|thr|sch/.match(word[0..2])
  end

  def self.meets_two_letter_rule?(word)
    /ch|qu|th/.match(word[0..1])
  end

end
