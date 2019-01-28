CREATE DATABASE IF NOT EXISTS debted;
USE debted;

CREATE TABLE IF NOT EXISTS debtors (
  id int(5) NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  phone varchar(20) NOT NULL,
  email varchar(30) NOT NULL,
  amount_owed integer(10), 
  amount_borrowed integer(10),
    duedate date,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
