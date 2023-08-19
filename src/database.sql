CREATE DATABASE account_management;
use account_management;

CREATE TABLE User (
    ID INT auto_increment PRIMARY KEY,
    email TEXT NOT NULL,
    user_password TEXT NOT NULL
);

CREATE TABLE UserProfile (
    user_ID INT,
    fullname TEXT,
    phone_number VARCHAR(20),
    gender CHAR(3),
    home_address TEXT,
    country TEXT,
    date_of_birth DATE,
    CONSTRAINT FK_userIDprofile_ID FOREIGN KEY (user_ID) references User(ID)
);

CREATE TABLE UserHealthRecord (
    record_ID INT auto_increment,
    user_ID INT,
    height_value INT NOT NULL,
    weight_value INT NOT NULL,
    blood_sugar INT NOT NULL,
    heart_rate INT NOT NULL,
    heart_pressure_systolic INT NOT NULL,
    heart_pressure_diastolic INT NOT NULL,
    submit_date DATE,
    PRIMARY KEY (record_ID, user_ID),
    CONSTRAINT FK_userIDhealth_ID FOREIGN KEY (user_ID) references User(ID)
);
