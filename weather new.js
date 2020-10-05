// Working Clock

let clock = document.querySelector(".clock");
let days = document.querySelector(".day");
let dater = document.querySelector(".date");

setInterval(time, 1000); // reloads the clock every second
function time() {
  var date = new Date(); // Date is the method used to get all the info
  var day = date.getDay();
  var datenum = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var sec = date.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  }
  let weekday = [
    // day and month are returned as a number so a list is made
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthname = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  clock.textContent = hour + ":" + min + ":" + sec;
  days.textContent = weekday[day];
  dater.textContent = datenum + " " + monthname[month] + " " + year;
}

function home() {
  // called when home button is clicked
  let long, lat;
  if (navigator.geolocation) {
    // gets users current location and sends it to the api
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let locationapi = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=da706bfb8b1fb55d413e7cc89ea75ea7`;
      fetcher(locationapi);
    });
  } else {
    alert("Please Enable locations to access Home Weather");
  }
}

function searchbar() {
  // called when search is clicked
  let cityname = document.getElementById("bar").value; // gets city name and sends it to the api
  console.log(cityname);
  apimaker(cityname);
  document.getElementById("bar").value = ""; // sets the search bar to "Find a city.. " again
}

function apimaker(nameofcity) {
  let searchapi = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${nameofcity}&appid=da706bfb8b1fb55d413e7cc89ea75ea7`;
  fetcher(searchapi);
}

function fetcher(anyApi) {
  // fetches info from the api
  fetch(anyApi)
    .then((data) => {
      // gets data from the api
      return data.json(); // converts that data into json
    })
    .then(results);
}

function results(data) {
  // converts data into text shown on the page
  let location = document.querySelector(".locationofplace"); // connects specific sections of the html to the js
  let degree = document.querySelector(".degree");
  let condition = document.querySelector(".condition");
  let wind = document.querySelector(".wind");
  let units = document.querySelector(".tempunits");
  let tempsection = document.querySelector(".temperature");

  const temp = data.main.temp;
  const city = data.name;
  const country = data.sys.country;
  const description = data.weather[0].description;
  const windspeed = data.wind.speed;
  const iconcode = data.weather[0].icon;

  // adds the src for the image url on the html code to get the icon image
  let iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
  var image = document.getElementById("wicon");
  image.src = iconurl;

  // wind speed m/s to km/h
  const speed = (windspeed * 3.6).toFixed(2);

  // data is sent to the classes in html and posted on the site
  degree.textContent = (temp - 273.15).toFixed(2);
  location.textContent = city + ", " + country;
  wind.textContent = speed + " Km/h";
  condition.textContent = description;

  // Converting units of temp into K, C, F
  tempsection.addEventListener("click", () => {
    if (units.textContent === "K") {
      units.textContent = "C";
      degree.textContent = (temp - 273.15).toFixed(2);
    } else if (units.textContent === "C") {
      units.textContent = "F";
      degree.textContent = (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
    } else {
      units.textContent = "K";
      degree.textContent = temp;
    }
  });
}
