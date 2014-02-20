/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.inputcategory
*	Sobreescribe news.inputform
*	Genera una ventana de diálogo para introducir una categoría
*
*********************************************************/

$(function ()
{
	var _self;
	
	$.widget('news.inputcategory', $.extend({}, $.news.inputform.prototype, {
		
		options:
		{
			id: idNews.id().inputform,
			title: messages.msg().inputtitlecat,
			label: 'cat',
			labeltext: messages.msg().inputsubtitlecat,
			input: 'linkcat',
			width: 300,
			accept: $.noop,
			callback: $.noop
		},
				
		_create: function()
		{
			_self = this;
			_self.options.accept = function() { _self._acceptButton() };
			$.news.inputform.prototype._create.call(_self);
		},
		
		_acceptButton: function()
		{
			var cat = _self.getResult();
			if (cat.length < 1)
				_self._setTip(messages.msg().errorNoCategory);
			else
			{
				if ($('[id="' + cat + '"]').length > 0)				
					_self._setTip(messages.msg().errorDuplicateCategory);
				else
				{
					_self._hide();
					_self._trigger('callback');
					_self._close();								
				}
			}
		},
	
	}));
}(jQuery));			