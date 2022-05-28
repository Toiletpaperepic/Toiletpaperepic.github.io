let weather = {
  apiKey: "a533a1c00e65ae131c089f1b350443e3",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

let geocode = {
  reverseGeocode: function (latitude, longitude) {;
    var api_key = 'd8603e850a6940b5b9115d877196fcbd';

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
      weather.fetchWeather(data.results[0].components.state);// print the location
    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request
  },
  getlocation: function() {
    function Success (data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Success, console.error);
    }
    else {
      weather.fetchWeather("Denver");
    }
  }
}

  geocode.getlocation();