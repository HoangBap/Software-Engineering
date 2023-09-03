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
    gender CHAR(10),
    home_address TEXT,
    country TEXT,
    date_of_birth VARCHAR(30),
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

Create TABLE Food (
    ID INT auto_increment,
    CategoryName CHAR(50) NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE (CategoryName)
);

CREATE TABLE FoodRecipe (
    RecipeID INT auto_increment,
    CategoryID INT NOT NULL,
    RecipeName TEXT,
    Author TEXT,
    Descriptions TEXT,
    Ingredients TEXT,
    Instructions TEXT,
    Path_img TEXT,
    PRIMARY KEY(RecipeID, CategoryID),
    CONSTRAINT FK_CategoryID_ID FOREIGN KEY(CategoryID) references Food(ID)
);

-- add vào database nè mấy chấn bé đù
-- BODY BUILDING
INSERT INTO Food (CategoryName) VALUES ('BodyBuilding');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Grilled Chicken with Sweet Potato and Asparagus',
    'Gordon Ramsay',
    'Indulge in a symphony of flavors with our Grilled Chicken, perfectly complemented by the earthy sweetness of roasted Sweet Potatoes and the crisp freshness of Asparagus. A wholesome delight thats as wholesome as it is delicious!',
    '1 chicken breast (about 6 oz), Seasonings like garlic powder, paprika, salt, and pepper, 1 medium sweet potato, 1 cup asparagus',
    'Grill the chicken breast with the chosen seasonings at 200°C (392°F) for about 6-8 minutes per side or until the internal temperature reaches 165°F (74°C). Wash and pierce the sweet potato with a fork. Bake at 200°C (392°F) for around 45-60 minutes or microwave for about 5-7 minutes until tender. Trim the tough ends of the asparagus. Grill or steam the asparagus for about 4-5 minutes until tender but still crisp.',
    './images/recipes/BB_chicken.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Turkey and Quinoa Stuffed Bell Peppers',
    'Gordon Ramsay',
    'Tender bell peppers stuffed with a savory blend of lean turkey and protein-packed quinoa, baked to perfection, and topped with a luscious tomato sauce. A wholesome and satisfying meal thats as beautiful as it is flavorful.',
    '1 large bell pepper, 4 oz ground turkey, 1/4 cup cooked quinoa, 1/4 cup cooked black beans, Diced tomatoes, onions, and seasonings as desired',
    'Cut off the top of the bell pepper and remove seeds and membranes. Cook ground turkey in a skillet over medium heat until browned. Add diced tomatoes, onions, black beans, and desired seasonings. Stuff the bell pepper with the turkey, quinoa, and black bean mixture. Bake stuffed pepper at 175°C (350°F) for about 25-30 minutes until the pepper is tender.',
    './images/recipes/BB_turkey.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Tofu Stir-Fry with Brown Rice',
    'Gordon Ramsay',
    'Delight in the harmony of crisp veggies, marinated tofu, and a savory stir-fry sauce that will tantalize your taste buds while keeping your meal light and nutritious. ',
    '6 oz firm tofu, 1 cup stir-fry vegetables (such as broccoli, bell peppers, carrots), Cooked brown rice',
    'Press tofu to remove excess moisture and cut into cubes. Heat a pan over medium-high heat and add a little oil. Stir-fry tofu until golden and slightly crispy. Add stir-fry vegetables and cook until tender-crisp. Add low-sodium soy sauce or stir-fry sauce. Serve tofu and vegetable stir-fry over cooked brown rice.',
    './images/recipes/tofu.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Whole Wheat Pasta with Lean Beef Marinara',
    'Gordon Ramsay',
    'A wholesome twist on a classic Italian favorite, combining the rich flavors of lean ground beef, aromatic herbs, and whole wheat pasta for a guilt-free indulgence thats both comforting and nourishing. Buon appetito!',
    '4 oz lean ground beef, 1/4 cup diced tomatoes, 1/4 cup sautéed onions, Whole wheat pasta',
    'Cook lean ground beef in a skillet over medium heat until browned. Add diced tomatoes and sautéed onions. Cook whole wheat pasta according to package instructions. Mix cooked pasta with beef marinara sauce.',
    './images/recipes/pasta.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Omelette with Spinach, Mushrooms, and Cheese',
    'Gordon Ramsay',
    'This breakfast masterpiece combines fluffy eggs with sautéed spinach and mushrooms, all generously folded around a gooey, melted cheese center. Its a protein-packed, veggie-infused delight that will have you eager to rise and shine each morning!',
    '3 eggs, 1 cup sautéed spinach, 1/2 cup sliced mushrooms, 1/4 cup shredded cheese (such as mozzarella or cheddar)',
    'Sauté sliced mushrooms until tender, then add fresh spinach and sauté until wilted. Beat three eggs in a bowl until well combined. Pour beaten eggs into a non-stick skillet over the sautéed vegetables. Cook until edges set, then sprinkle shredded cheese over half of the omelette. Fold the omelette in half, covering the cheese. Slide onto a plate and enjoy.',
    './images/recipes/BB_omelette.png'
);

