// Список студентов (аналог лабораторной работы №1)
var groupmates = [
    {
        "name": "Василий",
        "group": "912-2",
        "age": 19,
        "marks": [4, 3, 5, 5, 4]
    },
    {
        "name": "Анна",
        "group": "912-1",
        "age": 18,
        "marks": [3, 2, 3, 4, 3]
    },
    {
        "name": "Георгий",
        "group": "912-2",
        "age": 19,
        "marks": [3, 5, 4, 3, 5]
    },
    {
        "name": "Валентина",
        "group": "912-1",
        "age": 18,
        "marks": [5, 5, 5, 4, 5]
    },
    {
        "name": "Дмитрий",
        "group": "912-2",
        "age": 20,
        "marks": [5, 4, 5, 4, 5]
    },
    {
        "name": "Елена",
        "group": "912-1",
        "age": 19,
        "marks": [4, 4, 4, 5, 4]
    }
];

// Выводим массив в консоль
console.log("Исходный массив groupmates:");
console.log(groupmates);

// Функция для добавления пробелов справа (аналог ljust в Python)
var rpad = function(str, length) {
    str = str.toString(); // преобразование в строку
    while (str.length < length)
        str = str + ' '; // добавление пробела в конец строки
    return str; // когда все пробелы добавлены, возвратить строку
};

// Функция для вывода всех студентов в виде таблицы
var printStudents = function(students) {
    console.log("\n--- ВСЕ СТУДЕНТЫ ---");
    console.log(
        rpad("Имя студента", 15),
        rpad("Группа", 8),
        rpad("Возраст", 8),
        rpad("Оценки", 20)
    );
    // Вывод заголовка таблицы
    
    for (var i = 0; i <= students.length - 1; i++) {
        // В цикле выводится каждый экземпляр студента
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['age'], 8),
            rpad(students[i]['marks'].join(', '), 20)
        );
    }
    console.log('\n'); // добавляется пустая строка в конце вывода
};

// Вызываем функцию для вывода всех студентов
printStudents(groupmates);

// ЗАДАНИЕ: Функция для фильтрации студентов по группе
var filterByGroup = function(students, groupName) {
    var filteredStudents = [];
    
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === groupName) {
            filteredStudents.push(students[i]);
        }
    }
    
    return filteredStudents;
};

// Выводим студентов группы 912-1
console.log("--- СТУДЕНТЫ ГРУППЫ 912-1 ---");
var group9121 = filterByGroup(groupmates, "912-1");
printStudents(group9121);

// Выводим студентов группы 912-2
console.log("--- СТУДЕНТЫ ГРУППЫ 912-2 ---");
var group9122 = filterByGroup(groupmates, "912-2");
printStudents(group9122);

// Дополнительная функция: подсчет среднего балла студента
var calculateAverageMark = function(marks) {
    var sum = 0;
    for (var i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    return (sum / marks.length).toFixed(2);
};

// Функция для вывода студентов со средним баллом
var printStudentsWithAverage = function(students) {
    console.log("\n--- СТУДЕНТЫ СО СРЕДНИМ БАЛЛОМ ---");
    console.log(
        rpad("Имя студента", 15),
        rpad("Группа", 8),
        rpad("Ср. балл", 8),
        rpad("Оценки", 20)
    );
    
    for (var i = 0; i < students.length; i++) {
        var avgMark = calculateAverageMark(students[i]['marks']);
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['group'], 8),
            rpad(avgMark, 8),
            rpad(students[i]['marks'].join(', '), 20)
        );
    }
    console.log('\n');
};

// Выводим студентов со средним баллом
printStudentsWithAverage(groupmates);

// Функция для фильтрации по среднему баллу
var filterByAverageMark = function(students, minAverage) {
    var filteredStudents = [];
    
    for (var i = 0; i < students.length; i++) {
        var avgMark = parseFloat(calculateAverageMark(students[i]['marks']));
        if (avgMark >= minAverage) {
            filteredStudents.push(students[i]);
        }
    }
    
    return filteredStudents;
};

// Выводим студентов со средним баллом >= 4.0
console.log("--- СТУДЕНТЫ СО СРЕДНИМ БАЛЛОМ >= 4.0 ---");
var goodStudents = filterByAverageMark(groupmates, 4.0);
printStudents(goodStudents);