#include <pjsr/StdIcon.jsh>
#include <pjsr/StdButton.jsh>
#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/TextAlign.jsh>
#include <pjsr/CheckState.jsh>
#include <pjsr/FrameStyle.jsh>

#define VERSION "0.1"
#define TITLE   "Example Label"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();



   /////////////////////////////////////////

   this.newlabel = new Label( this );
   this.newlabel.text = "This is some Text for the reader  !";

   this.newlabel1 = new Label( this );
   this.newlabel1.text = "This is some more Text with A Frame  !";
   this.newlabel1.frameStyle = FrameStyle_Box;
   this.newlabel1.margin = 4;

   this.newlabel2 = new Label( this );
   this.newlabel2.wordWrapping = true;
   this.newlabel2.frameStyle = FrameStyle_Sunken
   this.newlabel2.useRichText = true;
   this.newlabel2.text = "<b>" + TITLE + " v" + VERSION + "</b> &mdash; This is some <b>Rich</b> <i>text</i> with wordWrapping and <b><i>Sunken Frame</b></i> which goes on and one and on and on. ."


   this.clear_Button = new PushButton( this );
   this.clear_Button.text = "Clear Text";
   this.clear_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.clear_Button.onClick = function()
   {
      console.writeln("INFO: Clear label activated..");
      this.dialog.newlabel.clear();
   };

   this.change_Button = new PushButton( this );
   this.change_Button.text = "Change Text";
   this.change_Button.icon = this.scaledResource( ":/icons/document-change-info.png" );
   this.change_Button.onClick = function()
   {
      console.writeln("INFO: Clear label activated..");
      this.dialog.newlabel.text = 'Updated Text !!!';
   };

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

   this.labelSizer = new HorizontalSizer;
   this.labelSizer.spacing = 10;
   this.labelSizer.add( this.newlabel );

   this.label1Sizer = new HorizontalSizer;
   this.label1Sizer.spacing = 10;
   this.label1Sizer.add( this.newlabel1 );

   this.label2Sizer = new HorizontalSizer;
   this.label2Sizer.spacing = 10;
   this.label2Sizer.add( this.newlabel2 );

   this.buttons_Sizer = new HorizontalSizer;
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
   this.sizer.add( this.labelSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.label1Sizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.label2Sizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
