// Після завантаження DOM додаємо обробник для фільтрації рядків таблиці за категорією
document.addEventListener("DOMContentLoaded", function () {
    const filterSelect = document.getElementById("category");

    // Обробка зміни значення у випадаючому списку категорій
    filterSelect.addEventListener("change", function () {
        const selectedCategory = this.value;  // Отримуємо обрану категорію
        const rows = document.querySelectorAll("table tr[data-category]");  // Всі рядки, які мають атрибут data-category

        rows.forEach(row => {
            const rowCategory = row.getAttribute("data-category");

            // Показуємо всі рядки, якщо обрано "all", або тільки ті, що відповідають обраній категорії
            if (selectedCategory === "all" || selectedCategory === rowCategory)
                row.style.display = "";  // Показуємо рядок
            else
                row.style.display = "none";  // Ховаємо рядок
        });
    });
});

// Після завантаження DOM додаємо функціонал для видалення рядків у таблицях "коментарі" та "запропоновані рецепти"
document.addEventListener("DOMContentLoaded", function () {
    const tableIds = ["comments-table", "suggested-table"];  // ID таблиць, які будемо обробляти

    tableIds.forEach(id => {
        const table = document.getElementById(id);
        if (table) {
            // Встановлюємо слухача кліків на всю таблицю
            table.addEventListener("click", function (event) {
                // Перевіряємо, чи клік був по кнопці
                if (event.target.tagName === "BUTTON") {
                    const row = event.target.closest("tr");  // Знаходимо найближчий рядок
                    if (row)
                        row.remove(); // Видаляємо рядок з таблиці
                }
            });
        }
    });
});

// Після завантаження DOM додаємо можливість блокування або розблокування користувачів у таблиці
document.addEventListener("DOMContentLoaded", function () {
    const userTable = document.getElementById("users-table");

    if (userTable) {
        // Встановлюємо обробник подій кліку на таблицю користувачів
        userTable.addEventListener("click", function (event) {
            // Перевіряємо, чи клік був по кнопці
            if (event.target.tagName === "BUTTON") {
                const action = event.target.textContent.trim();  // Отримуємо текст кнопки ("Block" або "Unblock")
                const row = event.target.closest("tr");  // Знаходимо рядок, у якому знаходиться кнопка
                const statusCell = row.querySelector("td:nth-child(3)");  // Знаходимо клітинку зі статусом

                // Міняємо статус залежно від дії
                if (action === "Block")
                    statusCell.textContent = "Blocked";
                else if (action === "Unblock")
                    statusCell.textContent = "Active";
            }
        });
    }
});
