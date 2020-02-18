/*===================================================================================*/
/*  Mobile Nav
/*===================================================================================*/





/* 1. Nav icon
-----------------------------------------------------------------------------------------
*/

$(document).ready(function(){
  $('#nav-icon').click(function(){
    $(this).toggleClass('open');
  });
}); 










/* 2. Collapsibles
-----------------------------------------------------------------------------------------
*/





$(document).ready(function() {
   $(".mobile-nav-primary__link--has-children").click(function(e) {
      if($(this).hasClass("mobile-nav-primary__link--has-children-open")) {
         // if it's open then just close it
         $(this).removeClass("mobile-nav-primary__link--has-children-open");
      } else {
         // if it's closed, then close everything else and open it
         $(".more").removeClass("mobile-nav-primary__link--has-children-open");
         $(this).addClass("mobile-nav-primary__link--has-children-open");
      }
   });
});