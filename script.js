$(document).scroll(function () {
    var nav = $(".main .navbar");

    nav.toggleClass("bg-light shadow", $(this).scrollTop() > nav.height());

    if ($(this).scrollTop() > nav.height()) {
        $(".navbar .container").removeClass("py-3");
        $(".nav-link, .navbar-brand").css("color", "rgba(0, 0, 0, .9)")
    } else {
        $(".navbar .container").addClass("py-3");
        $(".nav-link, .navbar-brand").css("color", "")
    }
});

$("#querysubmit").click(function(e) {
    var qName = $("#queryname").val();
    var qTime;
    var qCuisine = $("#querycuisine").val();
    var qType = $("#querytype").val();
    var qDiet = $("#querydiet").val();
    var qIntolerance = $("#queryintolerance").val();
    var idHolder =[];

    if ($("#querytime").val() == "") { //In order to prevent error 404 from happening if value is empty
        qTime = "";
    } else {
        qTime = `&maxReadyTime=${$("#querytime").val()}`;
    }
    
    e.preventDefault();

    if (qName.length == 0 && qCuisine.length == 0) {
        $(document).scrollTop(800);
        console.log("Error");
    } else {
        var searchRecipeSettings = {
            "url": `https://api.spoonacular.com/recipes/complexSearch?apiKey=a863c4b81ffa46ce882d936d36181f86&number=100&instructionsRequired=true&query=${qName}&cuisine=${qCuisine}&diet=${qDiet}&intolerances=${qIntolerance}&type=${qType}${qTime}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Cookie": "__cfduid=da7f6af872b2cb304cab1d7e82c8db5021609153837"
            },
        };

        $.ajax(searchRecipeSettings).done(function (recipe) {
            console.log(recipe);
            $(".result-body").empty(); //Clear all contents when user click submit
            for (var i = 0; i < recipe.results.length; i++) {
                idHolder.push(recipe.results[i].id); //Obtain all the recipe IDs

                $(".result-body").append(
                    `<div class="data" class="d-flex flex-column align-items-center mb-5">
                        <img class="img-fluid" src="${recipe.results[i].image}"><span class="fs-5 fw-bold">${recipe.results[i].title}</span>
                    </div>`
                );
            };

            $(document).scrollTop(1500); //Move the user window directly to the result. Reason why it is placed here is so that the scroll can happen once all content have been loaded.

            $(".result-body div").click(function() {
                var idIndex = $(".result-body div").index(this); //Get the index position of the item clicked
                console.log(this);
                var recipeInformation = {
                    "url": `https://api.spoonacular.com/recipes/${idHolder[idIndex]}/information?apiKey=a863c4b81ffa46ce882d936d36181f86`,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                      "Cookie": "__cfduid=d2164e84c3a575422c310609a8f51a4c31608527722"
                    },
                };

                $.ajax(recipeInformation).done(function (information) {
                    console.log(information);    
                    $(".information-body .list-ingredient").empty(); //Clear all contents when user selects a recipe
                    $(".information-body .list-instruction").empty(); //Clear all contents when user selects a recipe

                    for (var i = 0; i < information.extendedIngredients.length; i++) {
                        $(".information-body .list-ingredient").append(
                            `<div class="data">${information.extendedIngredients[i].original}</div>`
                        )
                    }

                    for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) {
                        $(".information-body .list-instruction").append(
                            `<div class="box-instruction"><div class="step-instruction">${i + 1}</div>${information.analyzedInstructions[0].steps[i].step}</div>`
                        )
                    }

                    $(window).scrollTop(2280); //Move the user window directly to the result. Reason why it is placed here is so that the scroll can happen once all content have been loaded.
                });
            });
            
        });
    }
})