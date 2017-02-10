class PigLatin

  def self.translate(phrase)
    phrase.split(' ').map do |word|
      if meets_three_letter_rule?(word)
        # word[3..-1] + word[0..2] + "ay"
        word.chars.push(word.chars[0..2])[3..-1].join.concat("ay")
      elsif meets_two_letter_rule?(word)
        word.chars.push(word.chars[0..1])[2..-1].join.concat("ay")
      elsif starts_with_vowel?(word)
        word.concat("ay")
      else
        word.chars.push(word.chars[0])[1..-1].join.concat("ay")
      end
    end.join(' ')
  end

  def self.meets_three_letter_rule?(word)
    /[b-df-hj-np-tv-z]qu|thr|sch/.match(word[0..2])
  end

  def self.meets_two_letter_rule?(word)
    /ch|qu|th/.match(word[0..1])
  end

  def self.starts_with_vowel?(word)
    /[aeiou]/.match(word[0])
  end

end
