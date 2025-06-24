const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const mealsContainer = document.getElementById('meals-container')

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const query = searchInput.value.trim()

  if (!query) return

  try {
    mealsContainer.innerHTML = `<p style="text-align:center;">Searching for "${query}"...</p>`

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    const data = await response.json()

    if (data.meals) {
      displayMeals(data.meals)
    } else {
      mealsContainer.innerHTML = `<p style="text-align:center;">No recipes found for "${query}". Try another keyword.</p>`
    }
  } catch (error) {
    console.error(error)
    mealsContainer.innerHTML = `<p style="text-align:center; color:red;">Error fetching data. Please try again later.</p>`
  }
})

function displayMeals(meals) {
  mealsContainer.innerHTML = meals
    .map(
      (meal) => `
    <div class="meal-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="meal-card-content">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory || 'Unknown'}</p>
        <a href="${
          meal.strSource || meal.strYoutube
        }" target="_blank" rel="noopener noreferrer">View Recipe</a>
      </div>
    </div>
  `
    )
    .join('')
}
