/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.newsbutton
*	Benera un botón al que se puede anexar un menu despleglable (newsmenu)
*
*********************************************************/

$(function ()
{
	var _self;
	var _selector;
	
	$.widget('news.newsbutton', {
		
		_create: function()
		{
			_self = this;
			 _selector = idNews.id().mainbutton + genKey();
			_self._createButton(this.element);
		},
		
		_createButton: function(base)
		{
			$(base).append(
				$('<button/>', {
					id: _selector
				}).button({
					icons: {
						primary: 'ui-icon-gear',
						secondary: 'ui-icon-triangle-1-s'
					},
					text: false
				})
			)
		},
		
		onclick: function(clickevent)
		{
			$('#' + _selector).click(clickevent);
		},

		_setOption: function(name, value)
		{
			//	Vacío, no se admiten más valores una vez inicializado
		}	
		
	});
}(jQuery));		