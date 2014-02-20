/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	news.tickerjson
*	Gestiona los datos de los tickers en formato JSON
*	Gestiona:
*	-	carga los feeds almacenados localmente (si los hay)
*	-	salva los feeds
*	-	elimina tickers y/o categorias
*
*********************************************************/

$(function ()
{
	var _self;
	var _json = Array();
	var _cntCat, _cntFeed;
	
	$.widget('news.tickerjson', {
		
		options:
		{
			category: null,
			stack: null	// debe ser un array
		},
		
		_create: function()
		{
			_self = this;
		},
		
		_init: function()
		{
			if (_json == null) _json = Array();	//	Por si se ha borrado (clearData)
			if (_self.options.category !== null)
			{
//				alert(_self.options.category + ' ' + _self.options.stack);
				var idx = _self._search(_self.options.category);
				if (idx < 0)
					idx = _self._addCategory(_self.options.category);
				_self._getFeed(idx)
				_self._saveData();
			}
		},
		
		_addCategory: function(categoria)
		{
			var it = {}
			it['category'] = categoria;
			it['stack'] = Array();
			_json.push(it);
			return _json.length - 1;
		},
		
		_saveData: function()
		{
			if (supportLocalStorage())
				localStorage[commons.label().localstorageData] = JSON.stringify(_json);
		},
		
		_loadData: function()
		{
			if (supportLocalStorage())
				_json = localStorage[commons.label().localstorageData] ? $.parseJSON(localStorage[commons.label().localstorageData]) : [];
		},
		
//	localStorage['data-feeds'].clear() se bloquea. Posible problema de cache: 
//	http://stackoverflow.com/questions/18093595/localstorage-clear-not-working-in-ember-js-at-least-not-with-an-ajax-call
		clearData: function()
		{
			_json = null;
			_self._saveData();
		},
		
		loadData: function()
		{
			_self._loadData();
//			alert(JSON.stringify(_json));
			return _json;
		},
		
		removeCategory: function(categoria)
		{
			var idx = _self._search(categoria);
			
			if (idx > -1)
			{
				_json.splice(idx, 1);
				if (_json.length < 1)
					_json = null;
				_self._saveData();
			}
		},
		
		removeFeed: function(categoria, url)
		{
			var idx = _self._search(categoria);
			
			if (idx > -1)
			{
				if ($.isArray(_json[idx].stack))
				{
					$.each(_json[idx].stack, function(i, val) {
						if (val == url)
						{
							_json[idx].stack.splice(i, 1);
							return true;
						}
					})
				}
				_self._saveData();					
			}
		},
		
		sortFeed: function(categoria, url, index)
		{
			var idx = _self._search(categoria);
			
			if (idx > -1)
			{
				if (($.isArray(_json[idx].stack)) && (_json[idx].stack.length > 1))
				{
					var i = $.inArray(url, _json[idx].stack);
					if (i > -1)
					{
						_json[idx].stack.splice(i, 1);
						_json[idx].stack.splice(index - 1, 0, url);
					}
				}
				_self._saveData();
			}
		},
		
		insertData: function(data)
		{
			_cntCat = 0;
			_cntFeed = 0;
			if ($.isArray(data) && (data.length > 0))
			{
				$.each(data, function(idx, val) {
					icat = _self._search(val.category);
					if (icat < 0)
					{
						icat = _self._addCategory(val.category);
						_cntCat++;
					}
					$.each(val.stack, function(ifeed, vfeed) {
						if ($.inArray(vfeed, _json[icat].stack) < 0)
						{
							_json[icat].stack.push(vfeed);
							_cntFeed++;
						}
					})
				})
				_self._saveData();
			}
			return [_cntCat, _cntFeed];
		},
		
		changeCategory: function(oldc, newc)
		{
			var idx = _self._search(oldc);
			
			if (idx > -1)
			{
				_json[idx].category = newc;
				_self._saveData();
			}
			return (idx > -1);
		},
		
		_getFeed: function(idx)
		{
			var feeds = _self.options.stack;

			if ($.isArray(feeds))
			{
				$.each(feeds, function(i, val) {
					_json[idx].stack.push(val);
				})
			}
		},
		
		_search: function(str)
		{
			var result = -1;
			var idx = -1;

			while ((result < 0) && (++idx < _json.length))
				result = (_json[idx].category == str) ? idx : -1;
			return result;
		}
		
	});
}(jQuery));					