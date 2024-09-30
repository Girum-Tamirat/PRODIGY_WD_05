const apiKey = 'd306061eccb3538c2e1cdfc792e67ed5';

const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const precipitation = document.getElementById('precipitation');
const errorDisplay = document.getElementById('errorDisplay');

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        updateWeatherInfo(data);
        errorDisplay.classList.add('hidden');
      } else {
        showError();
      }
    })
    .catch(() => showError());
}

function updateWeatherInfo(data) {
  cityName.innerText = data.name;
  weatherDescription.innerText = data.weather[0].description;
  temperature.innerText = `Temperature: ${data.main.temp} °C`;
  humidity.innerText = `Humidity: ${data.main.humidity}%`;
  
  windSpeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;

  let rain = data.rain ? data.rain['1h'] || 0 : 0;
  let snow = data.snow ? data.snow['1h'] || 0 : 0; 
  if (rain > 0) {
    precipitation.innerText = `Precipitation (Rain): ${rain} mm`;
  } else if (snow > 0) {
    precipitation.innerText = `Precipitation (Snow): ${snow} mm`;
  } else {
    precipitation.innerText = `Precipitation: None`;
  }

  weatherDisplay.classList.remove('hidden');
}



function showError() {
  weatherDisplay.classList.add('hidden');
  errorDisplay.classList.remove('hidden');
}

searchButton.addEventListener('click', () => {
  const city = locationInput.value.trim();
  if (city !== '') {
    getWeatherByCity(city);
  } else {
    showError();
  }
});
