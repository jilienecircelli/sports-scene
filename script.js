var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var city = "";


$("button").on("click", function() {
    var caContent = $("#get-city")

    var letsGo = caContent.val()
    city = letsGo
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" + city + "&apikey=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        console.log(response._embedded.events[0].name)
        $(".city").html("event name: " + response._embedded.events[0].name)

    });

})