function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
 

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[day];
} 

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML =`<div class=row>`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
    forecastHTML =
        forecastHTML +
`
<div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40">
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperatures-max"> ${Math.round(forecastDay.temp.max)}&#176</span>
    <span class="weather-forecast-temperatures-min"> ${Math.round(forecastDay.temp.min)}&#176</span>
  </div>
</div>
`;
        }
    });

forecastHTML =forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;

}

function getForecast(coordinates) {
    let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#weather-description");
        let humidityElement = document.querySelector("#humidity-percentage");
        let windElement = document.querySelector("#wind-speed");
        let dateElement = document.querySelector("#date");
        let iconElement = document.querySelector("#icon");

        celsiusTemperature = response.data.main.temp;

        temperatureElement.innerHTML = Math.round(celsiusTemperature);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed);
        dateElement.innerHTML = formatDate(response.data.dt*1000);
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);

        getForecast(response.data.coord);
}

function search(city) {
let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleSubmit);


search("New York");