var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";

function initMap(lat, lng) {
    // The location of event
    var latLng = { lat: lat, lng: lng };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 11, center: latLng });
    // The marker, positioned at event venue
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

$("button").on("click", function() {
    $(".search-area").removeClass();
    // $(".search-area").addClass("");
    var caContent = $("#get-city")

    $(".event-data").empty()
    var letsGo = caContent.val()
    city = letsGo
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" + city + "&apikey=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var event = response._embedded.events[0]
        var venue = response._embedded.events[0]._embedded.venues[0]

        var eventCards = $(".event-data")

        var card = $("<div class='event-card row'>");


        // Event Name

        // Pull event date and reverse string
        var leftColumn = $("<div class='col s12 m3'></div>")
        var middleColumn = $("<div class='col s12 m6'></div>")
        var rightColumn = $("<div class='col s12 m3'></div>")
        card.append(leftColumn)
        card.append(middleColumn)
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
        var eventUrlEl = $("<a target='_blank' id='tix' href=" + event.url + ">Click here to purchase tickets!</a>");
        console.log('~~~~~', event)
        var genre = event.classifications[0].genre.name;
        console.log(genre)
        var nbaLogo = $("<img src='assets/nba.png' style='width: 200px; height: 200px;'>");
        //var nflLogo = $("<img src='assets/nfl.png' width:'200px' height:'200'>");
        var nflLogo = $("<img src='assets/nfl.png' style='width: 200px; height: 200px;'>");
        var nhlLogo = $("<img src='assets/nhl.png' style='width: 200px; height: 200px;'>");
        var sportsLogo = $("<img src='assets/sports.jpg' style='width: 200px; height: 200px;'>");
        if (genre == "Football"){
        leftColumn.append(nflLogo)
        } else if (genre == "Hockey"){
        leftColumn.append(nhlLogo)
        }else if (genre == "Basketball"){
        leftColumn.append(nbaLogo)
        }else{
        leftColumn.append(sportsLogo)
        }


        middleColumn.append(eventNameEl)
        middleColumn.append(eventDateEl)
        middleColumn.append(venueNameEl)
        middleColumn.append(eventImageEl)
        middleColumn.append(eventUrlEl)

        rightColumn.append("<div id='map'>")


        // Setting variables for lat/lng of map
        var latitude = venue.location.latitude;
        var longitude = venue.location.longitude;

        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude)

        // // Map Function



        eventCards.append(card);
        initMap(lat, lng)
    });
})