-- Create the tables

CREATE TABLE user (
     userID nvarchar(30) NOT NULL,
     name nvarchar(50) NOT NULL,
     email nvarchar(100) NOT NULL,
     photoUrl nvarchar(250) NOT NULL,
     status BOOLEAN,
     isAdmin BOOLEAN,
     PRIMARY KEY (userID)
);

CREATE TABLE product (
     productID int NOT NULL AUTO_INCREMENT,
     name nvarchar(50) NOT NULL,
     description nvarchar(100) NOT NULL,
     photoUrl nvarchar(250) NOT NULL,
     price int NOT NULL,
     stock int NOT NULL,
     productStatus int NOT NULL,
     createdBy nvarchar(30) NOT NULL,
     updatedBy nvarchar(30) NOT NULL,
     PRIMARY KEY (productID)
);

CREATE TABLE cart (
     cartID int NOT NULL AUTO_INCREMENT,
     userID nvarchar(30) NOT NULL,
     productID int NOT NULL,
     stock int NOT NULL,
     PRIMARY KEY (cartID)
);

CREATE TABLE userOrder (
     orderID int NOT NULL AUTO_INCREMENT,
     userID nvarchar(30) NOT NULL,
     status int NOT NULL,
     orderTime nvarchar(30) NOT NULL,
     updatedTime nvarchar(30) NOT NULL,
     updatedBy nvarchar(30) NOT NULL,
     PRIMARY KEY (orderID)
);

CREATE TABLE orderDetail (
     orderDetailID int NOT NULL AUTO_INCREMENT,
     orderID int NOT NULL,
     productID int NOT NULL,
     stock int NOT NULL,
     PRIMARY KEY (orderDetailID)
);

-- Insert data into the database

INSERT into user(userID, name, email, photoUrl, status, isAdmin)
VALUES
('x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'Dingnan H', 'silenceapple1027@gmail.com', 'https://lh3.googleusercontent.com/a/AEdFTp5lKaaZeFLKf6zjhKKOfhb-0E0u3afgAQeQEGiTAg=s96-c', 1, 1);

INSERT INTO product (name, description, photoUrl, price, stock, createdBy, updatedBy) 
VALUES
('Camera', 'A device for taking still or moving pictures.', 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c', 100, 88, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Steak', 'A slice of beef.', 'https://images.unsplash.com/photo-1600891964092-4316c288032e', 90, 82, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Burger', 'A similar sandwich or patty.', 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8', 100, 77, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Coffee', 'The powder made by roasting and grinding the seeds.', 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', 100, 22, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Hats', 'A covering for the head in the form of a cone.', 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', 100, 33, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Honey', 'A sticky yellowish-brown fluid made by bees.', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', 100, 11, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Basketball', 'A sport in which to put a ball through a hoop.', 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', 100, 66, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Tomato', 'A widely cultivated plant.', 'https://images.unsplash.com/photo-1567306301408-9b74779a11af', 100, 22, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Bike', 'A bicycle.', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7', 100, 55, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2'),
('Book', 'A written or printed work consisting of pages.', 'https://images.unsplash.com/photo-1589998059171-988d887df646', 100, 77, 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2', 'x2aV7tc0Kkfxw2lOMZS8Ja0ryVq2');