// current city, temperature etc.
function showConditions(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let description = response.data.weather[0].main;
  cityName.innerHTML = city;
  temperature.innerHTML = temp;
  windSpeed.innerHTML = wind;
  weatherDescription.innerHTML = description;
  weatherHumidity.innerHTML = humidity;
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function geolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchCity(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function pressSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  searchCity(city);
}

let buttonCurrentTemp = document.querySelector("#currentLocationButton");
buttonCurrentTemp.addEventListener("click", geolocation);

let form = document.querySelector(".search-form");
form.addEventListener("submit", pressSearch);

// show day and time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateToday = `${day} ${hour}:${minutes}`;
let date = document.querySelector("#day-time");
date.innerHTML = dateToday;

//default search
searchCity("Turin");
