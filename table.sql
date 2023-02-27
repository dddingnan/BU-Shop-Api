CREATE TABLE User (
     userID nvarchar(30) NOT NULL,
     name nvarchar(50) NOT NULL,
     email nvarchar(100) NOT NULL,
     photoUrl nvarchar(250) NOT NULL,
     PRIMARY KEY (userID)
);