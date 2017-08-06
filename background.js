"use strict";


let enable = false;


chrome.contextMenus.create( {
	id: "dictionary",
	title: "Look up \"%s\" in Weblio",
	contexts: [ "selection" ]
} );

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
	if( info.menuItemId === "dictionary" ) {
		chrome.tabs.create( {
			url: "http://ejje.weblio.jp/content/" + encodeURIComponent( info.selectionText )
		} );
	}
} );

chrome.browserAction.onClicked.addListener( ( tab ) => {
	enable = !enable;
	let action;
	if( enable ) {
		action = chrome.tabs.insertCSS.bind( chrome.tabs );
	}
	else {
		action = chrome.tabs.removeCSS.bind( chrome.tabs );
	}
	//browser.tabs.query( {} ).then( ( tabs ) => {
	chrome.tabs.query( {}, ( tabs ) => {
		for( let tab of tabs ) {
			action( tab.id, {
				file: "/simplify.css",
				allFrames: true
			} );
		}
	} );
} );

chrome.webNavigation.onCommitted.addListener( ( details ) => {
	if( enable ) {
		chrome.tabs.insertCSS( details.tabId, {
			file: "/simplify.css",
			runAt: "document_start",
			allFrames: true
		} );
	}
} );


chrome.history.deleteAll( () => {} );
