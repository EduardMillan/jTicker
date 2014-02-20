/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickeruitabber
*	Sobreescribe news.tickerui
*	Genera un tabber vertical añadiéndole una barra con boton de menú desplegable
*	Gestiona:
*	-	añadir categorías
*	-	eliminar categoría
*	-	renombrar categoría
*
*********************************************************/

(function($)
{
	var _self;
	var _callback;
	
	$.widget('news.tickeruitabber', $.extend({}, $.news.tickerui.prototype, {
		
		options: 
		{
			title: null,		//	Categoría
			stack: null,		//	Array de feeds a cargar
			sortable: false,
			resizable: false,
			callback: $.noop
		},	
		
		_create: function()
		{
			_self = this;
		},
		
		_init: function()
		{	
			_self._modifyOptions();
			$.news.tickerui.prototype._create.call(_self);
		},
		
		_modifyOptions: function()
		{
			_callback = _self.options.callback;
			_self.options.callback = $.noop;
			_self.options.resizable = false;
		},
		
		_cargaStack: function()
		{
			var selector = $.news.tickerui.prototype._getSelector.call(_self);
			$('#' + selector).attr('category', _self.options.title);
			$('#' + selector).globalmenu({menu: [
				[messages.msg().addfeedtitle, function() { $('#' + selector).inputrss({ callback: function() { _self._insertJSON(selector) }} )}, uiClass.ui().addfeed],
				[messages.msg().renamecategorytitle, function() { $('#' + selector).inputcategory({ title: messages.msg().renamecategorytitle, callback: function() { _self._renameCategory(this) }})}, uiClass.ui().pencil],
				[messages.msg().removetitlecat, function() { $('#' + selector).tickerconfirm({ title: messages.msg().removetitlecat, text: messages.msg().removecatconfirm + ' ' + $('#' + selector).attr('category') + '?', callback: function() { _self._doRemove(this); } }) }, uiClass.ui().trash]
			]});
			$('#' + selector).newsvtab({title: _self.options.title, stack: _self.options.stack, callback: function() { _self._doOptions(); _callback(); }});
		},
		
		_insertJSON: function(selector)	//	inserta una categoria (tab)
		{
			var categoria = $('#' + selector).attr('category');
			var rss = $('#' + selector).inputrss().inputrss('getResult');
			$(this).tickerjson({ category: categoria, stack: Array(rss) });
		},
		
		_doRemove: function(me)	//	Elimina toda una categoría (tab)
		{
			var categoria = $(me).attr('category');
			
			$(this).tickerjson().tickerjson('removeCategory', categoria);	
			$(me).newsvtab().newsvtab('doActivate', me);			
			$(me).newsvtab().newsvtab('doRemove', categoria);
			$(me).remove();
		},
		
		_renameCategory: function(me)
		{
			var categoria = $('#' + idNews.id().tickertabs).inputcategory().inputcategory('getResult');	
			var oldc = $(me).attr('category');
			if ($(me).tickerjson().tickerjson('changeCategory', oldc, categoria))
			{
				$(me).attr('category', categoria);
				oldc = removeSpaces(oldc);
				$('#' + oldc).children('a').text(categoria);
				$('#' + oldc).attr('id', removeSpaces(categoria));
			}
		},
		
		_setOption: function(name, value)	//	Desde aqui salta a _init
		{
			$.Widget.prototype._setOption.apply(_self, arguments);			
		},	
				
	}));
}(jQuery));			
		