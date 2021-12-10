create database vacationTag;
use vacationTag;

create table users(
id int auto_increment,
firstName varchar(255) not null,
lastName varchar(255) not null,
userName varchar(255) not null,
primary key(id),
password varchar(8) not null,
role varchar(5) not null default "user"
);

create table vacations (
id int auto_increment,
primary key(id),
title varchar(255) not null,
description text not null,
destination varchar(255) not null,
img text not null,
arrDate text not null,
retDate text not null,
price int not null
);

create table followingUsers(
id int auto_increment,
primary key(id),
userID int,
foreign key(userID) references  users(id),
vacationID int,
foreign key(vacationID) references vacations(id)
);