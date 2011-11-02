/**
 * UI.Elements
 *
 * @version      0.2
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         https://github.com/5509/ui.elements
 *
 * 2011-11-03 03:04
 */
(function($, window, document, undefined) {

	var UIElements = function($elm, options) {

		var self = this;

		if ( self === window || typeof self === 'function' ) {
			return new UIElements($elm, options);
		}

		self.namespace = 'UIElements';
		// this is also prefix
		self.$elm = $elm;
		self._init(options);
	};

	UIElements.prototype = {
		_init: function(options) {
			var self = this;
			$.each(options, function(val) {
				if ( !this.length ) return;
				$.each(this, function() {
					self._create(val, this.name);
				});
			});
		},
		_create: function(type, name) {
			console.log('UI created as ' + type);
			var self = this,
				_$elms = undefined;
			type = '_' + type;

			self[type].$elms = self.$elm.find('[name="' + name + '"]');
			_$elms = self[type].$elms;

			self[type].create(_$elms);
		},
		_checkbox: {
			name: 'checkbox',
			state: false,
			sets: [],
			create: function($elms) {
				var self = this;
				$elms.each(function(i) {
					var $this = $(this),
						$UIElm = $('<span class="' + self.name + '"></span>');

					self.sets.push({
						$orig: $this,
						$UIElm: $UIElm,
						state: this.checked,
						id: i
					});

					if ( !$UIElm ) return;

					$this.parent().addClass('UIElm-check-label');

					$this.click(function() {
						$this.trigger('check-trigger');
					});

					$this.bind('check-trigger', function() {
						if ( $this.prop('checked') ) {
							$UIElm.addClass('checked');
						} else {
							$UIElm.removeClass('checked');
						}
					});

					if ( $this.prop('checked') ) {
						$UIElm.addClass('checked');
					}
					$this.hide().after($UIElm);
				});
			}
		},
		_radio: {
			name: 'radio',
			state: false,
			sets: [],
			checkOff: function() {
				var self = this;
				$.each(self.$elms, function() {
					$(this).trigger('radio-check-off');
				});
			},
			create: function($elms) {
				var self = this;
				$elms.each(function(i) {
					var $this = $(this),
						$UIElm = $('<span class="' + self.name + '"></span>');

					self.sets.push({
						$orig: $this,
						$UIElm: $UIElm,
						state: this.checked,
						id: i
					});

					if ( !$UIElm ) return;

					$this.parent().addClass('UIElm-radio-label');

					$this.click(function() {
						self.checkOff();
						$this.trigger('radio-trigger');
					});

					$this.bind({
						'radio-trigger': function() {
							if ( $this.prop('checked') ) {
								$UIElm.addClass('checked');
							} else {
								$UIElm.removeClass('checked');
							}
						},
						'radio-check-off': function() {
							$UIElm.removeClass('checked');
						}
					});

					if ( $this.prop('checked') ) {
						$UIElm.addClass('checked');
					}
					$this.hide().after($UIElm);
				});
			}
		},
		_select: {
			name: 'select',
			state: false,
			strLength: 10,
			sets: [],
			show: function() {
				var self = this;
				self.$selectBox.stop(true, true).slideDown(100);
				self.$box.addClass('UIElm-select-show');
				self.$select.trigger('show');

				return self;
			},
			hide: function() {
				var self = this;
				self.$selectBox.stop(true, true).slideUp(100);
				self.$box.removeClass('UIElm-select-show');
				self.$select.trigger('hide');

				return self;
			},
			value: function(val) {
				return val.length > this.strLength ? this.trimStr(val) : val;
			},
			setVal: function(val, text) {
				var self = this;
				self.$select.val(val);
				self.$selectDisp.html(
					'<span>' + self.value(text) + '</span>'
				);
				self.$select.trigger('selected');

				return self;
			},
			trimStr: function(str) {
				var self = this;
				return str.substring(0, self.strLength) + '...';
			},
			events: function() {
				var self = this;
				$(document).click(function(event) {
					var _target = event.target.getAttribute('data-type') ? event.target : event.target.parentNode,
						_val = undefined,
						_type = undefined,
						_text = undefined;

					if ( 'getAttribute' in _target ) {
						_type = _target.getAttribute('data-type');
					}
					if ( !_type || !/UIElm-select/.test(_type) ) {
						self.hide();
						return;
					}

					event.preventDefault();
					_val = _target.getAttribute('data-val');
					_text = _target.innerHTML.replace('<span>', '').replace('</span>', '');

					switch ( _type ) {
					case 'UIElm-select-text':
						if ( self.$selectBox.is(':hidden') ) {
							self.show();
						} else {
							self.hide();
						}
						break;
					case 'UIElm-select-option':
						self.setVal(_val, _text).hide();
						self.$selectBoxOptions.removeClass('current');
						_target.className = 'current';
						break;
					}
				});
			},
			create: function($elm) {
				var self = this,
					$box = $elm.parent().addClass('UIElm-select-box'),
					options = $elm.find('option'),
					defaultVal = options.filter(function() {
						return this.selected
					}).text();

				self.$select = $elm.hide();
				self.$box = $box;
				self.$selectDisp = $('<a></a>', {
					href: 'javascript:void(0)',
					'data-type': 'UIElm-select-text',
					'class': 'UIElm-select',
					html: '<span>' + self.value(defaultVal) + '</span>'
				});
				self.$selectBox = (function() {
					var html = [],
						optionsLen = options.length,
						i = 0;

					html.push('<ul class="UIElm-select-option">');
					for ( ; i < optionsLen; i++ ) {
						html.push(
							'<li>',
								'<a href="#"',
								'   data-val="' + options[i].value + '"',
								'   data-type="UIElm-select-option"',
								'   class="' + (options[i].selected ? 'current' : '') + '"',
								'>',
									$(options).eq(i).text(),
								'</a>',
							'</li>'
						);
					}
					html.push('</ul>');

					return $(html.join('')).hide();
				}());

				self.$box.append(
					self.$select,
					self.$selectDisp,
					self.$selectBox
				);

				self.events();
				self.$selectBoxOptions = self.$selectBox.find('a');
			}
		}
	};

	$.fn.UIElements = function(options) {
		return UIElements(this, options);
	};

}(jQuery, this, this.document));