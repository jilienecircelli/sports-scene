var APIkey = "tOFft5fp4kxxA1Xq7PQ6ManIDhkIdcqZ";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=" + APIkey;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
});