-- LOW CARB

INSERT INTO Food (CategoryName) VALUES ('LowCarb');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Baked Lemon Herb Salmon with Broccoli',
    'Gordon Ramsay',
    'Elevate your dinner experience with our Baked Lemon Herb Salmon with a side of tender Broccoli. Its a culinary masterpiece that brings the freshness of the sea and the garden to your plate, leaving your taste buds dancing with delight!',
    '2 salmon fillets (6 oz each), 1 lemon (zest and juice), 2 tablespoons olive oil, 2 cloves garlic (minced), 1 teaspoon dried thyme, Salt and pepper to taste, 2 cups broccoli florets',
    'Preheat the oven to 400°F (200°C). In a bowl, mix together lemon zest, lemon juice, olive oil, minced garlic, dried thyme, salt, and pepper. Place the salmon fillets on a baking sheet lined with parchment paper. Brush the salmon with the lemon herb mixture. Toss the broccoli florets in the remaining lemon herb mixture. Arrange the broccoli around the salmon on the baking sheet. Bake in the preheated oven for about 15-20 minutes, or until the salmon is cooked through and flakes easily with a fork.',
    './images/recipes/LC_salmon.png'
);


INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Grilled Chicken Caesar Salad',
    'Gordon Ramsay',
    'Tender grilled chicken breast, marinated to perfection, atop a bed of crisp romaine lettuce, tossed in creamy Caesar dressing, and garnished with garlic croutons and shaved Parmesan cheese. It\'s a salad that\'s hearty enough to satisfy your cravings while keeping things fresh and delightful!',
    '2 boneless, skinless chicken breasts, 2 tablespoons olive oil, 1 teaspoon garlic powder, Salt and pepper to taste, Romaine lettuce, washed and chopped, 1/4 cup grated Parmesan cheese, Low-carb Caesar dressing',
    'Preheat the grill to medium-high heat. Rub the chicken breasts with olive oil and season with garlic powder, salt, and pepper. Grill the chicken for about 6-8 minutes per side, or until the internal temperature reaches 165°F (74°C). Let the chicken rest for a few minutes, then slice it. In a large bowl, combine the chopped romaine lettuce and sliced chicken. Add grated Parmesan cheese and drizzle with low-carb Caesar dressing. Toss to coat.',
    './images/recipes/LC_chicken.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Spiralized Zucchini Noodles with Basil Pesto',
    'Gordon Ramsay',
    'Spiralized zucchini noodles tossed in a vibrant and aromatic basil pesto sauce, topped with a sprinkle of pine nuts and freshly grated Parmesan cheese. This light and refreshing dish is a celebration of garden-fresh flavors that will transport you to a Mediterranean paradise with every bite!',
    '2 medium zucchinis, spiralized into noodles, 1/4 cup prepared pesto sauce, Cherry tomatoes, halved, Grated Parmesan cheese (optional), Fresh basil leaves (for garnish)',
    'Spiralize the zucchinis to create zucchini noodles. In a pan over medium heat, sauté the zucchini noodles for 2-3 minutes until just tender. Stir in the pesto sauce and cherry tomato halves. Cook for an additional 2 minutes to warm the sauce and tomatoes. Serve the zucchini noodles with pesto topped with grated Parmesan cheese (if using) and fresh basil leaves.',
    './images/recipes/LC_zucchini.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Cauliflower Fried Rice',
    'Gordon Ramsay',
    'Grated cauliflower sautéed with a colorful mix of veggies, lean protein, and a savory blend of soy sauce and spices, all wok-tossed to perfection. Its a low-carb, high-flavor alternative that will satisfy your cravings for Asian-inspired comfort food without the guilt!',
    '1 medium head cauliflower, riced, 2 tablespoons coconut oil or olive oil, 1/2 cup diced carrots, 1/2 cup diced bell peppers, 1/2 cup green peas, 2 cloves garlic, minced, 2 eggs, beaten, 2 tablespoons low-sodium soy sauce, Green onions, sliced (for garnish)',
    'Cut the cauliflower into florets and pulse in a food processor until it resembles rice. Heat coconut oil or olive oil in a large pan over medium heat. Add diced carrots and bell peppers, and sauté until slightly softened. Push the vegetables to one side of the pan and add minced garlic to the other side. Sauté for about 30 seconds. Push the garlic aside and pour beaten eggs into the pan. Scramble the eggs until cooked. Mix in the cauliflower rice and green peas. Stir-fry for 3-4 minutes until the cauliflower is cooked but still slightly crunchy. Stir in low-sodium soy sauce and cook for an additional 2 minutes. Garnish with sliced green onions and serve.',
    './images/recipes/LC_cauliflower.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Avocado and Bacon Stuffed Eggs',
    'Gordon Ramsay',
    'Creamy avocado and crispy bacon take the classic deviled egg to a whole new level of deliciousness. These savory bites are the perfect blend of creamy, smoky, and savory flavors, making them an irresistible crowd-pleaser for any occasion.',
    '4 hard-boiled eggs, halved and yolks removed, 1 ripe avocado, mashed, 2 strips cooked bacon, crumbled, 1 tablespoon mayonnaise, 1 teaspoon Dijon mustard, Salt and pepper to taste, Paprika (for garnish)',
    'Cut the hard-boiled eggs in half and remove the yolks. In a bowl, combine the mashed avocado, crumbled bacon, mayonnaise, Dijon mustard, salt, and pepper. Fill the egg white halves with the avocado mixture. Sprinkle with paprika for garnish. Chill in the refrigerator for a short while before serving.',
    './images/recipes/LC_avocado.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Florentine Spinach Poached Eggs',
    'Gordon Ramsay',
    'Soft baby spinach in a creamy, nutmeg-infused sauce makes the perfect bed for crispy parma ham and runny-yolked eggs – dunk slices of toasted ciabatta in for brunch.',
    '50g salted butter; 2 garlic cloves, thinly sliced, plus ½ a clove; 500g baby spinach; 250ml double cream; 0.25 nutmeg, finely grated; 50g parmesan, finely grated, plus a little extra to serve; 4 slices of parma ham; 4 eggs; 2 thick slices ciabatta',
    'Melt the butter in a frying pan over a medium heat and cook the garlic for 2-3 minutes or until fragrant, then put the spinach into a large colander and pour over a kettle of just-boiled water. Tip the spinach into the pan with the cream, adding plenty of seasoning. Bubble for 5 minutes until the spinach is wilted and the sauce has thickened. Add the nutmeg and parmesan, and season again. Nestle the parma ham slices into the spinach, making a little cup, then crack an egg into each. Put a lid over the pan and gently cook for 5-6 minutes or until the whites have just set. Toast the ciabatta and rub each with a cut clove of garlic. Serve with a little more parmesan grated over, if you like.',
    './images/recipes/LC_egg.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Cajun Prawns with Pineapple Salsa',
    'Gordon Ramsay',
    'These prawns tick so many healthy boxes – they’re really low fat and a good choice if you’re going for the 5:2 diet.',
    '200g raw peeled prawns; 1/2 tsp smoked paprika; 1/2 tsp garlic salt or powder; 1/2 tsp dried thyme; 1/4 tsp cayenne pepper; olive oil; 100g pineapple, chopped; 1 shallot, finely diced; 2 tbsp chopped coriander; 1 red chilli, seeded and diced; 1 lime, plus wedges to serve; little gem lettuce leaves, to serve; fat-free yogurt, to serve',
    'Toss the prawns with all the spices and 1 tsp oil. Season with lots of black pepper and a pinch of salt if using garlic powder. Mix the pineapple, shallot, coriander, chili, lime juice and season. Heat 1 tsp oil in a non-stick pan and fry the prawns for 2 minutes, until pink. Divide between lettuce leaves, top with the pineapple salsa and a dollop of yogurt.',
    './images/recipes/LC_salsa.png'
);


