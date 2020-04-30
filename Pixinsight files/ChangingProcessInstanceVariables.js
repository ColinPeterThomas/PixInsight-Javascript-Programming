//Some code to change the combination variable of an ImageIntegration instance


var II = ProcessInstance.fromIcon( 'Process04' );
if ( II == null )
  throw new Error( "No such process icon: ");
if ( !(II instanceof ImageIntegration) )
  throw new Error( "Not an instance of ImageIntegration: " );

II.setDescription("Hello World");
console.writeln("II Description:" + II.description());

//Change the Variable
II.combination = ImageIntegration.prototype.Median;

II.writeIcon('Process04');
//Launches the Process Instance
II.launch();
