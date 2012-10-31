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
			,   speed: 500 //{number} - animation speed
			,   direction: 's' //{string} - 'n,s,w,e' ツールチップを表示する東西南北の方角
			,   fixedArrowPos: 10 //{number} - tooltipの周りに付く矢印の高さ
		});
	});



})(jQuery, this)
