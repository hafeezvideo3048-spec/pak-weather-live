async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const apiKey = "9bfb1b3ceca8abc8d244f976a01cc732"; // آپ کی API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = "Loading weather data...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌥 Condition: ${data.weather[0].description}</p>
      `;
    } else {
      resultDiv.innerHTML = "City not found. Try again.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching weather data.";
  }
}
