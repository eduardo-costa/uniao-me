package me.client;
import haxor.core.Application;
import haxor.core.Console;
import haxor.platform.html.Entry;
import js.Browser;
import js.html.CanvasElement;
import js.html.Event;

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
		
		stage.Find("content.sections.front.content.button-gifts").element.onclick = function(ev:Event):Void
		{
			Browser.window.location.href = "http://www.originalway.com.br/ViagemPresenteDetalhe.aspx?id=17";			
		};
	}
	
}