// highlight-post.js - Подсветка постов и эффекты для логотипа
console.log("=====================================");
console.log("highlight-post.js (улучшенная версия) загружен!");
console.log("=====================================");

// Ждем полной загрузки DOM
$(document).ready(function() {
    console.log("DOM загружен, инициализация highlight-post.js");
    
    // =========================================
    // 1. Эффект подсветки для постов
    // =========================================
    
    // Находим все посты и добавляем обработчики hover
    $('.one-post').hover(
        function(event) {
            // Функция при наведении курсора
            console.log("Навели на пост");
            
            // Получаем текущий пост
            var $currentPost = $(event.currentTarget);
            
            // Добавляем класс для CSS-эффектов (опционально)
            $currentPost.addClass('hovered');
            
            // Находим тень внутри текущего поста и анимируем её
            $currentPost.find('.one-post-shadow').stop().animate({
                opacity: '0.15'  // Увеличиваем прозрачность до 0.15 (15% видимости)
            }, 200);  // За 200 миллисекунд
        },
        function(event) {
            // Функция когда курсор убрали
            console.log("Убрали курсор с поста");
            
            var $currentPost = $(event.currentTarget);
            
            // Убираем класс
            $currentPost.removeClass('hovered');
            
            // Возвращаем прозрачность обратно в 0
            $currentPost.find('.one-post-shadow').stop().animate({
                opacity: '0'
            }, 200);
        }
    );
    
    console.log("Обработчики hover добавлены для", $('.one-post').length, "постов");
    
    // =========================================
    // 2. ЗАДАНИЕ: Эффект для логотипа
    // =========================================
    
    // Находим логотип по ID
    var $logo = $('#logo');
    
    if ($logo.length > 0) {
        console.log("Логотип найден, добавляем эффекты");
        
        // Запоминаем исходные размеры
        var originalWidth = $logo.width();
        var originalHeight = $logo.height();
        
        console.log("Исходные размеры логотипа:", originalWidth, "x", originalHeight);
        
        // Добавляем обработчик hover для логотипа
        $logo.hover(
            function() {
                // При наведении - увеличиваем размер
                console.log("Навели на логотип");
                
                // Вариант 1: Анимация с помощью animate
                $(this).stop().animate({
                    width: originalWidth + 40,  // Увеличиваем ширину на 40px
                    height: originalHeight + 40  // Увеличиваем высоту на 40px
                }, 300);
                
                // Вариант 2: Использование CSS transform (более плавно)
                // $(this).css('transform', 'scale(1.2)');
            },
            function() {
                // Когда курсор убрали - возвращаем исходный размер
                console.log("Убрали курсор с логотипа");
                
                // Вариант 1: Возвращаем исходные размеры
                $(this).stop().animate({
                    width: originalWidth,
                    height: originalHeight
                }, 300);
                
                // Вариант 2: Убираем трансформацию
                // $(this).css('transform', 'scale(1)');
            }
        );
        
        // Добавляем дополнительный эффект при клике на логотип
        $logo.click(function() {
            console.log("Клик по логотипу");
            
            // Эффект пульсации
            $(this).css('transform', 'scale(0.9)');
            setTimeout(function() {
                $logo.css('transform', 'scale(1)');
            }, 150);
        });
        
    } else {
        console.log("Логотип не найден!");
    }
    
    // =========================================
    // 3. Дополнительные эффекты
    // =========================================
    
    // Эффект для кнопок при наведении
    $('.fold-button').hover(
        function() {
            $(this).stop().animate({
                opacity: 0.9,
                paddingLeft: '25px',
                paddingRight: '25px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                opacity: 1,
                paddingLeft: '20px',
                paddingRight: '20px'
            }, 200);
        }
    );
    
    // Эффект для ссылок в заголовках
    $('.post-title a').hover(
        function() {
            $(this).stop().animate({
                marginLeft: '5px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                marginLeft: '0'
            }, 200);
        }
    );
    
    console.log("Все эффекты инициализированы");
});

// Функция для переинициализации эффектов (если посты добавляются динамически)
function reinitializeHighlightEffects() {
    console.log("Переинициализация эффектов...");
    
    // Удаляем старые обработчики и добавляем новые
    $('.one-post').off('mouseenter mouseleave');
    
    $('.one-post').hover(
        function(event) {
            $(event.currentTarget).find('.one-post-shadow').stop().animate({
                opacity: '0.15'
            }, 200);
        },
        function(event) {
            $(event.currentTarget).find('.one-post-shadow').stop().animate({
                opacity: '0'
            }, 200);
        }
    );
    
    console.log("Эффекты переинициализированы");
}

// Делаем функцию доступной глобально
window.reinitializeHighlightEffects = reinitializeHighlightEffects;