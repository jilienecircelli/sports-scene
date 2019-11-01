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
    }).then(function (response) {
        var venue = response._embedded.events[index]._embedded.venues[0]
        var latitude = venue.location.latitude;
        var longitude = venue.location.longitude;

        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude);
        initMap(lat, lng, index)


    })
}


function pullingEvents() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" + city + "&apikey=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
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

//function displayNxtMap(){
//     $(".mapBtn").on("click", function(){
//         $("#map").remove()
//     })

// }

$(".btn").on("click", function () {
    $(".search-area").removeClass();
    // $(".search-area").addClass("");
    var caContent = $("#get-city")

    $(".event-data").empty()
    var letsGo = caContent.val()
    city = letsGo
    pullingEvents()

    // embedTheMap()


})
//displayNxtMap()