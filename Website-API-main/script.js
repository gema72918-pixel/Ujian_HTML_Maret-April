const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');

const apiKey = '5ff70ff0599ed610df34d21fce0143b2';


function displayWeather(data) {
    const { name, weather, main } = data;
    const temp = (main.temp - 273.15).toFixed(1); 

    const weatherHTML = `
        <h2>Cuaca di ${name}</h2>
        <p>${weather[0].description}</p>
        <p>Suhu: ${temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Tekanan: ${main.pressure} hPa</p>
    `;
    
    weatherInfo.innerHTML = weatherHTML; 
}


async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ff70ff0599ed610df34d21fce0143b2`;

    try {
        const response = await fetch(url); 
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data); 
        } else {
            weatherInfo.innerHTML = '<p>Kota tidak ditemukan!</p>'; 
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p>Terjadi kesalahan saat mengambil data cuaca.</p>';
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const city = cityInput.value.trim();
    
    if (city) {
        getWeather(city);  
    } else {
        weatherInfo.innerHTML = '<p>Harap masukkan nama kota.</p>';
    }
});
