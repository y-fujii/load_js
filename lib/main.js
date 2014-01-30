"use strict";

var ioFile  = require( "sdk/io/file" );
var system  = require( "sdk/system" );
var pageMod = require( "sdk/page-mod" );

function main() {
	var script = ioFile.read(
		ioFile.join( system.env.HOME, ".content.js" )
	);

	pageMod.PageMod( {
		include: "*",
		contentScript: script,
		contentScriptWhen: "start",
	} );
}

main();
