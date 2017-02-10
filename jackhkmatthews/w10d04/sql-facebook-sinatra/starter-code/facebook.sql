create table people (
  id serial8 primary key,
  first varchar(20),
  last varchar(20) not null,
  dob date check (dob < '2000-06-24'),
  relationship varchar(50),
  friends int2 default 0,
  city varchar(20)
);
