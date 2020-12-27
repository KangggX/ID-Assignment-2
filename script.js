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