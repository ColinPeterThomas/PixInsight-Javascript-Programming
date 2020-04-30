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
#define TITLE   "TEST"



function myDialog()
{
   this.__base__ = Dialog
   this.__base__();


      var emWidth = this.font.width( 'M' );
   var labelWidth1 = this.font.width( "Background color:" ) + emWidth;

   //
   /////////////////////////////////////////
   this.helpLabel = new Label( this );
   //Allowable Frame Style:
   //FrameStyle_Flat    0  // No frame is drawn
   //FrameStyle_Box     1  // Simple rectangular frame
   //FrameStyle_Raised  2  // Raised 3-D panel
   //FrameStyle_Sunken  3  // Sunken (lowered) 3-D panel
   //FrameStyle_Styled  4  // The appearance depends on the current platform and GUI style
   this.helpLabel.frameStyle = FrameStyle_Box;
   this.helpLabel.margin = 4;
   this.helpLabel.wordWrapping = true;
   this.helpLabel.useRichText = true;
   this.helpLabel.text = "Label with Frame:<b>" + TITLE + " v" + VERSION + "</b> &mdash; Example of Qt widets " +
      "in Pixinsight.<b> In bold</b> <i> In Italics</i> ."
   /////////////////////////////////////////
   this.exampleViewListLabel = new Label( this );
   this.exampleViewListLabel.text = "Label with no frame:";
   this.exampleViewListLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.exampleViewListLabel.minWidth = labelWidth1;

   this.exampleViewList = new ViewList( this );
   this.exampleViewList.scaledMinWidth = 300;
   this.exampleViewList.getAll(); // include main views as well as previews
   this.exampleViewList.currentView = ImageWindow.activeWindow.mainView;


   this.exampleViewList.toolTip = "Example ViewList";

   this.exampleViewList.onViewSelected = function( view )
   {
      console.writeln("ViewList Selected");
      messagebox = new MessageBox(
         "MessageBoc from ViewList being selected",
         "",
         StdIcon_Information,
         StdButton_Cancel
      );
      messagebox.execute()

   };

   this.viewListHorizontalSizer = new HorizontalSizer;
   this.viewListHorizontalSizer.spacing = 4;
   this.viewListHorizontalSizer.add( this.exampleViewListLabel );
   this.viewListHorizontalSizer.add( this.exampleViewList, 100 );
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
      let messageString = "MessageBox from SpinBox  selected: " + value + "...";
      messagebox = new MessageBox(
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
   this.exampleEditLabel = new Label( this );
   this.exampleEditLabel.text = "Label for Edit";
   this.exampleEditLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.exampleEditLabel.minWidth = labelWidth1;

   this.exampleEdit = new Edit( this );
   this.exampleEdit.text = format( "Default Edit String" );
   this.exampleEdit.minWidth = 100;
   this.exampleEdit.toolTip = "Example Edit Widget";
   this.exampleEdit.onEditCompleted = function()
   {
      let text = this.text
      console.writeln("Edit Selected");
      console.writeln(text);
      let messageString = "MessageBox from Edit  Completed: " + text + "...";
      messagebox = new MessageBox(
         messageString,
         "",
         StdIcon_Error,
         StdButton_Ok
      );
      messagebox.execute()
   };

   this.bkgColor_Sizer = new HorizontalSizer;
   this.bkgColor_Sizer.spacing = 4;
   this.bkgColor_Sizer.add( this.exampleEditLabel );
   this.bkgColor_Sizer.add( this.exampleEdit );
   this.bkgColor_Sizer.addStretch();

   //

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
   this.sizer.spacing = 6;
   this.sizer.add( this.helpLabel );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.viewListHorizontalSizer );
   this.sizer.add( this.exampleSpinBoxHorizontalSizer );
   this.sizer.add( this.bkgColor_Sizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
myDialog.prototype = new Dialog


dialog = new myDialog();

dialog.execute();


