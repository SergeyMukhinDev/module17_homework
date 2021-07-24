const wsUri = "wss://echo.websocket.org/";
const field = document.querySelector('.field');
const btnSend = document.querySelector('.sendBtn');
const input = document.querySelector('.input');
const geoBtn = document.querySelector('.geoLoc');
let websocket;
let latitude = 0;
let longitude = 0;
let whoSend = '';

function writeToScreen(message) {
    console.log('in function', whoSend);
    let pre = document.createElement("p");
    if (whoSend === 'client') {
        pre.className = "client";
    } else {pre.className = "server";
}
    pre.innerHTML = message;
    field.appendChild(pre);
  }
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  }
  const error = () => {
    coord.textContent = 'Невозможно получить ваше местоположение';
  }
    


    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      writeToScreen("CONNECTED");
    };
    websocket.onclose = function(evt) {
      writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
        whoSend = 'server';
        console.log('onmessage', whoSend);
        writeToScreen("Server: " + evt.data);
     
    };
    websocket.onerror = function(evt) {
      writeToScreen(
        '<span style="color: red;">ERROR:</span> ' + evt.data
      );
    };
  
  btnSend.addEventListener('click', () => {
    const message = input.value;
    whoSend = 'client';
    writeToScreen("Client: " + message);
    websocket.send(message);
    input.value = '';
    console.log('klick', whoSend);
  });
geoBtn.addEventListener('click', () => {
  // Функция, срабатывающая при успешном получении геолокации
  let a = document.createElement("a");
  if (!navigator.geolocation) {
    a.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
    a.className = "linkMap";
    a.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    a.textContent = 'Ссылка на карту';
    field.appendChild(a);
  }

});