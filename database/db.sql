create database if not exists messenger;

use messenger; -- Si estas en consola, en caso de que no lo estes, obvia esta sentencia

create table users(
    id int auto_increment,
    email varchar(300) not null,
    password varchar(200) not null,
    username varchar(50) not null,
    photo_profile varchar(200) not null default '',
    primary key(id)
);

create table msgs(
    id int auto_increment,
    msgtext longtext not null default '',
    send_id int,
    id_chat int,
    create_at datetime default now(),
    primary key(id)
);

create table chats(
    id int auto_increment,
    id_user1 int,
    id_user2 int,
    user1_sub bit default 0,
    user2_sub bit default 0,
    update_at datetime default now(),
    primary key(id)
);