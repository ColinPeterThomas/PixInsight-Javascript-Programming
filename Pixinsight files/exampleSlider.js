#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>
#include <pjsr/FrameStyle.jsh>
#include <pjsr/Slider.jsh>

#define VERSION "0.1"
#define TITLE   "Example Slider"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();

   /////////////////////////////////////////
   this.newSlider = new Slider( this );
   this.newSlider.minValue = 0;
   this.newSlider.maxValue = 100;
   this.newSlider.value    = 50 ;

   this.newSlider.onValueUpdated = function()
   {
      console.writeln("INFO: Slider Changed ..");
      console.writeln("Value:" + this.value);
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

   this.sliderSizer = new HorizontalSizer;
   this.sliderSizer.spacing = 10;
   this.sliderSizer.add( this.newSlider );

   this.buttons_Sizer = new HorizontalSizer;
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.ok_Button );
   this.buttons_Sizer.spacing = 10;
   this.buttons_Sizer.add( this.cancel_Button );

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;
   this.sizer.add( this.sliderSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
