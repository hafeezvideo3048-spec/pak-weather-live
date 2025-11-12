const API_KEY = "9bfb1b3ceca8abc8d244f976a01cc732";
const forecastContainer = document.getElementById('forecast-container');

const cities = ["Karachi","Lahore","Islamabad"];

async function fetchWeather(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayForecast(city,data);
    }catch(error){
        console.error("Error fetching weather:",error);
    }
}

function displayForecast(city,data){
    const cityDiv = document.createElement('div');
    cityDiv.classList.add('city-forecast');
    cityDiv.innerHTML = `<h3>${city}</h3>`;
    data.list.forEach(day=>{
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p>Date: ${new Date(day.dt*1000).toLocaleDateString()}</p>
            <p>Temp: ${day.temp.day}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
        `;
        cityDiv.appendChild(card);
    });
    forecastContainer.appendChild(cityDiv);
}

cities.forEach(city=>fetchWeather(city));
const API_KEY = "9bfb1b3ceca8abc8d244f976a01cc732";
const forecastContainer = document.getElementById('forecast-container');

const cities = ["Karachi","Lahore","Islamabad"];

async function fetchWeather(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayForecast(city,data);
    }catch(error){
        console.error("Error fetching weather:",error);
    }
}

function displayForecast(city,data){
    const cityDiv = document.createElement('div');
    cityDiv.classList.add('city-forecast');
    cityDiv.innerHTML = `<h3>${city}</h3>`;
    data.list.forEach(day=>{
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p>Date: ${new Date(day.dt*1000).toLocaleDateString()}</p>
            <p>Temp: ${day.temp.day}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
        `;
        cityDiv.appendChild(card);
    });
    forecastContainer.appendChild(cityDiv);
}

cities.forEach(city=>fetchWeather(city));
