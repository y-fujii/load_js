"use strict";


function Hooker() {
	this.insertMode = false;

	window.addEventListener( "keydown", this.onKeyDown.bind( this ), true );
}

Hooker.prototype.onKeyDown = function( ev ) {
	if( ev.ctrlKey || ev.altKey ) {
		return;
	}

	if( document.activeElement instanceof HTMLInputElement ||
	    document.activeElement instanceof HTMLTextAreaElement )
	{
		if( ev.keyCode === KeyEvent.DOM_VK_ESCAPE && !ev.shiftKey ) {
			document.activeElement.blur();
		}
		return;
	}

	if( this.insertMode ) {
		if( ev.keyCode === KeyEvent.DOM_VK_ESCAPE && ev.shiftKey ) {
			this.insertMode = false;
		}
		return;
	}

	if( ev.keyCode < KeyEvent.DOM_VK_A || KeyEvent.DOM_VK_Z < ev.keyCode ) {
		return;
	}

	if( ev.shiftKey ) {
		switch( ev.keyCode ) {
			case KeyEvent.DOM_VK_K:
				window.scrollBy( 0, -1 );
				break;
			case KeyEvent.DOM_VK_J:
				window.scrollBy( 0, +1 );
				break;
			case KeyEvent.DOM_VK_H:
				window.scrollBy( -1, 0 );
				break;
			case KeyEvent.DOM_VK_L:
				window.scrollBy( +1, 0 );
				break;
			case KeyEvent.DOM_VK_G:
				window.scrollTo( window.pageXOffset, document.body.scrollHeight );
				break;
		}
	}
	else {
		switch( ev.keyCode ) {
			case KeyEvent.DOM_VK_K:
				window.scrollBy( 0, window.innerHeight / -2 );
				break;
			case KeyEvent.DOM_VK_J:
				window.scrollBy( 0, window.innerHeight / +2 );
				break;
			case KeyEvent.DOM_VK_H:
				history.go( -1 );
				break;
			case KeyEvent.DOM_VK_L:
				history.go( +1 );
				break;
			case KeyEvent.DOM_VK_G:
				window.scrollTo( window.pageXOffset, 0 );
				break;
			case KeyEvent.DOM_VK_R:
				window.location.reload();
				break;
			case KeyEvent.DOM_VK_I:
				this.insertMode = true;
				break;
		}
	}

	ev.stopPropagation();
	ev.preventDefault();
}


new Hooker();
