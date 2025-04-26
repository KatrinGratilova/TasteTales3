// Функція для валідації окремого поля
function validateField(value, minLength, errorMessage) {
    if (value.trim().length < minLength) {  // Перевіряємо, чи значення менше мінімальної довжини
        showMessage(errorMessage, false);  // Показуємо повідомлення про помилку
        return false;
    }
    return true;
}

// Функція для перевірки пароля на складність
function checkPassword(password) {
    // Шаблон перевіряє: щонайменше одна велика літера, одна мала, одна цифра, один спецсимвол і довжина від 8 символів
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Якщо пароль не відповідає вимогам
    if (password.length < 8 || !passwordPattern.test(password)) {
        showMessage("Пароль має містити великі та малі літери, цифри та спеціальні символи", false);
        return false;
    }
    return true;
}

// Функція для очищення форми
function clearForm(form) {
    form.reset(); // Скидає всі поля форми (input, select тощо) до початкового стану

    // Додатково очищаємо повідомлення, якщо воно було показано
    const messageEl = document.getElementById("message");
    messageEl.textContent = "";
    messageEl.classList.remove("visible");  // Приховуємо повідомлення
}

// Функція для обробки форми авторизації після натискання кнопки "Увійти"
function submitLoginForm(form, event) {
    event.preventDefault();  // Зупиняємо стандартне відправлення форми

    // Отримуємо й обрізаємо значення з полів форми
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    // Валідація логіна
    if (!validateField(username, 5, "Логін має містити щонайменше 5 символів")) return;
    // Валідація паролю
    if (!checkPassword(password)) return;

    showModal('Раді вас знову бачити, ' + username + '!');  // Показуємо модальне вікно з вітанням
    clearForm(form);
}

// Функція для обробки форми реєстрації після натискання кнопки "Зареєструватись"
function submitRegistrationForm(form, event) {
    event.preventDefault();  // Зупиняємо стандартне відправлення форми

    // Отримуємо й обрізаємо значення з полів форми
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form['confirm-password'].value.trim();

    // Перевірка кожного поля форми
    if (!validateField(name, 5, "Будь ласка, введіть ім'я")) return;
    if (!validateField(email, 10, "Будь ласка, введіть E-mail")) return;
    if (!checkPassword(password)) return;
    if (!validateField(confirmPassword, 1, "Будь ласка, підтвердіть пароль")) return;

    if (password !== confirmPassword) { // Перевірка на збіг паролів
        showMessage("Паролі не співпадають", false);
        return;
    }

    showModal('Вітаємо, ' + name + ', у TasteTales! Вас було успішно зареєстровано.');  // Показуємо модальне вікно з вітанням
    clearForm(form);
}

// Функція для обробки форми пропонування рецепта після натискання кнопки "Запропонувати рецепт"
function submitRecipeForm(form, event) {
    event.preventDefault();  // Зупиняємо стандартне відправлення форми

    // Отримуємо й обрізаємо значення з полів форми
    const name = form.name.value.trim();
    const time = form.time.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const ingredients = form.ingredients.value.trim();
    const instruction = form.instruction.value.trim();
    const photo = form.photo.files[0];

    // Перевірка кожного поля форми
    if (!validateField(name, 3, "Назва страви має бути не менше 3 символів")) return;
    if (!validateField(time, 1, "Час приготування має бути вказаний")) return;
    if (!validateField(description, 5, "Опис страви має бути не менше 5 символів")) return;
    if (!validateField(category, 5, "Будь ласка, оберіть категорію")) return;
    if (!validateField(ingredients, 10, "Інгредієнти мають бути вказані")) return;
    if (!validateField(instruction, 20, "Інструкція має бути не менше 10 символів")) return;

    if (!photo) {  // Перевірка наявності зображення
        showMessage("Будь ласка, завантажте фото рецепта", false);
        return;
    }
    // Перевірка формату зображення (тільки JPG або PNG)
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(photo.type)) {
        showMessage("Невірний формат файлу. Дозволено завантажувати тільки зображення формату JPG або PNG", false);
        return;
    }

    showModal("Рецепт успішно запропоновано!") // Якщо все добре — показуємо повідомлення
    clearForm(form);
}

// Обробка додавання нового коментаря під описом рецепта
// Чекаємо повного завантаження DOM, перш ніж виконувати скрипт
document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо елементи форми, поля вводу, контейнера коментарів та повідомлень
    const form = document.getElementById("commentForm");
    const commentInput = document.getElementById("comment");
    const commentsContainer = document.getElementById("commentsList");
    const messageContainer = document.getElementById("message");

    // Перевіряємо, чи всі потрібні елементи існують в DOM
    if (!form || !commentInput || !commentsContainer || !messageContainer) {
        console.warn("One or more elements not found in DOM");
        return;
    }

    // Додаємо обробник події на відправку форми
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Зупиняємо стандартне оновлення сторінки після submit

        const commentText = commentInput.value.trim();  // Отримуємо введений коментар і обрізаємо пробіли
        if (commentText.length < 5) {  // Перевіряємо, чи коментар не надто короткий
            showMessage("Коментар має містити щонайменше 5 символів.", false);
            return;
        }

        // Створюємо новий елемент для імені користувача
        const nameElement = document.createElement("p");
        nameElement.classList.add("client-name");
        nameElement.innerHTML = "<b>Ви:</b>"; // Отображаем имя "Вы"
        // Створюємо новий елемент для самого коментаря
        const commentElement = document.createElement("p");
        commentElement.classList.add("comment-text");
        commentElement.textContent = commentText; // Отображаем сам комментарий

        // Налаштовуємо початкову анімацію (елементи прозорі та трохи зсунуті вниз)
        [nameElement, commentElement].forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(10px)";
            el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        });

        // Додаємо нові елементи в контейнер з коментарями
        commentsContainer.appendChild(nameElement);
        commentsContainer.appendChild(commentElement);

        // Через маленьку затримку запускаємо анімацію появи
        setTimeout(() => {
            nameElement.style.opacity = "1";
            nameElement.style.transform = "translateY(0)";
            commentElement.style.opacity = "1";
            commentElement.style.transform = "translateY(0)";
        }, 10);

        clearForm(form);
    })
});

