/*!
 * main.js
 *
 */
 
(function ($, window, undefined) {
	$(document).ready(function(){
		$('#sample1-1 > p').tooltip();
	});

	$(document).ready(function(){
		$('#sample2-1 > p').tooltip({
		    tooltipClass: 'mod-tooltip'
		,   speed: 200 //{number} - animation speed
		,   direction: 's' //{string} - 'N,S,W,E' ツールチップを表示する東西南北の方角
		});
	});



})(jQuery, this)
