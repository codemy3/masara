-- MASARA Menu System Schema & Initial Data
-- Run this script in the Supabase SQL Editor to set up your database.

-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Menu Items Table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active categories and items
CREATE POLICY "Public can read active categories" ON categories 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read available menu items" ON menu_items 
  FOR SELECT USING (true); -- Public can read all items (we might need to show unavailable ones as 'Sold Out')

-- Allow authenticated admins full access
CREATE POLICY "Admins have full access to categories" ON categories 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to menu items" ON menu_items 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Insert Initial MASARA Menu Data

-- Insert Categories and get their UUIDs to insert items
DO $$
DECLARE
  cat_salads UUID;
  cat_chaats UUID;
  cat_soups UUID;
  cat_small UUID;
  cat_veg_tan UUID;
  cat_sea_tan UUID;
  cat_non_tan UUID;
  cat_app UUID;
  cat_curries UUID;
  cat_veg_gravies UUID;
  cat_biryanis UUID;
  cat_breads UUID;
  cat_beverages UUID;
  cat_desserts UUID;
BEGIN
  -- Insert Categories
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Salad Course', 'salads', NULL, 10) RETURNING id INTO cat_salads;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Chaats', 'chaats', 'Celebrating the heritage of Indian street food. Reimagined with finesse - our chaats balance sweet, sour, spicy and savoury notes in a perfect harmony.', 20) RETURNING id INTO cat_chaats;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Soups', 'soups', 'Our soups are crafted as quiet masterpieces—slow-extracted broths and velvety purées built layer by layer. Each bowl strikes a balance of depth and delicacy, comforting yet complex, familiar yet refined. Designed to awaken the palate, they gently prepare you for what follows.', 30) RETURNING id INTO cat_soups;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Small Plates', 'small-plates', NULL, 40) RETURNING id INTO cat_small;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Vegetarian Tandoor', 'veg-tandoor', NULL, 50) RETURNING id INTO cat_veg_tan;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Seafood Tandoor', 'seafood-tandoor', NULL, 60) RETURNING id INTO cat_sea_tan;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Non Veg Tandoor', 'non-veg-tandoor', NULL, 70) RETURNING id INTO cat_non_tan;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Appetizers', 'appetizers', NULL, 80) RETURNING id INTO cat_app;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Curries & Non-Veg Gravies', 'curries', 'Born in the royal kitchens of Awadh, Nihari was once a dawn dish, slow-cooked through the night and savoured after the morning prayers. Prepared from collagen-rich cuts, the stew is simmered for hours until the meat yields effortlessly, fragrant with whole spices, finished with a silky sheen of fat and a whisper of warmth.', 90) RETURNING id INTO cat_curries;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Vegetarian Gravies', 'veg-gravies', NULL, 100) RETURNING id INTO cat_veg_gravies;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Biryanis & Rice', 'biryanis-rice', NULL, 110) RETURNING id INTO cat_biryanis;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Breads', 'breads', NULL, 120) RETURNING id INTO cat_breads;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Beverages', 'beverages', NULL, 130) RETURNING id INTO cat_beverages;
  
  INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Desserts', 'desserts', NULL, 140) RETURNING id INTO cat_desserts;

  -- Insert Menu Items (Salads)
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_salads, 'Raw Mango Papaya Salad', 249, 'A Thai-style raw papaya salad infused with a desi achari twist.', true, 10),
  (cat_salads, 'Green Salad', 199, 'Assorted cut vegetables - Indian style, perfect to pair with your meal.', true, 20);

  -- Chaats
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_chaats, 'Palak Patta Chaat', 299, 'Featuring crispy, batter fried spinach (palak) topped with a blend of creamy yogurt, spicy green chutney and an assortment of chutneys & spices.', true, 10),
  (cat_chaats, 'Gujiya Chaat / Dahi Gujiya', 299, 'Crispy and flaky half moon shaped savoury dumplings from Gujarat topped with some creamy yogurt & an assortment of chutneys and spices.', true, 20),
  (cat_chaats, 'Aam Puri', 199, 'Crispy puris stuffed with a refreshing blend of raw mango and pineapple achari salsa, perfectly balanced with sweet and tangy masala pani. A vibrant burst of flavors that delivers crunch, zest, and nostalgia in every bite.', true, 30);

  -- Soups
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_soups, 'Spinach and Broccoli Soup', 249, 'Velvety, flavour packed and nutritious soup made with a mix of broccoli, spinach and some assorted veggies and richness of Almond.', true, 10),
  (cat_soups, 'Murgh-e-Sultani Shorba', 275, 'Rich chicken shorba/soup slow cooked with heritage Indian spices packed with the goodness of slow cooking and ultimate comfort.', false, 20),
  (cat_soups, 'Royale Mutton Shorba', 299, 'A rich Yakhni based soup, slow cooked overnight with Nehari inspired spices. Served with shredded chunks of mutton, caramelised onion and a wedge of lime.', false, 30);

  -- Small Plates
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_small, 'Prawns Ghee Roast Tacos', 499, 'Mangalorean Ghee Roast Prawns, Corn tortillas, Guacamole, coconut mayo & fried boondi.', false, 10),
  (cat_small, 'Kerala Style Crab Pepper Dry', 499, 'Black pepper • Crab • Onions.', false, 20),
  (cat_small, 'Arbi Haleem Baklava Tart', 499, 'Taro root / Colocasia, Birista, Phyllo pastry.', true, 30),
  (cat_small, 'Clams Pundi', 499, 'A Quintessential Mangalorean Dish made with mini rice cakes simmered in an aromatic, super umami Clams Curry. A Indian pasta like dish.', false, 40);

  -- Veg Tandoor
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_veg_tan, 'Malai Broccoli', 375, 'Broccoli coated in a rich, creamy marinade of hung curd and fresh cream, delicately infused with subtle spices and grilled to perfection.', true, 10),
  (cat_veg_tan, 'Baadshahi Paneer Tikka', 375, 'Safaed Paneer tikka stuffed with nuts and sweet raisins. Every bite leaves you feel Shahi.', true, 20),
  (cat_veg_tan, 'Nadru Seekh Kebab Canapes', 349, 'Kashmiri Nadru turned into a smoky, creamy, dreamy & flavourful Seekh Kebabs topped on a fluffy toasted bread.', true, 30),
  (cat_veg_tan, 'Yam Shikampuri Kebab', 349, 'A vegetarian twist on the traditional Hyderabadi Shikampuri Kebab using yam; perfectly creamy and melt in mouth.', true, 40),
  (cat_veg_tan, 'Tandoori Watan Mushrooms', 349, 'Stuffed Mushroom heads marinated in a Green masala marinade (Hirva Watan) and tandoored to smoky perfection.', true, 50),
  (cat_veg_tan, 'Paneer Multani Tikka', 375, 'Spinach and cheese stuffed Paneer Tikka marinated in Mellow masala base perfectly rich and creamy.', true, 60);

  -- Seafood Tandoor
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_sea_tan, 'Suneri Jhinga', 599, 'Juicy succulent prawns marinated in Golden flavourful marinade. A smoky, flavourfilled surprise in every bite.', false, 10),
  (cat_sea_tan, 'Peeli Mirchi Ki Machli', 449, 'Fish tikkas marinated in a yellow chilli based tandoori marinade, mild heat, flaky fish & bursting with flavours.', false, 20),
  (cat_sea_tan, 'Laal Tandoori Machli', 449, 'Bold, fiery, Red fish tikkas marinated in Kashmiri Mirch based marination. A classic timeless recipe.', false, 30);

  -- Non Veg Tandoor
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_non_tan, 'Murgh Chandi Kaliyaan', 425, 'Chicken chunks marinated in a rich, creamy blend, tandoored to smoky perfection and finished with silver leaf, each bite evokes a Shahi Dastarkhwan.', false, 10),
  (cat_non_tan, 'Bhatti Da Kukkad', 425, 'A spicy, smoky Punjabi grilled chicken bursting with rustic flavours from a desi marinade consisting of mustard oil, garam masala, Yogurt etc.', false, 20),
  (cat_non_tan, 'Awadhi Murgh Padana', 425, 'Rich, slow cooked chicken known for its royal flavours by aromatic spices, nut pastes & smooth smoke of tandoor.', false, 30),
  (cat_non_tan, 'Chakori Kebab', 425, 'A hot flavourful chicken appetizer marinated in a fresh masala made of a variety of herbs & greens, resulting in a spicy, peppery & beautiful herbal notes.', false, 40),
  (cat_non_tan, 'Laal Angara Murgh Tandoori', 425, 'Bold Red umami chicken tikka with sweet, spicy, tangy & smoky notes. A perfect balanced medley of flavour profiles.', false, 50),
  (cat_non_tan, 'Lehsooni Dhaniya Murgh Tikka', 425, 'Tender, boneless chicken pieces marinated in a flavourful blend dominated by Garlic & Coriander. Each bite is a flavour explosion.', false, 60),
  (cat_non_tan, 'Mutton Burra Kebabs', 425, 'A popular Mughlai dish consisting of tender, marinated Mutton Chops, grilled to smoky, roasted perfection.', false, 70),
  (cat_non_tan, 'Mutton Seekh Kebab', 425, 'Minced prime mutton seasoned with roasted spices, fresh herbs, and a signature marinade, skewered and cooked in the tandoor for a smoky, juicy finish.', false, 80),
  (cat_non_tan, 'Chicken Gilafi - seekh kebab', 425, 'Tari wala murgh - Dhaba Style Kukkad', false, 90);

  -- Appetizers
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_app, 'Coconut Podi Masala Prawns', 599, 'Butterfly prawns, desiccated coconut, Podimasala, Panko.', false, 10),
  (cat_app, 'Chicken Tikka Puri', 299, 'Chicken tikka, Crispy Puri, Salsa.', false, 20),
  (cat_app, 'Pulimunchi Meen Pallichathu', 599, 'Byadgichilli, Tamarind, Fish, Banana leaf.', false, 30),
  (cat_app, 'Prawns Ghee Roast', 599, 'Prawns, Ghee, Byadgi chilli, spices.', false, 40),
  (cat_app, 'Dahi Kebab', 349, 'Hung curd, spices, Imli chutney.', true, 50),
  (cat_app, 'Yam Shikampuri', 349, 'Yam, Caramelised onion, cashew, Boondi.', true, 60),
  (cat_app, 'Mini Chole Kulchey', 299, 'Aloo Kulcha, Delhi chole, Papad, chutneys.', true, 70);

  -- Curries
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_curries, 'Masara Special Chicken', 475, 'A super rich, velvety, flavourful, hot spicy and fragrant thick, creamy chicken gravy. A literal flavour party on the palate.', false, 10),
  (cat_curries, 'Dhaba Style Kukkad', 449, 'A popular authentic Punjabi-style chicken curry known for its flavourful, thin gravy. A proper Dhaba style dish.', false, 20),
  (cat_curries, 'Bhopali Murgh Rezala', 449, 'A rich, royal Indian chicken curry that distinguishes itself from other regional variations with its generous use of coriander leaves, a blend of mild spices & a creamy, delicate gravy.', false, 30),
  (cat_curries, 'Butter Chicken', 449, 'An enduring classic from the kitchens of Old Delhi, where tandoor-roasted chicken is gently folded into a silken tomato gravy enriched with butter & cream.', false, 40),
  (cat_curries, 'Murgh Kalimirchi', 449, 'A popular dish from the other part of Punjab featuring succulent chicken in a rich, spicy, black pepper gravy.', false, 50),
  (cat_curries, 'Kadai Prawns', 599, 'A flavourful Indian dish where succulent prawns are cooked in a spiced, aromatic tomato-based gravy with garlic, onions & bell peppers.', false, 60),
  (cat_curries, 'Raw Mango Fish Curry', 550, 'A coastal classic that celebrates the magic of sour & spice. Fresh fish simmered with Raw mango, lending a bright, tangy lift to a warm, aromatic gravy of traditional spices & coconut milk.', false, 70),
  (cat_curries, 'Mutton Rogan Josh', 599, 'A timeless Kashmiri classic, a slow cooked celebration of tender meat simmered in a rich, aromatic gravy which draws its signature deep red hue from chillies - not heat, but gentle warmth & aroma.', false, 80),
  (cat_curries, 'Nihari Gosht', 599, 'A stew consists of slow cooked meat with gentle spices from the Royal kitchens of Old Delhi & Awadh, finished with fragrant ghee, birista, ginger & fresh coriander - deeply warming, indulgent and steeped in centuries of culinary heritage.', false, 90),
  (cat_curries, 'Makhani Boti', 599, 'Silky, velvety tomato based Makhani gravy - true North Indian royal style paired with tender flavourful charred mutton boti, finished with butter & hints of kasuri methi.', false, 100),
  (cat_curries, 'Rara Gosht', 599, 'A popular & signature dish of Punjabi & Mughlai cuisine that uniquely combines bone-in mutton pieces with mutton mince (keema) in a thick flavourful gravy made with aromatic spices, onion & tomatoes.', false, 110);

  -- Veg Gravies
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_veg_gravies, 'Dal Makhni', 325, 'A slow simmered legacy of the North - whole black lentils & kidney beans cooked overnight, enriched with butter & cream finished with gentle spices for a deep, velvety.', true, 10),
  (cat_veg_gravies, 'Lehsuni Palak Burrata', 399, 'A modern Indian dish that combines classic, garlicky Indian spinach curry with fresh creamy Italian Burrata & Candied Almonds.', true, 20),
  (cat_veg_gravies, 'Punjabi Soya Chaap Tikka Masala', 349, 'Char-grilled Soya chaap simmered in a robust Punjabi tomato-onion masala, finished with cream, butter & bold aromatic spices.', true, 30),
  (cat_veg_gravies, 'Martban Ke Chole', 325, 'Chickpeas slow-cooked in a sealed earthen pot, where gentle heat & time coax out profound spice, natural richness & an earthy depth unique to clay pot cooking.', true, 40),
  (cat_veg_gravies, 'Matar Paneer Makhana', 349, 'Soft Paneer & green peas in a gently spiced tomato gravy, rich & creamy enriched with roasted Makhana for depth & texture. A touch of noble indulgence.', true, 50),
  (cat_veg_gravies, 'Paneer Lababdar', 349, 'Soft Paneer cooked in a luxurious onion-tomato gravy, enriched with butter, cream & fragrant spices, finished with a hint of sweetness & smoke.', true, 60),
  (cat_veg_gravies, 'Tazi Bhuni Subzi', 325, 'A regal medley of fresh seasonal vegetables, gently sauteed with hand-ground spices & finished with ghee for a delicate, aromatic finish.', true, 70),
  (cat_veg_gravies, 'Mushroom Matar Miloni', 349, 'A harmonious blend of mushrooms and peas simmered in a silky, aromatic gravy-a refined and balanced North Indian classic.', true, 80);

  -- Biryanis
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_biryanis, 'Rampuri Murgh Dum Biryani', 499, 'A refined biryani from Rampur, layered with fragrant basmati, delicately spiced meat, saffron & crisp onions, sealed & slow-cooked on dum.', false, 10),
  (cat_biryanis, 'Chicken Tikka Biryani', 499, 'Char-grilled chicken tikka layered with fragrant basmati rice, spices, and saffron; finished on dum for a smoky, aromatic biryani that balances fire, fragrance, flavour & finesse.', false, 20),
  (cat_biryanis, 'Awadhi Gosht Dum Biryani', 599, 'Tender mutton & fragrant basmati rice, delicately spiced in the Awadhi tradition, layered & sealed on dum to create a biryani of quiet richness, aroma & timeless finesse.', false, 30),
  (cat_biryanis, 'Shehzadi Paneer Biryani', 439, 'Soft paneer layered with fragrant basmati rice, gentle spices, saffron & crisp onions, sealed & slow cooked on dum to create a biryani that is aromatic, balanced & elegantly indulgent.', true, 40),
  (cat_biryanis, 'Steamed Rice', 199, 'Long grain basmati, gently steamed to preserve its natural aroma & delicate texture. Light, fluffy & perfectly poised to accompany rich curries & gravies.', true, 50);

  -- Breads
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_breads, 'Zatar Cheese Naan', 129, NULL, true, 10),
  (cat_breads, 'Punjabi Onion & Mirchi Tandoori Roti', 89, NULL, true, 20),
  (cat_breads, 'Tandoori Roti (Plain / Butter)', 89, NULL, true, 30),
  (cat_breads, 'Zatar Paratha', 110, NULL, true, 40),
  (cat_breads, 'Naan (Plain / Butter / Garlic)', 99, NULL, true, 50),
  (cat_breads, 'Lachcha Parantha', 99, NULL, true, 60),
  (cat_breads, 'Stuffed Kulcha (Aloo & Onion / Paneer)', 129, NULL, true, 70);

  -- Beverages
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_beverages, 'Raw Mango Pineapple Kulukki', 149, 'Totapuri Mangoes, Pineapple, Green Chilli.', true, 10),
  (cat_beverages, 'Desi Guava Punch', 199, 'Guava juice, Jaljeera, Lime.', true, 20),
  (cat_beverages, 'Creamy Spark', 199, 'Yakult, Sweet Soda, Mint.', true, 30),
  (cat_beverages, 'Virgin Pinacolada', 199, 'Pineapple, Coconut, Cream.', true, 40),
  (cat_beverages, 'Virgin Mojito', 199, 'Mint, Lime Juice, Soda.', true, 50),
  (cat_beverages, 'Pineapple Blossom', 249, 'Pineapple, Basil leaves, Lime.', true, 60),
  (cat_beverages, 'Berry Float', 229, 'Mixed Berries, Vanilla, Cream.', true, 70),
  (cat_beverages, 'Fruit Punch', 229, 'Mixed fruit juice • Berries • Vanilla Icecream', true, 80);

  -- Desserts
  INSERT INTO menu_items (category_id, name, price, description, is_vegetarian, display_order) VALUES
  (cat_desserts, 'Tender Coconut Tresleches', 349, 'An airy sponge steeped in a trio of milks enriched with tender coconut, layered with soft cream & subtle sweetness, offering a delicate balance of tropical freshness & classic indulgence.', true, 10),
  (cat_desserts, 'Rasmalai Pannacotta', 349, 'Creamy light, flavourful Rasmalai pannacotta paired with candied nuts, angoori rasmalai, tuile & a creamy kesar malai sauce.', true, 20),
  (cat_desserts, 'Khajur Poda', 349, 'Rich, dense, and chewy dates cake paired with Kulfi Ice cream and brown butter toffee sauce.', true, 30);

END $$;
