/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerdata
*	Muestra una ventana para importar o exportar datos 
*
*********************************************************/

$(function ()
{
	var _self;
	
	$.widget('news.tickerdata', {
		
		options:
		{
			toexport: true
		},
		
		_create: function()
		{
			_self = this;
			_self._createForm();
		},
		
		_createForm: function()
		{
			var base = $(_self.element);
			var tarea = idNews.id().data + genKey();
			$(base).append(
				$('<div/>', {
					id: idNews.id().data,
					title: (_self.options.toexport) ? messages.msg().msgexport : messages.msg().msgimport
				}).append(
					$('<textarea/>', {
						class: classNews.cssclass().data + ' ui-widget ui-widget-content',
						id: tarea,
					}),
					$('<p/>', {
						text: (_self.options.toexport) ? messages.msg().helpexport : messages.msg().helpimport
					})
				)
			);
			if (_self.options.toexport)
			{
				$('#' + tarea).text(JSON.stringify($(this).tickerjson().tickerjson('loadData')));
				$('#' + tarea).select();
				$('#' + tarea).attr('readonly', 'readonly');
			}
//			var root = $('body').children().find('.ui-tabs');
			var root = $('.' + classNews.cssclass().mainmenu);
			$('#' + idNews.id().data).dialog({
				resizable: false,
      			height: $('.' + classNews.cssclass().data).height() + 220,
				width: 500,
				position: [$(root).position().left + ($(root).outerWidth() - 500) / 2, $(root).position().top + 100],
      			modal: true,
      			buttons: _self._buttons(tarea),
      			close: function() {
					_self.destroy();
      			}				
    		});			
		},
		
		_buttons: function(tarea)
		{
			var root = $('#' + tarea).parent().parent().parent().parent().parent().parent();
			var buttons = {};
			if (!_self.options.toexport)
				buttons[messages.msg().baceptar] = function () { 
					try
					{
						var result = $(this).tickerjson().tickerjson('insertData', JSON.parse($('#' + tarea).val()));
						$(root).tickertabber().tickertabber('destroy');
						$(root).tickertabber({sortable: true, callback: function() { $(root).tickermsg({title: messages.msg().resultimport, text: [messages.msg().totalcategory + ' ' + result[0], messages.msg().totalfeeds + ' ' + result[1]]}) }});
						$(this).dialog('close');						
					}
					catch (e)
					{
						$(root).tickermsg({title: messages.msg().errortitle, text: Array(messages.msg().jsonerror)});
					}
				};
			buttons[messages.msg().bclose] = function () { $(this).dialog('close'); };
			return buttons;				
		},
		
		destroy: function()
		{
			$('#' + idNews.id().data).remove();
			$.Widget.prototype.destroy.call(_self);			
		}
				
	});
}(jQuery));			