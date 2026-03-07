// validation.js — Валидация формы обратной связи Brew & Soul

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  // Сброс ошибки при вводе в любое поле
  form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      clearError(this);
    });
    input.addEventListener('change', function () {
      clearError(this);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Сбрасываем все предыдущие ошибки
    form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(function (el) {
      clearError(el);
    });
    const existingErrors = form.querySelectorAll('.form__error-msg');
    existingErrors.forEach(function (el) { el.remove(); });

    let isValid = true;

    // 1. Проверка имени (не пустое, минимум 2 слова)
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    const nameWords = nameValue.split(' ').filter(function (w) { return w.length > 0; });

    if (nameValue === '') {
      showError(nameInput, 'Введите ваше имя');
      isValid = false;
    } else if (nameWords.length < 2) {
      showError(nameInput, 'Введите имя и фамилию (минимум 2 слова)');
      isValid = false;
    }

    // 2. Проверка email (не пустой, корректный формат)
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
      showError(emailInput, 'Введите email');
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, 'Введите корректный email (например: user@mail.ru)');
      isValid = false;
    }

    // 3. Проверка темы (не пустая)
    const topicInput = document.getElementById('topic');
    const topicValue = topicInput.value;

    if (!topicValue) {
      showError(topicInput, 'Выберите тему сообщения');
      isValid = false;
    }

    // 4. Проверка сообщения (не пустое, минимум 10 символов)
    const messageInput = document.getElementById('message');
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
      showError(messageInput, 'Введите текст сообщения');
      isValid = false;
    } else if (messageValue.length < 10) {
      showError(messageInput, 'Сообщение слишком короткое (минимум 10 символов)');
      isValid = false;
    } else if (messageValue.length > 500) {
      showError(messageInput, 'Сообщение слишком длинное (максимум 500 символов)');
      isValid = false;
    }

    // 5. Проверка согласия на обработку данных
    const consentInput = document.getElementById('consent');
    if (!consentInput.checked) {
      const consentField = consentInput.closest('.form__field');
      const errorEl = document.createElement('p');
      errorEl.classList.add('form__error-msg');
      errorEl.style.cssText = 'color:#c0392b;font-family:Lato,sans-serif;font-size:0.78rem;margin-top:0.35rem;';
      errorEl.textContent = 'Необходимо дать согласие на обработку данных';
      consentField.appendChild(errorEl);
      isValid = false;
    }

    // Если форма валидна — собираем данные и диспатчим событие
    if (isValid) {
      const formData = {
        name:      nameValue,
        email:     emailValue,
        topic:     topicInput.options[topicInput.selectedIndex].text,
        message:   messageValue,
        consent:   consentInput.checked
      };

      // Диспатчим кастомное событие для consoleLogger.js
      const validEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(validEvent);

      // Показываем успех, скрываем форму
      const submitBtn = form.querySelector('.form__submit');
      const successBlock = document.getElementById('formSuccess');

      submitBtn.textContent = 'Отправляем...';
      submitBtn.disabled = true;

      setTimeout(function () {
        form.querySelectorAll('.form__row, .form__field').forEach(function (el) {
          el.style.display = 'none';
        });
        submitBtn.style.display = 'none';
        successBlock.style.display = 'block';
      }, 600);
    }
  });

  // --- Вспомогательные функции ---

  function showError(input, message) {
    // Подсветка поля
    input.style.borderColor = '#c0392b';
    input.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.12)';

    // Текст ошибки под полем
    const fieldWrapper = input.closest('.form__field') || input.parentNode.closest('.form__field') || input.parentNode;
    const errorEl = document.createElement('p');
    errorEl.classList.add('form__error-msg');
    errorEl.style.cssText = 'color:#c0392b;font-family:Lato,sans-serif;font-size:0.78rem;margin-top:0.35rem;';
    errorEl.textContent = message;
    fieldWrapper.appendChild(errorEl);
  }

  function clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const fieldWrapper = input.closest('.form__field') || input.parentNode.closest('.form__field') || input.parentNode;
    if (fieldWrapper) {
      fieldWrapper.querySelectorAll('.form__error-msg').forEach(function (el) { el.remove(); });
    }
  }
});
