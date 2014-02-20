/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.newsmenu
*	Genera un menú desplegable, con submenus si se desea
*
*********************************************************/

$(function ()
{
	var _self;
	var _selector;
	var _cnt = 1;
	var _lastvisible = null;
	
	$.widget('news.newsmenu', {
		
		options: 
		{
			menu: null
		},			
		
		_create: function()
		{
			_self = this;
			_selector = null;
			_self._createMenu(this.element, _self.options.menu);
		},
		
		_createMenu: function(base, menu)
		{
			var selector = idNews.id().menu + genKey() + '-' + _cnt++;
			var w = -1;
			if (_selector === null) _selector = selector;
			$(base).append(
				$('<ul/>', {
					class: 'ui-menu ' + uiClass.ui().menu,
					id: selector
				})
			);
			if ($.isArray(menu) && (menu.length > 0))
			{
				$.each(menu, function(idx, val) {
					var alink = idNews.id().menulink + genKey() + '-' + _cnt++;	//	Se necesita mas resolucion
					$('#' + selector).append(
						$('<li/>', {
								class: 'ui-menu-item '  + uiClass.ui().menu,
							 }).append(
							$('<a/>', {
								class: 'ui-corner-all',
								id: alink,
								href: ((typeof val[1] === 'undefined') || (val[1] instanceof Function) || (val[1] == '')) ? '#' : val[1],
								text: val[0]
							}).prepend('<span class="ui-icon ' + (((typeof val[2] === 'undefined') || (val[2] == '')) ? uiClass.ui().blank : val[2]) + '" style="float:left; margin-right:0.2em;"></span>')
						));
					if ($('#' + alink).width() + ($('.ui-icon').width() * 2) > w)
						w = $('#' + alink).width() + ($('.ui-icon').width() * 2);
					if (val[1] instanceof Function)
						$('#' + alink).click(val[1]);
					if (!(typeof val[3] === 'undefined') && ($.isArray(val[3])))
					{
						$('#' + alink).append(
							$('<span/>', {
								class: 'ui-icon ' + uiClass.ui().submenu
							}).css('float', 'right')
						);
						_self._createMenu($('#' + alink), val[3]);
						$('#' + alink).hover(
							function () {
								$(this).addClass('ui-state-focus');
								$(this).children('ul').slideDown('medium').position(
									{
						            	my: "left+" + ($(this).parent().parent().offset().left + $(this).parent().parent().outerWidth() - $(this).offset().left) + " top-" + $(this).outerHeight(),
    							       	at: "left bottom",
   	    							   	of: this
		        					});;
							}, 
							function () {
								$(this).removeClass('ui-state-focus');
								$(this).children('ul').slideUp('medium');
							}
						);						
					}
					else
					{
						$('#' + alink).hover(
							function () { $(this).addClass('ui-state-focus'); },
							function () { $(this).removeClass('ui-state-focus')	}						
						);
					}
				});
			}
			if (w > 0) $('#' + selector).width(w);
			$('#' + selector).hide();
		},
		
		onclick: function()
		{
			return (function() {
				//	var menu = $('#' + _selector) solo funciona con 1 menu: _selector devuelve el último valor calculado por el widget
					var menu = $('#' + $(this).next().attr('id'));	//	El menu (ul) se situa justo debajo del botón (this)
					if (!menu.is(':visible'))
					{	
						if (!(_lastvisible === null))
							$(_lastvisible).hide();
						_lastvisible = menu;						
						menu.show().position({
			            	my: "left+20% top",
	    			       	at: "left bottom",
    	    			   	of: this
        				});
					}
					else
						menu.hide();					
					$(document).on( "click", function() { menu.hide(); });
					return false;
				}
			)
		},
		
		getSelector: function()
		{
			return _selector;
		},
		
		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		}		
	});
}(jQuery));