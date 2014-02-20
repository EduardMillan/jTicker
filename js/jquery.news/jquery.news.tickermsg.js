/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickermsg
*	Abre una ventana de mensaje y muestra el texto contenido en options.text
*
*********************************************************/

$(function ()
{
	var _self;
	
	$.widget('news.tickermsg', {
		
		options:
		{
			title: null,
			text: null,
		},
		
		_create: function()
		{
			_self = this;
			if ($.isArray(_self.options.text))
				_self._createForm();
		},
		
		_createForm: function()
		{
			var base = $(_self.element);
			$(base).append(
				$('<div/>', {
					id: idNews.id().confirmation,
					title: _self.options.title
				})
			);
			for (idx = 0; idx < _self.options.text.length; idx++)
			{
				$('#' + idNews.id().confirmation).append(
					$('<p/>', {
						text: _self.options.text[idx]
					}).prepend(
						$('<span/>', {
							class: 'ui-icon ' + ((idx == 0) ? uiClass.ui().balloon : uiClass.ui().blank)
						}).css('float', 'left').css('margin', '0 7px 20px 0')
					)
				)
			}
			var h = _self.options.text.length * 25 + 200;
			$('#' + idNews.id().confirmation).dialog({
				resizable: false,
      			height: h,
				width: 300,
      			modal: true,
      			buttons: _self._buttons(),
      			close: function() {
					_self.destroy();
      			}				
    		});			
		},
		
		_buttons: function()
		{
			var buttons = {};
			buttons[messages.msg().bclose] = function () { $(this).dialog('close'); };
			return buttons;				
		},		
		
		destroy: function()
		{
			$('#' + idNews.id().confirmation).remove();
			$.Widget.prototype.destroy.call(_self);			
		}
				
	});
}(jQuery));			