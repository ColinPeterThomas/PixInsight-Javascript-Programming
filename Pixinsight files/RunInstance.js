

            var CC = ProcessInstance.fromIcon( 'Process02' );
            if ( CC == null )
               throw new Error( "No such process icon: ");
            if ( !(CC instanceof HistogramTransformation) )
               throw new Error( "The specified icon does not transport an instance " +
                                 "of HistogramTransformation: " );

            CC.executeOn(ImageWindow.activeWindow.currentView);

allWindows = ImageWindow.windows;
console.writeln("Name: " + ImageWindow.name);

console.writeln("Properties: " + Object.getOwnPropertyNames(ImageWindow));

console.writeln(allWindows);
console.writeln(allWindows.length);
console.writeln(allWindows[0]);
console.writeln(allWindows[1]);
var viewToMakeActive = "HaIntegration";
var count;
for(count=0; count < allWindows.length ; count++) {
   console.writeln(allWindows[count]);
   console.writeln("Properties: " + Object.getOwnPropertyNames(allWindows[count]));
   let view = allWindows[count].mainView;
   console.writeln("ID: " + view.id);
   if(view.id == viewToMakeActive) {
      allWindows[count].bringToFront();
      break;
   }
}


var window = ImageWindow.activeWindow;
var strDir = "/Users/colin/";
var fileName = "test";
window.saveAs( strDir + fileName + "-gri.xisf", false, false, false, false);


   let window = ImageWindow.activeWindow;
   let view = window.mainView;
   view.beginProcess();
   cartesianToPolar( view.image );
   view.endProcess();





            //var CC = ProcessInstance.fromIcon( 'Process02' );
            //if ( CC == null )
            //   throw new Error( "No such process icon: " + this.cosmeticCorrectionTemplateId );
            //if ( !(CC instanceof DynamicBackgroundExtraction) )
            //   throw new Error( "The specified icon does not transport an instance " +
            //                     "of DynamicBackgroundExraction: " );
//
            //CC.executeGlobal();

            //var CC = ProcessInstance.fromIcon( 'Process03' );
            //if ( CC == null )
            //   throw new Error( "No such process icon: ");
            //if ( !(CC instanceof TGVDenoise) )
            //   throw new Error( "The specified icon does not transport an instance " +
            //                     "of TGVDenoise: " );
            //
            //console.writeln(Object.getOwnPropertyNames(ProcessInstance));
            //console.writeln(Object.keys(ProcessInstance));
            //CC.executeGlobal();
