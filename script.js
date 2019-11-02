var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";

// time variable
setInterval(getCurrentTime, 1000);
var currentDay = $(".time");
var date = $("<div class='date'>");

function getCurrentTime() {
    date.html(moment().format("dddd") + "<br>" + moment().format("MMMM Do YYYY"));
    currentDay.append(date);
}

function initMap(lat, lng, targetIndex) {
    // The location of event
    // var latLng = { lat: lat, lng: lng };
    var latlng = new google.maps.LatLng(lat, lng);
    // The map, centered at city venue
    console.log(document.getElementById(`map${targetIndex}`));
    var map = new google.maps.Map(document.getElementById(`map${targetIndex}`), {
        zoom: 11,
        center: latlng
    });
    // The marker, positioned at event venue
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
}

function embedTheMap(index) {
    var queryURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" +
        city +
        "&apikey=" +
        APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var venue = response._embedded.events[index]._embedded.venues[0];
        var latitude = venue.location.latitude;
        var longitude = venue.location.longitude;

        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude);
        console.log("Lat & Lng", lat, lng);
        initMap(lat, lng, index);
    });
}

function pullingEvents() {
    var queryURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" +
        city +
        "&apikey=" +
        APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response._embedded.events.length);

        for (var i = 0; i < response._embedded.events.length; i++) {
            var event = response._embedded.events[i];
            var venue = response._embedded.events[i]._embedded.venues[0];

            var eventCards = $(".event-data");

            var card = $("<div class='event-card row'>");



            // Pull event date and reverse string
            var leftColumn = $("<div class='col s12 m3'></div>");
            var middleColumn = $("<div class='col s12 m6 center-align'></div>");
            var rightColumn = $("<div class='col s12 m3'></div>");
            card.append(leftColumn);
            card.append(middleColumn);
            card.append(rightColumn);

            rightColumn.append(
                `<div id='map${i}' style='width: 260px; height: 270px' class='map'>`
            );
            embedTheMap(i);

            var time = event.dates.start.localTime

            time = time.split(':'); // convert to array

            // fetch
            var hours = Number(time[0]);
            var minutes = Number(time[1]);


            // calculate
            var timeValue;

            if (hours > 0 && hours <= 12) {
                timeValue = "" + hours;
            } else if (hours > 12) {
                timeValue = "" + (hours - 12);
            } else if (hours == 0) {
                timeValue = "12";
            }

            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes

            timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM

            // show

            console.log(timeValue);

            // Event Date shortening
            var date = event.dates.start.localDate
                .split("-")
                .reverse()
                .join("-");
            // Event Name
            var eventNameEl = $("<h2 class='event-title'>" + event.name + "</h2>");
            // Event Date
            var eventDateEl = $("<div class='date-info'>" + date + " at: " + timeValue + "</div>");
            // Event Venue
            var venueNameEl = $("<div>" + "Venue: " + venue.name + "</div>");
            // Event Images
            var eventImageEl = $(
                "<img src=" +
                event._embedded.attractions[0].images[0].url +
                ">" +
                "<img src=" +
                event._embedded.attractions[1].images[0].url +
                ">"
            );
            // Link to purchase tickets

            var eventUrlEl = $(
                "<a target='_blank' class='tixlink' id='tix' href=" +
                event.url +
                ">Click here to purchase tickets!</a>"
            );

            var genre = event.classifications[0].genre.name;

            var nbaLogo = $(
                "<img src='assets/nba.png' style='width: 200px; height: 200px;'>"
            );
            //var nflLogo = $("<img src='assets/nfl.png' width:'200px' height:'200'>");
            var nflLogo = $(
                "<img src='assets/nfl.png' style='width: 200px; height: 200px;'>"
            );
            var nhlLogo = $(
                "<img src='assets/nhl.png' style='width: 200px; height: 200px;'>"
            );
            var sportsLogo = $(
                "<img src='assets/sports.jpg' style='width: 200px; height: 200px;'>"
            );
            if (genre == "Football") {
                leftColumn.append(nflLogo);
            } else if (genre == "Hockey") {
                leftColumn.append(nhlLogo);
            } else if (genre == "Basketball") {
                leftColumn.append(nbaLogo);
            } else {
                leftColumn.append(sportsLogo);
            }

            middleColumn.append(eventNameEl);
            middleColumn.append(eventDateEl);
            middleColumn.append(venueNameEl);
            middleColumn.append(eventImageEl);
            middleColumn.append(eventUrlEl);

            eventCards.append(card);
            console.log(i);
        }
    });
}

function currentlocationWeather() {
    var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
    navigator.geolocation.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log(longitude);
        var queryURL =
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            var city1 = $(".weather").append(
                "<div>" +
                response.name +
                "<br>Temp: " +
                ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
                "&#8457 <img id='wicon' src='' alt='Weather icon'></div>"
            );
            // city1.append("<img id='wicon' src='' alt='Weather icon'>");

            $("#wicon").attr("src", iconurl);
        });
    });
}
currentlocationWeather();

function cityWeather() {
    var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
    var queryURL =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            $(".weather").empty();
            // Transfer content to HTML
            var city2 = $(".weather").html(
                "<div>" +
                response.name +
                "<br>Temp: " +
                ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
                "&#8457 <img id='wicon' src='' alt='Weather icon'></div>"
            );
            //city2.append("<img id='wicon' src='' alt='Weather icon'>");

            $("#wicon").attr("src", iconurl);
        });
}

$(".btn").on("click", function() {
    $(".search-area").removeClass();
    $(".search-area").addClass("btn-results");
    var caContent = $("#get-city");

    $(".event-data").empty();
    var letsGo = caContent.val();
    city = letsGo;
    pullingEvents();

    cityWeather();
});