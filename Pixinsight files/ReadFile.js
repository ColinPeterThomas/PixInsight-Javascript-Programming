//Read file

var filePath = "/Users/colin/TEST.xisf";

var imageWindows=ImageWindow.open(filePath);
if ( imageWindows.length < 1 )
   throw new Error( "Unable to open file: " + filePath );
if ( imageWindows.length > 1 )
   throw new Error( "Multi-image files are not supported by this script: " + filePath );
Console.writeln("ImageWindows:",imageWindows);
var imageWindow=imageWindows[0]
Console.writeln("ImageWindow:",imageWindow);
//Print Keywords
Console.writeln("ImageWindow.keywords",imageWindow.keywords);
var view=imageWindow.mainView;
Console.writeln("view:",view);
//Print Properties
var properties=view.properties;
Console.writeln("view.properties:",properties);
var propertiesLength = properties.length;
for(var i=0;i<propertiesLength;++i)
{
   var name=properties[i];
   Console.writeln("properties:",name,",value:",view.propertyValue(name));
}
//Display the Image.
imageWindow.show();
imageWindow.zoomToFit();
