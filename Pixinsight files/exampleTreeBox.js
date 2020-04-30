#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>
#include <pjsr/FrameStyle.jsh>

#define VERSION "0.1"
#define TITLE   "Example TreeBox"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();

   /////////////////////////////////////////

   this.newTreeBox = new TreeBox( this );
   this.newTreeBox.rootDecoration = false;
   this.newTreeBox.numberOfColumns = 3;
   this.newTreeBox.setHeaderText(0, "Name");
   this.newTreeBox.setHeaderText(1, "Value");
   this.newTreeBox.setHeaderText(2, "Another Value");
   this.newTreeBox.setColumnWidth(0,100);
   this.newTreeBox.setColumnWidth(1,100);
   this.newTreeBox.setColumnWidth(2,100);


   var node1 = new TreeBoxNode(this.newTreeBox);
   node1.setText( 0, "Fred" );
   node1.checked = true;
   //this.newTreeBox.child(0).setText(0,'Fred');
   this.newTreeBox.child(0).setText(1,'Some Text');
   this.newTreeBox.child(0).setText(2,'Some More Text');

   var node2 = new TreeBoxNode(this.newTreeBox);
   node2.setText( 0, "Joe" );
   node2.checked = false;
   this.newTreeBox.child(1).setText(1,'Some Info');
   this.newTreeBox.child(1).setText(2,'Some More Info');


   this.readTreeBox_Button = new PushButton( this );
   this.readTreeBox_Button.text = "Read TreeBox";
   this.readTreeBox_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.readTreeBox_Button.onClick = function()
   {
      console.writeln("INFO: Read TreeBox..");
      this.dialog.newTreeBox.text = 'Updated Text !!!';

      console.writeln('There are : ' + this.dialog.newTreeBox.numberOfChildren + " rows defined...");
      console.writeln('There are : ' + this.dialog.newTreeBox.numberOfColumns  + " columns defined...");

      console.writeln('The Column Headers are:');
      for(let columnCount =0 ; columnCount < (this.dialog.newTreeBox.numberOfColumns ) ;columnCount++) {
         console.writeln('  Header for Column ' + columnCount + ' is: ' + this.dialog.newTreeBox.headerText(columnCount));
      }

      for(let rowCount =0 ; rowCount < (this.dialog.newTreeBox.numberOfChildren ) ;rowCount++) {
         let rowString = "Row: " + rowCount;
         if (this.dialog.newTreeBox.child(0).checked){
            rowString = rowString + " CHECKED "
         } else {
            rowString = rowString + " UNCHECKED "
         }
         for(let columnCount =0 ; columnCount < (this.dialog.newTreeBox.numberOfColumns ) ;columnCount++) {
            rowString = rowString + '  \'' + this.dialog.newTreeBox.headerText(columnCount) + "\'-> \'" + this.dialog.newTreeBox.child(rowCount).text(columnCount) + '\' ';
         }
         console.writeln(rowString);
      }

   };

   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "Okay";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      console.writeln("INFO: Okay activated..");
      this.dialog.ok();
   };

   this.cancel_Button = new PushButton( this );
   this.cancel_Button.text = "Cancel";
   this.cancel_Button.icon = this.scaledResource( ":/icons/cancel.png" );
   this.cancel_Button.onClick = function()
   {
      this.dialog.cancel();
   };

   this.treeBoxSizer = new HorizontalSizer;
   this.treeBoxSizer.spacing = 10;
   this.treeBoxSizer.add( this.newTreeBox );


   this.buttons_Sizer = new HorizontalSizer;
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.readTreeBox_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.cancel_Button );

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;
   this.sizer.add( this.treeBoxSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();

}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
