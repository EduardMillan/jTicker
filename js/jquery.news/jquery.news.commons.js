/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	commons
*	Funciones de utilidad y constantes comunes
*
*********************************************************/

var classNews = (function ()
{
	var container_class = 'container',
        origin_class = 'origin',
		capsule_class = 'capsule',
		nest_class = 'nest',
		ticker_class = 'ticker',
		header_class = 'news-header',
		favicon_class = 'favicon',
		favicon_thumb_class = 'favicon-thumb',
		ui_class = 'ticker-ui',
		menu_ui_class = 'menu-ticker-ui',
		data_class = 'ticker-data',
		tickertabs_ul_class = 'ticker-tab-ulclass',	//	no en ticker.css
		input_validate_class = 'validateTip',
		main_menu_class = 'mainmenu';
		
    var cssclass = function ()
	{
		return { 
			container: container_class,
			origin: origin_class,
			capsule: capsule_class,
			nest: nest_class,
			ticker: ticker_class,
			header: header_class,
			favicon: favicon_class,
			favicon_thumb: favicon_thumb_class,
			ui: ui_class,
			menu: menu_ui_class,
			data: data_class,
			tickertabsul: tickertabs_ul_class,
			inputvalidate: input_validate_class,
			mainmenu: main_menu_class,
		}
    };
    return { cssclass: cssclass };
})();

var idNews = (function ()
{
	var prefix = 'nt-',
		sufix = '-id',
		container_id = prefix + classNews.cssclass().container + sufix,
        origin_id = prefix + classNews.cssclass().origin + sufix,
		capsule_id = prefix + classNews.cssclass().capsule + sufix,
		nest_id = prefix + classNews.cssclass().nest + sufix,
		ticker_id = prefix + classNews.cssclass().ticker + sufix,
		header_id = prefix + classNews.cssclass().header + sufix,
		ui_id = prefix + classNews.cssclass().ui + sufix,
		menui_id = prefix + classNews.cssclass().menu + sufix,
		data_id = prefix + classNews.cssclass().data + sufix,
		ticker_tabs_id = prefix + 'ticker-tabs' + sufix,
		confirm_id = prefix + 'ticker-confirm' + sufix,
		menu_link_id = prefix + 'menuitemlink' + sufix,
		button_main_id = prefix + 'ticker-menu-button' + sufix,
		input_form_id = prefix + 'ticker-input' + sufix,
		input_validate_id = prefix + classNews.cssclass().inputvalidate + sufix;

    var id = function ()
	{
		return { 
			container: container_id,
			origin: origin_id,
			capsule: capsule_id,
			nest: nest_id,
			ticker: ticker_id,
			header: header_id,
			ui: ui_id,
			menu: menui_id,
			data: data_id,
			tickertabs: ticker_tabs_id,
			confirmation: confirm_id,
			menulink: menu_link_id,
			mainbutton: button_main_id,
			inputform: input_form_id,
			inputvalidate: input_validate_id,
		}
    };
    return { id: id };
})();

var uiClass = (function ()
{
	var container_class = 'ui-widget ui-widget-header ui-corner-all'
        origin_class = 'ui-widget-header',
		capsule_class = 'ui-widget-header',
		resizable_class = 'ui-resizable-se',
		add_feed_class = 'ui-icon-refresh',
		trash_class = 'ui-icon-trash',
		warning_class = 'ui-icon-alert',
		menu_class = 'ui-widget-header',
		blank_class = 'ui-icon-blank',
		submenu_class = 'ui-icon-carat-1-e',
		balloon_class = 'ui-icon-comment',
		pencil_class = 'ui-icon-pencil';

    var ui = function ()
	{
		return { 
			container: container_class,
			origin: origin_class,
			capsule: capsule_class,
			resizable: resizable_class,
			addfeed: add_feed_class,
			trash: trash_class,
			warning: warning_class,
			menu: menu_class,
			blank: blank_class,
			submenu: submenu_class,
			balloon: balloon_class,
			pencil: pencil_class,
		}
    };
    return { ui: ui };
})();

