/*!
 * jquery.tooltip.js
 *
 * @varsion   1.0
 * @require   jquery.js
 * @create    2012-10-30
 * @modify    2012-11-06
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
	referenceData: 'title' //{string} (title | selector) - data参照元
,   tooltipClass: 'mod-tooltip' //{string}
,   speed: 200 //{number} (0 | 200) - animation speed
,   direction: 'n' //{string} (n | s | w | e) - ツールチップを表示する東西南北の方角
,   fixedArrowPos: 10 //{number} (10 | 100)px - tooltipの周りに付く矢印の高さ
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
	self.contents = (self.o.referenceData === 'title')
		? self.$element.attr('title')
		: self.$element.find( $(self.o.referenceData) );
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
				self.createElement();
				self.setClass();
				(self.o.referenceData === 'title')
					? self.setTitle('remove') : null;
				self.setContents();
				//contents生成後にtooltipのsizeを取得
				self.tooltipW = self.$tooltip.outerWidth();
				self.tooltipH = self.$tooltip.outerHeight();
				self.setPos();
				self.animate('show');
			},
			'mouseleave':function(){
				(self.o.referenceData === 'title')
					? self.setTitle('unRemove') : null;
				self.animate('hide');
				//create element not remove
			}
		});
	}
	,

	/**
	 * setTitle
	 * hoverしている間は$elementからtitle属性を削除し、ブラウザ標準のツールチップを表示させない
	 */
	setTitle: function (titleState) {
		var self = this;
		switch (titleState){
			//title属性を削除
			case 'remove':
				self.$element.attr('title', '')
				break
			//title属性を戻す
			case 'unRemove':
				self.$element.attr('title', self.contents)
				break
		}
	}
	,

	/**
	 * createElement
	 * body直下にtooltipを作成
	 */
	createElement: function () {
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
	 * tooltip内に$elementのtitle要素をtextとしてset
	 */
	setContents: function () {
		var self = this;
		switch (self.o.referenceData) {
			case 'title':
				self.$tooltip.empty();
				self.$tooltip
					.append('<div class="' + self.o.tooltipClass + '-contents">' + self.contents + '</div>');
				break;
			default:
				self.$tooltip.empty();
				self.$tooltip
					.append('<div class="' + self.o.tooltipClass + '-contents"></div>')
					.children().append(self.contents.clone())
				;
				break;
		}


	}
	,

	/**
	 * setPos
	 * 方角に応じたtooltip表示positionをset
	 */
	setPos: function () {
		var self = this
			,   prop = {}
			;
		switch (self.o.direction) {
			//south
			case 's':
				prop.top = self.elmTop + self.elmH + self.o.fixedArrowPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//TODO 未実装 West
			case 'w':
				prop.top = self.elmTop + self.elmH + self.o.fixedArrowPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//TODO 未実装 East
			case 'e':
				prop.top = self.elmTop + self.elmH + self.o.fixedArrowPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//default North
			default:
				prop.top = self.elmTop - self.tooltipH - self.o.fixedArrowPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
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
		switch (display) {
			case 'show':
				self.$tooltip.stop(true, true).fadeIn(self.o.speed);
				break;

			case 'hide':
				self.$tooltip.stop(true, true).fadeOut(self.o.speed);
				break;
		}
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
