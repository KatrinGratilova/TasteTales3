// Функція для відображення повідомлення про помилку або успіх
function showMessage(text, isValid) {
    let messageEl = document.getElementById("message");  // Отримуємо елемент з id "message" з DOM
    messageEl.textContent = text;
    messageEl.style.color = isValid ? "rgb(69,129,71)" : "rgb(176, 49, 64)";  // Встановлюємо колір залежно від валідності
    messageEl.classList.add("visible");  // Додаємо клас "visible", щоб показати повідомлення

    // Використовуємо setTimeout для того, щоб через 10 секунд приховати повідомлення
    setTimeout(() => {
        messageEl.classList.remove("visible");
    }, 10000);
}

// Функція для відкриття модального вікна
function showModal(message) {
    // Отримуємо елементи модального вікна та тексту всередині
    let modal = document.getElementById("modal");
    let successText = document.getElementById("modalText");
    let closeBtn = document.getElementById("closeModalBtn");

    // Встановлюємо текст повідомлення у модальному вікні
    if (successText && message)
        successText.textContent = message;

    modal.style.display = "block";  // Відображаємо модальне вікно

    // Додаємо обробник для кнопки закриття модального вікна
    if (closeBtn)
        closeBtn.addEventListener("click", closeModal);  // Коли кнопка натискається, викликається функція closeModal
}

// Функція для закриття модального вікна
function closeModal() {
    let modal = document.getElementById("modal");

    // Змінюємо стиль display на "none", щоб приховати модальне вікно
    modal.style.display = "none";
}

// Закриття модального вікна при кліку на область поза вікном
window.onclick = function (event) {
    let modal = document.getElementById("modal");
    // Якщо користувач натискає на область поза модальним вікном, воно закривається
    if (event.target === modal)
        closeModal();
}

// Функція для додавання класу "visible" при прокручуванні сторінки, щоб забезпечити плавне проявлення контенту
function handleScroll() {
    // Отримуємо всі елементи з класом "fade-in-element"
    let elements = document.querySelectorAll('.fade-in-element');

    // Визначаємо поточну позицію прокрутки (висота вікна + прокручена частина)
    let scrollPosition = window.innerHeight + window.scrollY;

    // Перебираємо всі елементи і додаємо клас "visible", якщо елемент вже видно на екрані
    elements.forEach(element => {
        // Якщо верхня частина елемента знаходиться вище або на рівні поточної позиції прокрутки
        if (scrollPosition > element.offsetTop) {
            element.classList.add('visible');  // Додаємо клас "visible" для анімації
        }
    });
}

// Обробник події для прокрутки
// Кожен раз, коли користувач прокручує сторінку, викликається функція handleScroll
window.addEventListener('scroll', handleScroll);

// Викликаємо функцію при завантаженні сторінки, щоб елементи одразу з'являлися, якщо їх вже видно
window.addEventListener('load', handleScroll);