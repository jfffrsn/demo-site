/*===================================================================================*/
/*  Clear radio button
/*===================================================================================*/





$("#ratingClearBtn").click(function(){

$('.global-rating-stars :radio').each(function () {
    $(this).removeAttr('checked');
    $('input[type="radio"]').prop('checked', false);
  });

});