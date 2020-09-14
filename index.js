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

    console.log(currentLocalStorage);
    if (currentLocalStorage !== null) {
      previousSearchTerms = JSON.parse(currentLocalStorage);
    } else {
      previousSearchTerms = [];
    }
  }

  // FUNCTION CALLS
  init();

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

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      apiKey +
      "&limit=5&q=" +
      searchTerm;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //   console.log(response.data[0].images.fixed_width.url);
      giphyDisplayEl.empty();
      //   var imageDiv = $("<div>");
      //   imageDiv.addClass("row");
      //   for (var i = 0; i < response.data.length; i++) {
      //     var giphyDiv = $("<div>");
      //     giphyDiv.addClass("col-md-3");
      //     giphyDiv.append(
      //       $("<img>").attr("src", response.data[i].images.fixed_width.url)
      //     );
      //     imageDiv.append(giphyDiv);
      //   }
      //   giphyDisplayEl.append(imageDiv);
      for (var i = 0; i < response.data.length; i++) {
        giphyDisplayEl.append(
          $("<img>").attr("src", response.data[i].images.fixed_width.url)
        );
      }
      console.log(previousSearchTerms);
      previousSearchTerms.push(searchTerm);
      localStorage.setItem("previousSearchTerms", JSON.stringify(searchTerm));
    });
  });
});
