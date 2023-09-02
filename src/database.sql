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
    PRIMARY KEY (ID, CategoryName)
);

CREATE TABLE FoodRecipe (
    RecipeID INT auto_increment,
    CategoryID INT NOT NULL,
    RecipeName TEXT,
    Author TEXT,
    Descriptions TEXT,
    Ingredients TEXT,
    Instructions TEXT,
    PRIMARY KEY(RecipeID, CategoryID),
    CONSTRAINT FK_CategoryID_ID FOREIGN KEY(CategoryID) references Food(ID)
);

-- add vào database nè mấy chấn bé đù
-- BODY BUILDING
INSERT INTO Food (CategoryName) VALUES ('BodyBuilding');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions)
VALUES (
    (SELECT distinct ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Grilled Chicken with Sweet Potato and Asparagus',
    'Gordon Ramsay',
    'Indulge in a symphony of flavors with our Grilled Chicken...',
    '1 chicken breast (about 6 oz), Seasonings like garlic powder, paprika, salt, and pepper, 1 medium sweet potato, 1 cup asparagus',
    'Grill the chicken breast with the chosen seasonings at 200°C (392°F) for about 6-8 minutes per side or until the internal temperature reaches 165°F (74°C). Wash and pierce the sweet potato with a fork. Bake at 200°C (392°F) for around 45-60 minutes or microwave for about 5-7 minutes until tender. Trim the tough ends of the asparagus. Grill or steam the asparagus for about 4-5 minutes until tender but still crisp.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Turkey and Quinoa Stuffed Bell Peppers',
    'Gordon Ramsay',
    'Elevate your dinner game with our mouthwatering Turkey and Quinoa Stuffed Bell Peppers...',
    '1 large bell pepper, 4 oz ground turkey, 1/4 cup cooked quinoa, 1/4 cup cooked black beans, Diced tomatoes, onions, and seasonings as desired',
    'Cut off the top of the bell pepper and remove seeds and membranes. Cook ground turkey in a skillet over medium heat until browned. Add diced tomatoes, onions, black beans, and desired seasonings. Stuff the bell pepper with the turkey, quinoa, and black bean mixture. Bake stuffed pepper at 175°C (350°F) for about 25-30 minutes until the pepper is tender.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Tofu Stir-Fry with Brown Rice',
    'Gordon Ramsay',
    'Experience a burst of Asian-inspired flavors with our Tofu Stir-Fry served over nutty Brown Rice...',
    '6 oz firm tofu, 1 cup stir-fry vegetables (such as broccoli, bell peppers, carrots), Cooked brown rice',
    'Press tofu to remove excess moisture and cut into cubes. Heat a pan over medium-high heat and add a little oil. Stir-fry tofu until golden and slightly crispy. Add stir-fry vegetables and cook until tender-crisp. Add low-sodium soy sauce or stir-fry sauce. Serve tofu and vegetable stir-fry over cooked brown rice.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Whole Wheat Pasta with Lean Beef Marinara',
    'Gordon Ramsay',
    'Savor the goodness of our Whole Wheat Pasta paired with a hearty Lean Beef Marinara sauce...',
    '4 oz lean ground beef, 1/4 cup diced tomatoes, 1/4 cup sautéed onions, Whole wheat pasta',
    'Cook lean ground beef in a skillet over medium heat until browned. Add diced tomatoes and sautéed onions. Cook whole wheat pasta according to package instructions. Mix cooked pasta with beef marinara sauce.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'BodyBuilding'),
    'Omelette with Spinach, Mushrooms, and Cheese',
    'Gordon Ramsay',
    'Start your day on a flavorful note with our delectable Omelette featuring a medley of Spinach, Mushrooms, and Cheese...',
    '3 eggs, 1 cup sautéed spinach, 1/2 cup sliced mushrooms, 1/4 cup shredded cheese (such as mozzarella or cheddar)',
    'Sauté sliced mushrooms until tender, then add fresh spinach and sauté until wilted. Beat three eggs in a bowl until well combined. Pour beaten eggs into a non-stick skillet over the sautéed vegetables. Cook until edges set, then sprinkle shredded cheese over half of the omelette. Fold the omelette in half, covering the cheese. Slide onto a plate and enjoy.'
);

-- LOW CARB

INSERT INTO Food (CategoryName) VALUES ('LowCarb');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Baked Lemon Herb Salmon with Broccoli',
    'Gordon Ramsay',
    'Elevate your dinner experience with our Baked Lemon Herb Salmon with a side of tender Broccoli. Its a culinary masterpiece that brings the freshness of the sea and the garden to your plate, leaving your taste buds dancing with delight!',
    '2 salmon fillets (6 oz each), 1 lemon (zest and juice), 2 tablespoons olive oil, 2 cloves garlic (minced), 1 teaspoon dried thyme, Salt and pepper to taste, 2 cups broccoli florets',
    'Preheat the oven to 400°F (200°C). In a bowl, mix together lemon zest, lemon juice, olive oil, minced garlic, dried thyme, salt, and pepper. Place the salmon fillets on a baking sheet lined with parchment paper. Brush the salmon with the lemon herb mixture. Toss the broccoli florets in the remaining lemon herb mixture. Arrange the broccoli around the salmon on the baking sheet. Bake in the preheated oven for about 15-20 minutes, or until the salmon is cooked through and flakes easily with a fork.'
);


INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Descriptions, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Grilled Chicken Caesar Salad',
    'Gordon Ramsay',
    'Tender grilled chicken breast, marinated to perfection, atop a bed of crisp romaine lettuce, tossed in creamy Caesar dressing, and garnished with garlic croutons and shaved Parmesan cheese. It\'s a salad that\'s hearty enough to satisfy your cravings while keeping things fresh and delightful!',
    '2 boneless, skinless chicken breasts, 2 tablespoons olive oil, 1 teaspoon garlic powder, Salt and pepper to taste, Romaine lettuce, washed and chopped, 1/4 cup grated Parmesan cheese, Low-carb Caesar dressing',
    'Preheat the grill to medium-high heat. Rub the chicken breasts with olive oil and season with garlic powder, salt, and pepper. Grill the chicken for about 6-8 minutes per side, or until the internal temperature reaches 165°F (74°C). Let the chicken rest for a few minutes, then slice it. In a large bowl, combine the chopped romaine lettuce and sliced chicken. Add grated Parmesan cheese and drizzle with low-carb Caesar dressing. Toss to coat.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Spiralized Zucchini Noodles with Basil Pesto',
    'Gordon Ramsay',
    'Spiralized zucchini noodles tossed in a vibrant and aromatic basil pesto sauce, topped with a sprinkle of pine nuts and freshly grated Parmesan cheese. This light and refreshing dish is a celebration of garden-fresh flavors that will transport you to a Mediterranean paradise with every bite!',
    '2 medium zucchinis, spiralized into noodles, 1/4 cup prepared pesto sauce, Cherry tomatoes, halved, Grated Parmesan cheese (optional), Fresh basil leaves (for garnish)',
    'Spiralize the zucchinis to create zucchini noodles. In a pan over medium heat, sauté the zucchini noodles for 2-3 minutes until just tender. Stir in the pesto sauce and cherry tomato halves. Cook for an additional 2 minutes to warm the sauce and tomatoes. Serve the zucchini noodles with pesto topped with grated Parmesan cheese (if using) and fresh basil leaves.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Cauliflower Fried Rice',
    'Gordon Ramsay',
    'Grated cauliflower sautéed with a colorful mix of veggies, lean protein, and a savory blend of soy sauce and spices, all wok-tossed to perfection. Its a low-carb, high-flavor alternative that will satisfy your cravings for Asian-inspired comfort food without the guilt!',
    '1 medium head cauliflower, riced, 2 tablespoons coconut oil or olive oil, 1/2 cup diced carrots, 1/2 cup diced bell peppers, 1/2 cup green peas, 2 cloves garlic, minced, 2 eggs, beaten, 2 tablespoons low-sodium soy sauce, Green onions, sliced (for garnish)',
    'Cut the cauliflower into florets and pulse in a food processor until it resembles rice. Heat coconut oil or olive oil in a large pan over medium heat. Add diced carrots and bell peppers, and sauté until slightly softened. Push the vegetables to one side of the pan and add minced garlic to the other side. Sauté for about 30 seconds. Push the garlic aside and pour beaten eggs into the pan. Scramble the eggs until cooked. Mix in the cauliflower rice and green peas. Stir-fry for 3-4 minutes until the cauliflower is cooked but still slightly crunchy. Stir in low-sodium soy sauce and cook for an additional 2 minutes. Garnish with sliced green onions and serve.'
);

INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'LowCarb'),
    'Avocado and Bacon Stuffed Eggs',
    'Gordon Ramsay',
    'Creamy avocado and crispy bacon take the classic deviled egg to a whole new level of deliciousness. These savory bites are the perfect blend of creamy, smoky, and savory flavors, making them an irresistible crowd-pleaser for any occasion.',
    '4 hard-boiled eggs, halved and yolks removed, 1 ripe avocado, mashed, 2 strips cooked bacon, crumbled, 1 tablespoon mayonnaise, 1 teaspoon Dijon mustard, Salt and pepper to taste, Paprika (for garnish)',
    'Cut the hard-boiled eggs in half and remove the yolks. In a bowl, combine the mashed avocado, crumbled bacon, mayonnaise, Dijon mustard, salt, and pepper. Fill the egg white halves with the avocado mixture. Sprinkle with paprika for garnish. Chill in the refrigerator for a short while before serving.'
);


-- HEALTHY

INSERT INTO Food (CategoryName) VALUES ('Healthy');
INSERT INTO FoodRecipe (CategoryID, RecipeName, Author, Description, Ingredients, Instructions)
VALUES (
    (SELECT ID FROM Food WHERE CategoryName = 'Healthy'),
    'Quinoa and Vegetable Stir-Fry',
    'Gordon Ramsay',
    'Elevate your dinner table with our Quinoa and Vegetable Stir-Fry. This vibrant dish combines fluffy quinoa with a colorful array of crisp, stir-fried vegetables, all coated in a delectable savory sauce. Dive into a world of taste and health with every forkful!',
    '1 cup quinoa, 2 cups water or vegetable broth, 1 tablespoon olive oil, 1 cup mixed vegetables (such as bell peppers, carrots, snap peas), 2 cloves garlic, minced, 2 tablespoons low-sodium soy sauce, 1 teaspoon sesame oil, Chopped green onions (for garnish)',
    'Rinse quinoa thoroughly and cook it in water or vegetable broth according to package instructions. Heat olive oil in a large pan over medium-high heat. Add mixed vegetables and sauté for 3-4 minutes until slightly tender. Push vegetables to the side and add minced garlic. Sauté for about 30 seconds. Mix in cooked quinoa. Stir in low-sodium soy sauce and sesame oil. Cook for an additional 2 minutes. Garnish with chopped green onions and serve.'
);

