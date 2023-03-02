let date = document.querySelector("#weather-date");
let day = document.querySelector(".day-block");
let description = document.querySelector("#weather-description");
let icon = document.querySelector(".weather-icon-today");
let place = document.querySelector("#weather-location");
let precipitation = document.querySelector("#precipitation-percentage");
let humidity = document.querySelector("#humidity-percentage");
let temperature = document.querySelector(".weather-temp-today");
let wind = document.querySelector("#wind-speed");
let refreshButton = document.querySelector("#weather-refresh");
let form = document.querySelector("#weather-form");
formLocation = form.querySelector("weather-form-location");

let root = "http://api.openweathermap.org";
let apiKey = "9f9579090daa27d42e77fa3c3fec2fd7";

function niceDay(dayNumber) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayNumber];
}

function niceMinutes(minutesNumber) {
    if (minutesNumber < 10){
        return "0" + minutesNumber;
    } else {
        return minutesNumber;
    }
}

function niceDate(date) {
    let day = niceDate(date.getDate());
    let hours = date.getHours();
    let minutes = niceMinutes(date.getMinutes());

    return day + " " + hours + ":" + minutes;
}

function refreshWeather(queryParameters) {
    let apiParameters = "appid=" + apiKey + "&units=metric";
    axios
        .get(root + "/data/2.5/weather?" + apiParameters + "&" + queryParameters)
        .then(function(response) {
            date.innerHTML = niceDate(new Date());
            place.innerHTML = response.data.name;
            description.innerHTML = response.data.weather[0].main;
            temperature.innerHTML = Math.round(response.data.main.temp);
            precipitation.innerHTML =Math.round(response.data.main.precipitation) + "%";
            wind.innerHTML = Math.round(response.data.wind.speed) + "km/h";
            humidity.innerHTML = Math.round(response.data.main.humidity) + "%";

            icon.setAttribute(
                "src",
                "http://openweathermap.org/img/w/" +
                    response.data.weather[0].icon +
                    ".png"
                );
            });

    };

axios
    .get(root + "/data/2.5/forecast?" + apiParameters + "&" + queryParameters)
    .then(function(response) {
        document
            .querySelectorAll(".day-block")
            .forEach(function(element, index) {
                let day = new Date(response.data.list[index].dt.txt);
                element.querySelector(".day-block-date").innerHTML = niceDate(day);
                element.querySelector(".day-block-temp").innerHTML = Math.round(response.data.list[index].main.temp);
                element.querySelector(".day-block-image")
                .setAttribute(
                    "src",
                    "http://openweathermap.org/img/w" +
                    ".png"
                );
            });
        });

form.addEventListener("submit", function(event) {
    refreshWeather("q=" + form.querySelector("#weather-form-location").value);
    event.preventDefault()
});

refreshButton.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        refreshWeather(
            "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
        );
    });
});

refreshWeather("q=Toronto");
