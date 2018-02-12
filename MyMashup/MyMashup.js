/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++)
    {

        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}


var v_classifiedOut= decodeURIComponent(GetURLParameter('classifiedOut'));
var v_town= decodeURIComponent(GetURLParameter('town'));

var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('financeSample_singapore.qvf', config);
	

	//get objects -- inserted here --
	app.getObject('QV02','HtNvgy');
	app.getObject('QV06','MPuUW');
	app.getObject('QV03','DjQLFx');
	app.getObject('QV05','jpKJxbn');
	app.getObject('CurrentSelections','CurrentSelections');
	
	app.getObject('QV04','bKdJyT');
	app.getObject('QV01','SDkczh');
	//create cubes and lists -- inserted here --
	
	app.field("classifiedOut").selectMatch(v_classifiedOut, true);
	app.field("town").selectMatch(v_town, true);	
	// https://community.qlik.com/thread/175194

} );
