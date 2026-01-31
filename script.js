
//const apiKey = ""; 

function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const error = document.getElementById("error");
  const city = cityInput.value.trim();

  if (city === "") {
    error.innerText = "Please enter a city name.";
    return;
  }

  error.innerText = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API DATA:", data); // DEBUG
      showWeather(data);
      saveRecent(city);
    })
    .catch((err) => {
      if (err.message === "401") {
        error.innerText = "Invalid API key. Please check your API key.";
      } else if (err.message === "404") {
        error.innerText = "City not found. Check spelling.";
      } else {
        error.innerText = "Something went wrong. Try again later.";
      }
    });
}


// DISPLAY WEATHER

function showWeather(data) {
  const weatherBox = document.getElementById("weatherBox");

  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temp").innerText =
    `Temperature: ${data.main.temp}°C`;

  document.getElementById("condition").innerText =
    `Condition: ${data.weather[0].main}`;

  document.getElementById("feelsLike").innerText =
    getFeelsLikeText(data.main.temp, data.main.humidity);

  weatherBox.style.display = "block";

  changeBackground(data.weather[0].main);
}


// HUMAN FEEL LOGIC

function getFeelsLikeText(temp, humidity) {
  if (temp >= 35 && humidity >= 60) {
    return "Feels very hot due to high humidity 🥵";
  }
  if (temp <= 15) {
    return "Feels cold, wear warm clothes ❄️";
  }
  if (humidity > 70) {
    return "Feels humid and uncomfortable 😓";
  }
  return "Weather feels pleasant 🙂";
}


function changeBackground(condition) {
  switch (condition) {
    case "Rain":
      document.body.style.background =
        "linear-gradient(to right, #4b79a1, #283e51)";
      break;

    case "Clear":
      document.body.style.background =
        "linear-gradient(to right, #fceabb, #f8b500)";
      break;

    case "Clouds":
      document.body.style.background =
        "linear-gradient(to right, #bdc3c7, #2c3e50)";
      break;

    case "Snow":
      document.body.style.background =
        "linear-gradient(to right, #e6dada, #274046)";
      break;

    default:
      document.body.style.background =
        "linear-gradient(to right, #74ebd5, #acb6e5)";
  }
}


// RECENT SEARCH (localStorage)

function saveRecent(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (!cities.includes(city)) {
    cities.unshift(city);
    if (cities.length > 5) cities.pop();
  }

  localStorage.setItem("cities", JSON.stringify(cities));
  showRecent();
}

function showRecent() {
  const list = document.getElementById("recentList");
  list.innerHTML = "";

  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  cities.forEach((city) => {
    const li = document.createElement("li");
    li.innerText = city;
    list.appendChild(li);
  });
}


// LOAD RECENT ON PAGE LOAD

showRecent();
