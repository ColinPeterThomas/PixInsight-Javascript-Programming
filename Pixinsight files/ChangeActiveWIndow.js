//Make the Image Window "HaIntegration" the activeWindow

var allWindows = ImageWindow.windows;

var viewToMakeActive = "HaIntegration";
var count;
for(count=0; count < allWindows.length ; count++) {
   let view = allWindows[count].mainView;
   console.writeln("ID: " + view.id);
   if(view.id == viewToMakeActive) {
      allWindows[count].bringToFront();
      break;
   }
}
