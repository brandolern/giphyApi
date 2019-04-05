$(document).ready(function () {

    $(document).on("click", ".gif-buttons", function () {
        var search = ($(this).attr("id"));
        var limit = 10;
        var rating = "R";
        var url = `https://api.giphy.com/v1/gifs/search?api_key=66fQ1GJZy1MP8jyEJ6KJk1a6GkTWHpcX&q=${search}&limit=${limit}&offset=0&rating=${rating}&lang=en`

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            response = response.data;

            for (i = 0; i < response.length; i++) {

                var gifUrl = response[i].images.fixed_height_still.url;

                var p = $("<p>");
                p.text("Rating: " + response[i].rating);

                var createGif = $("<img>");
                createGif.attr("src", gifUrl);
                createGif.attr("alt", search);
                createGif.attr("data-value", i);
                createGif.addClass("gifs");
                $(".gif-container").prepend(createGif);
                $(".gif-container").prepend(p);


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
        button.addClass("btn btn-info gif-buttons");
        button.attr("id", searchInput);

        $(".buttons").append(button);
    });
});