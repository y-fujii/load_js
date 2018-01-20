"use strict";


function Hooker() {
	this.insertMode = false;

	window.addEventListener( "keydown", this.onKeyDown.bind( this ), true );
}

Hooker.prototype.onKeyDown = function( ev ) {
	if( ev.defaultPrevented ) {
		return;
	}

	if( ev.ctrlKey || ev.altKey ) {
		return;
	}

	if( document.activeElement instanceof HTMLInputElement ||
	    document.activeElement instanceof HTMLTextAreaElement )
	{
		/*
		if( ev.code === "Escape" && !ev.shiftKey ) {
			document.activeElement.blur();
		}
		*/
		return;
	}

	if( this.insertMode ) {
		if( ev.code === "Escape" && ev.shiftKey ) {
			this.insertMode = false;
		}
		return;
	}

	if( ev.shiftKey ) {
		switch( ev.code ) {
			case "KeyK":
				window.scrollBy( 0, -1 );
				break;
			case "KeyJ":
				window.scrollBy( 0, +1 );
				break;
			case "KeyH":
				window.scrollBy( -1, 0 );
				break;
			case "KeyL":
				window.scrollBy( +1, 0 );
				break;
			case "KeyG":
				window.scrollTo( window.pageXOffset, document.body.scrollHeight );
				break;
			default:
				return;
		}
	}
	else {
		switch( ev.code ) {
			case "KeyK":
				window.scrollBy( 0, window.innerHeight / -2 );
				break;
			case "KeyJ":
				window.scrollBy( 0, window.innerHeight / +2 );
				break;
			case "KeyH":
				history.go( -1 );
				break;
			case "KeyL":
				history.go( +1 );
				break;
			case "KeyG":
				window.scrollTo( window.pageXOffset, 0 );
				break;
			case "KeyR":
				window.location.reload();
				break;
			case "KeyI":
				this.insertMode = true;
				break;
			default:
				return;
		}
	}

	ev.stopPropagation();
	ev.preventDefault();
}


new Hooker();
