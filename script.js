var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";

// time variable
setInterval(getCurrentTime, 1000);
var currentDay = $(".time");
var date = $("<div class='date'>");

function getCurrentTime() {
    date.text(moment().format('dddd, MMMM Do YYYY'));
    currentDay.append(date);
}

function initMap(lat, lng, targetIndex) {
    // The location of event
    // var latLng = { lat: lat, lng: lng };
    var latlng = new google.maps.LatLng(lat, lng);
    // The map, centered at city venue
    console.log(document.getElementById(`map${targetIndex}`))
    var map = new google.maps.Map(
        document.getElementById(`map${targetIndex}`), { zoom: 11, center: latlng });
    // The marker, positioned at event venue
    var marker = new google.maps.Marker({
        position: latlng,
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
        console.log("Lat & Lng", lat, lng)
        initMap(lat, lng, index)


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

            rightColumn.append(`<div id='map${i}' class='map'>`)
            embedTheMap(i)

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
            eventCards.append(card);
            //if (i == 0) {
            // } else {
            //     rightColumn.append("<button class='mapBtn' list=" + i + ">Click to display map</button>")
            // }


            console.log(i)

        }
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

    // embedTheMap()

})