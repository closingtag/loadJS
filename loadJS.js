/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
function loadJS( src, cb ){
	"use strict";

	var ref, script;

	var loaded = function() {
		if ( "callbacks" in script && Array.isArray(script.callbacks) && script.callbacks.length > 0 ) {

			script.callbacks.forEach(function(fn) {
				if ( typeof fn === "function" ) {
					fn(script);
				}
			});

		}
	};

	Array.prototype.slice.call(document.scripts, 0).forEach(function(el){

		if ( el.src.indexOf(src) !== -1 ) {
			script = el;
			script.callbacks.push(cb);
		}

	});

	if ( !script ) {

		ref = window.document.getElementsByTagName( "script" )[ 0 ];
		script = window.document.createElement( "script" );

		script.async = true;
		script.src = src;

		script.callbacks = [cb];

		ref.parentNode.insertBefore( script, ref );
		script.onload = loaded;

	}

	return script;

}
