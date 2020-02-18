/*===================================================================================*/
/*  OWL CAROUSEL
/*===================================================================================*/


// owl carousel


$(function() {
"use strict";
$('.related-carousel').owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:5
        }
    }
});
});