-- HEALTHY

INSERT INTO Food (CategoryName) VALUES ('Healthy');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Quinoa and Vegetable Stir-Fry',
    'Gordon Ramsay',
    'Elevate your dinner table with our Quinoa and Vegetable Stir-Fry. This vibrant dish combines fluffy quinoa with a colorful array of crisp, stir-fried vegetables, all coated in a delectable savory sauce. Dive into a world of taste and health with every forkful!',
    '1 cup quinoa, 2 cups water or vegetable broth, 1 tablespoon olive oil, 1 cup mixed vegetables (such as bell peppers, carrots, snap peas), 2 cloves garlic, minced, 2 tablespoons low-sodium soy sauce, 1 teaspoon sesame oil, Chopped green onions (for garnish)',
    'Rinse quinoa thoroughly and cook it in water or vegetable broth according to package instructions. Heat olive oil in a large pan over medium-high heat. Add mixed vegetables and sauté for 3-4 minutes until slightly tender. Push vegetables to the side and add minced garlic. Sauté for about 30 seconds. Mix in cooked quinoa. Stir in low-sodium soy sauce and sesame oil. Cook for an additional 2 minutes. Garnish with chopped green onions and serve.',
    './images/recipes/HT_quinoa.png'

);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Grilled Vegetable Salad with Chickpeas',
    'Gordon Ramsay',
    'A symphony of smoky grilled veggies, including bell peppers, zucchini, and eggplant, mixed with hearty chickpeas, fresh herbs, and a zesty vinaigrette dressing. A colorful and satisfying salad that captures the essence of summer on your plate, offering a delightful combination of textures and tastes in every bite.',
    'Assorted vegetables (zucchini, bell peppers, red onion, cherry tomatoes), 1 can chickpeas (15 oz), drained and rinsed, 2 tablespoons olive oil, 1 teaspoon dried herbs (such as oregano, thyme, or rosemary), Salt and pepper to taste, Mixed salad greens, Balsamic vinaigrette dressing',
    'Preheat the grill to medium-high heat. Toss assorted vegetables and chickpeas with olive oil, dried herbs, salt, and pepper. Grill the vegetables and chickpeas for about 5-7 minutes, turning occasionally, until slightly charred and tender. Arrange mixed salad greens on plates. Top with grilled vegetables and chickpeas. Drizzle with balsamic vinaigrette dressing.',
    './images/recipes/HT_chickpeas.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Oatmeal with Berries and Almonds',
    'Gordon Ramsay',
    'Kickstart your morning with a wholesome and delicious bowl of Oatmeal with Berries and Almonds. Creamy oats, cooked to perfection, topped with a vibrant mix of fresh berries bursting with natural sweetness and a sprinkle of crunchy almonds. This breakfast bowl is a delightful blend of textures and flavors that will fuel your day with energy and nutrients while satisfying your taste buds with every spoonful!',
    '1 cup old-fashioned oats, 2 cups water or milk (dairy or plant-based), Mixed berries (blueberries, strawberries, raspberries), Sliced almonds, Honey or maple syrup (optional), Cinnamon (optional)',
    'In a saucepan, bring water or milk to a gentle boil. Add old-fashioned oats and cook over medium heat, stirring occasionally, until oats are creamy and cooked through. Serve the oatmeal in bowls. Top with mixed berries, sliced almonds, a drizzle of honey or maple syrup (if desired), and a sprinkle of cinnamon.',
    './images/recipes/HT_oatmeal.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Lemon Herb Grilled Chicken with Roasted Vegetables',
    'Gordon Ramsay',
    'Chicken breasts marinated in zesty lemon and aromatic herbs, perfectly grilled to tender perfection, and served alongside a colorful medley of roasted vegetables. Its a harmonious combination of flavors and textures that will leave your taste buds dancing with delight while keeping your meal healthy and satisfying!',
    '2 boneless, skinless chicken breasts, Zest and juice of 1 lemon, 2 tablespoons olive oil, 2 cloves garlic, minced, 1 teaspoon dried herbs (such as thyme, rosemary, or basil), Salt and pepper to taste, Assorted vegetables (broccoli, carrots, cauliflower), Chopped fresh parsley (for garnish)',
    'In a bowl, mix together lemon zest, lemon juice, olive oil, minced garlic, dried herbs, salt, and pepper. Marinate chicken breasts in the lemon herb mixture for about 30 minutes. Preheat the grill to medium-high heat. Grill the chicken for about 6-8 minutes per side, or until the internal temperature reaches 165°F (74°C). Toss assorted vegetables with olive oil, salt, and pepper. Roast in the oven at 400°F (200°C) for about 20-25 minutes or until tender. Serve the grilled chicken with roasted vegetables. Garnish with chopped fresh parsley.',
    './images/recipes/HT_lemon.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Greek Yogurt Parfait with Mixed Fruit and Nuts',
    'Gordon Ramsay',
    'Greek yogurt layered with a vibrant assortment of fresh mixed fruit and a sprinkle of crunchy nuts, drizzled with honey for a touch of sweetness.',
    'Greek yogurt, Mixed fruits (such as berries, kiwi, mango), Mixed nuts (almonds, walnuts, pistachios), Honey or maple syrup (optional), Granola (optional)',
    'In a glass or bowl, layer Greek yogurt. Add a layer of mixed fruits on top of the yogurt. Sprinkle mixed nuts over the fruit. Drizzle with honey or maple syrup if desired. Optional: Add a layer of granola for crunch. Repeat the layers if desired. Enjoy the parfait with a spoon.',
    './images/recipes/HT_yorgurt.png'
);

