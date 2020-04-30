#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>
#include <pjsr/FrameStyle.jsh>
#include <pjsr/Slider.jsh>

#define VERSION "0.1"
#define TITLE   "Example ComboBox"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();

   /////////////////////////////////////////
   this.newComboBox = new ComboBox( this );
   this.newComboBox.addItem( "Vertical" );
   this.newComboBox.addItem( "Horizontal" );
   this.newComboBox.editEnabled = false;
   this.newComboBox.scaledMinWidth = 100;


  this.newComboBox.onItemSelected = function()
   {
      console.writeln("INFO: ComboBox Changed ..");
      console.writeln("Index:" + this.currentItem);
      console.writeln("IndexText:" + this.itemText( this.currentItem ));
      console.writeln("Number Of Items:" + this.numberOfItems);
   }

   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "Okay";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      console.writeln("INFO: CheckBox activated..");
      this.dialog.ok();
   };

   this.cancel_Button = new PushButton( this );
   this.cancel_Button.text = "Cancel";
   this.cancel_Button.icon = this.scaledResource( ":/icons/cancel.png" );
   this.cancel_Button.onClick = function()
   {
      this.dialog.cancel();
   };

   this.comboBoxSizer = new HorizontalSizer;
   this.comboBoxSizer.spacing = 10;
   this.comboBoxSizer.add( this.newComboBox );

   this.buttons_Sizer = new HorizontalSizer;
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.cancel_Button );

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;
   this.sizer.add( this.comboBoxSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
