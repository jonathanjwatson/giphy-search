// console.log("Hello world");

$(document).ready(function () {
  // DOM VARIABLES

  // JS VARIABLES

  // FUNCTION DEFINITIONS

  // FUNCTION CALLS

  // EVENT LISTENERS
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    console.log("You submitted the form.");
    var searchTerm = $("#search-term").val();
    console.log(searchTerm);
    // if(searchTerm.length < 1){
    //     alert("Please enter a valid search term!");
    // }else {
    //     //  Whatever we're gonna do.
    // }
    var apiKey = "FwN7nCdL4yA9BMFCc7q5OnTvBbt6jU0s";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=5&q=" + searchTerm;
    
  });
});
