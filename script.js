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
    e.preventDefault();

    var qName = $("#queryname").val();
    var qTime;
    var qCuisine = $("#querycuisine").val();
    var qType = $("#querytype").val();
    var qDiet = $("#querydiet").val();
    var qIntolerance = $("#queryintolerance").val();
    var idHolder =[]; //Creates an array/list to hold recipe IDs. If submission button is clicked again, current list will be cleared for newer IDs.

    if ($("#querytime").val() == "") { //In order to prevent error 404 from happening if value is empty
        qTime = "";
    } else {
        qTime = `&maxReadyTime=${$("#querytime").val()}`;
    }

    if (qName.length == 0 && qTime.length == 0 && qCuisine.length == 0 && qType.length == 0 && qDiet.length == 0 && qIntolerance.length == 0) {
        //Validation check
        $(document).scrollTop(800);
        $("#form-validation").text("Please enter at least 1 value");
        console.log("Error");
    } else {
        $("#form-validation").empty();
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
            $(".stepper:nth-child(3)").show(); //Makes the display to default value
            $(".result-body").empty(); //Clear all inner DOM contents when user click submit
            for (var i = 0; i < recipe.results.length; i++) {
                idHolder.push(recipe.results[i].id); //Obtain all the recipe IDs

                $(".result-body").append( //Appending the recipe name and image
                    `<div class="data" class="d-flex flex-column align-items-center mb-5">
                        <img class="img-fluid" src="${recipe.results[i].image}"><span class="fs-5 fw-bold">${recipe.results[i].title}</span>
                    </div>`
                );
            };

            $(document).scrollTop(1625); //Move the user window directly to the result. Reason why it is placed here is so that the scroll can happen once all content have been loaded.

            $(".result-body div").click(function() {
                var idIndex = $(".result-body div").index(this); //Get the index position of the item clicked
                console.log(this);
                console.log(idHolder);
                var recipeInformation = {
                    "url": `https://api.spoonacular.com/recipes/${idHolder[idIndex]}/information?apiKey=a863c4b81ffa46ce882d936d36181f86&includeNutrition=true`,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                      "Cookie": "__cfduid=d2164e84c3a575422c310609a8f51a4c31608527722"
                    },
                };

                $.ajax(recipeInformation).done(function (information) {
                    console.log(information);    
                    $(".stepper:nth-of-type(4)").show(); //Makes the display to default value
                    $(".list#stats").empty(); //Clear all inner DOM contents when user selects a recipe/new recipe
                    $(".list#ingredient").empty(); //Clear all inner DOM contents when user selects a recipe/new recipe
                    $(".list#instruction").empty(); //Clear all inner DOM contents when user selects a recipe/new recipe

                    $(".list#stats").append(
                        `
                        <div class="list-title">Basic Information</div>
                        <div>Name: ${information.title}</div>
                        <div>Number of serving(s): ${information.servings}</div>
                        <div>Ready Time: ${information.readyInMinutes}mins</div>
                        <div>Rating: ${information.spoonacularScore}/100</div>
                        <div class="list-title" style="margin-top: 2rem;">Nutrition</div>
                        <div>Calories: ${information.nutrition.nutrients[5].amount}kcal</div>
                        <div>Cholesterol: ${information.nutrition.nutrients[6].amount}mg</div>
                        <div>Carbohydrates: ${information.nutrition.nutrients[3].amount}g</div>
                        <div>Fat: ${information.nutrition.nutrients[1].amount}g</div>
                        <div>Saturated Fat: ${information.nutrition.nutrients[2].amount}g</div>
                        <div>Sugar: ${information.nutrition.nutrients[5].amount}g</div>
                        `
                    );

                    $(".list#ingredient").append(`<div class="list-title">Ingredients</div>`);
                    for (var i = 0; i < information.extendedIngredients.length; i++) { //Appending ingredient list using for loop
                        $(".list#ingredient").append(
                            `<div class="data">${information.extendedIngredients[i].original}</div>`
                        )
                    }

                    $(".list#instruction").append(`<div class="list-title">Instruction(s)</div>`);
                    for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) { //Appending instruction list using for loop
                        $(".list#instruction").append(
                            `<div class="box-instruction"><div class="step-instruction">${i + 1}</div>${information.analyzedInstructions[0].steps[i].step}</div>`
                        )
                    }

                    $(window).scrollTop(2432); //Move the user window directly to the result. Reason why it is placed here is so that the scroll can happen once all content have been loaded.
                });
            });
            
        });
    }
})