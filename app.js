function main() {
  const input = document.getElementById("input");
  const searchButton = document.getElementById("searchBtn");
  const location = document.getElementById("location");
  const description = document.getElementById("description");
  const temp = document.getElementById("temp");
  const weatherContent = document.querySelector(".weather-content");
  const weatherIcon = document.getElementById("icon");
  const validationBox = document.querySelector(".validation-box");

  weatherContent.classList.add("disabled");

  function checkWeather(cityName) {
    const key = "15f6ffbcf6ef60489defe132d34e731b";
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        key
    )
      .then(function(resp) {
        return resp.json();
      }) // convert to json
      .then(function(data) {
        displayWeather(data);
      })
      .catch(function() {
        // errors
        input.classList.add("validation-border");
        validationBox.classList.add("enabled");
        weatherContent.classList.add("disabled");
      });
  }

  function displayWeather(data) {
    const celcius = Math.round(parseFloat(data.main.temp) - 273.15);
    const fahrenheit = Math.round(
      (parseFloat(data.main.temp) - 273.15) * 1.8 + 32
    );
    let isCelcius = true;

    location.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    temp.innerHTML = `${celcius}&deg;C`;
    input.classList.remove("validation-border");
    validationBox.classList.remove("enabled");
    weatherContent.classList.remove("disabled");
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    );

    function changeScale() {
      isCelcius
        ? (temp.innerHTML = `${fahrenheit}&deg;F`)
        : (temp.innerHTML = `${celcius}&deg;C`);
      isCelcius = !isCelcius;
    }

    temp.addEventListener("click", changeScale);
  }

  searchButton.addEventListener("click", function() {
    if (input.value) {
      checkWeather((cityName = input.value));
      input.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", main);