-- SKINNY FAT
INSERT INTO Food (CategoryName) VALUES ('SkinnyFat');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'SkinnyFat'),
    'Grilled Chicken and Quinoa Bowl',
    'Gordon Ramsay',
    'Juicy, grilled chicken breast served over a bed of fluffy quinoa and accompanied by a colorful array of roasted vegetables. Drizzled with your choice of sauce, this wholesome bowl is a balanced blend of protein, whole grains, and veggies. Dive in and savor the flavors of health and satisfaction in every bite!',
    '2 boneless, skinless chicken breasts; 1 cup quinoa; Mixed vegetables (such as broccoli, bell peppers, carrots); Olive oil; Lemon juice; Salt and pepper; Optional toppings: avocado, nuts or seeds',
    'Marinate chicken breasts in a mixture of olive oil, lemon juice, salt, and pepper. Preheat the grill to medium-high heat. Grill the chicken for about 6-8 minutes per side until cooked through. Cook quinoa according to package instructions. Sauté mixed vegetables in a pan with a bit of olive oil until tender. Assemble bowls with quinoa, grilled chicken, sautéed vegetables, and optional toppings.',
    './images/recipes/SF_chicken.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'SkinnyFat'),
    'Greek Yogurt Parfait with Nut Butter',
    'Gordon Ramsay',
    'Energize your mornings with our Greek Yogurt Parfait with Nut Butter, a creamy and protein-packed delight that combines velvety Greek yogurt, luscious nut butter, a medley of fresh berries, and a crunchy granola topping for a satisfying and wholesome breakfast experience.',
    'Greek yogurt; Mixed berries; Nut butter (such as almond or peanut butter); Mixed nuts (such as walnuts or almonds); Honey or maple syrup (optional)',
    'In a glass or bowl, layer Greek yogurt. Add a layer of mixed berries on top of the yogurt. Drizzle a small amount of nut butter over the berries. Sprinkle mixed nuts on top. Optionally, drizzle honey or maple syrup for added sweetness.',
    './images/recipes/SF_yorgurt.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'SkinnyFat'),
    'Salmon and Avocado Salad',
    'Gordon Ramsay',
    'Savor a taste of the ocean with our Salmon and Avocado Salad, where tender, pan-seared salmon fillets meet creamy avocado slices, nestled atop a bed of crisp greens and drizzled with a lemony vinaigrette for a refreshing and satisfying salad experience.',
    'Salmon fillet; Mixed salad greens; Cherry tomatoes; Cucumber; Avocado; Olive oil; Lemon juice; Salt and pepper',
    'Season the salmon fillet with olive oil, lemon juice, salt, and pepper. Preheat a pan or grill to medium-high heat. Cook the salmon for about 4-5 minutes per side until cooked through. Prepare a salad with mixed greens, cherry tomatoes, cucumber, and sliced avocado. Top the salad with the cooked salmon. Drizzle olive oil and lemon juice as dressing.',
    './images/recipes/SF_salmon.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'SkinnyFat'),
    'Whole Grain Oatmeal with Nut Butter and Banana',
    'Gordon Ramsay',
    'For those on the path to a healthier you, our Whole Grain Oatmeal, generously garnished with luscious Nut Butter and ripe banana slices, offers a nourishing and satisfying breakfast that embraces your journey towards a balanced and vibrant lifestyle, one delicious bite at a time.',
    'Whole grain oats; Water or milk (dairy or plant-based); Nut butter; Banana; Mixed nuts (such as almonds or walnuts)',
    'Cook whole grain oats in water or milk according to package instructions. Slice a banana and mix it into the cooked oats. Drizzle nut butter over the oats for added flavor and healthy fats. Sprinkle mixed nuts on top for extra crunch and nutrients.',
    './images/recipes/SF_banana.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'SkinnyFat'),
    'Turkey and Veggie Stir-Fry with Brown Rice',
    'Gordon Ramsay',
    'Delight in a wholesome and flavorful dinner with our Turkey and Veggie Stir-Fry with Brown Rice. Lean ground turkey and a colorful array of crisp vegetables, stir-fried to perfection in a savory sauce, served over nutty brown rice. It\'s a nutritious, protein-packed, and satisfying meal that\'s as delicious as it is good for you. Dinner has never been this tasty and guilt-free!',
    'Lean ground turkey; Mixed vegetables (such as bell peppers, zucchini, carrots); Low-sodium soy sauce; Olive oil; Garlic; Ginger; Brown rice',
    'In a pan, heat a small amount of olive oil and sauté minced garlic and ginger. Add lean ground turkey and cook until browned. Add mixed vegetables and stir-fry until tender. Season with low-sodium soy sauce for flavor. Serve the stir-fry over cooked brown rice.',
    './images/recipes/SF_turkey.png'
);

