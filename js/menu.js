// $( document ).ready(function() {
//  $( ".logo" ).click(function( event ) {
//  				$(this).animate({
//  				top:"+=200"
//  				},5000);
//  				/*$(this).addClass("test");*/
//         alert( "Thanks for visiting!" );
 
//     });

// });
// /*				var admin;
// 				var name;
// 				name = "Василий";
// 				admin = name;
// 				alert(admin);*/
// 		var planet = "Земля";
// 		var user = "Петя";
function range(start, end, step) {
	if (step == null) step =1;
	var arr=[];
	if( step>0) {
		for(var i = start; i<=end; i+=step)
			arr.push(i);

	}
	else {
		for(var i = start; i>=end; i+= step)
			arr.push(i);
	}
	return arr;
}
function sum(arr) {
	var total = 0;
	for(var i=0; i< arr.length; i++) 
			total += arr[i];

	return total;
}
alert(sum(range(10,150,7)));