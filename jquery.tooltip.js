/*!
 * jquery.tooltip.js
 *
 * @varsion   1.0
 * @require   jquery.js
 * @create    2012-10-30
 * @modify    2012-10-31
 * @author    rin316 [Yuta Hayashi]
 * @link      https://github.com/rin316/jquery.tooltip/
 */
;(function ($, window, undefined) {

var Tooltip
	, DEFAULT_OPTIONS
	;

/**
 * DEFAULT_OPTIONS
 */
DEFAULT_OPTIONS = {
    tooltipClass: 'mod-tooltip'
,   speed: 200 //{number} - animation speed
,   direction: 'n' //{string} - 'n,s,w,e' ツールチップを表示する東西南北の方角
,   fixedArrowPos: 10 //{number} - tooltipの周りに付く矢印の高さ
};

/**
 * Tooltip
 */
Tooltip = function ($element, options) {
	var self = this;

	self.o = $.extend({}, DEFAULT_OPTIONS, options);

	self.$element = $element;
	self.elmLeft = self.$element.offset().left;
	self.elmTop = self.$element.offset().top;
	self.elmW = self.$element.outerWidth();
	self.elmH = self.$element.outerHeight();
	self.dataObj = self.$element.data();

	self.init();
};


/**
 * Tooltip.prototype
 */
Tooltip.prototype = {
	/**
	 * init
	 */
	init: function () {
		var self = this;

		//mouseenter, mouseleave Event
		self.$element.on({
			'mouseenter':function(){
				self.makeElement();
				self.setClass();
				self.setContents();
				self.tooltipW = self.$tooltip.outerWidth();
				self.tooltipH = self.$tooltip.outerHeight();
				self.setPos();
				self.animate('show');
			},
			'mouseleave':function(){
				self.animate('hide');
			}
		});
	}
	,

	/**
	 * makeElement
	 * body直下にtooltipを作成
	 */
	makeElement: function () {
		var self = this;
		if(! self.$tooltip) {
			self.$tooltip = $('<div class="' + self.o.tooltipClass + '">tooltip</div>')
				.appendTo($('body'))
				.hide()
			;
		}
	}
	,

	/**
	 * setClass
	 * 方角に応じたclassをtooltipにset
	 */
	setClass: function () {
		var self = this;

		self.$tooltip.removeClass('n s w e');
		self.$tooltip.addClass(self.o.direction);
	}
	,

	/**
	 * setContents
	 * tooltip内にhtmlのdata属性をset
	 * data属性のkeyをclassに、valueをテキストとしてset
	 */
	setContents: function () {
		var self = this;

		self.$tooltip.empty();
		$.each(self.dataObj, function(prop, value){
			//ハンドラーを除外
			if (this !== self){
				self.$tooltip.append('<div class="' + prop + '">' + value + '</div>');
			}
		});
	}
	,

	/**
	 * setPos
	 * 方角に応じたclassをset
	 */
	setPos: function () {
		var self = this
			,   prop = {}
			;

		//if south
		if (self.o.direction === 's'){
			prop.top = self.elmTop + self.elmH + self.o.fixedArrowPos;
			prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
			//TODO 未実装 if West
		} else if (self.o.direction === 'w'){
			prop.top = self.elmTop + self.elmH;
			prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
			//TODO 未実装 if East
		} else if (self.o.direction === 'e'){
			prop.top = self.elmTop + self.elmH;
			prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
			//default North
		} else {
			prop.top = self.elmTop - self.tooltipH - self.o.fixedArrowPos;
			prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
		}

		self.$tooltip.css(prop);
	}
	,

	/**
	 * animate
	 * fadeアニメーション
	 * @param {string} display - 'show'の時は表示, 'hide'の時は非表示にする
	 */
	animate: function (display) {
		var self = this;
		if (display === 'show'){
			self.$tooltip.stop(true, true).fadeIn(self.o.speed);
		} else if (display === 'hide'){
			self.$tooltip.stop(true, true).fadeOut(self.o.speed);
		}
		return self;
	}
	
};//Tooltip.prototype


/**
 * $.fn.Tooltip
 */
$.fn.tooltip = function (options) {
	return this.each(function () {
		var $this = $(this);
		$this.data('tooltip', new Tooltip($this, options));
	});
};//$.fn.Tooltip


})(jQuery, this);
