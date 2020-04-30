//Write Active window

var window = ImageWindow.activeWindow;
let view = window.mainView;
console.writeln("ID: " + view.id);

var strDir = "/Users/colin/";
var fileName = view.id;
window.saveAs( strDir + fileName + ".xisf", false, false, false, false);
