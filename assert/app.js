
const mealList = document.getElementById('mealList');
const searchInput = document.getElementById('searchInput');
let allMeals = [];


async function getMeals() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        allMeals = data.meals; 
        displayMeals(allMeals); 
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}


function displayMeals(meals) {
    mealList.innerHTML = '';

    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <div class="meal-image">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-info">
                <h2>${meal.strMeal}</h2>
                <p>Category: ${meal.strCategory}</p>
                <p>Area: ${meal.strArea}</p>
                <p>Instructions: ${meal.strInstructions}</p>
            </div>
        `;
        mealList.appendChild(mealItem);
    });
}


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMeals = allMeals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm)
    );
    displayMeals(filteredMeals);
});

getMeals(); 
