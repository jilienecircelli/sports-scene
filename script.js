var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";

function initMap(lat, lng, targetIndex) {
    // The location of event
    var latLng = { lat: lat, lng: lng };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById(`map${targetIndex}`), { zoom: 11, center: latLng });
    // The marker, positioned at event venue
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

function embedTheMap(index) {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" + city + "&apikey=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var venue = response._embedded.events[index]._embedded.venues[0]
        var latitude = venue.location.latitude;
        var longitude = venue.location.longitude;

        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude);
        if (isNaN(lat) || isNaN(lng)){
           var maps = document.getElementsByClassName("map")
           maps.textContent = "haha"

        }else{initMap(lat, lng, index)}


    })
}


function pullingEvents() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" + city + "&apikey=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        console.log(response._embedded.events.length)

        for (var i = 0; i < response._embedded.events.length; i++) {
            var event = response._embedded.events[i]
            var venue = response._embedded.events[i]._embedded.venues[0]

            var eventCards = $(".event-data")

            var card = $("<div class='event-card row'>");


            // Event Name

            // Pull event date and reverse string
            var leftColumn = $("<div class='col s12 m6'></div>")
            var rightColumn = $("<div class='col s12 m6'></div>")
            card.append(leftColumn)
            card.append(rightColumn)

            // Event Date shortening
            var date = event.dates.start.localDate.split("-").reverse().join("-")
                // Event Name
            var eventNameEl = $("<h2 class='event-title'>" + event.name + "</h2>")
                // Event Date
            var eventDateEl = $("<div class='date-info'>" + date + "</div>")
                // Event Venue
            var venueNameEl = $("<div>" + "Venue: " + venue.name + "</div>");
            // Event Images
            var eventImageEl = $("<img src=" + event._embedded.attractions[0].images[0].url + ">" + "<img src=" + event._embedded.attractions[1].images[0].url + ">");
            // Link to purchase tickets
            //var eventUrlEl = $("<a id='tix' href=" + event.url + ">Click here to purchase tickets!</a>");


            leftColumn.append(eventNameEl)
            leftColumn.append(eventDateEl)
            leftColumn.append(venueNameEl)
            leftColumn.append(eventImageEl)
            console.log(card)

            //if (i == 0) {
            rightColumn.append(`<div id='map${i}' class='map'>`)
                // } else {
                //     rightColumn.append("<button class='mapBtn' list=" + i + ">Click to display map</button>")
                // }
            embedTheMap(i)


            // Setting variables for lat/lng of map


            // // Map Function

            console.log(i)

            eventCards.append(card);


        }
    });
}

function currentlocationWeather() {

    var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
    navigator.geolocation.getCurrentPosition(function (position) {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      console.log(longitude)
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          console.log(response)
          var iconcode = response.weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  
          // Log the queryURL
          console.log(queryURL);
  
          // Log the resulting object
          console.log(response);
  
          // Transfer content to HTML
          var city1 = $(".weather").append("<div>" + response.name + ": Tempe (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2)  + "</div>");
          city1.append(("<img id='wicon' src='' alt='Weather icon'>"));
    
          $('#wicon').attr('src', iconurl);
  
        })
  
    });
  }
  currentlocationWeather()


  function cityWeather(){
    var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
  
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  
        // Log the queryURL
        console.log(queryURL);
  
        // Log the resulting object
        console.log(response);
        $(".weather").empty()
        // Transfer content to HTML
        var city2 = $(".weather").html("<div>" + response.name + ": Tempe (F)" + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2)  + "</div>");
          city2.append(("<img id='wicon' src='' alt='Weather icon'>"));
    
          $('#wicon').attr('src', iconurl);
  
      });
  }

$(".btn").on("click", function() {
        $(".search-area").removeClass();
        // $(".search-area").addClass("");
        var caContent = $("#get-city")

        $(".event-data").empty()
        var letsGo = caContent.val()
        city = letsGo
        pullingEvents()

        cityWeather()


    })
    //displayNxtMap()