let lat = 0, long = 0;

let humidity = document.querySelector('.humidity');
let sunrise = document.querySelector('.sunrise');
let gust = document.querySelector('.gust');
let pressure = document.querySelector('.pressure');
let sunset = document.querySelector('.sunset');
let speed = document.querySelector('.speed');

const success = (position) => {

  lat = position.coords.latitude;
  long = position.coords.longitude;
}

const error = () => {

  alert("Refresh the page to know the temperature in your location.");
}

navigator.geolocation.getCurrentPosition(success, error)

const setTemperature = () => {

  let url = `https://api.geoapify.com/v1/ipinfo?apiKey=2d3b0ac5cdf049c1b4dcdf6678bb9ea6`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let city = data.city.name;
      let country = data.country.name;
      let address;

      address = city + `, ` + country;

      let place = document.querySelector('.place');

      place.textContent = address
    })
  
  let APIkey = 'bb76605230b7d33d37d5aedb298a98be'
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      let temp = (data.main.temp - 273.15).toFixed(1);
      let feels_like = (data.main.feels_like - 273.15).toFixed(1);

      let temperature = document.querySelector('.temp');
      let feelsLike = document.querySelector('.feels_like');
      let situation = document.querySelector('.situation');
      let temp_icon = document.querySelector('.temp_icon');
      let temp_text = document.querySelector('.temp_text')

      temperature.innerHTML = temp.toString() + `&deg;c`;
      feelsLike.innerHTML = feels_like.toString() + `&deg;c`;
      situation.textContent = data.weather[0].main;

      const iconUrl = `http://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
      temp_icon.innerHTML = `<img src="${iconUrl}" alt=""></img>`;

      let wind_speed = ((data.wind.speed * 1000) / 3600).toFixed(2);

      let forecast = data.weather[0].description;

      const text = `The weather in your area is currently ${data.weather[0].main.toLowerCase()}. The temperature is ${temp} degrees Celsius, with ${data.main.humidity}% humidity. The wind is ${wind_speed}km/h coming from the ${data.wind.deg} degree. Expect ${forecast.toLowerCase()} for the next few hours. Stay prepared and enjoy your day!`;

      temp_text.textContent = text;

      var sunriseTimestamp = data.sys.sunrise * 1000;
      var sunsetTimestamp = data.sys.sunset * 1000;

      var sunriseTime = new Date(sunriseTimestamp);
      var sunsetTime = new Date(sunsetTimestamp);

      var sunriseHours = sunriseTime.getHours();
      var sunriseMinutes = sunriseTime.getMinutes();
      var sunsetHours = sunsetTime.getHours() - 12;
      var sunsetMinutes = sunsetTime.getMinutes();

      sunriseHours = ("0" + sunriseHours).slice(-2);
      sunriseMinutes = ("0" + sunriseMinutes).slice(-2);

      sunsetHours = ("0" + sunsetHours).slice(-2);
      sunsetMinutes = ("0" + sunsetMinutes).slice(-2);

      sunrise.textContent = `${sunriseHours}:${sunriseMinutes}AM`;
      sunset.textContent = `${sunsetHours}:${sunsetMinutes}PM`;

      gust.textContent = `${data.wind.gust}m/s`;
      humidity.textContent = `${data.main.humidity}%`;
      pressure.textContent = `${data.main.pressure}hPa`;
      speed.textContent = `${wind_speed}km/h`;
    })

    url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${long}&appid=${APIkey}`

    fetch(url)
      .then(res => res.json())
        .then(data => {
          let dataDiv = document.querySelector('.dataDiv')
          console.log(data)
          dataDiv.innerHTML = `
          <div class="vertical">
          <div class="horizontal">
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>CO: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.co} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-smog"></i></h1>
            <br>
            <h4>NO: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.no} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>NO<sub>2</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.no2} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-leaf"></i></h1>
            <br>
            <h4>O<sub>3</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.o3} µg/m³</h4>
          </div>
          </div>
          <div class="horizontal">
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>SO<sub>2</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.so2} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>PM<sub>2.5</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.pm2_5} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>PM<sub>10</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.pm10} µg/m³</h4>
          </div>
          <div class="box2">
            <h1><i class="fas fa-solid fa-biohazard"></i></h1>
            <br>
            <h4>NH<sub>3</sub>: </h4>
            <br>
            <h4 class="sunset">${data.list[0].components.nh3} µg/m³</h4>
          </div>
          </div>
          </div>
      `;
      })

}

const setDate = () => {

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var rtClock = new Date();

  var day = rtClock.getDate();
  var dday = rtClock.getDay();
  var month = rtClock.getMonth();
  var hours = rtClock.getHours();
  var minutes = rtClock.getMinutes();
  var seconds = rtClock.getSeconds();

  var amPm = (hours < 12) ? "AM" : "PM";
  hours = (hours > 12) ? hours - 12 : hours;

  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  document.querySelector(".time").textContent =
    hours + ":" + minutes + ":" + seconds + " " + amPm;

  var Day = (day < 10) ? "0" + day : day;

  document.querySelector(".day").textContent = `${months[month]} ${Day}, ${weekday[dday]}`;
}

setInterval(setDate, 500);

setInterval(setTemperature, 500);

setTemperature();