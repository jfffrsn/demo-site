/*===================================================================================*/
/*  Expanding blocks
/*===================================================================================*/
//
//show/more
$(document).ready(function () {
	"use strict";

	$('#viewCMEbtn').click(function() {
		$(this).text(($(this).text() === 'Hide PDH Info') ? 'View PDH Info' : 'Hide PDH Info');
		$(this).closest('.course-more__see-more').toggleClass( 'collapsed');
   	});
		
	
});



//
$(document).ready(function () {
    "use strict";

    
    
    $('.expansion-panel__trigger').click(function() {
        $(this).toggleClass('expanded');
    $(this).closest('div').find('.expansion-panel__icon').toggleClass('expanded');
        
        });
});


//filters
$(document).ready(function () {
    "use strict";

    
    
    $('.meeting-pres-filter__trigger').click(function() {
        $(this).toggleClass('expanded');
    $(this).closest('div').find('.meeting-pres-filter__icon').toggleClass('expanded');
        
        });
});