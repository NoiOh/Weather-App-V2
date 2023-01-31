// -- Local Variables --
//Date & Time
function formatDate(date) {
  //let date = new Date(date);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

// Daily Days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-prediction");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
           <div class="weather-forecast-date">${formatDay(forecastDay.time)}
           </div>
           <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
             forecastDay.condition.icon
           }.png"
           id="image-forecast"
            alt=""
            width="40"
            />
            <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}°
            </span>
            <span class="weather-forecast-temp-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}°
            </span>
            </div>
        </div> 
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Daily Forecast
function getDailyForecast(coordinates) {
  //console.log(coordinates);
  let key = "ba9b6442401a4fb7923cdf0adatc4bob";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=imperial`;
  console.log(url);
  axios.get(url).then(displayForecast);
}

// Display Weather
function showWeather(response) {
  //console.log(response);
  let city = response.data.city;
  let country = response.data.country;
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.temperature.current;

  document.querySelector("#city-name").innerHTML = `${city}, ${country}`;
  document.querySelector("#forecast-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#forecast-temp").innerHTML = `${Math.round(
    fahrenheitTemp
  )}`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.temperature.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mp/h`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getDailyForecast(response.data.coordinates);
}

// Default City
function search(city) {
  let key = "ba9b6442401a4fb7923cdf0adatc4bob";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=imperial`;
  axios.get(url).then(showWeather);
}

//Search City
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "ba9b6442401a4fb7923cdf0adatc4bob";
  let units = "imperial";
  let url = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${key}&units=${units}`;
  axios.get(url).then(showWeather);
}

//Current Location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Convert Temperature
function convertToCelsuis(event) {
  event.preventDefault();
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#forecast-temp");
  let celsiusTemp = (fahrenheitTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#forecast-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//-- Global Variable --
//date & time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//temperature
let fahrenheitTemp = null;

let celsuisLink = document.querySelector("#celsuis");
celsuisLink.addEventListener("click", convertToCelsuis);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//search
let searchResult = document.querySelector("#search-form");
searchResult.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
