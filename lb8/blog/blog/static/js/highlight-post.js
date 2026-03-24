// highlight-post.js - Обновленная версия
console.log("=====================================");
console.log("highlight-post.js загружен!");
console.log("=====================================");

$(document).ready(function() {
    console.log("DOM загружен, инициализация highlight-post.js");
    
    // =========================================
    // 1. Эффект подсветки для постов
    // =========================================
    
    $('.one-post').hover(
        function(event) {
            var $currentPost = $(event.currentTarget);
            
            // Добавляем класс для CSS-эффектов
            $currentPost.addClass('hovered');
            
            // Анимируем тень
            $currentPost.find('.one-post-shadow').stop().animate({
                opacity: '0.15'
            }, 200);
        },
        function(event) {
            var $currentPost = $(event.currentTarget);
            
            // Убираем класс
            $currentPost.removeClass('hovered');
            
            // Возвращаем прозрачность
            $currentPost.find('.one-post-shadow').stop().animate({
                opacity: '0'
            }, 200);
        }
    );
    
    console.log("Обработчики hover добавлены для", $('.one-post').length, "постов");
});