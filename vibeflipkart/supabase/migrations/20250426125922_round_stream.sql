-- Users (password is 'password')
INSERT INTO users (name, email, password, phone) VALUES 
('John Doe', 'john@example.com', '$2a$10$3gzxH2M0mhQnClZXBfv7u.vJtUYxAgDsYJ7TQQAWoJe17v.DGzpvO', '1234567890');

INSERT INTO user_roles (user_id, role) VALUES (1, 'ROLE_USER');

-- Products
INSERT INTO products (name, description, current_price, original_price, discount, image_url, category, brand, average_rating, rating_count, in_stock) VALUES
('iPhone 15 Pro (128GB)', 'The iPhone 15 Pro features a titanium design that's strong yet light, A17 Pro chip for impressive performance, and a customizable Action button.', 119900, 129900, 8, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Apple', 4.8, 2432, true),
('Samsung Galaxy S23 Ultra (256GB)', 'The Galaxy S23 Ultra features a built-in S Pen, epic camera, and a powerful processor to keep you creating.', 99999, 124999, 20, 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Samsung', 4.6, 1875, true),
('Sony WH-1000XM5 Wireless Headphones', 'Industry-leading noise cancellation optimized for you with multiple noise cancelling microphones.', 29990, 34990, 14, 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Sony', 4.7, 1243, true),
('Apple MacBook Air M2 (8GB/256GB)', 'The new MacBook Air with M2 chip features a strikingly thin design and exceptional battery life.', 92900, 99900, 7, 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Apple', 4.8, 1985, true),
('Nike Air Jordan 1 Retro High OG', 'The Air Jordan 1 Retro High OG is crafted with premium materials and classic design elements.', 16995, 16995, 0, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600', 'fashion', 'Nike', 4.9, 2543, true),
('Dyson V15 Detect Cordless Vacuum', 'The Dyson V15 Detect reveals dust you cannot normally see with a precisely-angled laser.', 56900, 65900, 14, 'https://images.pexels.com/photos/4909821/pexels-photo-4909821.jpeg?auto=compress&cs=tinysrgb&w=600', 'appliances', 'Dyson', 4.7, 876, true),
('Kindle Paperwhite (16 GB)', 'Kindle Paperwhite delivers premium features with a 6.8" display, adjustable warm light, and up to 10 weeks of battery life.', 13999, 16999, 18, 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Amazon', 4.6, 1234, true),
('Samsung 65" Neo QLED 4K Smart TV', 'Experience stunning 4K resolution and immersive sound with this state-of-the-art Neo QLED Smart TV.', 159990, 189990, 16, 'https://images.pexels.com/photos/6782354/pexels-photo-6782354.jpeg?auto=compress&cs=tinysrgb&w=600', 'electronics', 'Samsung', 4.5, 879, true);

-- Product Images
INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600'),
(1, 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600'),
(2, 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'),
(2, 'https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Product Specs
INSERT INTO product_specs (product_id, spec_key, spec_value) VALUES
(1, 'Display', '6.1-inch Super Retina XDR'),
(1, 'Processor', 'A17 Pro chip'),
(1, 'Camera', '48MP main camera'),
(1, 'Battery', 'Up to 23 hours video playback'),
(2, 'Display', '6.8-inch Dynamic AMOLED 2X'),
(2, 'Processor', 'Snapdragon 8 Gen 2'),
(2, 'Camera', '200MP main camera'),
(2, 'Battery', '5000mAh');