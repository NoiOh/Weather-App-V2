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

// Display Weather
function showWeather(response) {
  console.log(response);
  let city = response.data.city;
  let country = response.data.country;
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city-name").innerHTML = `${city}, ${country}`;
  document.querySelector("#forecast-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#forecast-temp").innerHTML = `${Math.round(
    response.data.temperature.current
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
}

// Default City
function search(city) {
  let key = "ba9b6442401a4fb7923cdf0adatc4bob";
  let units = "imperial";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;
  axios.get(url).then(showWeather);
}

//Search City
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-value").value;
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
  let temperatureElement = document.querySelector("#forecast-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToFahrenheit(event) {
  let temperatureElement = document.querySelector("#forecast-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

//date & time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//search
let searchResult = document.querySelector("#search-button");
searchResult.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("Chicago");

//temperature
let celsuisLink = document.querySelector("#celsuis");
celsuisLink.addEventListener("click", convertToCelsuis);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
