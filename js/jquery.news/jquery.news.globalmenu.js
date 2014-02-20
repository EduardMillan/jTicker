/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.globalmenu
*	Genera un menu añadiendo las opciones para importar/exportar datos si se requieren.
*
*********************************************************/

$(function ()
{
	var _self;
	var _selector;
		
	$.widget('news.globalmenu', {

		options: 
		{
			main: false,
			menu: null,
			dataexport: false,
			dataimport: false
		},		
		
		_create: function()
		{
			_self = this;
			_selector = idNews.id().menu + genKey();
			_self._createMenu(this.element);
		},
		
		_createMenu: function(base)
		{
			$(base).append(
				$('<div/>', {
					class: classNews.cssclass().menu + ((_self.options.main) ? ' ' + classNews.cssclass().mainmenu : ''),
					id: _selector
				}).newsbutton()
			)
			$('#' + _selector).newsmenu({menu: _self.options.menu});
			if (supportLocalStorage())
			{
				if (_self.options.dataexport) _self._createOption(true);
				if (_self.options.dataimport) _self._createOption(false);
			}
			var button = $('#' + _selector).newsbutton();
			var menu = $('#' + _selector).newsmenu();
			button.newsbutton('onclick', menu.newsmenu('onclick'));
			$('#' + _selector).addClass('ui-widget-header ui-corner-all');			
		},
		
		_createOption: function(isExport)
		{
			var ul = $('#' + $('#' + _selector).newsmenu().newsmenu('getSelector')).attr('id');
			var alink = idNews.id().menulink + ((isExport) ? commons.label().sexport : commons.label().simport) + genKey();
			$('#' + ul).append(
					$('<li/>', {
						class: 'ui-menu-item '  + uiClass.ui().menu,
					}).append(
						$('<a/>', {
							class: 'ui-corner-all',
							id: alink,
							text: (isExport) ? messages.msg().menuexport : messages.msg().menuimport
						}).prepend('<span class="ui-icon ' + uiClass.ui().blank + '" style="float:left; margin-right:0.2em;"></span>')
			));			
			$('#' + alink).click(function() { $(this).tickerdata({toexport: isExport}); });
			$('#' + alink).hover(
				function () { $(this).addClass('ui-state-focus'); },
				function () { $(this).removeClass('ui-state-focus')	}						
			);
			$('#' + alink).css('cursor', 'pointer');
		},
				
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		}			
	});
}(jQuery));		