var commons = (function ()
{
	var url_ticker_title = 'url',
		span_ticker_title = 'th-span',
		local_storage_data = 'data-feeds',
		sufix_export = '-export',
		sufix_import = '-import';

    var label = function ()
	{
		return { 
			urltitle: url_ticker_title,
			spantitle: span_ticker_title,
			localstorageData: local_storage_data,
			sexport: sufix_export,
			simport: sufix_import,
		}
    };
    return { label: label };
})();


var messages = (function ()
{
	var add_feed_title = 'Añadir feed',
		remove_category_title = 'Eliminar categoría',
		remove_category_confirm = '¿Seguro que quiere borrar la categoría',
		remove_all_feeds_title = 'Eliminar todos los feeds',
		remove_allfeeds_confirm = '¿Seguro que quiere borrar todos los feeds',
		remove_feed_title = 'Eliminar RSS feed',
		remove_feed_confirm = '¿Seguro que quiere borrar el feed',
		input_feed_title = 'Añadir RSS feed',
		input_feed_subtitle = 'RSS Link',
		error_noURL = 'No se ha escrito ninguna URL',
		error_invalidURL = 'La URL no es válida',
		input_category_title = 'Añadir categoría',
		input_category_subtitle = 'Categoría',
		error_no_category = 'No se ha escrito ninguna categoría',
		error_duplicate_category = 'Esta categoría ya existe o es incorrecta',
		menu_export = 'Exportar',
		menu_import = 'Importar',
		msg_export = 'Exportar feeds',
		msg_import = 'Importar feeds',
		help_export = 'Use [CTRL + C] o [click derecho + copiar]',
		help_import = 'Use [CTRL + V] o [click derecho + pegar]',
		button_accept = 'Aceptar',
		button_close = 'Cerrar',
		button_cancel = 'Cancelar',
		result_import = 'Resultado de la importación',
		total_category = 'Categorías',
		total_feeds = 'Feeds',
		rename_category_title = 'Renombrar categoría',
		error_title = 'Error',
		json_error = 'Error en los datos';

    var msg = function ()
	{
		return { 
			addfeedtitle: add_feed_title,
			removetitlecat: remove_category_title,
			removecatconfirm: remove_category_confirm,
			removefeedstitle: remove_all_feeds_title,
			removefeedsconfirm: remove_allfeeds_confirm,
			removefeedtitle: remove_feed_title,
			removefeedconfirm: remove_feed_confirm,
			inputfeedtitle: input_feed_title,
			inputfeedsubtitle: input_feed_subtitle,
			errorNoURL: error_noURL,
			errorInvalidURL: error_invalidURL,
			inputtitlecat: input_category_title,
			inputsubtitlecat: input_category_subtitle,
			errorNoCategory: error_no_category,
			errorDuplicateCategory: error_duplicate_category,
			menuexport: menu_export,
			menuimport: menu_import,
			msgexport: msg_export,
			msgimport: msg_import,
			helpexport: help_export,
			helpimport: help_import,
			baceptar: button_accept,
			bclose: button_close,
			bcancel: button_cancel,
			resultimport: result_import,
			totalcategory: total_category,
			totalfeeds: total_feeds,
			renamecategorytitle: rename_category_title,
			errortitle: error_title,
			jsonerror: json_error,
		}
    };
    return { msg: msg };
})();

var genKey = function() { return new Date().getTime(); }

var decodeEntities = (function()
{
	//	http://stackoverflow.com/questions/5796718/html-entity-decode
	// this prevents any overhead from creating the object each time
  	var element = document.createElement('div');

	function decodeHTMLEntities(str)
	{
		if(str && typeof str === 'string')
		{
    		// strip script/html tags
      		str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
	      	str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    	  	element.innerHTML = str;
      		str = element.textContent;
	      	element.textContent = '';
    	}
	    return str;
	}
  	return decodeHTMLEntities;
})();

var ftest = function test() { alert('TEST') }

var removeSpaces = function(str) 
{
	return str.replace(/ /g, '_');
}

var removeUnderscore = function(str) 
{
	return str.replace(/_/g, ' ');
}

var supportLocalStorage = function supports_html5_storage()
{
	try
	{
    	return 'localStorage' in window && window['localStorage'] !== null;
  	} catch (e)
	{
    	return false;
  	}
}

var resetLocalStorage = function() { localStorage.data-feeds.clear(); }
