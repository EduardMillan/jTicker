/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerconfirm
*	Muestra una ventana con mensaje para confirmar
*
*********************************************************/

$(function ()
{
	var _self;
	
	$.widget('news.tickerconfirm', {
		
		options:
		{
			title: null,
			text: null,
			aditional: '',
			callback: $.noop
		},
		
		_create: function()
		{
			_self = this;
			_self._createForm();
		},
		
		_createForm: function()
		{
			var base = $(_self.element);
			$(base).append(
				$('<div/>', {
					id: idNews.id().confirmation,
					title: _self.options.title
				}).append(
					$('<p/>', {
						text: _self.options.text
					}).prepend(
						$('<span/>', {
							class: 'ui-icon ' + uiClass.ui().warning
						}).css('float', 'left').css('margin', '0 7px 20px 0')
					),
					$('<p/>', {
						text: _self.options.aditional
					})
				)
			);
//			var h = $('#' + idNews.id().confirmation).children('p').height() * ((_self.options.aditional.length > 0) ? 2 : 1);
			if ($('[class="' + classNews.cssclass().mainmenu + '"]').length > 0)
				var root = $('.' + classNews.cssclass().mainmenu);
			else
				var root = $('#' + idNews.id().tickertabs);			
			$('#' + idNews.id().confirmation).dialog({
				resizable: false,
      			height: 190,
				width: 500,
      			modal: true,
				position: [$(root).position().left + ($(root).outerWidth() - 500) / 2, $(root).position().top + 100],
      			buttons: _self._buttons(),
      			close: function() {
					_self.destroy();
      			}				
    		});			
		},
		
		_buttons: function()
		{
			var buttons = {};
			buttons[messages.msg().baceptar] = function () { 
				_self._trigger('callback');
			};
			buttons[messages.msg().bcancel] = function () { $(this).dialog('close'); };
			return buttons;				
		},		
		
		destroy: function()
		{
			$('#' + idNews.id().confirmation).remove();
			$.Widget.prototype.destroy.call(_self);			
		}
				
	});
}(jQuery));			