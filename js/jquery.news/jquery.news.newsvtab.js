/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.newsvtab
*	Sobreescribe news.stack
*	Permite usar un array de feeds y crea tickerremovable para poderlos eliminar
*	Gestiona:
*	-	eliminación de tickers
*	-	activación de tabs
*
*********************************************************/

(function($)
{
	var _self;
	var _callback;
	var _base;
	var _f = function(self) { return function() { self._insertTab(); }};
	var _ticker = function(base, rssurl, funcioncb) { return function() { $(base).tickerremovable({url: rssurl, callback: funcioncb }) }};
	
	$.widget('news.newsvtab', $.extend({}, $.news.stack.prototype, {
		
		options: 
		{
			title: null,
			stack: null,
			callback: $.noop
		},
		
		_create: function()
		{
			_self = this;
			_base = _self.element;
			_callback = _self.options.callback;
			_self.options.callback = _f(_self);
			$.news.stack.prototype._create.call(_self);
		},
		
		_add: function()
		{
			return ((_self._idx < _self.options.stack.length) ? _ticker(_base, _self.options.stack[_self._idx++], _self._add()) : _self.options.callback);
		},		
		
		_insertTab: function()
		{
			$('#' + idNews.id().tickertabs + ' ul.' + classNews.cssclass().tickertabsul).append(
					$('<li/>', { 
						id:  removeSpaces(_self.options.title)
					}).addClass('ui-corner-right').append(
						$('<a/>', {
							href: '#' + $(_base).attr('id'),
							text: _self.options.title
						})						
					)
				);
			_callback();
		},
	
		doRemove: function(id)
		{
			$('#' + idNews.id().tickertabs + ' ul').children('#' + removeSpaces(id)).remove();
		},
		
		doActivate: function(element)
		{
			var idx = $(element).next('.' + classNews.cssclass().ui);
			if (idx.length < 1) idx = $(element).prev('.' + classNews.cssclass().ui);
			if (idx.length > 0)
				$('#' + idNews.id().tickertabs).tabs('option', 'active', $('#' + idNews.id().tickertabs + ' ul').children('#' + $(idx).attr('category')).index());
			else
				$('#' + idNews.id().tickertabs).hide();
		},
		
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		}		
		
	}));
}(jQuery));				