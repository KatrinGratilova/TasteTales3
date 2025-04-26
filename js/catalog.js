// Масив для зберігання обраних категорій рецептів
let selectedCategories = [];
const noRecipesMessage = document.getElementById('no-recipes-message');  // Повідомлення, якщо немає рецептів
const showMore = document.getElementById('show-more');  // Кнопка "Показати більше"

// Функція для відображення всіх рецептів
function showAllRecipes() {
    document.querySelectorAll('.recipie-element').forEach(recipe => {
        recipe.style.display = 'block';
    });
}

// Функція для додавання або видалення категорії зі списку вибраних
function toggleCategory(category) {
    const index = selectedCategories.indexOf(category);   // Перевіряємо, чи є категорія в списку
    if (index === -1)
        selectedCategories.push(category); // Якщо немає — додаємо
    else
        selectedCategories.splice(index, 1); // Якщо є — видаляємо
}

// Обробник кліка по опції фільтрування
document.querySelectorAll('.filters .option').forEach(option => {
    option.addEventListener('click', function () {
        const category = this.getAttribute('data-category');  // Отримуємо категорію, по якій клікнули

        if (!category) {  // Якщо вибрано "ПОКАЗАТИ ВСІ РЕЦЕПТИ"
            document.querySelectorAll('.filters .option').forEach(o => o.classList.remove('selected'));  // Знімаємо виділення з усіх фільтрів
            selectedCategories = [];
            this.classList.add('selected');  // Виділяємо поточну опцію
            showMore.style.display = 'block';
            noRecipesMessage.style.display = 'none';
            showAllRecipes();  // Відразу показуємо всі рецепти
        } else {  // Якщо вибрана конкретна категорія, знімаємо виділення з "ПОКАЗАТИ ВСІ РЕЦЕПТИ"
            document.querySelector('.all-recipes-option').classList.remove('selected');
            this.classList.toggle('selected');  // Переключаємо виділення для цієї категорії
            toggleCategory(category);  // Оновлюємо список вибраних категорій
        }
    });
});

// Обробник кліка по кнопці "Фільтр"
document.getElementById('apply-filters').addEventListener('click', function () {
    if (selectedCategories.length === 0) {  // Якщо не вибрано жодної категорії, виводимо попередження
        alert("Будь ласка, виберіть хоча б одну категорію.");
        return;
    }

    const allRecipes = document.querySelectorAll('.recipie-element');  // Отримуємо всі рецепти
    let visibleCount = 0;

    allRecipes.forEach(recipe => {
        const recipeCategory = recipe.getAttribute('data-category');  // Отримуємо категорію поточного рецепту

        // Спочатку ховаємо всі рецепти та скидаємо анімацію
        recipe.classList.remove('visible');
        recipe.style.display = 'none';

        if (selectedCategories.includes(recipeCategory)) {
            recipe.style.display = 'block';  // Якщо рецепт належить до вибраної категорії, показуємо його

            // Запускаємо анімацію трохи пізніше (після застосування display: block)
            setTimeout(() => {
                recipe.classList.add('visible');
            }, 50);

            visibleCount++;
        }
    });

    if (visibleCount === 0) {  // Якщо немає жодного видимого рецепту
        showMore.style.display = 'none';
        noRecipesMessage.style.display = 'block';
        setTimeout(() => {  // Додаємо клас для анімації
            noRecipesMessage.classList.add('show');
        }, 10);
    } else {  // Якщо є хоча б один видимий рецепт
        showMore.style.display = 'block';
        noRecipesMessage.classList.remove('show');
        setTimeout(() => {
            if (!noRecipesMessage.classList.contains('show')) {
                noRecipesMessage.style.display = 'none';  // Приховуємо повідомлення через 600 мс, якщо воно не відображається
            }
        }, 600);
    }
});
