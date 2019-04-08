$(document).ready(function () {

    var characters = ["Batman", "Peter Griffin", "Nicholas Cage", "Christopher Walken", "Jason Statham", "Cartman", "Cat Woman", "Homer Simpson", "Slenderman", "Mario", "Sonic", "Link"];

    for (i = 0; i < characters.length; i++) {
        var button = $("<button>");
        button.text(characters[i]);
        button.addClass("btn btn-dark text-white gif-buttons");
        button.attr("id", characters[i]);

        $(".buttons").append(button);
    };

    $(document).on("click", ".gif-buttons", function () {
        var search = ($(this).attr("id"));
        var limit = 9;
        var rating = "R";
        var url = `https://api.giphy.com/v1/gifs/search?api_key=66fQ1GJZy1MP8jyEJ6KJk1a6GkTWHpcX&q=${search}&limit=${limit}&offset=0&rating=${rating}&lang=en`;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            response = response.data;

            for (i = 0; i < response.length; i++) {

                var gifUrl = response[i].images.fixed_height_still.url;

                var newDiv = $("<div>");
                newDiv.addClass("gif-div");

                var p = $("<p>");
                p.text("Rating: " + response[i].rating);

                var createGif = $("<img>");
                createGif.attr("src", gifUrl);
                createGif.attr("alt", search);
                createGif.attr("data-value", i);
                createGif.addClass("gifs");

                $(newDiv).append(p);
                $(newDiv).append(createGif);
                $(".gif-container").prepend(newDiv);
            }

            var isMoving = false;

            $(document).on("click", ".gifs", function () {
                var n = $(this).attr("data-value");

                if (!isMoving) {
                    $(this).attr("src", response[n].images.fixed_height.url);
                    isMoving = true;
                } else {
                    $(this).attr("src", response[n].images.fixed_height_still.url);
                    isMoving = false;
                }

            });
        });
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var searchInput = $("#search").val().trim();

        var button = $("<button>");
        button.text(searchInput);
        button.addClass("btn btn-dark text-white gif-buttons");
        button.attr("id", searchInput);

        $(".buttons").append(button);
        characters.push(searchInput);

    });
    $(".clear").on("click", function () {
        $(".gif-container").empty();
    })

});