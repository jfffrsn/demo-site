/*===================================================================================*/
/*  Ratings Popover
/*===================================================================================*/

//hide when click outside
$('html').on('click', function(e) {
    $('[data-toggle="popover"]').each(function() { //Loop for everything containing a data-toggle="popover"
        if ($(this).attr('aria-describedby') != null ) { //Check if the popover is active / contain an aria-describedby with a value
            var id = $(this).attr('aria-describedby'); //Put the value in a variable
            if (!$(e.target).closest(".popover-content").length && $(e.target).attr("aria-describedby") != id && !$(e.target).closest('[aria-describedby="'+id+'"').length) { //Look if the click is a child of the popover box or if it's the button itself or a child of the button
                $('[aria-describedby="'+id+'"]').trigger( "click" ); //trigger a click as if you clicked the button
            }
        }
    });
});

///
//https://stackoverflow.com/questions/34549994/how-to-close-a-popover-with-a-button-inside-this-popover
$('body').on('hidden.bs.popover', function (e) {
    $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false };
});

////


var moops = {
    'html':true,    
    content: function(){
        return $('#ratingsHistContent').html();
    }
};

$(function(){
    $('#ratingsHistBtn').popover(moops);
});



///


//