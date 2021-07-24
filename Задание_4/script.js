const btn = document.querySelector('.j-btn-test');
const btnTest = document.querySelector('.btn_icon');
const coord = document.querySelector('.coords');
const link = document.querySelector('.link');
const screen = document.querySelector('.screen');
let latitude = 0;
let longitude = 0;
let flag = '';
const icon1 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
</svg>`;
const icon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
</svg>`;
// Функция, выводящая текст об ошибке
const error = () => {
  coord.textContent = 'Невозможно получить ваше местоположение';
}


// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}
if (!navigator.geolocation) {
  coord.textContent = 'Geolocation не поддерживается вашим браузером';
} else {
  navigator.geolocation.getCurrentPosition(success, error);
}

btn.addEventListener('click', () => {
  btn.classList.toggle('btn--magic');
  if (flag === 'icon1') {
    btnTest.innerHTML = icon2;
    flag = 'icon2';
  } else {
    btnTest.innerHTML = icon1;
    flag = 'icon1';
  }
  //Запрос к API
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
    .then((response) => {
      const result = response.json();
      return result;
    })
    // Объект результата в формате JSON
    .then((data) => {
      coord.textContent = `Временная зона в которой находтся пользователь: ${data.timezone} 
                      местные дата и время: ${data.date_time_txt}`;
    })
    .catch(() => {
      console.log('error');
    });
})