// parallax.js - ИСПРАВЛЕННАЯ РАБОЧАЯ ВЕРСИЯ
console.log("=====================================");
console.log("parallax.js загружен!");
console.log("=====================================");

// Ждем полной загрузки DOM
$(document).ready(function() {
    console.log("DOM загружен, запуск параллакса");
    
    // ===== ПОИСК ЭЛЕМЕНТОВ =====
    var $parallaxIcons = $('.icons-for-parallax img');
    var $logo = $('.logo');
    var $title = $('.service-title');
    
    console.log("Найдено иконок:", $parallaxIcons.length);
    console.log("Найдено логотипов:", $logo.length);
    console.log("Найдено заголовков:", $title.length);
    
    // Обновляем отладочную панель
    $('#icons-count').text($parallaxIcons.length);
    
    // Если иконок нет, выходим
    if ($parallaxIcons.length === 0) {
        console.error("Иконки для параллакса не найдены!");
        $('#parallax-status').text("❌ Иконки не найдены");
        return;
    }
    
    $('#parallax-status').text("✅ Инициализация...");
    
    // ===== СОХРАНЯЕМ НАЧАЛЬНЫЕ ПОЗИЦИИ =====
    var initialPositions = [];
    
    $parallaxIcons.each(function(index) {
        var $this = $(this);
        
        // Получаем текущие CSS значения
        var top = parseFloat($this.css('top'));
        var left = parseFloat($this.css('left'));
        var marginTop = parseFloat($this.css('margin-top'));
        var marginLeft = parseFloat($this.css('margin-left'));
        
        // Если значения не определены, используем стандартные
        if (isNaN(top)) top = 0;
        if (isNaN(left)) left = 0;
        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;
        
        // Сохраняем все позиции
        initialPositions[index] = {
            top: top,
            left: left,
            marginTop: marginTop,
            marginLeft: marginLeft,
            // Также сохраняем позицию из классов (для отладки)
            classTop: index === 0 ? 50 : (index === 1 ? 150 : 250),
            classLeft: index === 0 ? 0 : (index === 1 ? 80 : 160)
        };
        
        console.log("Иконка", index, "начальная позиция:", 
                   "top=" + top, 
                   "left=" + left,
                   "marginTop=" + marginTop,
                   "marginLeft=" + marginLeft);
        
        // Убеждаемся, что иконки имеют правильное позиционирование
        $this.css({
            'position': 'absolute',
            'top': top + 'px',
            'left': left + 'px'
        });
    });
    
    // Сохраняем начальную позицию логотипа
    var logoInitialTop = parseFloat($logo.css('top')) || 0;
    var logoInitialMargin = parseFloat($logo.css('margin-top')) || 20;
    
    // Сохраняем начальную позицию заголовка
    var titleInitialTop = parseFloat($title.css('top')) || 0;
    
    console.log("Логотип начальная позиция:", logoInitialTop);
    
    // ===== ОСНОВНАЯ ФУНКЦИЯ ПАРАЛЛАКСА =====
    function updateParallax() {
        // Получаем текущую прокрутку
        var scrollTop = $(window).scrollTop();
        
        // Обновляем отладочную информацию
        $('#scroll-value').text(scrollTop);
        
        // Ограничиваем максимальную прокрутку для эффекта
        var maxScroll = 800;
        var limitedScroll = Math.min(scrollTop, maxScroll);
        
        // ===== 1. ДВИЖЕНИЕ ИКОНОК =====
        // Разные скорости для каждой иконки (передняя - быстрее, задняя - медленнее)
        var speeds = [0.3, 0.2, 0.1];
        
        $parallaxIcons.each(function(index) {
            var $this = $(this);
            
            // Используем позицию из CSS или из классов
            var baseTop = initialPositions[index].top;
            if (baseTop === 0) {
                // Если CSS top не задан, используем значения из классов
                baseTop = initialPositions[index].classTop;
            }
            
            // Вычисляем новую позицию
            var newTop = baseTop + (limitedScroll * speeds[index]);
            
            // Добавляем небольшое горизонтальное движение
            var newLeft = initialPositions[index].left + (limitedScroll * 0.05 * (index + 1));
            
            // Применяем новые позиции
            $this.css({
                'top': newTop + 'px',
                'left': newLeft + 'px'
            });
            
            // Для отладки выводим каждые 100px прокрутки
            if (scrollTop % 100 === 0) {
                console.log("Иконка", index, "новая позиция:", newTop);
            }
        });
        
        // ===== 2. ДВИЖЕНИЕ ЛОГОТИПА =====
        if ($logo.length) {
            // Логотип движется медленно
            var logoSpeed = 0.05;
            
            // Используем margin-top или top
            var baseLogoTop = logoInitialTop > 0 ? logoInitialTop : logoInitialMargin;
            
            var newLogoTop = baseLogoTop + (limitedScroll * logoSpeed);
            
            $logo.css({
                'margin-top': newLogoTop + 'px',
                'top': 'auto' // Сбрасываем top, используем margin
            });
        }
        
        // ===== 3. ДВИЖЕНИЕ ЗАГОЛОВКА =====
        if ($title.length) {
            var titleSpeed = 0.02;
            var newTitleTop = titleInitialTop + (limitedScroll * titleSpeed);
            
            $title.css({
                'margin-top': newTitleTop + 'px'
            });
        }
    }
    
    // ===== ЗАПУСК ПАРАЛЛАКСА =====
    
    // Обновляем статус
    $('#parallax-status').text("✅ Активен");
    
    // Запускаем при прокрутке
    $(window).on('scroll', function() {
        updateParallax();
    });
    
    // Запускаем при изменении размера окна
    $(window).on('resize', function() {
        updateParallax();
    });
    
    // Запускаем сразу для установки начальных позиций
    updateParallax();
    
    // Запускаем каждый кадр анимации для плавности
    var ticking = false;
    $(window).on('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log("Параллакс инициализирован и запущен");
    
    // Выводим подсказку в консоль
    console.log("Совет: Прокрутите страницу вниз, чтобы увидеть эффект параллакса!");
});

// ===== ФУНКЦИЯ ДЛЯ ТЕСТИРОВАНИЯ =====
function testParallax() {
    console.log("=== ТЕСТИРОВАНИЕ ПАРАЛЛАКСА ===");
    console.log("jQuery версия:", $.fn.jquery);
    console.log("Иконки:", $('.icons-for-parallax img').length);
    console.log("Логотип:", $('.logo').length);
    console.log("Заголовок:", $('.service-title').length);
    
    if ($('.icons-for-parallax img').length > 0) {
        var firstIcon = $('.icons-for-parallax img:first');
        console.log("Первая иконка - позиция:", {
            top: firstIcon.css('top'),
            left: firstIcon.css('left'),
            position: firstIcon.css('position')
        });
    }
    
    // Принудительно запускаем параллакс
    $(window).trigger('scroll');
}

// Запускаем тест через 2 секунды
setTimeout(testParallax, 2000);