-- LIGHT SUPER
INSERT INTO Food (CategoryName) VALUES ('LightSupper');

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LightSupper'),
    'Quinoa and Kale Salad with Avocado',
    'Gordon Ramsay',
    'A vibrant medley of nutrient-rich quinoa, fresh kale, creamy avocado, and a zesty lemon vinaigrette. This salad not only delights your taste buds with its contrasting textures and flavors but also nourishes your body with a powerhouse of vitamins and minerals. Its a perfect balance of health and indulgence in every bite!',
    '1 cup quinoa; 2 cups water or vegetable broth; Kale leaves, chopped; 1 avocado, sliced; Cherry tomatoes, halved; Cucumber, diced; Red onion, thinly sliced; Lemon juice; Olive oil; Salt and pepper; Optional toppings: nuts or seeds (such as almonds or sunflower seeds)',
    'Rinse quinoa thoroughly and cook it in water or vegetable broth according to package instructions. In a large bowl, massage chopped kale with lemon juice and olive oil until slightly softened. Add cooked quinoa, avocado slices, cherry tomatoes, diced cucumber, and thinly sliced red onion. Toss the salad gently. Season with salt and pepper to taste. Top with optional nuts or seeds for added texture and nutrition.',
    './images/recipes/LS_avocado.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LightSupper'),
    'Mixed Berry Smoothie Bowl',
    'Gordon Ramsay',
    'A luscious blend of ripe berries, Greek yogurt, and a hint of honey, topped with a delightful assortment of fresh berries, granola, and a sprinkle of chia seeds. Its a refreshing and nutritious breakfast that will fuel your day with antioxidants, protein, and a whole lot of deliciousness!',
    'Mixed berries (such as blueberries, strawberries, raspberries); Banana; Greek yogurt or plant-based yogurt; Spinach or kale leaves (optional); Chia seeds or flaxseeds; Granola; Honey or maple syrup (optional)',
    'Blend mixed berries, banana, yogurt, and optional spinach or kale until smooth. Pour the smoothie into a bowl. Top with chia seeds or flaxseeds, granola, and a drizzle of honey or maple syrup.',
    './images/recipes/LS_smoothie.png'

);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LightSupper'),
    'Grilled Chicken and Vegetable Wrap',
    'Gordon Ramsay',
    'Succulent grilled chicken breast, marinated in savory herbs and spices, nestled inside a soft whole-grain wrap with a colorful medley of roasted vegetables. Drizzled with your choice of sauce and wrapped to perfection, its a portable, wholesome delight that combines flavor, nutrition, and convenience in every delicious bite!',
    'Grilled chicken breast, sliced; Whole grain or whole wheat wrap; Mixed salad greens; Hummus or Greek yogurt sauce; Assorted vegetables (such as bell peppers, cucumber, carrots); Optional: feta cheese, olives',
    'Lay out the whole grain wrap. Spread a layer of hummus or Greek yogurt sauce over the wrap. Place sliced grilled chicken on one side of the wrap. Top with mixed salad greens and assorted vegetables. Optional: sprinkle feta cheese and add olives. Roll up the wrap tightly and cut in half.',
    './images/recipes/LS_wrap.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LightSupper'),
    'Chia Seed Pudding with Berries',
    'Gordon Ramsay',
    'Start your day with a burst of natural goodness with our Chia Seed Pudding with Berries. This nutritious and delectable breakfast features chia seeds soaked in creamy almond milk, topped with a medley of fresh berries. Its a simple yet indulgent way to kickstart your morning, providing a delightful texture and a burst of antioxidants to fuel your day ahead!',
    'Chia seeds; Plant-based milk (such as almond milk or coconut milk); Mixed berries; Honey or maple syrup (optional); Vanilla extract (optional)',
    'Mix chia seeds with plant-based milk in a jar or container. Add optional sweeteners like honey or maple syrup and vanilla extract. Stir well and refrigerate overnight or for at least a few hours until the mixture thickens. Serve chia seed pudding in a bowl or glass. Top with mixed berries.',
    './images/recipes/LS_chia.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LightSupper'),
    'Salmon and Quinoa Stuffed Bell Peppers',
    'Gordon Ramsay',
    'Elevate your dinner table with our Salmon and Quinoa Stuffed Bell Peppers. These vibrant peppers are generously filled with a flavorful blend of flaky salmon, fluffy quinoa, and a medley of fresh vegetables, all baked to perfection. It\'s a nutritious and visually stunning dish that\'s as wholesome as it is delicious, sure to impress both your taste buds and your guests!',
    'Salmon fillet, cooked and flaked; Bell peppers; Cooked quinoa; Spinach or baby kale, chopped; Lemon juice; Olive oil; Salt and pepper; Fresh herbs (such as parsley or dill)',
    'Preheat the oven to 375°F (190°C). Cut the tops off bell peppers and remove seeds and membranes. In a bowl, mix cooked and flaked salmon, cooked quinoa, chopped spinach or baby kale, lemon juice, olive oil, salt, and pepper. Stuff the bell peppers with the salmon-quinoa mixture. Place the stuffed peppers in a baking dish. Bake in the preheated oven for about 20-25 minutes, until the peppers are tender. Garnish with fresh herbs before serving.',
    './images/recipes/LS_quinoa.png'
);

