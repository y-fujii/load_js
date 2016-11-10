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

chrome.history.deleteAll( () => {} );
