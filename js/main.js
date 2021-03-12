// window.onload = changeCity();
function changeCity(lat, lng){
    console.log("Hello");
    var apikey = "792616ef42153884bc38ec23e95dbbae";


    $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&appid=792616ef42153884bc38ec23e95dbbae&units=imperial", function(data){

        console.log(data);

        // calling the city name from JSON
        var name = lat.toFixed(4); + ""+ lng.toFixed(4);

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

        document.querySelector("#weather-info").style.display = "block";

       document.querySelector("#current-btn").addEventListener("click", function (){
         
        document.querySelector("#current-weather").style.display = "block";
        
        document.querySelector("#hourly-weather").style.display ="none";
        document.querySelector("#weekly-weather").style.display ="none";

       });

       document.querySelector("#hourly-btn").addEventListener("click", function (){
        console.log("clicked");

        document.querySelector("#hourly-weather").style.display = "block";
        
        document.querySelector("#current-weather").style.display ="none";
        document.querySelector("#weekly-weather").style.display ="none";

        
      });

      document.querySelector("#weekly-btn").addEventListener("click", function (){
        console.log("clicked");

        document.querySelector("#weekly-weather").style.display = "block";
        
        document.querySelector("#current-weather").style.display ="none";
        document.querySelector("#hourly-weather").style.display ="none";

        
      });

    });
  }

  function toggleWeather () {
    const weatherBtn = document.querySelector("#weather-btn");
    // document.querySelector("current-btn");
    // document.querySelector("houly-btn");
    // document.querySelector("weekly-btn");

    // document.querySelector("#current-weather");
    // docutment.querySelector("#hourly-weather");
    // document.querySelector("#weekly-weather");

    
  };

