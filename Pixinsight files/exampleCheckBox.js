#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>

#define VERSION "0.1"
#define TITLE   "Example CheckBox"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();


   /////////////////////////////////////////
   this.exampleLabel = new Label( this );
   this.exampleLabel.text = "Red Filter Data:";
   this.exampleLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.exampleLabel.width = 100;

   this.exampleCheckBox = new CheckBox (this );
   this.exampleCheckBox.onClick = function()
   {
      if (this.dialog.exampleCheckBox.checked)
      {
         console.writeln("INFO: CheckBox activated..");
      } else {
         console.writeln("INFO: CheckBox deactivated..");
      }
   }

   this.exampleHorizontalSizer = new HorizontalSizer;
   this.exampleHorizontalSizer.spacing = 10;
   this.exampleHorizontalSizer.add( this.exampleLabel );
   this.exampleHorizontalSizer.addSpacing( 10 );
   this.exampleHorizontalSizer.add( this.exampleCheckBox);

   /////////////////////////////////////////

   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "Okay";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      this.dialog.ok();
   };

   this.cancel_Button = new PushButton( this );
   this.cancel_Button.text = "Cancel";
   this.cancel_Button.icon = this.scaledResource( ":/icons/cancel.png" );
   this.cancel_Button.onClick = function()
   {
      this.dialog.cancel();
   };

   this.buttons_Sizer = new HorizontalSizer;
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.addStretch();
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.add( this.cancel_Button );

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;

   this.sizer.add( this.exampleHorizontalSizer );
   this.sizer.addSpacing( 4 );

   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();

