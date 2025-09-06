const STORAGE_KEY = 'feedback-form-state';

// об’єкт з початковими значеннями
let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// при завантаженні сторінки відновлюємо дані
loadFormData();

// слухаємо всі input-и у формі
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

function onInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim(); // оновлюємо значення у formData
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // зберігаємо у storage
}

function onSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData); // виводимо актуальні дані

  // очищаємо все після сабміту
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    // підставляємо у форму
    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }
    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
  }
}
