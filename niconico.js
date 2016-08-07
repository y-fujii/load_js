"use strict";


function videoUrl() {
	let data = JSON.parse( document.querySelector( "#watchAPIDataContainer" ).textContent );
	let info = decodeURIComponent( data.flashvars.flvInfo ).split( "&" );
	for( let kv of info ) {
		let [k, v] = kv.split( "=" );
		if( k === "url" ) {
			return decodeURIComponent( v );
		}
	}
	throw new Error();
}

function main() {
	try {
		let url = videoUrl();
		let eAfter = document.querySelector( ".videoHeaderOuter" );
		let eVideo = document.createElement( "video" );
		eVideo.controls = true;
		eVideo.autoplay = true;
		eVideo.src      = url;
		eAfter.parentNode.insertBefore( eVideo, eAfter );
	}
	catch( e ) {
	}
}


main();
