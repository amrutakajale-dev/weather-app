const apiKey = "37fc99a503cc46099f434438263101";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");

  if (city === "") {
    error.innerText = "Please enter a city name.";
    return;
  }

  error.innerText = "";

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((data) => {
      document.getElementById("cityName").innerText = data.location.name;
      document.getElementById("temp").innerText =
        `Temperature: ${data.current.temp_c}°C`;
      document.getElementById("condition").innerText =
        `Condition: ${data.current.condition.text}`;

      document.getElementById("feelsLike").innerText =
        data.current.humidity > 70
          ? "Feels humid 😓"
          : "Weather feels pleasant 🙂";

      document.getElementById("weatherBox").style.display = "block";
    })
    .catch(() => {
      error.innerText = "City not found or API issue.";
    });
}
