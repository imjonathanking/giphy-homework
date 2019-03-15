buttonsArray = ["Rugrats", "cat", "spongebob", "javascript"];

function gifClick(){
    $(".gifDiv").on("click", function(){
        clickedGif = $(this);
        clickedGifNumber = clickedGif.attr("data-number");
        thisStatic = clickedGif.attr("url-static");
        thisMotion = clickedGif.attr("url-motion");

        if(clickedGif.attr("data-state") === "motion"){
            clickedGif.attr("data-state", "still");
            targetGif = $(".gif[data-number='" + clickedGifNumber +"']");
            targetGif.attr("src", thisStatic);
        }
        else{
            clickedGif.attr("data-state", "motion");
            targetGif = $(".gif[data-number='" + clickedGifNumber +"']");
            targetGif.attr("src", thisMotion);
        }
    })
}

function buttonClick(){
    $(".button").on("click", function(){
        $("#gif-display").empty();
        thisName = $(this).attr("data-name");
        console.log(thisName);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        thisName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            allGifs = response.data;

            for (i = 0; i < allGifs.length; i++){
                thisObject = allGifs[i];
                console.log(thisObject);
                thisDiv = $("<div>");
                thisDiv.addClass("gifDiv");
                thisDiv.attr("data-number", i);
                thisDiv.attr("data-state", "motion");
                thisDiv.attr("url-static", thisObject.images.fixed_height_still.url);
                thisDiv.attr("url-motion", thisObject.images.fixed_height.url);
                thisRating = $("<div>").text("rating: " + thisObject.rating);
                thisGif = $("<img>").attr("src", thisObject.images.fixed_height.url);
                thisGif.attr("data-number", i);
                thisGif.addClass("gif");
                thisDiv.append(thisRating, thisGif);
                $("#gif-display").append(thisDiv);
            }

            gifClick();
        })

    })
}

function renderButtons(){
    $(".buttons-view").empty();
    for (i = 0; i < buttonsArray.length; i++){
        thisButton = $("<button>").text(buttonsArray[i]);
        thisButton.addClass("button");
        thisButton.attr("data-name", buttonsArray[i]);
        $(".buttons-view").append(thisButton);
    }
    buttonClick();
}

$("#buttonSubmit").on("click",function(){
    event.preventDefault();
    thisInput = $("#buttonInput").val().trim();
    buttonsArray.push(thisInput);
    $("#buttonInput").val("");
    renderButtons();
})

renderButtons();