-- clue one

SELECT name, population, code
FROM country
WHERE continent = 'Europe'
AND region = 'Southern Europe'
ORDER BY population
LIMIT 1;

name              | population | code
------------------+------------+----------
Vatican City State|1000        | VAT

-- question two

SELECT language, countrycode, isofficial
FROM countrylanguage
WHERE countrycode = 'VAT'
AND isofficial;

SELECT language
FROM countrylanguage
WHERE countrycode = (SELECT code
                      FROM country
                      WHERE name = 'Holy See (Vatican City State)');

language
----------
Italian

-- question three
SELECT name
FROM country
WHERE region = 'Southern Europe'
AND name != 'Holy See (Vatican City State)'
AND code IN (SELECT countrycode
              FROM countrylanguage
              WHERE language = 'Italian'
              AND percentage = 100);

SELECT code,name
FROM country
  JOIN countrylanguage
  ON code = countrycode
    GROUP BY code
    HAVING COUNT(language) = 1
      INTERSECT
        SELECT code,name
        FROM country
        JOIN countrylanguage
        ON code = countrycode
        WHERE language = 'Italian'
        AND isofficial = true
        AND countrycode != 'VAT';

code |    name
-----+------------
SMR  | San Marino

-- question four
SELECT  name
FROM city
WHERE name != 'San Marino'
AND countrycode = (
  SELECT code
  FROM country
  WHERE name = 'San Marino');

  name
------------
Serravalle

-- question five
SELECT name
FROM country
WHERE name != 'San Marino'
AND code IN (
  SELECT countrycode
  FROM city
  WHERE name LIKE 'Serra%'
  AND name != 'Serravalle'
);

name
--------
Brazil

-- question six
SELECT name
FROM city
WHERE id = (
  SELECT capital
  FROM country
  WHERE name = 'Brazil'
);

name
----------
Brasília

-- question six
SELECT name
FROM city
WHERE population = '91084';

name
--------------
Santa Monica
