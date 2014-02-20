/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.inputrss
*	Sobreescribe news.inputform
*	Genera una ventana de diálogo para introducir un feed
*
*********************************************************/

$(function ()
{
	var _self;
	var _urlregexp = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	
	$.widget('news.inputrss', $.extend({}, $.news.inputform.prototype, {
		
		options:
		{
			id: idNews.id().inputform,
			title: messages.msg().inputfeedtitle,
			label: 'rss',
			labeltext: messages.msg().inputfeedsubtitle,
			input: 'linkrss',
			width: 400,
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
			var rss = _self.getResult();
			if (rss.length < 1)
				_self._setTip(messages.msg().errorNoURL);
			else
			{
				if (!(_urlregexp.test(rss)))
					_self._setTip(messages.msg().errorInvalidURL);
				else
				{
					_self._hide();
//	Se dispara close() despues del callback para poder leer el resultado (getResult) antes de destruir el formulario
					$(_self.element).tickerremovable({url: rss, callback: function() { _self.options.callback(); _self._close(); }});													
				}
			}
		},
		
	}));
}(jQuery));			