-- Vegetarianism
INSERT INTO Food (CategoryName) VALUES ('Vegetarianism');

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Vegetarianism'),
    'Creamy Braised White Beans',
    'Gordon Ramsay',
    'Everything you need to make this humble-but-satisfying meal is probably in your kitchen at this very moment. Two cans of beans (chickpeas and white beans) are simmered with milk, a whole head of garlic, herbs and nutmeg for a rich and creamy vegetarian dinner that can be on the table in under a half-hour. Be sure to use whole milk here - its the most flavorful and will yield the best results. Feel free to wilt greens like chard, watercress, arugula or basil into the beans, and serve with grated Parmesan and red-pepper flakes. A slice of crusty bread slicked with caramelized garlic is the perfect crunchy accompaniment to velvety beans.',
    '1 Tablespoon unsalted butter; 1 Head garlic, halved crosswise; 1 cup whole milk; 1 (15-ounce) can chickpeas, with their liquid; 1 (15-ounce) can white beans, such as cannellini or Great Northern, drained and rinsed; 1 thyme sprig, 2 sage leaves or 1 bay leaf; 0.125 teaspoon ground nutmeg, allspice or garam masala; Kosher salt and black pepper; 4 slices crusty bread or thick toast; Extra-virgin olive oil, for serving; Freshly grated Parmesan, for serving; Aleppo pepper or red-pepper flakes, for serving',
    'In a medium saucepan, melt the butter over medium-high heat. Add the garlic, cut side down, and cook until golden brown, 1 to 2 minutes. Add the milk, chickpeas and their liquid, white beans, thyme and nutmeg and stir to combine. Season generously with salt and pepper. When the mixture begins to bubble around the edges of the pan (you don’t want it to come to a full boil), reduce the heat to low and let it simmer, stirring occasionally, until it has thickened and tastes great to you, about 15 minutes. Season with salt and pepper, to taste. Use a fork to remove the garlic halves from the beans. Set aside until cool enough to handle, then use the fork to remove the cloves from the skins. Spread the cloves on bread or toast. If you would like the beans to be more stew-like, mash some of the beans using a potato masher or the back of a spoon. Serve beans and milk in bowls. Garnish as you wish, with a drizzle of oil, a sprinkle of Parmesan and a pinch of Aleppo pepper and black pepper. Serve with the bread alongside for dipping.',
    './images/recipes/V_beans.png'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Vegetarianism'),
    'Sweet Potato & Peanut Curry',
    'Gordon Ramsay',
    'Cook this tasty, budget-friendly vegan curry for an easy family dinner. With spinach and sweet potato, it boasts two of your five-a-day and it’s under 400 calories.',
    '1 tbsp coconut oil; 1 onion, chopped; 2 garlic cloves, grated; thumb-sized piece ginger, grated; 3 tbsp Thai red curry paste (check the label to make sure it’s vegetarian/ vegan); 1 tbsp smooth peanut butter; 500g sweet potato, peeled and cut into chunks; 400ml can coconut milk; 200g bag spinach; 1 lime, juiced; cooked rice, to serve (optional); dry roasted peanuts, to serve (optional)',
    'Melt 1 tbsp coconut oil in a saucepan over a medium heat and soften 1 chopped onion for 5 mins. Add 2 grated garlic cloves and a grated thumb-sized piece of ginger, and cook for 1 min until fragrant. Stir in 3 tbsp Thai red curry paste, 1 tbsp smooth peanut butter and 500g sweet potato, peeled and cut into chunks, then add 400ml coconut milk and 200ml water. Bring to the boil, turn down the heat and simmer, uncovered, for 25-30 mins or until the sweet potato is soft. Stir through 200g spinach and the juice of 1 lime, and season well. Serve with cooked rice, and if you want some crunch, sprinkle over a few dry roasted peanuts.',
    './images/recipes/V_curry.png'
);

