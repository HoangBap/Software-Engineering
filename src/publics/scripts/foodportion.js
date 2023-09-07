let recipes;
let selected_category = 'default';

const selectBtn = (category) => {
    const prev_select = document.querySelector('.selected');
    if(prev_select != null){
        prev_select.classList.remove('selected');
    }
    if(selected_category != category){
        document.getElementById(category).classList.add('selected');
    }
}

const filterRecipe = (category) => {
    if(selected_category == category) {
        selected_category = 'default';
        displayRecipes(recipes);
        return;
    }
    const filteredRecipes = recipes.filter(filterByCategory);
    function filterByCategory(item) {
        if(item.category == category){
            return item;
        }
    }
    selected_category = category;
    displayRecipes(filteredRecipes);
}

const displayRecipes = (recipes) => {
    document.getElementById('recipes').innerHTML = recipes.map((recipe) => {
        var {recipeID, recipe_name, recipe_description, recipe_image} = recipe;
        return (
            `   <div class="recipe-wrap mb-3" onclick="window.location.href='/recipe/${recipeID}'">
                    <div class="d-flex flex-row">
                        <img src="${recipe_image}" alt="${recipe_name}" class="recipe-pic me-5">
                        <div class="py-2">
                            <h2>${recipe_name}</h2>
                            <p>${recipe_description}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row align-items-center read-more">
                        <h5 class="me-3">Read more</h5>
                        <i class="fa-solid fa-chevron-right fa-s" style="color: #5c6b73; vertical-align: middle;"></i>
                    </div>
                </div>`
        )
    }).join('');
}

const displayData = (data) => {
    const categoryList = [...new Set(data.map((recipe) => {return recipe.category}))];
    document.getElementById('categoryBtns').innerHTML = categoryList.map((category) => {
        return (`<button class="pill-btn" tabIndex="-1" onclick="selectBtn('${category}'); filterRecipe('${category}')" id="${category}">${category}</button>`)
    }).join('');

    displayRecipes(data);    
}

fetch('/recipelist')
.then(res => {
    return res.json();
})
.then(data => {
    recipes = data;
    displayData(recipes);
})