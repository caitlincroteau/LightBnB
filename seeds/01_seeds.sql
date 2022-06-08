INSERT INTO users (name, email, password)
VALUES 
('Will Byers', 'will@aol.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Max Mayfield', 'max@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Steve Harrington', 'steve-o99@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jim Hopper', 'jimbo@hawkinspd.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Murray Bauman', 'mb@theyarewatching.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Karen Wheeler', 'bestmom56@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(6, 'Lake-front Retreat', 'Relaxing weekend away with the whole family!', 'thumb_url', 'cover_url', 175, 4, 3, 5, 'Canada', 'Lake Lane', 'Sylvan Lake', 'Alberta', 'TN56L9', TRUE),
(5, 'The Bunker', 'Stocked for the end times. Contact for location details.', 'thumb_url', 'cover_url', 300, 1, 1, 1, 'USA', 'undisclosed', 'undisclosed', 'Alaska', 'undisclosed', TRUE),
(4, 'Cabin in the Woods', 'Rustic Charm', 'thumb_url', 'cover_url', 75, 2, 1, 2, 'Canada', 'Pine Road', 'Hawkins', 'BC', 'V9M2A1', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(1, 3, 1, 3, 'Cool place for DnD weekend. Too many spiders.'),
(2, 2, 2, 0, 'This place is creepy and smells funny. Not worth the money, even during the apocalypse.'),
(3, 1, 3, 5, 'Mrs. Wheeler knows how to keep a nice place. Excellent for entertaining!');