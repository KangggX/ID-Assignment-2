$(document).scroll(function () {
    var nav = $(".main .navbar");
    nav.toggleClass("bg-light shadow", $(this).scrollTop() > nav.height());

    if ($(this).scrollTop() > nav.height()) {
        $(".navbar .container").removeClass("py-3").addClass("py-1");
    } else {
        $(".navbar .container").removeClass("py-1").addClass("py-3");
    }
});