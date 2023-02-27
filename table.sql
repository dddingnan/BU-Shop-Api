CREATE TABLE User (
     userID nvarchar(30) NOT NULL,
     name nvarchar(50) NOT NULL,
     email nvarchar(100) NOT NULL,
     photoUrl nvarchar(250) NOT NULL,
     status BOOLEAN,
     isAdmin BOOLEAN,
     PRIMARY KEY (userID)
);

CREATE TABLE Product (
     productID int NOT NULL AUTO_INCREMENT,
     name nvarchar(50) NOT NULL,
     description nvarchar(100) NOT NULL,
     photoUrl nvarchar(250) NOT NULL,
     price int NOT NULL,
     stock int NOT NULL,
     createdBy nvarchar(30) NOT NULL,
     updatedBy nvarchar(30) NOT NULL,
     PRIMARY KEY (productID)
);

CREATE TABLE Cart (
     cartID int NOT NULL AUTO_INCREMENT,
     userID nvarchar(30) NOT NULL,
     productID int NOT NULL,
     stock int NOT NULL,
     PRIMARY KEY (cartID)
);