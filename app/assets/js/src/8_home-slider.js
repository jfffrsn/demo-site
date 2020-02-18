/*===================================================================================*/
/*  Home slider --slick.js
/*===================================================================================*/
//

$(document).ready(function () {
  "use strict";
  $('.single-item').slick({
    dots: true,
    arrows: false,
    draggable: true,
    autoplay: true, /* this is the new line */
    autoplaySpeed: 12000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 1000,
});



});


