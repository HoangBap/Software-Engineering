CREATE DATABASE account_management;
use account_mananagement;
CREATE table users (
    id INT auto_increment PRIMARY KEY,
    email TEXT NOT NULL,
    user_password TEXT NOT NULL
);