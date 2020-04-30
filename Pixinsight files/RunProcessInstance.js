//Code to run the HistTrans instance (of an HistogramTransform) on the active window

var CC = ProcessInstance.fromIcon( 'HistTrans' );
if ( CC == null )
   throw new Error( "No such process icon: ");
if ( !(CC instanceof HistogramTransformation) )
   throw new Error( "The specified icon does not transport an instance " +
                    "of HistogramTransformation: " );

CC.executeOn(ImageWindow.activeWindow.currentView);
