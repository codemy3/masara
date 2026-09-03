export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isVegetarian?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "salads",
    title: "Salad Course",
    items: [
      {
        name: "Raw Mango Papaya Salad",
        price: "249/-",
        description: "A Thai-style raw papaya salad infused with a desi achari twist.",
        isVegetarian: true,
      },
      {
        name: "Green Salad",
        price: "199/-",
        description: "Assorted cut vegetables - Indian style, perfect to pair with your meal.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "chaats",
    title: "Chaats",
    description: "Celebrating the heritage of Indian street food. Reimagined with finesse - our chaats balance sweet, sour, spicy and savoury notes in a perfect harmony.",
    items: [
      {
        name: "Palak Patta Chaat",
        price: "299/-",
        description: "Featuring crispy, batter fried spinach (palak) topped with a blend of creamy yogurt, spicy green chutney and an assortment of chutneys & spices.",
        isVegetarian: true,
      },
      {
        name: "Gujiya Chaat / Dahi Gujiya",
        price: "299/-",
        description: "Crispy and flaky half moon shaped savoury dumplings from Gujarat topped with some creamy yogurt & an assortment of chutneys and spices.",
        isVegetarian: true,
      },
      {
        name: "Aam Puri",
        price: "199/-",
        description: "Crispy puris stuffed with a refreshing blend of raw mango and pineapple achari salsa, perfectly balanced with sweet and tangy masala pani. A vibrant burst of flavors that delivers crunch, zest, and nostalgia in every bite.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "soups",
    title: "Soups",
    description: "Our soups are crafted as quiet masterpieces—slow-extracted broths and velvety purées built layer by layer. Each bowl strikes a balance of depth and delicacy, comforting yet complex, familiar yet refined. Designed to awaken the palate, they gently prepare you for what follows.",
    items: [
      {
        name: "Spinach and Broccoli Soup",
        price: "249/-",
        description: "Velvety, flavour packed and nutritious soup made with a mix of broccoli, spinach and some assorted veggies and richness of Almond.",
        isVegetarian: true,
      },
      {
        name: "Murgh-e-Sultani Shorba",
        price: "275/-",
        description: "Rich chicken shorba/soup slow cooked with heritage Indian spices packed with the goodness of slow cooking and ultimate comfort.",
      },
      {
        name: "Royale Mutton Shorba",
        price: "299/-",
        description: "A rich Yakhni based soup, slow cooked overnight with Nehari inspired spices. Served with shredded chunks of mutton, caramelised onion and a wedge of lime.",
      },
    ],
  },
  {
    id: "small-plates",
    title: "Small Plates",
    items: [
      {
        name: "Prawns Ghee Roast Tacos",
        price: "499/-",
        description: "Mangalorean Ghee Roast Prawns, Corn tortillas, Guacamole, coconut mayo & fried boondi.",
      },
      {
        name: "Kerala Style Crab Pepper Dry",
        price: "499/-",
        description: "Black pepper • Crab • Onions.",
      },
      {
        name: "Arbi Haleem Baklava Tart",
        price: "499/-",
        description: "Taro root / Colocasia, Birista, Phyllo pastry.",
        isVegetarian: true,
      },
      {
        name: "Clams Pundi",
        price: "499/-",
        description: "A Quintessential Mangalorean Dish made with mini rice cakes simmered in an aromatic, super umami Clams Curry. A Indian pasta like dish.",
      },
    ],
  },
  {
    id: "veg-tandoor",
    title: "Vegetarian Tandoor",
    items: [
      {
        name: "Malai Broccoli",
        price: "375/-",
        description: "Broccoli coated in a rich, creamy marinade of hung curd and fresh cream, delicately infused with subtle spices and grilled to perfection.",
        isVegetarian: true,
      },
      {
        name: "Baadshahi Paneer Tikka",
        price: "375/-",
        description: "Safaed Paneer tikka stuffed with nuts and sweet raisins. Every bite leaves you feel Shahi.",
        isVegetarian: true,
      },
      {
        name: "Nadru Seekh Kebab Canapes",
        price: "349/-",
        description: "Kashmiri Nadru turned into a smoky, creamy, dreamy & flavourful Seekh Kebabs topped on a fluffy toasted bread.",
        isVegetarian: true,
      },
      {
        name: "Yam Shikampuri Kebab",
        price: "349/-",
        description: "A vegetarian twist on the traditional Hyderabadi Shikampuri Kebab using yam; perfectly creamy and melt in mouth.",
        isVegetarian: true,
      },
      {
        name: "Tandoori Watan Mushrooms",
        price: "349/-",
        description: "Stuffed Mushroom heads marinated in a Green masala marinade (Hirva Watan) and tandoored to smoky perfection.",
        isVegetarian: true,
      },
      {
        name: "Paneer Multani Tikka",
        price: "375/-",
        description: "Spinach and cheese stuffed Paneer Tikka marinated in Mellow masala base perfectly rich and creamy.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "seafood-tandoor",
    title: "Seafood Tandoor",
    items: [
      {
        name: "Suneri Jhinga",
        price: "599/-",
        description: "Juicy succulent prawns marinated in Golden flavourful marinade. A smoky, flavourfilled surprise in every bite.",
      },
      {
        name: "Peeli Mirchi Ki Machli",
        price: "449/-",
        description: "Fish tikkas marinated in a yellow chilli based tandoori marinade, mild heat, flaky fish & bursting with flavours.",
      },
      {
        name: "Laal Tandoori Machli",
        price: "449/-",
        description: "Bold, fiery, Red fish tikkas marinated in Kashmiri Mirch based marination. A classic timeless recipe.",
      },
    ],
  },
  {
    id: "non-veg-tandoor",
    title: "Non Veg Tandoor",
    items: [
      {
        name: "Murgh Chandi Kaliyaan",
        price: "425/-",
        description: "Chicken chunks marinated in a rich, creamy blend, tandoored to smoky perfection and finished with silver leaf, each bite evokes a Shahi Dastarkhwan.",
      },
      {
        name: "Bhatti Da Kukkad",
        price: "425/-",
        description: "A spicy, smoky Punjabi grilled chicken bursting with rustic flavours from a desi marinade consisting of mustard oil, garam masala, Yogurt etc.",
      },
      {
        name: "Awadhi Murgh Padana",
        price: "425/-",
        description: "Rich, slow cooked chicken known for its royal flavours by aromatic spices, nut pastes & smooth smoke of tandoor.",
      },
      {
        name: "Chakori Kebab",
        price: "425/-",
        description: "A hot flavourful chicken appetizer marinated in a fresh masala made of a variety of herbs & greens, resulting in a spicy, peppery & beautiful herbal notes.",
      },
      {
        name: "Laal Angara Murgh Tandoori",
        price: "425/-",
        description: "Bold Red umami chicken tikka with sweet, spicy, tangy & smoky notes. A perfect balanced medley of flavour profiles.",
      },
      {
        name: "Lehsooni Dhaniya Murgh Tikka",
        price: "425/-",
        description: "Tender, boneless chicken pieces marinated in a flavourful blend dominated by Garlic & Coriander. Each bite is a flavour explosion.",
      },
      {
        name: "Mutton Burra Kebabs",
        price: "425/-",
        description: "A popular Mughlai dish consisting of tender, marinated Mutton Chops, grilled to smoky, roasted perfection.",
      },
      {
        name: "Mutton Seekh Kebab",
        price: "425/-",
        description: "Minced prime mutton seasoned with roasted spices, fresh herbs, and a signature marinade, skewered and cooked in the tandoor for a smoky, juicy finish.",
      },
      {
        name: "Chicken Gilafi - seekh kebab",
        price: "425/-",
        description: "Tari wala murgh - Dhaba Style Kukkad",
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        name: "Coconut Podi Masala Prawns",
        price: "599/-",
        description: "Butterfly prawns, desiccated coconut, Podimasala, Panko.",
      },
      {
        name: "Chicken Tikka Puri",
        price: "299/-",
        description: "Chicken tikka, Crispy Puri, Salsa.",
      },
      {
        name: "Pulimunchi Meen Pallichathu",
        price: "599/-",
        description: "Byadgichilli, Tamarind, Fish, Banana leaf.",
      },
      {
        name: "Prawns Ghee Roast",
        price: "599/-",
        description: "Prawns, Ghee, Byadgi chilli, spices.",
      },
      {
        name: "Dahi Kebab",
        price: "349/-",
        description: "Hung curd, spices, Imli chutney.",
        isVegetarian: true,
      },
      {
        name: "Yam Shikampuri",
        price: "349/-",
        description: "Yam, Caramelised onion, cashew, Boondi.",
        isVegetarian: true,
      },
      {
        name: "Mini Chole Kulchey",
        price: "299/-",
        description: "Aloo Kulcha, Delhi chole, Papad, chutneys.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "curries",
    title: "Curries & Non-Veg Gravies",
    description: "Born in the royal kitchens of Awadh, Nihari was once a dawn dish, slow-cooked through the night and savoured after the morning prayers. Prepared from collagen-rich cuts, the stew is simmered for hours until the meat yields effortlessly, fragrant with whole spices, finished with a silky sheen of fat and a whisper of warmth.",
    items: [
      {
        name: "Masara Special Chicken",
        price: "475/-",
        description: "A super rich, velvety, flavourful, hot spicy and fragrant thick, creamy chicken gravy. A literal flavour party on the palate.",
      },
      {
        name: "Dhaba Style Kukkad",
        price: "449/-",
        description: "A popular authentic Punjabi-style chicken curry known for its flavourful, thin gravy. A proper Dhaba style dish.",
      },
      {
        name: "Bhopali Murgh Rezala",
        price: "449/-",
        description: "A rich, royal Indian chicken curry that distinguishes itself from other regional variations with its generous use of coriander leaves, a blend of mild spices & a creamy, delicate gravy.",
      },
      {
        name: "Butter Chicken",
        price: "449/-",
        description: "An enduring classic from the kitchens of Old Delhi, where tandoor-roasted chicken is gently folded into a silken tomato gravy enriched with butter & cream.",
      },
      {
        name: "Murgh Kalimirchi",
        price: "449/-",
        description: "A popular dish from the other part of Punjab featuring succulent chicken in a rich, spicy, black pepper gravy.",
      },
      {
        name: "Kadai Prawns",
        price: "599/-",
        description: "A flavourful Indian dish where succulent prawns are cooked in a spiced, aromatic tomato-based gravy with garlic, onions & bell peppers.",
      },
      {
        name: "Raw Mango Fish Curry",
        price: "550/-",
        description: "A coastal classic that celebrates the magic of sour & spice. Fresh fish simmered with Raw mango, lending a bright, tangy lift to a warm, aromatic gravy of traditional spices & coconut milk.",
      },
      {
        name: "Mutton Rogan Josh",
        price: "599/-",
        description: "A timeless Kashmiri classic, a slow cooked celebration of tender meat simmered in a rich, aromatic gravy which draws its signature deep red hue from chillies - not heat, but gentle warmth & aroma.",
      },
      {
        name: "Nihari Gosht",
        price: "599/-",
        description: "A stew consists of slow cooked meat with gentle spices from the Royal kitchens of Old Delhi & Awadh, finished with fragrant ghee, birista, ginger & fresh coriander - deeply warming, indulgent and steeped in centuries of culinary heritage.",
      },
      {
        name: "Makhani Boti",
        price: "599/-",
        description: "Silky, velvety tomato based Makhani gravy - true North Indian royal style paired with tender flavourful charred mutton boti, finished with butter & hints of kasuri methi.",
      },
      {
        name: "Rara Gosht",
        price: "599/-",
        description: "A popular & signature dish of Punjabi & Mughlai cuisine that uniquely combines bone-in mutton pieces with mutton mince (keema) in a thick flavourful gravy made with aromatic spices, onion & tomatoes.",
      },
    ],
  },
  {
    id: "veg-gravies",
    title: "Vegetarian Gravies",
    items: [
      {
        name: "Dal Makhni",
        price: "325/-",
        description: "A slow simmered legacy of the North - whole black lentils & kidney beans cooked overnight, enriched with butter & cream finished with gentle spices for a deep, velvety.",
        isVegetarian: true,
      },
      {
        name: "Lehsuni Palak Burrata",
        price: "399/-",
        description: "A modern Indian dish that combines classic, garlicky Indian spinach curry with fresh creamy Italian Burrata & Candied Almonds.",
        isVegetarian: true,
      },
      {
        name: "Punjabi Soya Chaap Tikka Masala",
        price: "349/-",
        description: "Char-grilled Soya chaap simmered in a robust Punjabi tomato-onion masala, finished with cream, butter & bold aromatic spices.",
        isVegetarian: true,
      },
      {
        name: "Martban Ke Chole",
        price: "325/-",
        description: "Chickpeas slow-cooked in a sealed earthen pot, where gentle heat & time coax out profound spice, natural richness & an earthy depth unique to clay pot cooking.",
        isVegetarian: true,
      },
      {
        name: "Matar Paneer Makhana",
        price: "349/-",
        description: "Soft Paneer & green peas in a gently spiced tomato gravy, rich & creamy enriched with roasted Makhana for depth & texture. A touch of noble indulgence.",
        isVegetarian: true,
      },
      {
        name: "Paneer Lababdar",
        price: "349/-",
        description: "Soft Paneer cooked in a luxurious onion-tomato gravy, enriched with butter, cream & fragrant spices, finished with a hint of sweetness & smoke.",
        isVegetarian: true,
      },
      {
        name: "Tazi Bhuni Subzi",
        price: "325/-",
        description: "A regal medley of fresh seasonal vegetables, gently sauteed with hand-ground spices & finished with ghee for a delicate, aromatic finish.",
        isVegetarian: true,
      },
      {
        name: "Mushroom Matar Miloni",
        price: "349/-",
        description: "A harmonious blend of mushrooms and peas simmered in a silky, aromatic gravy-a refined and balanced North Indian classic.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "biryanis-rice",
    title: "Biryanis & Rice",
    items: [
      {
        name: "Rampuri Murgh Dum Biryani",
        price: "499/-",
        description: "A refined biryani from Rampur, layered with fragrant basmati, delicately spiced meat, saffron & crisp onions, sealed & slow-cooked on dum.",
      },
      {
        name: "Chicken Tikka Biryani",
        price: "499/-",
        description: "Char-grilled chicken tikka layered with fragrant basmati rice, spices, and saffron; finished on dum for a smoky, aromatic biryani that balances fire, fragrance, flavour & finesse.",
      },
      {
        name: "Awadhi Gosht Dum Biryani",
        price: "599/-",
        description: "Tender mutton & fragrant basmati rice, delicately spiced in the Awadhi tradition, layered & sealed on dum to create a biryani of quiet richness, aroma & timeless finesse.",
      },
      {
        name: "Shehzadi Paneer Biryani",
        price: "439/-",
        description: "Soft paneer layered with fragrant basmati rice, gentle spices, saffron & crisp onions, sealed & slow cooked on dum to create a biryani that is aromatic, balanced & elegantly indulgent.",
        isVegetarian: true,
      },
      {
        name: "Steamed Rice",
        price: "199/-",
        description: "Long grain basmati, gently steamed to preserve its natural aroma & delicate texture. Light, fluffy & perfectly poised to accompany rich curries & gravies.",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "breads",
    title: "Breads",
    items: [
      {
        name: "Zatar Cheese Naan",
        price: "129/-",
        isVegetarian: true,
      },
      {
        name: "Punjabi Onion & Mirchi Tandoori Roti",
        price: "89/-",
        isVegetarian: true,
      },
      {
        name: "Tandoori Roti (Plain / Butter)",
        price: "79 / 89/-",
        isVegetarian: true,
      },
      {
        name: "Zatar Paratha",
        price: "110/-",
        isVegetarian: true,
      },
      {
        name: "Naan (Plain / Butter / Garlic)",
        price: "79 / 89 / 99/-",
        isVegetarian: true,
      },
      {
        name: "Lachcha Parantha",
        price: "99/-",
        isVegetarian: true,
      },
      {
        name: "Stuffed Kulcha (Aloo & Onion / Paneer)",
        price: "119 / 129/-",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    items: [
      {
        name: "Raw Mango Pineapple Kulukki",
        price: "149/-",
        description: "Totapuri Mangoes, Pineapple, Green Chilli.",
      },
      {
        name: "Desi Guava Punch",
        price: "199/-",
        description: "Guava juice, Jaljeera, Lime.",
      },
      {
        name: "Creamy Spark",
        price: "199/-",
        description: "Yakult, Sweet Soda, Mint.",
      },
      {
        name: "Virgin Pinacolada",
        price: "199/-",
        description: "Pineapple, Coconut, Cream.",
      },
      {
        name: "Virgin Mojito",
        price: "199/-",
        description: "Mint, Lime Juice, Soda.",
      },
      {
        name: "Pineapple Blossom",
        price: "249/-",
        description: "Pineapple, Basil leaves, Lime.",
      },
      {
        name: "Berry Float",
        price: "229/-",
        description: "Mixed Berries, Vanilla, Cream.",
      },
      {
        name: "Fruit Punch",
        price: "229/-",
        description: "Mixed fruit juice • Berries • Vanilla Icecream",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Tender Coconut Tresleches",
        price: "349/-",
        description: "An airy sponge steeped in a trio of milks enriched with tender coconut, layered with soft cream & subtle sweetness, offering a delicate balance of tropical freshness & classic indulgence.",
        isVegetarian: true,
      },
      {
        name: "Rasmalai Pannacotta",
        price: "349/-",
        description: "Creamy light, flavourful Rasmalai pannacotta paired with candied nuts, angoori rasmalai, tuile & a creamy kesar malai sauce.",
        isVegetarian: true,
      },
      {
        name: "Khajur Poda",
        price: "349/-",
        description: "Rich, dense, and chewy dates cake paired with Kulfi Ice cream and brown butter toffee sauce.",
        isVegetarian: true,
      },
    ],
  },
];
