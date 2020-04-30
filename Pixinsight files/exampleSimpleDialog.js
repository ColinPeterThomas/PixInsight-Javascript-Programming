#include <pjsr/StdDialogCode.jsh>
#include <pjsr/Sizer.jsh>

#define VERSION "0.1"
#define TITLE   "Example Dialog"


//////////////////////////////////////
function myDialog()
{
   this.__base__ = Dialog
   this.__base__();



   this.windowTitle = TITLE + " Script";
   //this.adjustToContents();
   //this.setFixedSize();


}
myDialog.prototype = new Dialog


let dialog = new myDialog();

dialog.execute();

