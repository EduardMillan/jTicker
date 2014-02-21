/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.ticker
*	Genera un ticker por cada feed recibido
*
*********************************************************/

(function($)
{
	var _self;
	var _base;
	var _cnt = 1;
	var _titleticker;
	var _me;
	var _refresh_callback;
	var _max_feed_loads = 100;
		
	$.widget('news.ticker', {
		
		options: 
		{
			url: null,
			callback: $.noop
		},
		
		_init: function()
		{
			_self = this;
			if (_self.options.url !== null)
			{			
				_base = _self.element;
				_self._idx = genKey();
				_self._selector = idNews.id().container + _self._idx;
				_self._callback = function (TotalFeed) { _self._loadPosts(TotalFeed); }
				_self._loadFeed(_self.options.url);
			}
		},
		
		_setOption: function(name, value)
		{
    		$.Widget.prototype._setOption.apply(this, arguments);			
			switch (name)
			{	//	Si cambia la url (parametro 1) callback = null, si existe callback se inicializa en siguiente llamada
				//	Esta operación evita llamadas recursivas al mismo callback
				case 'url': this.options.callback = $.noop;
							break;
			}
		},
		
		//	Se crean los divs container, origin, capusle, nest y ticker
		
		_createTicker: function()
		{
			$(_base).append(
				$('<div/>', {
					class: classNews.cssclass().container + ' ' + uiClass.ui().container,
					id: _self._selector,
				}).append(
					$('<div/>', {
						class: classNews.cssclass().origin + ' ' + uiClass.ui().origin,
						id: idNews.id().origin + _self._idx,
					}),
					$('<div/>', {
						class: classNews.cssclass().capsule  + ' ' + uiClass.ui().capsule,
						id: idNews.id().capsule + _self._idx,
					}).append($('<div/>', {
							class: classNews.cssclass().nest,
							id: idNews.id().nest + _self._idx,
						}).append($('<div/>', {
								class: classNews.cssclass().ticker,
								id: idNews.id().ticker + _self._idx,
							})
						)				
					)
				)
			);
			$(_base).tooltip({ hide: {duration: 1000 }});
		},
		
		//	Llamada al API de Google para cargar el feed
		
		_loadFeed: function(url)
		{
			var feed = new google.feeds.Feed(url);
			feed.setNumEntries(_max_feed_loads);
			feed.load(function(TotalFeed) { _self._callback(TotalFeed); });			
		},
		
		//	Se genera el ticker si existen feeds y se llama al callback del usuario (si existe)
		
		_loadPosts: function(TotalFeed)
		{
			if (TotalFeed.feed.entries.length > 0)
			{
				_self._createTicker();
				_self._processFeed(TotalFeed);	
			}
			_self._trigger('callback');
		},
		
		//	Se genera cada span news-header para titular y resumen. Si repeat == true se marca el span como inicio de la copia de la lista de titulares
		
		_procesaEntradas: function(TotalFeed, iframe, favicon, idxcode, repeat)
		{
			var cancelRepeat = function() { repeat = false; return idNews.id().header + idxcode; };
			var spanwidth = 0;
			
			$.each(TotalFeed.feed.entries, function (idx, val) {
				var href = $('<a/>', {
							id: commons.label().urltitle + idxcode + '-' + _cnt,
							href: val.link,
							text: decodeEntities(val.title),
							target: '_blank'
						});
				$(iframe).append($('<span/>', {
						class: classNews.cssclass().header,
						id: ((repeat) ? cancelRepeat() : commons.label().spantitle + idxcode + '-' +  _cnt),
					}).append(
						$('<img/>', {
							class: classNews.cssclass().favicon_thumb,
							src: favicon
						}),					
						$(href)
					));
//				$('#url' + _idx + idx).attr('title', decodeEntities(val.content));	//	Sin decode aparece el formato HTML, con decode solo textos
				$('#' + commons.label().urltitle + idxcode + '-' + _cnt).attr('title', val.content);
				spanwidth += $('#' + commons.label().spantitle + idxcode + '-' + _cnt++).width();
			});	
			return spanwidth;		
		},
		
		//	Se genera el título y favicon del feed y se lla a _procesaEntradas() para crear la lista de titulares
		
		_processFeed: function(TotalFeed)
		{
			_self._selector = '#' + _self._selector;
			iframe = $(_self._selector).find('#' + idNews.id().ticker + _self._idx);
			var favicon = TotalFeed.feed.link.replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
			
			_titleticker = decodeEntities(TotalFeed.feed.title);
			$(_self._selector).children('#' + idNews.id().origin + _self._idx).append(
				$('<a/>', {
					href: TotalFeed.feed.link,
					target: '_blank'
				}).append(
					$('<img/>', {
						class: classNews.cssclass().favicon,
						src: favicon
					}),
					$('<span/>', {
						text: decodeEntities(TotalFeed.feed.title)
					}).css('position', 'absolute').css('float', 'left')
				)
			)			
			var wd = _self._procesaEntradas(TotalFeed, iframe, favicon, _self._idx, false);	
			for (i = 0; i < ~~(($('.' + classNews.cssclass().container).width() * 2) / wd) + 1; i++)
				_self._procesaEntradas(TotalFeed, iframe, favicon, _self._idx, (i == 0));
			_self._activaScroll();
		},

		_activaScroll: function()
		{
			if (DYN_WEB.Scroll_Div.isSupported())
			{
				DYN_WEB.Event.domReady( function()
				{
					var wndo2 = new DYN_WEB.Scroll_Div(idNews.id().capsule + _self._idx, idNews.id().nest + _self._idx);
					wndo2.makeSmoothAuto( {axis: 'h', bRepeat: true, repeatId: idNews.id().header + _self._idx, speed: 60, bPauseResume: true} );
				});
			}
		},
		
		//	Estas funciones se usan en jTicker
		
		idTicker: function()
		{
			return _self._selector;
		},
		
		titleTicker: function()
		{
			return _titleticker;
		},
		
		//	Funciones para refrescar el contenidodel ticker
		
		_feedRefresh: function(TotalFeed)
		{
			var iframe = $(_me).find('.' + classNews.cssclass().ticker);
			var favicon = $(_me).children('.' + classNews.cssclass().origin).children('a').children('img').attr('src');
			var idx = $(iframe).attr('id').substr(idNews.id().ticker.length);
			var wd = _self._procesaEntradas(TotalFeed, iframe, favicon, idx, false);	
			for (i = 0; i < ~~(($('.' + classNews.cssclass().container).width() * 2) / wd) + 1; i++)
				_self._procesaEntradas(TotalFeed, iframe, favicon, idx, (i == 0));
//			_self._activaScroll();	//	No hace falta reactivar scroll, sigue activo y se usan los mismos id's
			_refresh_callback();
		},
		
		feedRefresh: function(callback)
		{
			_me = this.element;
			_refresh_callback = callback;
			$(_me).find('.' + classNews.cssclass().ticker).children('.news-header').remove();
			_self._callback = function(TotalFeed) { _self._feedRefresh(TotalFeed); };
			_self._loadFeed($(_me).attr('feedurl'));
		}
		
	});
}(jQuery));