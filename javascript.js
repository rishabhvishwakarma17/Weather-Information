let apiKey = "ed8c37818a944c29adf40311232510";
  let inputEle = document.getElementById("cityInput");
  let searchBtnEle = document.getElementById("searchBtn");
  let mainWeather = document.querySelector(".main-weather");
  let details = document.querySelector(".details");

  getLocation();

  function getCity() {
    let city = inputEle.value.trim();
    inputEle.value = "";
    if (city.length == 0) {
      alert("City cannot be empty");
    }
    getData(city);
  }

  inputEle.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key == "Enter") {
      getCity();
    }
  })

  searchBtnEle.addEventListener("click", getCity);

  // .json() vs JSON.parse()

  async function getData(location) {
    let api = getApi(location);
    let apiData = await fetch(api);
    let data = await apiData.json();
    console.log(data);
    updateUI(data);
  }
  function updateUI(data) {
    let { location, current } = data;
    let { name: city, country, localtime: timeAndDate } = location;
    let { temp_c, wind_kph, humidity, feelslike_c, uv, condition } = current;
    let { text: weatherStatus, icon: image } = condition;

    mainWeather.innerHTML = `<div class="weather-info">
          <div class="location">📍 ${city}, ${country}</div>

          <div class="date">${timeAndDate}</div>

          <div class="temperature">${temp_c}°</div>

          <div class="condition">${weatherStatus}</div>
        </div>

        <img
          class="weather-icon"
          src="${image}"
          alt=""
        />`;

    details.innerHTML = `<div class="detail-card">
          <div class="detail-icon">💧</div>
          <div class="detail-title">Humidity</div>
          <div class="detail-value">${humidity}%</div>
        </div>

        <div class="detail-card">
          <div class="detail-icon">💨</div>
          <div class="detail-title">Wind</div>
          <div class="detail-value">${wind_kph} km/h</div>
        </div>

        <div class="detail-card">
          <div class="detail-icon">🌡️</div>
          <div class="detail-title">Feels Like</div>
          <div class="detail-value">${feelslike_c}°</div>
        </div>

        <div class="detail-card">
          <div class="detail-icon">☀️</div>
          <div class="detail-title">UV Index</div>
          <div class="detail-value">${uv}</div>
        </div>`;
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  function success(position) {
    let location = `${position.coords.latitude},${position.coords.longitude}`;
    getData(location);
  }

  function error() {
    alert("Sorry, no position available.");
  }

  function getApi(location) {
    return `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  }