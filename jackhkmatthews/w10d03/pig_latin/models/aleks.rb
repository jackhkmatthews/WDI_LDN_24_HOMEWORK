class PigLatin

  def self.translate(phrase)
    words = phrase.split(" ")
    words.map do |word|
      p word
      vowels = ["a", "e", "i", "o", "u"]
      option2 = ["ch", "qu", "th"]
      option3 = ["qu"]
      option4 = ["thr", "sch"]
      if vowels.include? (word[0].downcase)
        word + "ay"
      elsif option4.include? (word[0..2].downcase)
        word += word[0..2]
        word[0..2] = ""
        word + "ay"
      elsif option2.include? (word[0..1].downcase)
        word += word[0..1]
        word[0..1] = ""
        word + "ay"
      elsif option3.include? (word[1..2].downcase) and !vowels.include? (word[0].downcase)
        word += word[0..2]
        word[0..2] = ""
        word + "ay"
      elsif !vowels.include? (word[0].downcase)
        word += word[0]
        word[0] = ""
        word + "ay"
      end
    end.join(" ")
  end
end
