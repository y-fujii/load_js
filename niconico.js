"use strict";


function makeJsonTable( json ) {
	let eTable = document.createElement( "table" );
	function walk( path, json ) {
		if( json instanceof Object && (json.constructor === Array || json.constructor === Object) ) {
			let keys = Object.keys( json );
			if( keys.length > 0 ) {
				for( let k of keys ) {
					walk( path.concat( k ), json[k] );
				}
				return;
			}
			switch( json.constructor ) {
				case Array:  json = "[]"; break;
				case Object: json = "{}"; break;
			}
		}
		let eTr = eTable.appendChild( document.createElement( "tr" ) );
		let eKey = eTr.appendChild( document.createElement( "td" ) );
		eKey.textContent = path.join( "." );
		let eVal = eTr.appendChild( document.createElement( "td" ) );
		eVal.innerHTML = String( json );
	}
	walk( [], json );
	return eTable;
}

function videoUrl( data ) {
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
		let data = JSON.parse( document.querySelector( "#watchAPIDataContainer" ).textContent );
		let eVideo = document.createElement( "video" );
		eVideo.controls = true;
		eVideo.autoplay = true;
		eVideo.src      = videoUrl( data );
		let eTable = makeJsonTable( { videoDetail: data.videoDetail, uploaderInfo: data.uploaderInfo } );

		document.documentElement.innerHTML = "";
		document.documentElement.lang = "ja";
		document.body.appendChild( eVideo );
		document.body.appendChild( eTable );
	}
	catch( e ) {
	}

	document.body.style.display = "block";
}

//document.addEventListener( "DOMContentLoaded", main.bind( null ), true );
main();
