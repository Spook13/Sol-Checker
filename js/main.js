let weatherUnitType = "imperial";
let weatherUnitType = "metric";

// window.onload = changeCity();
function changeCity(lat, lng){
    console.log("Hello");
    var apikey = "792616ef42153884bc38ec23e95dbbae";

    $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&appid=792616ef42153884bc38ec23e95dbbae&units="+weatherUnitType, function(data){

        console.log(data);

        // calling the weather icon from JSON
        var icon = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
        
        // calling the temprature from JSON
        // "Math.floor" rounds number to whole number
        var temp = Math.floor(data.current.temp);
        temp = temp + "&#176;"

        var weather = data.current.weather[0].description;

        // callinig the name class in the HTML to display the city name
        $('.name').empty();
        $('.name').append(name);

        // calling the icon class in the HTML to display the weather icon
        $('.icon').attr('src', icon);

        // calling the weather class in the HTML to display the weather type
        $('.weather').empty();
        $('.weather').append(weather);

        // calling the temp class in the HTML to display the temprature
        $('.temp').empty();
        $('.temp').append(temp);

    });
}

function initMap() {
    const myLatlng = { lat: 36.1627, lng: -86.7816 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: myLatlng,
    });

  
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {    
       let coords = mapsMouseEvent.latLng.toJSON();
    
        console.log(coords);
        var lat = coords.lat;
        var lng = coords.lng;
        changeCity(lat, lng);

        // Weatther info appears
        // Current weather by defaultt
        document.querySelector("#weather-info").style.display = "block";

    });

  // Adds click event listener to current-btn
    document.querySelector("#current-btn").addEventListener("click", function (){
      // Displays current weather info 
      document.querySelector("#current-weather").style.display = "block";
      // Removes hourly andd weekly weather info
      document.querySelector("#hourly-weather").style.display ="none";
      document.querySelector("#weekly-weather").style.display ="none";
      // Displays current-btn as active button
      document.querySelector("#current-btn").classList.add("active");
      // Displays hourly-btn and weekly-btn as inactive
      document.querySelector("#hourly-btn").classList.remove("active");
      document.querySelector("#weekly-btn").classList.remove("active");
     });

    // Adds click even listener to hourly-btn
     document.querySelector("#hourly-btn").addEventListener("click", function (){
      console.log("clicked");
      // Displays hourly weather info
      document.querySelector("#hourly-weather").style.display = "block";
      // Removes current and weekly weather info
      document.querySelector("#current-weather").style.display ="none";
      document.querySelector("#weekly-weather").style.display ="none";
      // Displays hourly-btn as active button
      document.querySelector("#hourly-btn").classList.add("active");
      // Displays current-btn and weekly-btn as inactive
      document.querySelector("#current-btn").classList.remove("active");
      document.querySelector("#weekly-btn").classList.remove("active");
    });

    // Adds click even listener to weekly-btn
    document.querySelector("#weekly-btn").addEventListener("click", function (){
      console.log("clicked");
      // Displays weekly weather info
      document.querySelector("#weekly-weather").style.display = "block";
      // Removes current and hourly weather info
      document.querySelector("#current-weather").style.display ="none";
      document.querySelector("#hourly-weather").style.display ="none";
      // Displays weekly-btn as active button
      document.querySelector("#weekly-btn").classList.add("active");
      // Displays current-btn and hourly-btn as inactive
      document.querySelector("#current-btn").classList.remove("active");
      document.querySelector("#hourly-btn").classList.remove("active");
    });

    // Adds click even listener to f-btn
    document.querySelector("#f-btn"). addEventListener("click", function (){
      console.log("F is better than C");
      weatherUnitType = "imperial";
      // Displays f-btn as active
      document.querySelector("#f-btn").classList.add("active");
      // Displays c-btn and as inactive
      document.querySelector("#c-btn").classList.remove("active");
    });

     // Adds click even listener to c-btn
    document.querySelector("#c-btn"). addEventListener("click", function (){
      console.log("C is better than F");
      weatherUnitType = "metric";
      // Displays c-btn as active
      document.querySelector("#c-btn").classList.add("active");
      // Displays f-btn as inactive
      document.querySelector("#f-btn").classList.remove("active");
    });


  }


