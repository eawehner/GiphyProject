// SET UP THE ARRAY OF SEARCH TERMS
var anime = [
    "aggretsuko",
    "cardcaptor sakura",
    "cowboy bebop",
    "dragonball",
    "fullmetal alchemist",
    "naruto",
    "pokemon",
    "puella magi madoka magica",
    "sailor moon"
];

// INITIALIZE GIPHY API
// API KEY: 
var API = "8WBOjie0vV3kxCmj9hCE429pwE8ArC3b";

$(document).ready(function() {

// MAKE THE BUTTONS

function buttonMaker() {
    $("#button-display").empty();

    for (i=0; i < anime.length; i++) {
        var button = $("<button>");
        button.addClass("anime-button");
        button.attr("data-name", anime[i]);
        button.text(anime[i]);
        $("#button-display").append(button);
    };
}

// USER ADDS THEIR OWN SEARCH ITEMS TO ARRAY
// PUSH ITEM FROM INPUT BOX INTO ARRAY

$("#anime-add").on("click", function() {
    event.preventDefault();
    var userInput = $("#anime-input").val().trim();
    anime.push(userInput);
    anime.sort();
    buttonMaker();
});


// ENSURE ONLY TEN RESULTS ARE PUSHED

// DISPLAY IMAGES, USING BOTH ANIMATED AND STILL IMAGES

$(document.body).on("click", ".anime-button", function() {
    // USE THE SEARCH URL WITH THE SELECTED ITEM FROM BUTTON
    var animeValue = $(this).attr("data-name");

    // ENSURE ONLY TEN RESULTS ARE PUSHED
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animeValue + "&api_key=" + API + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // console.log(response);

        $.each(response.data, function(i) {
            var animatedIMG = response.data[i].images.original.url;
            var stillIMG = response.data[i].images.original_still.url;

            var animeGIF = $("<img>");
            animeGIF.attr("src", stillIMG);
            animeGIF.attr("data-state", "still");
            animeGIF.attr("data-still", stillIMG);
            animeGIF.attr("data-animate", animatedIMG);
            animeGIF.addClass("anime-img");

            var animeRating = response.data[i].rating;

            var ratingSpan = $("<span>")
            ratingSpan.text(animeRating);

            $("#gif-display").prepend("<br>");
            $("#gif-display").prepend(ratingSpan);
            $("#gif-display").prepend("<br>");
            $("#gif-display").prepend(animeGIF);
        });
    });
});



// IMPLEMENT CODE FOR PAUSING AND UNPAUSING GIFS HERE

// ON CLICK, SWITCH IMG SRC

// IF IMG SRC IS STILL, SWITCH TO ANIMATED

// IF IMG SRC IS ANIMATED, SWITCH TO STILL

$(document.body).on("click", ".anime-img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        var animated = $(this).attr("data-animate");
        $(this).attr("src", animated);
        $(this).attr("data-state", "animate");
    } else {
        var stilled = $(this).attr("data-still");
        $(this).attr("src", stilled);
        $(this).attr("data-state", "still");
    }
});

buttonMaker();

});