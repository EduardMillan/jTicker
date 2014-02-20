/********************************************************
*
*	jTicker (c) Eduard Millán Forn 2014
*	http://codementia.blogspot.com.es/
*
*	ui.tooltip (de jQuery UI)
*	Se sobreescribe la opción 'content' para devolver texto plano
*	Se necesita para el atributo 'title' de los feeds, donde se guarda el resumen
*
*********************************************************/

$(function ()
{
	$.widget("ui.tooltip", $.ui.tooltip,
	{
    	options:
		{
        	content: function()
			{
				return $(this).prop('title');
            }
		}
	});
});