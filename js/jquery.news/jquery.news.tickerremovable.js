/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerremovable
*	Sobreescribe news.ticker
*	Genera ticker añadiéndole funcionalidad para eliminarlo
*	Gestiona:
*	-	eliminar ticker
*
*********************************************************/

(function($)
{
	var _self;

	$.widget('news.tickerremovable', $.extend({}, $.news.ticker.prototype, {
		
		_init: function()
		{
			_self = this;
			$.news.ticker.prototype._init.call(_self);
		},
		
		_createTicker: function()
		{		
			$.news.ticker.prototype._createTicker.call(_self);
			$('#' + _self._selector).attr('feedurl', _self.options.url);
			$('#' + _self._selector).children('#' + idNews.id().origin + _self._idx).append(
				$('<span/>', {
					class: 'ui-icon ' + uiClass.ui().trash,
				}).css('float', 'right').css('cursor', 'pointer').click(function() { _self._remove(this) })			
			);
		},
		
		_remove: function(me)
		{
//	me:	span .ui.icon .ui-icon-trash
//	me.parent:	.origin
//	me.parent.parent:	.container
//	me.parent.parent.parent:	.ticker-ui
			$(me).parent().parent().tickerconfirm({ title: messages.msg().removefeedtitle, text: messages.msg().removefeedconfirm + ' ' + $(me).parent().children('a').children('span').text() + '?', callback: function() { _self._doRemove(me); } });
		},
		
		_doRemove: function(me)
		{
//			alert($(me).parent().parent().parent().attr('id'));
//			alert($(me).parent().parent().parent().children('.' + classNews.cssclass().container).length);
			$(me).parent().parent().parent().tickerjson().tickerjson('removeFeed', $(me).parent().parent().parent().attr('category'), $(me).parent().parent().attr('feedurl'));
			$(me).parent().parent().remove();
		},		
		
	}));
}(jQuery));			