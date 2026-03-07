// consoleLogger.js — Вывод данных формы в консоль браузера

document.addEventListener('DOMContentLoaded', function () {
  // Слушаем кастомное событие formValid, которое диспатчит validation.js
  document.addEventListener('formValid', function (event) {
    const formData = event.detail;

    // Очищаем консоль для наглядности
    console.clear();

    console.log('%c☕ Brew & Soul — Новое сообщение с формы', 'font-size:14px;font-weight:bold;color:#c8853a;');
    console.log('%c─────────────────────────────────────', 'color:#3b1a00;');

    console.log('%cИмя:',      'font-weight:bold;color:#1a0a00;', formData.name);
    console.log('%cEmail:',    'font-weight:bold;color:#1a0a00;', formData.email);
    console.log('%cТема:',     'font-weight:bold;color:#1a0a00;', formData.topic);
    console.log('%cСообщение:','font-weight:bold;color:#1a0a00;', formData.message);
    console.log('%cСогласие:', 'font-weight:bold;color:#1a0a00;', formData.consent ? 'Да' : 'Нет');

    console.log('%c─────────────────────────────────────', 'color:#3b1a00;');

    const timestamp = new Date().toLocaleString('ru-RU');
    console.log('%cВремя отправки:', 'font-weight:bold;color:#1a0a00;', timestamp);

    // Вывод в виде таблицы для удобства
    console.log('%c\nВсе данные объектом:', 'color:#6b5540;font-style:italic;');
    console.table({
      'Имя':       formData.name,
      'Email':     formData.email,
      'Тема':      formData.topic,
      'Сообщение': formData.message,
      'Согласие':  formData.consent ? 'Да' : 'Нет',
      'Время':     timestamp,
    });
  });
});
