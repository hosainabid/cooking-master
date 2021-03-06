const btnSearch = document.getElementById('search-btn');
const foodList = document.getElementById('meal');
const foodDetails = document.querySelector('.meal-details-content');
const closeBtnRecipe = document.getElementById('recipe-close-btn');
const mealDetailsCss = document.querySelector('.meal-details');

btnSearch.addEventListener('click', getFoodList);
foodList.addEventListener('click', getIngredientList);
closeBtnRecipe.addEventListener('click', () => {
    foodDetails.parentElement.classList.remove("showIngredient");
    mealDetailsCss.style.display = "none";
    location.reload();
});

function getFoodList(){
    let searchTxtInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxtInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="" srcset="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Ingredient</a>
                        </div>
                    </div>
                `;
            });
            foodList.classList.remove('invalidInput');
        } else{
            html = "Please write something valid!";
            foodList.classList.add('invalidInput');
        }
        foodList.innerHTML = html;
    });
};

function getIngredientList(event){
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')){
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => IngredientListModal(data.meals));
    }
}

function IngredientListModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <h3>Ingredients</h3>
            <div class="ingredient_names">
                <ul>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        `;
    foodDetails.innerHTML = html;
    foodDetails.parentElement.classList.add('showIngredient');
}