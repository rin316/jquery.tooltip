/*!
 * main.js
 *
 */
 
(function ($, window, undefined) {
	$(document).ready(function(){
		$('#sample1-1 > div').tooltip();
	});

	$(document).ready(function(){
		$('#sample1-2 > div').tooltip({
			referenceData: '.tooltipArea'
		});
	});

	$(document).ready(function(){
		$('#sample2-1 > div').tooltip({
			    tooltipClass: 'ui-tooltip'
			,   speed: 500 //{number} - animation speed
			,   direction: 's' //{string} - 'n,s,w,e' ツールチップを表示する東西南北の方角
			,   fixPos: 10 //{number} - tooltipの周りに付く矢印の高さ
		});
	});



})(jQuery, this)
