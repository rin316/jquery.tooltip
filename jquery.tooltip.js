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
'use strict'

var Tooltip
	,DEFAULT_OPTIONS
	;

/**
 * DEFAULT_OPTIONS
 */
DEFAULT_OPTIONS = {
	 referenceData: 'title' //{string} (title | selector) - data参照元
	,tooltipClass: 'ui-tooltip' //{string} (ui-tooltip) - 作成されるtooltipに付与するclass name
	,hideReferenceData: false //{boolean} (true | false) - true: tooltip作成の参照元になるreferenceData要素を隠す 'title'の時は何もしない
	,speed: 200 //{number} (0 | 200)milli sec - animation speed
	,direction: 'n' //{string} (n | s | w | e) - tooltipを表示する東西南北の方角
	,fixPos: 10 //{number} (10 | 100)px - tooltipの周りに付く矢印の高さ
};

/**
 * Tooltip
 */
Tooltip = function ($element, options) {
	var self = this;

	self.o = $.extend({}, DEFAULT_OPTIONS, options);

	self.$element = $element;
	//tooltip内に生成するcontents
	self.contents = (function () {
		var $contents;
		if (self.isTitle()) {
			//referenceData が'title'であればtitle要素を返す
			return self.$element.attr('title');
		} else {
			//referenceDataが'title'以外であれば、$element内からreferenceData要素を探す
			$contents = self.$element.find( $(self.o.referenceData));
			return ($contents.size())
				//referenceData要素が見つかればそのまま返す。
				? $contents
				//見つからなければdocument全体からreferenceData要素を探す
				: $(self.o.referenceData);
		}
	})();

	self.init();
};//Tooltip


/**
 * Tooltip.prototype
 */
(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		var self = this;
		// (hideReferenceData:true && referenceData: 'title'以外) であれば、referenceData要素を隠す
		(self.o.hideReferenceData && ! self.isTitle())
			? self.contents.hide()
			: null;
		//mouseenter, mouseleave Event
		self.$element.on({
			'mouseenter':function(){
				self.createElement();
				self.setClass();
				self.setTitle('remove');
				self.setContents();
				self.getPos();
				self.setPos();
				self.animate('show');
			},
			'mouseleave':function(){
				self.setTitle('unRemove');
				self.animate('hide');
				//create element not remove
			}
		});
	};

	/**
	 * isTitle
	 * DEFAULT_OPTIONS の referenceData が'title'であればtrueを、それ以外であればfalseを返す
	 */
	fn.isTitle = function () {
		var self = this;
		return (self.o.referenceData === 'title') ? true : false;
	};

	/**
	 * setTitle
	 * hoverしている間は$elementからtitle属性を削除し、ブラウザ標準のツールチップを表示させない。
	 * mouse outしたらtitleを付与し直す
	 */
	fn.setTitle = function (titleState) {
		var self = this;
		if (self.isTitle()) {
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
	};

	/**
	 * createElement
	 * body直下にtooltipを作成。もし作成後であれば再作成せず処理を抜ける
	 */
	fn.createElement = function () {
		var self = this;
		if(! self.$tooltip) {
			self.$tooltip = $(
				 '<div class="' + self.o.tooltipClass + '">'
					+'<div class="' + self.o.tooltipClass + '-arrow"></div>'
				+'</div>'
			)
				.appendTo($('body'))
				.hide()
			;
		}
	};

	/**
	 * setClass
	 * 方角に応じたclassをtooltipにset
	 */
	fn.setClass = function () {
		var self = this;
		//class ui-tooltip-directoin-* を正規表現で削除
		self.$tooltip.removeClass(function (index, css) {
			var matchText = new RegExp(self.o.tooltipClass + "-direction-" + ".*");
			return (css.match(matchText) || []).join(' ');
		});
		self.$tooltip.addClass(self.o.tooltipClass + '-direction-' + self.o.direction);
	};

	/**
	 * setContents
	 * tooltip内にcontentsを生成する
	 */
	fn.setContents = function () {
		var self = this;
		if (self.isTitle()) {
			self.$tooltip.find('.' + self.o.tooltipClass + '-contents').remove();
			//$tooltip内にtitleの入ったcontentsを生成
			self.$tooltip
				.prepend('<div class="' + self.o.tooltipClass + '-contents">' + self.contents + '</div>');
		} else {
			self.$tooltip.find('.' + self.o.tooltipClass + '-contents').remove();
			//$tooltip内にreferenceData要素の入ったcontentsを生成
			self.$tooltip
				.prepend('<div class="' + self.o.tooltipClass + '-contents"></div>')
				.children().eq(0)
				.prepend(self.contents.clone().show())
			;
		}
	};

	/**
	 * getPos
	 * 各elementのsize,offsetを取得
	 */
	fn.getPos = function () {
		var self = this;
		self.elmLeft = self.$element.offset().left;
		self.elmTop = self.$element.offset().top;
		self.elmW = self.$element.outerWidth();
		self.elmH = self.$element.outerHeight();
		self.tooltipW = self.$tooltip.outerWidth();
		self.tooltipH = self.$tooltip.outerHeight();
	};

	/**
	 * setPos
	 * 方角に応じたpositionをcssにset
	 */
	fn.setPos = function () {
		var self = this
			,   prop = {}
			;
		switch (self.o.direction) {
			//south
			case 's':
				prop.top = self.elmTop + self.elmH + self.o.fixPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//TODO 未実装 West
			case 'w':
				prop.top = self.elmTop + self.elmH + self.o.fixPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//TODO 未実装 East
			case 'e':
				prop.top = self.elmTop + self.elmH + self.o.fixPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
			//default North
			default:
				prop.top = self.elmTop - self.tooltipH - self.o.fixPos;
				prop.left = self.elmLeft + (self.elmW / 2) - (self.tooltipW / 2);
				break;
		}
		self.$tooltip.css(prop);
	};

	/**
	 * animate
	 * fadeアニメーションで表示・非表示を切り替える
	 * @param {string} display - 'show'の時は表示, 'hide'の時は非表示にする
	 */
	fn.animate = function (display) {
		var self = this;
		switch (display) {
			case 'show':
				self.$tooltip.stop(true, true).fadeIn(self.o.speed);
				break;

			case 'hide':
				self.$tooltip.stop(true, true).fadeOut(self.o.speed);
				break;
		}
	};
})(Tooltip.prototype);//Tooltip.prototype


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
