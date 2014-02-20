/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickertabber
*	Llama a tickeruitabber para generar el tab vertical con los feeds
*	Gestiona:
*	-	carga los feeds almacenados localmente (si los hay)
*	-	añade categoría (llamada a tickeruitabber)
*	-	elimina todo
*	-	refresca los feeds
*
*********************************************************/

(function($)
{
	var _self;
	var _selector;
	var _base;
	var _timer;
	var _time_refresh = 12; //	refresco en horas
	var _fRefresh = function(base, funcioncb) { return function() { $(base).ticker().ticker('feedRefresh', funcioncb) }};
	
	$.widget('news.tickertabber', {
		
		options: 
		{
			rss: 
			{
				category: null,
				stack: null
			},			
			sortable: false,
			callback: $.noop
		},	
		
		_create: function()
		{
			_self = this;
			_self._idx = -1;
			_base = _self.element;
			_self._createTabber(_base);
//			if ((_self.options.rss == null) || (_self.options.rss.category == null))
			if (!($.isArray(_self.options.rss)))
				_self._loadData();
//			if ((_self.options.rss !== null) && (_self.options.rss.length > 0))
			if ($.isArray(_self.options.rss) && (_self.options.rss.length > 0))
				_self._cargaStack();
		},
		
		_createTabber: function(base)
		{
			$(base).append(
				($('<div/>', {
					id: idNews.id().tickertabs
				})
            ));
			$('#' + idNews.id().tickertabs).append($('<ul/>', {
					class: classNews.cssclass().tickertabsul
				 })
			);
		},		
		
		_cargaStack: function()
		{
			_self._idx++;
			if (_self._idx < _self.options.rss.length)			
				$('#' + idNews.id().tickertabs).tickeruitabber({title: _self.options.rss[_self._idx].category, stack: _self.options.rss[_self._idx].stack, sortable: _self.options.sortable, callback: function() { _self._cargaStack() }});
			else
				_self._setClasses();
		},
		
		_setClasses: function()
		{
			$('#' + idNews.id().tickertabs).tabs().addClass('ui-tabs-vertical');
			$('.' + classNews.cssclass().tickertabsul + ' li').removeClass('ui-corner-top').addClass('ui-corner-left');
			$('.' + classNews.cssclass().container).removeClass('ui-corner-all').addClass('ui-corner-bl ui-corner-tr ui-corner-br');
			$('#' + idNews.id().tickertabs).tabs('refresh');
			$('#' + idNews.id().tickertabs).show();
			_timer = setInterval(function() { _self._refresh(0)() }, _time_refresh * 3600000);
			_self._trigger('callback');
		},
		
		_loadData: function()
		{
			var data = $('#' + idNews.id().tickertabs).tickerjson().tickerjson('loadData');
//			alert(JSON.stringify(data));
			_self.options.rss = data;
		},
		
		_addTab: function()
		{
			var categoria = $('#' + idNews.id().tickertabs).inputcategory().inputcategory('getResult');
			$('#' + idNews.id().tickertabs).tickerjson({ category: categoria });
//	 Se envia stack: null o no funciona (stack al widget stack como array (?))	
			$('#' + idNews.id().tickertabs).tickeruitabber({title: categoria, stack: null, sortable: _self.options.sortable, callback: function() { _self._setClasses(); }});			
		},
		
		addTab: function()
		{
			$('#' + idNews.id().tickertabs).inputcategory({callback: function() { _self._addTab() }});
		},
		
		_removeAll: function()
		{
			$('#' + idNews.id().tickertabs).tickerjson().tickerjson('clearData');
			$('#' + idNews.id().tickertabs).hide();
		},
		
		removeAll: function()
		{
			$('#' + idNews.id().tickertabs).tickerconfirm({ title: messages.msg().removefeedstitle, text: messages.msg().removefeedsconfirm + '?', callback: function() { _self._removeAll(); }});
		},
		
		_refresh: function(cnt)
		{
			var tickers = $('.' + classNews.cssclass().container);
			if (cnt < $(tickers).length)
				return _fRefresh($(tickers[cnt]), _self._refresh(cnt + 1));
		},
		
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		},	
		
		destroy: function()
		{
			clearInterval(_timer);
			$('#' + idNews.id().tickertabs).remove();
			$.Widget.prototype.destroy.call(_self);	
		}
		
	});
}(jQuery));			