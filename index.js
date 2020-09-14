// console.log("Hello world");

$(document).ready(function () {
  // DOM VARIABLES
  var giphyDisplayEl = $("#giphy-display");

  // JS VARIABLES
  var apiKey = "FwN7nCdL4yA9BMFCc7q5OnTvBbt6jU0s";

  var previousSearchTerms;

  // FUNCTION DEFINITIONS
  function init() {
    var currentLocalStorage = localStorage.getItem("previousSearchTerms");

    if (currentLocalStorage !== null) {
      previousSearchTerms = JSON.parse(currentLocalStorage);
    } else {
      previousSearchTerms = [];
    }
  }

  function displayPreviousSearches() {
    init();
    $("#previous-searches").empty();
    for (var i = 0; i < previousSearchTerms.length; i++) {
      console.log(previousSearchTerms[i]);
      $("#previous-searches").prepend(
        $(
          "<div class='row '><button class='btn btn-info previous'>" +
            previousSearchTerms[i] +
            "</button></div>"
        )
      );
    }
  }

  function getAndDisplayGifs(searchTerm) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      apiKey +
      "&limit=5&q=" +
      searchTerm;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      giphyDisplayEl.empty();
      for (var i = 0; i < response.data.length; i++) {
        giphyDisplayEl.append(
          $("<img>").attr("src", response.data[i].images.fixed_width.url)
        );
      }
    });
  }

  // FUNCTION CALLS
  init();
  displayPreviousSearches();

  // EVENT LISTENERS
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    // console.log("You submitted the form.");
    var searchTerm = $("#search-term").val();
    // console.log(searchTerm);
    // if(searchTerm.length < 1){
    //     alert("Please enter a valid search term!");
    // }else {
    //     //  Whatever we're gonna do.
    // }
    getAndDisplayGifs(searchTerm);
    previousSearchTerms.push(searchTerm);
    localStorage.setItem(
      "previousSearchTerms",
      JSON.stringify(previousSearchTerms)
    );
    displayPreviousSearches();
  });

  $(".previous").on("click", function (event) {
    var searchTerm = $(this).text();
    getAndDisplayGifs(searchTerm);
  });
});
