### SQL LAB
# Where In The World Is Carmen Sandiego?

We're going to use what we've learned already about searching with SQL commands, and apply it – to chase down and capture an elusive and world-reknowned thief.

Follow the clues, **write down both the commands you used and the actual answers.**

And figure out where Carmen's headed, so we can catch her and bring her in.


## The Chase

**Clue #1:** We recently got word that someone fitting Carmen Sandiego's description has been traveling through Southern Europe. She's most likely traveling someplace where she won't be noticed, so find the least populated country in Southern Europe, and we'll start looking for her there.

```SQL
world=# SELECT name, population FROM country WHERE population = (SELECT MIN(population) FROM country WHERE region = 'Southern Europe');
```
**Answer:** San Marino

**Clue #2:** Now that we're here, we have insight that Carmen was seen attending language classes in this country's officially recognized language. Check our databases and find out what language is spoken in this country, so we can call in a translator to work with you.

```SQL
SELECT name, language, isofficial                                                    FROM country                                                                                 JOIN countrylanguage                                                                         ON country.code = countrylanguage.countrycode                                                WHERE countrylanguage.isofficial AND country.population = 1000                               ORDER BY name;
```
**Answer:** Italian

**Clue #3:** We have new news on the classes Carmen attended – our gumshoes tell us she's moved on to a different country, a country where people speak *only* the language she was learning. Find out which nearby country speaks nothing but that language.

```SQL
SELECT language, name, country.code FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode WHERE language = 'Italian' AND isofficial;
```
```
SELECT name, language, isofficial, code                                                    FROM country                                                                                 JOIN countrylanguage                                                                         ON country.code = countrylanguage.countrycode                                                WHERE language = 'Italian' AND isofficial                                                    ORDER BY country.name;
```

```
SELECT country.name as country_name,                                                 COUNT(language) as number_of_languages                                                       FROM country                                                                                 JOIN countrylanguage                                                                         ON country.code = countrylanguage.countrycode                                                GROUP BY country.name                                                                        HAVING COUNT(language) = 1                                                                   ORDER BY country.name;
```
```
SELECT code,name FROM country JOIN countrylanguage ON code = countrycode GROUP BY code HAVING count(language) = 1 INTERSECT select code,name FROM country JOIN countrylanguage ON code = countrycode where language = 'Italian' and isofficial = true and countrycode != 'VAT';
```
```
SELECT code                                                                          FROM country JOIN countrylanguage                                                            ON code = countrycode                                                                        GROUP BY code                                                                                HAVING COUNT(language) = 1                                                                   INTERSECT                                                                                    SELECT countrycode                                                                           FROM countrylanguage                                                                         WHERE language = 'Italian' AND countrycode != 'VAT';
```
**Answer:** San Marino

**Clue #4:** We're booking the first flight out – maybe we've actually got a chance to catch her this time. There are only two cities she could be flying to in the country. One is named the *same* as the country – that would be too obvious. We're following our gut on this one; find out what other city in that country she might be flying to.

```SQL
SELECT name                                                                          FROM city                              WHERE countrycode = 'SMR'; 
```
**Answer:**Serravalle

**Clue #5:** Oh no, she pulled a switch – there are two cities with very similar names, but in totally different parts of the globe! She's headed to South America as we speak; go find a city whose name is *like* the one we were headed to, but doesn't end the same. Find out the city, and do another search for what country it's in. Hurry!

```SQL
SELECT name, countrycode FROM city WHERE name LIKE 'Serra%' AND countrycode != 'SMR';
```
```
SELECT name FROM country WHERE code = 'BRA';
```
**Answer:**Serra

**Clue #6:** We're close! Our South American agent says she just got a taxi at the airport, and is headed towards the capital! Look up the country's capital, and get there pronto! Send us the name of where you're headed and we'll follow right behind you!

```SQL
SELECT name                                                                          FROM city                                                                                    WHERE id = (SELECT capital FROM country WHERE code = 'BRA');
```
**Answer:**Brasilia

**Clue #7:** She knows we're on to her – her taxi dropped her off at the international airport, and she beat us to the boarding gates. We have one chance to catch her, we just have to know where she's heading and beat her to the landing dock.

Lucky for us, she's getting cocky. She left us a note, and I'm sure she thinks she's very clever, but if we can crack it, we can finally put her where she belongs – behind bars.

      Our playdate of late has been unusually fun –
      As an agent, I'll say, you've been a joy to outrun.
      And while the food here is great, and the people – so nice!
      I need a little more sunshine with my slice of life.
      So I'm off to add one to the population I find
      In a city of ninety-one thousand and now, eighty five.

We're counting on you, gumshoe. Find out where she's headed, send us the info, and we'll be sure to meet her at the gates with bells on.

```SQL
SELECT name, population FROM city WHERE population = 91084;
```
**Answer:**Santa Monica