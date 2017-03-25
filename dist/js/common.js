new WOW().init();
$(document).ready(function() {
var textForm = $('.footer__form');
var submitButton = $('.footer__submit');

$(textForm).keyup(function() {
	var textValue = $(textForm).val();
	if(textValue.length>0){ 
		$(submitButton).removeAttr('disabled');
	}
	else {
		$(submitButton).attr('disabled', 'disabled')
	}
	// var textValue = $(this).val();
	// if(textValue.length>0) {
	// 	$(this).css("background-color", "red");
	// }
	// else {
	// 	$(this).css("background-color:", "green");
	// }
 // // проверка значения input( $( this ).val() )

});
});



