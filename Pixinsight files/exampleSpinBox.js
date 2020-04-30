#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/FrameStyle.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdIcon.jsh>
#include <pjsr/ColorSpace.jsh>
#include <pjsr/Interpolation.jsh>
#include <pjsr/UndoFlag.jsh>

#define VERSION "1.0"
#define TITLE   "Example SpinBox"



function myDialog()
{
   this.__base__ = Dialog
   this.__base__();


      var emWidth = this.font.width( 'M' );
   var labelWidth1 = this.font.width( "Background color:" ) + emWidth;

   //
   /////////////////////////////////////////
   this.exampleSpinBoxLabel = new Label( this );
   this.exampleSpinBoxLabel.text = "Label for SpinBox";
   this.exampleSpinBoxLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.exampleSpinBoxLabel.minWidth = labelWidth1;

   this.exampleSpinBox = new SpinBox( this );
   this.exampleSpinBox.minValue = 1;
   this.exampleSpinBox.maxValue = 16384;
   this.exampleSpinBox.value = 100;
   this.exampleSpinBox.toolTip = "Example SpinBox.";

   this.exampleSpinBox.onValueUpdated = function(  )
   {
      let value = this.value
      console.writeln("SpinBox Selected");
      console.writeln(value);
      console.writeln(this.dialog.exampleSpinBox.value);
      let messageString = "MessageBox from SpinBox  selected: " + value + "...";
      let messagebox = new MessageBox(
         messageString,
         "",
         StdIcon_Question,
         StdButton_Ok
      );
      messagebox.execute()
   };

   this.exampleSpinBoxHorizontalSizer = new HorizontalSizer;
   this.exampleSpinBoxHorizontalSizer.spacing = 4;
   this.exampleSpinBoxHorizontalSizer.add( this.exampleSpinBoxLabel );
   this.exampleSpinBoxHorizontalSizer.add( this.exampleSpinBox );
   this.exampleSpinBoxHorizontalSizer.addStretch();
   /////////////////////////////////////////

   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "OK";
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
   this.buttons_Sizer.spacing = 6;
   this.buttons_Sizer.addStretch();
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.add( this.cancel_Button );

   //

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.exampleSpinBoxHorizontalSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


dialog = new myDialog();

dialog.execute();


