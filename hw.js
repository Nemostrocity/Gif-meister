
//This variable sets the theme for the gif exploration
var gifs = ["funny", "reaction", "fail", "amazing"];

// seekGif function creates html content
function seekGif() {

    var subject = $(this).attr("gif-input");
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +subject+ "?api_key=OLAtzOJQUe4LrCWgX4U0wQjzzwxjgkHW&limit=10";

    // Creating an AJAX call for the button being clicked


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // Creating a div to hold the gifd
        var gifDiv = $("<div class='gifs'>");

        // Storing the rating data
        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var myRating = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        gifDiv.append(myRating);

        // WHAT IS GIF URL?Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        gifDiv.append(image);

        // Putting the GIF PACKAGE ON TOP
        $("#gifs-view").prepend(gifDiv);
    });

}

//This function creates the query buttons
function renderButtons() {

    // starting out with an empty page
    $("#buttons-view").empty();

    // Looping through the array of gifs (Line 06)
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        var newButton = $("<button>");
        // Adding a class of gif-btn to our button
        newButton.addClass("gif-btn");
        // Adding a data-attribute
        newButton.attr("gif-input", gifs[i]);
        // Providing the initial button text
        newButton.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(newButton);
    }
}

//This fuction starts gifs on click and pauses again on even clicks
$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If  the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//This funtion takes the text frm the input and creates a new gif-btn from it
$("#addEntry").on("click", function() {
        event.preventDefault();
    // If  the clicked image's state is still, update its src attribute to what its data-animate value is.
    subject = $("#input").val().trim();
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
        var newButton = $("<button>");
        // Adding a class of gif-btn to our button
        newButton.addClass("gif-btn");
        // Adding a data-attribute
        newButton.attr("gif-input", subject);
        // Providing the initial button text
        newButton.text(subject);

        console.log("input = " + subject);

        // Adding the button to the buttons-view div
        $("#buttons-view").append(newButton);

        gifs.push(subject);


    // Calling renderButtons which handles the processing of our movie array
        renderButtons();

});


// This function handles events where a gif button is clicked
//$("#add-gif").on("click", function(event) {
    //event.preventDefault();
    // This line grabs the input from the textbox
   // var gif = $("#input").val().trim();

    // Adding a query from the textbox to our array
    //gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    //renderButtons();
//});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", seekGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();