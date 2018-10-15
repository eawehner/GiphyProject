// SET UP THE ARRAY OF SEARCH TERMS
var anime = [
    "aggretsuko",
    "cardcaptor sakura",
    "cowboy bebop",
    "digimon",
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
    buttonMaker();
});


// USE THE SEARCH URL WITH THE SELECTED ITEM FROM ARRAY

// ENSURE ONLY TEN RESULTS ARE PUSHED

// DISPLAY IMAGES, USING BOTH ANIMATED AND STILL IMAGES

$(document.body).on("click", ".anime-button", function() {
    var animeValue = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animeValue + "&api_key=" + API + "&limit=10";

    console.log(animeValue);
    console.log(queryURL);
});



// IMPLEMENT CODE FOR PAUSING AND UNPAUSING GIFS HERE

// ON CLICK, SWITCH IMG SRC

// IF IMG SRC IS STILL, SWITCH TO ANIMATED

// IF IMG SRC IS ANIMATED, SWITCH TO STILL

buttonMaker();

});