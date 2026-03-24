// Улучшенная версия fold-post.js с использованием CSS-классов
console.log("=====================================");
console.log("fold-post.js улучшенная версия загружена!");
console.log("=====================================");

// Функция для настройки кнопок сворачивания
var setupFoldButtons = function() {
    // Получаем все кнопки с классом "fold-button"
    var buttons = document.getElementsByClassName("fold-button");
    
    console.log("Найдено кнопок для настройки:", buttons.length);
    
    // Для каждой кнопки добавляем обработчик
    for (var i = 0; i < buttons.length; i++) {
        // Удаляем старый обработчик, если был (чтобы избежать дублирования)
        buttons[i].removeEventListener("click", handleFoldClick);
        // Добавляем новый обработчик
        buttons[i].addEventListener("click", handleFoldClick);
        
        // Устанавливаем начальное состояние кнопки
        var postElement = getPostElement(buttons[i]);
        if (postElement && postElement.classList.contains("folded")) {
            buttons[i].innerHTML = "развернуть";
        } else {
            buttons[i].innerHTML = "свернуть";
        }
    }
};

// Функция для получения родительского элемента поста (one-post)
var getPostElement = function(button) {
    // Поднимаемся на два уровня вверх: button -> post-header -> one-post
    if (button && button.parentElement && button.parentElement.parentElement) {
        return button.parentElement.parentElement;
    }
    return null;
};

// Функция-обработчик клика
var handleFoldClick = function(event) {
    // Предотвращаем всплытие события
    event.stopPropagation();
    
    console.log("Клик по кнопке:", event.target);
    
    // Получаем родительский элемент поста (one-post)
    var postElement = getPostElement(event.target);
    
    if (!postElement) {
        console.error("Не удалось найти элемент поста");
        return;
    }
    
    console.log("Элемент поста:", postElement);
    
    // Проверяем, есть ли у поста класс folded
    var isFolded = postElement.classList.contains("folded");
    
    if (isFolded) {
        // Разворачиваем пост
        postElement.classList.remove("folded");
        event.target.innerHTML = "свернуть";
        console.log("Пост развернут");
    } else {
        // Сворачиваем пост
        postElement.classList.add("folded");
        event.target.innerHTML = "развернуть";
        console.log("Пост свернут");
    }
};

// Функция для добавления кнопок к постам, которые были добавлены динамически
var addButtonsToNewPosts = function() {
    var posts = document.getElementsByClassName("one-post");
    
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var postHeader = post.querySelector('.post-header');
        
        // Проверяем, есть ли уже кнопка в этом посте
        if (postHeader && !postHeader.querySelector('.fold-button')) {
            var button = document.createElement('button');
            button.className = 'fold-button';
            button.innerHTML = 'свернуть';
            postHeader.appendChild(button);
        }
    }
    
    // Перенастраиваем обработчики для новых кнопок
    setupFoldButtons();
};

// Функция для инициализации всего
var initialize = function() {
    console.log("Инициализация fold-post.js...");
    
    // Добавляем кнопки к постам, если их нет
    addButtonsToNewPosts();
    
    // Настраиваем обработчики
    setupFoldButtons();
    
    console.log("Инициализация завершена");
};

// Вызываем функцию после загрузки DOM
document.addEventListener("DOMContentLoaded", function() {
    initialize();
    console.log("DOM полностью загружен и обработан");
});

// Также вызываем при полной загрузке страницы (на всякий случай)
window.addEventListener("load", function() {
    console.log("Страница полностью загружена");
    initialize();
});

// Наблюдатель за изменениями в DOM (для динамически добавляемых постов)
var observeDOMChanges = function() {
    // Создаем наблюдатель за изменениями в DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Проверяем, были ли добавлены новые узлы
            if (mutation.addedNodes.length > 0) {
                var shouldReinitialize = false;
                
                // Проверяем, есть ли среди добавленных узлов посты
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('one-post')) {
                            shouldReinitialize = true;
                            break;
                        }
                        // Также проверяем внутренние элементы
                        if (node.querySelector && node.querySelector('.one-post')) {
                            shouldReinitialize = true;
                            break;
                        }
                    }
                }
                
                if (shouldReinitialize) {
                    console.log("Обнаружены новые посты, перенастраиваем кнопки...");
                    initialize();
                }
            }
        });
    });
    
    // Начинаем наблюдение за контейнером с постами
    var archiveContainer = document.querySelector('.archive');
    if (archiveContainer) {
        observer.observe(archiveContainer, { 
            childList: true, 
            subtree: true 
        });
        console.log("Наблюдение за изменениями DOM запущено");
    }
};

// Запускаем наблюдение после загрузки страницы
window.addEventListener("load", function() {
    observeDOMChanges();
});

// Экспортируем функции в глобальную область (для отладки)
window.foldPost = {
    setup: setupFoldButtons,
    initialize: initialize,
    addButtons: addButtonsToNewPosts
};