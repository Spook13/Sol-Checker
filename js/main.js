let weatherUnitType = "imperial";
let lat = 6.1627;
let lng = -86.7816;

// window.onload = changeCity();
function changeCity(){
    console.log("Hello");
    var apikey = "792616ef42153884bc38ec23e95dbbae";

    $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&appid=792616ef42153884bc38ec23e95dbbae&units="+weatherUnitType, function(data){

        console.log(data);

        // calling the weather icon from JSON
        var icon = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
        
        // calling the temprature from JSON
        // "Math.floor" rounds number to whole number
        var temp = Math.floor(data.current.temp);
        currentTemp = temp + "°";

        var weather = data.current.weather[0].description;

        // Current Weather Info Calls
        // calling the icon class in the HTML to display the weather icon
        $('.icon').attr('src', icon);

        // calling the weather class in the HTML to display the weather type
        $('.current-weather').empty();
        $('.current-weather').append(weather);

        // calling the temp class in the HTML to display the temprature
        $('.current-temp').empty();
        $('.current-temp').append(temp + "°");


      // Hourly Weather Info Calls     
        const hourlyList = document.querySelector("#hourly-weather div");
        // Deletes all existing objects inside list
        hourlyList.innerHTML = "";
        for(let i = 0; i < data.hourly.length; i++){
          // Getting info for hourly data from the API
          var hourlyData = data.hourly[i];
           // Getting info for the temprature from the API
          var temp = Math.floor(hourlyData.temp);
          temp = temp; 
          // Getting info for the weather icon from the API
          var icon = "https://openweathermap.org/img/wn/" + hourlyData.weather[0].icon + "@2x.png";
          // Getting info for the weather description from the API
          var weather = hourlyData.weather[0].description;

          // Puts the hourly template in the template-hourly div
          var template = document.querySelector("#template-hourly").cloneNode(true);

          // Displays the time from API
          template.querySelector(".hourly-time").innerText = hourCoverter(hourlyData.dt);
          // Displays the weather icon from API
          template.querySelector("img").src = icon;
           // Displays the weather desription from API
          template.querySelector(".hourly-weather").innerText = weather;
          // Displays the temprature from API
          template.querySelector(".hourly-temp").innerText = temp + "°";
          // Makes the template display as an inline-block
          template.style.display = "inline-block";
          hourlyList.append(template);
        };
        
        // Weekly Weather Info Calls
        const weeklyList = document.querySelector("#weekly-weather div");
        // Deletes all existing objects inside list
        weeklyList.innerHTML = "";
        for(let i = 0; i < data.daily.length; i++){

          // Getting info for daily data from the API
          var weeklyData = data.daily[i];
          // Getting info for the temprature from the API
          var temp = Math.floor(weeklyData.temp.min) + "/" + Math.floor(weeklyData.temp.max);
          temp = temp; 
          // Getting info for the weather icon from the API
          var icon = "https://openweathermap.org/img/wn/" + weeklyData.weather[0].icon + "@2x.png";
          // Getting info for the weather description from the API
          var weather = weeklyData.weather[0].description;

          // Puts the weekly template in the template-weekly div
          var template = document.querySelector("#template-weekly").cloneNode(true);

          // Displays the time from API
          template.querySelector(".weekly-hour").innerText =  dayCoverter(weeklyData.dt);
          // Displays the weather icon from API
          template.querySelector("img").src = icon;
          // Displays the weather desription from API
          template.querySelector(".weekly-weather").innerText = weather;
          // Displays the temprature from API
          template.querySelector(".weekly-temp").innerText = temp + "°";
          // Makes the template display as an inline-block
          template.style.display = "inline-block";
          weeklyList.append(template);
        };
    });
}

// Google map function
function initMap() {
    // the default map location = Nashville, TN
    const myLatlng = { lat: 36.1627, lng: -86.7816 };
    // Default map zoom
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: myLatlng,
    });

  
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {    
       let coords = mapsMouseEvent.latLng.toJSON();
    
        console.log(coords);
        lat = coords.lat;
        lng = coords.lng;
        changeCity();

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
      // Updates to F when f-btn is clicked
      changeCity();
    });

     // Adds click even listener to c-btn
    document.querySelector("#c-btn"). addEventListener("click", function (){
      console.log("C is better than F");
      weatherUnitType = "metric";
      // Displays c-btn as active
      document.querySelector("#c-btn").classList.add("active");
      // Displays f-btn as inactive
      document.querySelector("#f-btn").classList.remove("active");
      // Updates to C when c-btn is clicked
      changeCity();
    });
  }

function hourCoverter(timeStamp) {
  var a = new Date(timeStamp * 1000);
  var hour = a.getHours();

  switch(hour) {
    case 0:
      return "12 AM";
    case 1:
      return "1 AM";
    case 2:
      return "2 AM";
    case 3:
      return "3 AM";
    case 4:
      return "4 AM";
    case 5:
      return "5 AM";
    case 6:
      return "6 AM";
    case 7:
      return "7 AM";
    case 8:
      return "8 AM";
    case 9:
      return "9 AM";
    case 10:
      return "10 AM";
    case 11:
      return "11 PM";
    case 12:
      return "12 PM";
    case 13:
      return "1 PM";
    case 14:
      return "2 PM";
    case 15:
      return "3 PM";
    case 16: 
      return "4 PM";
    case 17:
      return "5 PM";
    case 18:
      return "6 PM";
    case 19: 
      return "7 PM";
    case 20:
      return "8 PM";
    case 21:
      return "9 PM";
    case 22:
      return "10 PM";
    case 23:
      return "11 PM";
  }
};

function dayCoverter(timeStamp) {
  var a = new Date(timeStamp * 1000);
  var day = a.getDay();

  switch(day) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  };
  
};