-- Low Fat

INSERT INTO Food (CategoryName) VALUES ('LowFat');

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowFat'),
    'Baked Salmon with Dill',
    'Jamie Oliver',
    'Baked Salmon with Dill is a light and nutritious dish. The dill adds a refreshing flavor to the tender salmon fillets, making it a delightful low-fat option.',
    '4 salmon fillets; 2 tablespoons fresh dill, chopped; 1 lemon, sliced; Salt and pepper to taste',
    'Preheat your oven to 350°F (175°C). Place the salmon fillets on a baking sheet. Season them with salt, pepper, and chopped dill. Arrange lemon slices on top of each fillet. Bake for 15-20 minutes or until the salmon flakes easily with a fork. Serve with a side of steamed asparagus.',
    './images/recipes/LF_salmon.png'

);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions, Path_img)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowFat'),
    'Greek Salad',
    'Ina Garten (Barefoot Contessa)',
    'Greek Salad is a refreshing and low-fat option. It''s packed with fresh vegetables and feta cheese for a burst of flavor.',
    '4 cups mixed salad greens; 1 cucumber, sliced; 1 cup cherry tomatoes, halved; 1/2 red onion, thinly sliced; 1/4 cup sliced black olives; 1/4 cup crumbled feta cheese; Greek dressing (olive oil, lemon juice, oregano, salt, and pepper)',
    'In a large salad bowl, combine the salad greens, cucumber, cherry tomatoes, red onion, black olives, and crumbled feta cheese. Drizzle Greek dressing over the salad and toss to combine. Serve immediately.',
    './images/recipes/LF_salad.png'
);
