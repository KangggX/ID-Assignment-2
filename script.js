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
        qTime = `&maxReadyTime=${qTime}`;
    }
    
    e.preventDefault();
    if (qName.length == 0 && qCuisine.length == 0) {
        console.log("Error");
    } else {
        var searchRecipeSettings = {
            "url": `https://api.spoonacular.com/recipes/complexSearch?apiKey=a863c4b81ffa46ce882d936d36181f86&number=35&instructionsRequired=true&query=${qName}&cuisine=${qCuisine}&diet=${qDiet}&intolerances=${qIntolerance}&type=${qType}${qTime}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Cookie": "__cfduid=da7f6af872b2cb304cab1d7e82c8db5021609153837"
            },
        };

        var recipeInformation = {
            "url": "https://api.spoonacular.com/recipes/652061/information?apiKey=a863c4b81ffa46ce882d936d36181f86",
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Cookie": "__cfduid=d2164e84c3a575422c310609a8f51a4c31608527722"
            },
        };

        $.ajax(searchRecipeSettings).done(function (recipe) {
            console.log(recipe);
            $(".result-body").empty(); //Clear all contents when user click submit
            for (var i = 0; i < recipe.results.length; i++) {
                idHolder.push(recipe.results[i].id); //Obtain all the recipe IDs

                $(".result-body").append(
                    `<div id="data-${i}" class="d-flex flex-column align-items-center mb-5">
                        <img class="img-fluid" src="${recipe.results[i].image}"><span class="fs-4 fw-bold">${recipe.results[i].title}</span>
                    </div>`
                );
                
                $(`#data-${i}`).click(function(e) {
                    $.ajax(recipeInformation).done(function (response) {
                        console.log(response);
                        console.log(idHolder);
                    });
                });
            };
            
        });
    }
})