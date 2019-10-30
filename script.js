var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";



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
        console.log(response._embedded.events[0].name)

        var eventCards = $(".event-data")

        var card = $("<div>");
        card.addClass("event-card");
        eventCards.append(card);


        // Event Name
        card.append("<h5>" + response._embedded.events[0].name)
            // Pull event date and reverse string
        var eventDate = response._embedded.events[0].dates.start.localDate;
        var date = eventDate.split("-").reverse().join("-")
            // Event Date
        card.append("<div>" + "Date: " + date)
            // Event Venue
        card.append("<div>" + "Venue: " + response._embedded.events[0]._embedded.venues[0].name)
            // Event Images
        card.append("<div>" + "<img src=" + response._embedded.events[0]._embedded.attractions[0].images[0].url + ">" + "<img src=" + response._embedded.events[0]._embedded.attractions[1].images[0].url + ">")
            // Link to purchase tickets
        card.append("<a href=" + response._embedded.events[0].url + ">Click here to purchase tickets!</a>")


        // Setting variables for lat/lng of map
        var latitude = response._embedded.events[0]._embedded.venues[0].location.latitude;
        var longitude = response._embedded.events[0]._embedded.venues[0].location.longitude;

        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude)

        // // Map Function

        function initMap() {
            // The location of event
            var latLng = { lat: lat, lng: lng };
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 4, center: latLng });
            // The marker, positioned at event venue
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
        }

        // Append map below link
        card.append("<div id='map'>")
        initMap()
    });
})