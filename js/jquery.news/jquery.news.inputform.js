/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.inputform
*	Clase base para generar formularios de entrada de datos
*
*********************************************************/

$(function ()
{
	var _self;
	
	$.widget('news.inputform', {
		
		options:
		{
			id: '',
			title: '',
			label: '',
			labeltext: '',
			input: '',
			width: 300,
			accept: $.noop,
		},
		
		_create: function()
		{
			_self = this;
			_self._createForm(_self.element);
		},
		
		_createForm: function(base)
		{
			$(base).append(
				$('<div/>', {
					id: _self.options.id,
					title: _self.options.title
				}).append(
					$('<p/>', {
						class: classNews.cssclass().inputvalidate,
						id: idNews.id().inputvalidate
					}),
					$('<form/>', {
					}).append(
						$('<fieldset/>', {
						}).append(
							$('<label/>', {
								for: _self.options.label,
								text: _self.options.labeltext
							}),
							$('<input/>', {
								type: 'text',
								name: _self.options.input,
								id: _self.options.input,
								class: 'text ui-widget-content ui-corner-all'
							})
						)
					)						
				)					
			);
//			var h = $('#' + _self.options.id).height() + $('#' + _self.options.id).children('form').height() + $('#' + _self.options.id).children('p').height();
			if ($('[class="' + classNews.cssclass().mainmenu + '"]').length > 0)
				var root = $('.' + classNews.cssclass().mainmenu);
			else
				var root = $('#' + idNews.id().tickertabs);				
			$('#' + _self.options.id).dialog({
				autoOpen: false,
				height: 220,
				width: _self.options.width,
				modal: true,
				position: [$(root).position().left + ($(root).outerWidth() - _self.options.width) / 2, $(root).position().top + 100],
				buttons: _self._buttons(),
      			close: function() {
					_self.destroy();
      			}
    		});	
			$('#' + _self.options.id).dialog('open');		
		},
		
		_buttons: function()
		{
			var buttons = {};
			buttons[messages.msg().baceptar] = function () { _self.options.accept() };
			buttons[messages.msg().bcancel] = function () { $(this).dialog('close'); };
			return buttons;				
		},		
		
		_setTip: function(txt)
		{
			$('#' + idNews.id().inputvalidate).text(txt).addClass('ui-state-highlight');
		},
		
		_close: function()
		{
			$('#' + _self.options.id).dialog('close');
		},
		
		_hide: function()
		{
			$('#' + _self.options.id).hide();
		},
		
		getResult: function()
		{
			return $('#' + _self.options.input).val();
		},
		
		destroy: function()
		{
			$('#' + _self.options.id).remove();
			$.Widget.prototype.destroy.call(_self);			
		}
		
	});
}(jQuery));			