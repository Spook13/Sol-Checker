window.onload = changeCity();
function changeCity(){
    console.log("Hello");
    var apikey = "792616ef42153884bc38ec23e95dbbae";
    var city = document.getElementById("citySelector").value;


    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=792616ef42153884bc38ec23e95dbbae", function(data){

        console.log(data);

        // calling the city name from JSON
        var name = data.name;
        var name = "<img class='location' src='images/location.png'>"+city;

        // calling the weather icon from JSON
        var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        
        // calling the temprature from JSON
        // "Math.floor" rounds number to whole number
        var temp = Math.floor(data.main.temp);
        temp = temp + "&#176;"

        var weather = data.weather[0].description;

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