// script.js - OpenWeatherMap live fetch
const API_KEY = "9bfb1b3ceca8abc8d244f976a01cc732";
const checkBtn = document.getElementById('checkBtn');
const cityInput = document.getElementById('cityInput');
const resultSection = document.getElementById('result');
const cityNameEl = document.getElementById('cityName');
const descEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const feelsEl = document.getElementById('feels');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const updatedEl = document.getElementById('updated');
const weatherImage = document.getElementById('weatherImage');

function showError(message){
  cityNameEl.textContent = "Error";
  descEl.textContent = message;
  tempEl.textContent = "--";
  feelsEl.textContent = "--";
  humidityEl.textContent = "--";
  windEl.textContent = "--";
  updatedEl.textContent = "--";
  resultSection.classList.remove('hidden');
}

async function fetchWeather(city){
  if(!city) return showError("Please enter a city name / پلیز شہر کا نام لکھیں");
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&appid=" + API_KEY + "&units=metric";
  try{
    const res = await fetch(url);
    if(!res.ok){
      if(res.status === 404) return showError("City not found / شہر نہیں ملا");
      return showError("Unable to fetch weather. Try again later.");
    }
    const data = await res.json();
    updateUI(data);
  }catch(err){
    console.error(err);
    showError("Network error. Check your connection.");
  }
}

function updateUI(data){
  const name = data.name + ", " + data.sys.country;
  const desc = data.weather && data.weather[0] ? data.weather[0].description : "N/A";
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  cityNameEl.textContent = name;
  descEl.textContent = desc;
  tempEl.textContent = temp;
  feelsEl.textContent = feels;
  humidityEl.textContent = humidity;
  windEl.textContent = wind;
  updatedEl.textContent = "Last update: " + new Date().toLocaleString();

  // illustrative image based on condition
  weatherImage.src = 'images/weather-bg.svg';
  weatherImage.alt = desc;

  resultSection.classList.remove('hidden');
}

checkBtn.addEventListener('click', function(){ fetchWeather(cityInput.value.trim()); });
cityInput.addEventListener('keydown', function(e){ if(e.key === 'Enter') fetchWeather(cityInput.value.trim()); });
window.addEventListener('load', function(){ fetchWeather('Karachi'); });
