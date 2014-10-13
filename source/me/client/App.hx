package me.client;
import haxor.core.Application;
import haxor.core.Console;
import haxor.platform.html.Entry;
import js.Browser;

/**
 * ...
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
class App extends Application
{
	static function main():Void { Entry.Initialize(); }

	override public function Initialize():Void 
	{
		Console.Log("App> Initialize");
		Browser.document.body.style.removeProperty("display");		
	}
	
}