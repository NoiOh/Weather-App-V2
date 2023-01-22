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
//function search(city) {
let key = "ba9b6442401a4fb7923cdf0adatc4bob";
let units = "imperial";
let url = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${key}&units=${units}`;
axios.get(url).then(showWeather);

let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);
//}

//Search City
//function searchCity(event) {
// event.preventDefault();
// let city = document.querySelector("#input-value").ariaValueMax;
//search(city);
//}

//let searchResult = document.querySelector("#search-form");
//searchResult.addEventListener("submit", searchCity);

//search("New York");
