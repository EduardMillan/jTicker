/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerui
*	Genera un tabber vertical añadiéndole funcionalidad para reordenar el contenido (sortable) o cambiar de tamaño (resizable)
*	Gestiona:
*	-	jQuery UI sortable
*	-	jQuery UI resizable (no satisfactorio aún)
*
*********************************************************/

(function($)
{
	var _self;
	var _selector;
	var _selectorHeight;
	var _selectorWidth;
	var _position;
	
	$.widget('news.tickerui', {

		options: 
		{
			stack: null,			//	Array de feeds
			sortable: false,
			resizable: false,
			callback: $.noop
		},		
		
		_create: function()
		{
			_self = this;
			_selector = idNews.id().ui + genKey();
			_self._createContainer(this.element);
			_self._cargaStack();
		},
		
		_cargaStack: function()
		{
			$('#' + _selector).stack({ stack: _self.options.stack, callback: function() { _self._doOptions() }});
		},
		
		_createContainer: function(base)
		{
			$(base).append(
				$('<div/>', {
					class: classNews.cssclass().ui,
					id: _selector
				}));
//			$('#' + _selector).css('visibility', 'hidden');
		},
				
		_doOptions: function()
		{
			if (_self.options.resizable)
				_self._doResizable($('#' + _selector).stack().stack('numTickers'));				
			if (_self.options.sortable)
			{
				$('#' + _selector).sortable({
					cancel: '.' + classNews.cssclass().menu,
					start: function(event, ui) {
						_position = ui.item.index();
					},
					stop: function(event, ui) {
						if (_position != ui.item.index())
							$(this).tickerjson().tickerjson('sortFeed', ui.item.parent().attr('category'), ui.item.attr('feedurl'), ui.item.index());
					}
				});
			}
//			$('#' + _selector).css('visibility', 'visible');
			_selectorHeight = $('#' + _selector).height();
			_selectorWidth = $('#' + _selector).width();
			_self._trigger('callback');
		},
		
		_doResizable: function(numtickers)
		{
			$('#' + _selector).resizable({
//				handles: 'no-icon',
//				alsoResize: '.' + classNews.cssclass().container,
//				aspectRatio: true
				resize: function(event, ui) {
					var h = (($('#' + _selector).height() - ($('.' + uiClass.ui().resizable).height() * 2.8)) / numtickers);
					$(this).children('.' + classNews.cssclass().container).height(h + 'px');
				},
				stop: function(event, ui) {
					var h = $(this).height() / _selectorHeight;
					var w = $(this).width() / _selectorWidth;
					$(this).children('.' + classNews.cssclass().container).find('.' + classNews.cssclass().origin).css({
					        'transition': 'all 0.2s',
					        'transform': 'scaleY(' + h + ')',
				    });					
					$(this).children('.' + classNews.cssclass().container).find('.' + classNews.cssclass().nest).css({
					        'transition': 'all 0.2s',
					        'transform': 'scaleY(' + h + ')',
				    });						
				}
			});
/*			
			$('.' + classNews.cssclass().container).resizable({
				handles: 'no-icon',				
				alsoResize: '#' + _selector + ', ' + '.' + classNews.cssclass().container,
				maxWidth: $('.' + classNews.cssclass().container).width(),
				maxHeight: $('.' + classNews.cssclass().container).height(),
				minHeight: $('.' + classNews.cssclass().container).height()
			});		
*/			
		},
		
		_getSelector: function()
		{
			return _selector;
		},
		
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		},
		
	});
}(jQuery));		