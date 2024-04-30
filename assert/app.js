const list = document.getElementById('list')
const search = document.getElementById('search')
let allMeals = []

async function getMeals () {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    )
    const data = await response.json()
    allMeals = data.meals
    displayMeals(allMeals)
  } catch (error) {
    console.error('Error fetching meals:', error)
  }
}

function displayMeals(meals) {
  list.innerHTML = '';
  meals.forEach((meal) => {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');
    mealItem.innerHTML = `
      <h2 class='meal-name'>${meal.strMeal}</h2>
      <div class='meal-image'>
        <img src='${meal.strMealThumb}' alt='Image of ${meal.strMeal}'>
      </div>
      <div class='meal-info'>
        <p>Category: ${meal.strCategory}</p>
        <p>Area: ${meal.strArea}</p>
        <p>Instructions: ${meal.strInstructions}</p>
      </div>
    `;
    list.appendChild(mealItem);
  });
}


search.addEventListener('input', () => {
  const searchTerm = search.value.trim().toLowerCase()
  const filteredMeals = allMeals.filter(
    (meal) =>
      meal.strMeal.toLowerCase().includes(searchTerm) ||
      meal.strCategory.toLowerCase().includes(searchTerm)
  )
  displayMeals(filteredMeals)
})

getMeals()
