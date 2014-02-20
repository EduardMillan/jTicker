/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerstack
*	Permite crear un array de feeds para enviarlos a news.ticker uno a uno
*
*********************************************************/

(function($)
{
	var _self;
	var _base;
//	var _idx = 0;
	var _ticker = function(base, rssurl, funcioncb) { return function() { $(base).ticker({url: rssurl, callback: funcioncb }) }};
	
	$.widget('news.stack', {
		
		options: 
		{
			stack: null,
			callback: $.noop,
		},		
		
		_create: function()
		{
			_self = this;
			_base = this.element;
			_self._idx = 0;
			if ($.isArray(_self.options.stack) && (_self.options.stack.length > 0))
			{
				_self._add()();
			}
			else
				_self.options.callback();			
				
		},

		_add: function()
		{
			return ((_self._idx < _self.options.stack.length) ? _ticker(_base, _self.options.stack[_self._idx++], _self._add()) : _self.options.callback);
		},
		
	
		numTickers: function()
		{
			return _self._idx;
		},
		
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		}		
	});
}(jQuery));		