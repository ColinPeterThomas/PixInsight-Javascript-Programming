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
   this.newlabel.text = ".....FrameStyle_Flat !.....";
   this.newlabel.frameStyle = FrameStyle_Flat;
   this.newlabel.margin = 4;

   this.labelSizer = new HorizontalSizer;
   this.labelSizer.spacing = 10;
   this.labelSizer.add( this.newlabel );

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;
   this.sizer.add( this.labelSizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();
