#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>
#include <pjsr/FrameStyle.jsh>

#define VERSION "0.1"
#define TITLE   "Example TextBox"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();

   /////////////////////////////////////////

   this.newTextBox = new TextBox( this );
   this.newTextBox.text = "This is some Text for the reader  !";



   this.clear_Button = new PushButton( this );
   this.clear_Button.text = "Clear Text";
   this.clear_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.clear_Button.onClick = function()
   {
      console.writeln("INFO: Clear TextBox activated..");
      this.dialog.newTextBox.clear();
   };

   this.text_Button = new PushButton( this );
   this.text_Button.text = "Return Text";
   this.text_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.text_Button.onClick = function()
   {
      console.writeln("INFO: Return TextBox activated..");
      console.writeln("INFO: Text: " + this.dialog.newTextBox.text);
   };

   this.selectedText_Button = new PushButton( this );
   this.selectedText_Button.text = "Selected Text";
   this.selectedText_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.selectedText_Button.onClick = function()
   {
      console.writeln("INFO: Selected TextBox activated..");
      console.writeln("INFO: Text: " + this.dialog.newTextBox.selectedText);
   };

   this.change_Button = new PushButton( this );
   this.change_Button.text = "Change Text";
   this.change_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.change_Button.onClick = function()
   {
      console.writeln("INFO: Update TextBox activated..");
      this.dialog.newTextBox.text = 'Updated Text !!!';

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

   this.textBoxSizer = new HorizontalSizer;
   this.textBoxSizer.spacing = 10;
   this.textBoxSizer.add( this.newTextBox );


   this.buttons_Sizer = new HorizontalSizer;
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.text_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.selectedText_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.clear_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.change_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.cancel_Button );


   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;
   this.sizer.add( this.textBoxSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
