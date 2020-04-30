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
#include <pjsr/CheckState.jsh>

#define VERSION "0.1"
#define TITLE   "Integration Automation"


//////////////////////////////////////
function integrationAutomation()
{
   this.__base__ = Dialog
   this.__base__();


   var emWidth = this.font.width( 'M' );
   var labelWidth1 = this.font.width( "Background color:" ) + emWidth;

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
   this.helpLabel.text = "<b>" + TITLE + " v" + VERSION + "</b> &mdash; Automated Script up till Integration. ."
   /////////////////////////////////////////
   this.fileDialogLabel = new Label( this );
   this.fileDialogLabel.text = "Directory of Original Camera FITs:";
   this.fileDialogLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;

   //output controls
   this.fileDialogEdit = new Edit(this);
   this.fileDialogEdit.readOnly = true;
   this.fileDialogEdit.style = FrameStyle_Box;
   this.fileDialogEdit.setMinWidth(450);

   let ttStr = "Raw camera data directory."
   this.fileDialogEdit.toolTip = ttStr;

   this.fileDialogEditButton = new ToolButton(this);
   this.fileDialogEditButton.icon = this.fileDialogEditButton.scaledResource( ":/browser/select.png" );
   this.fileDialogEditButton.toolTip = ttStr;

   this.fileDialogEditButton.onClick = function()
   {
         console.writeln("File Dialog hs been clicked...");
         //////////////////////////////////////
   }
   this.fileDialogHorizontalSizer = new HorizontalSizer;
   this.fileDialogHorizontalSizer.spacing = 4;
   this.fileDialogHorizontalSizer.add( this.fileDialogLabel );
   this.fileDialogHorizontalSizer.add( this.fileDialogEdit );
   this.fileDialogHorizontalSizer.add( this.fileDialogEditButton);
   /////////////////////////////////////////
   this.redLabel = new Label( this );
   this.redLabel.text = "Red Filter Data:";
   this.redLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.redLabel.width = 100;

   this.redEdit = new Edit( this );
   this.redEdit.text = format( "_R" );
   this.redEdit.maxWidth = 80;

   this.redFlatEdit = new Edit( this );
   this.redFlatEdit.text = format( "_R_FLAT" );
   this.redFlatEdit.maxWidth = 80;

   this.redLightCount = new Edit( this );
   this.redLightCount.text = format( "0" );
   this.redLightCount.maxWidth = 80;

   this.redFlatCount = new Edit( this );
   this.redFlatCount.text = format( "0" );
   this.redFlatCount.maxWidth = 80;

   this.redCheckBox = new CheckBox (this );
   this.redCheckBox.onClick = function()
   {
      if (this.dialog.redCheckBox.checked)
      {
         filterStatus['red'] = true;
      } else {
         filterStatus['red'] = false;
      }
   }
   /////////////////////////////////////////
   this.greenLabel = new Label( this );
   this.greenLabel.text = "Green Filter Data:";
   this.greenLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.greenLabel.width = 100;

   this.greenEdit = new Edit( this );
   this.greenEdit.text = format( "_G" );
   this.greenEdit.maxWidth = 80;

   this.greenFlatEdit = new Edit( this );
   this.greenFlatEdit.text = format( "_G_FLAT" );
   this.greenFlatEdit.maxWidth = 80;

   this.greenLightCount = new Edit( this );
   this.greenLightCount.text = format( "0" );
   this.greenLightCount.maxWidth = 80;

   this.greenFlatCount = new Edit( this );
   this.greenFlatCount.text = format( "0" );
   this.greenFlatCount.maxWidth = 80;

   this.greenCheckBox = new CheckBox (this );
   this.greenCheckBox.onClick = function()
   {
      if (this.dialog.greenCheckBox.checked)
      {
         filterStatus['green'] = true;
      } else {
         filterStatus['green'] = false;
      }
   }
   /////////////////////////////////////////
   this.blueLabel = new Label( this );
   this.blueLabel.text = "Blue Filter Data:";
   this.blueLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.blueLabel.width = 100;

   this.blueEdit = new Edit( this );
   this.blueEdit.text = format( "_B" );
   this.blueEdit.maxWidth = 80;

   this.blueFlatEdit = new Edit( this );
   this.blueFlatEdit.text = format( "_B_FLAT" );
   this.blueFlatEdit.maxWidth = 80;

   this.blueLightCount = new Edit( this );
   this.blueLightCount.text = format( "0" );
   this.blueLightCount.maxWidth = 80;

   this.blueFlatCount = new Edit( this );
   this.blueFlatCount.text = format( "0" );
   this.blueFlatCount.maxWidth = 80;

   this.blueCheckBox = new CheckBox (this );
   this.blueCheckBox.onClick = function()
   {
      if (this.dialog.blueCheckBox.checked)
      {
         filterStatus['blue'] = true;
      } else {
         filterStatus['blue'] = false;
      }
   }

   ///////////////////////////////////////////////
   this.red_Sizer = new HorizontalSizer;
   this.red_Sizer.spacing = 6;
   this.red_Sizer.addStretch();
   this.red_Sizer.add( this.redLabel );
   this.red_Sizer.add( this.redEdit );
   this.red_Sizer.add( this.redLightCount );
   this.red_Sizer.add( this.redFlatEdit );
   this.red_Sizer.add( this.redFlatCount );
   this.red_Sizer.add( this.redCheckBox );
   ///////////////////////////////////////////////
   this.green_Sizer = new HorizontalSizer;
   this.green_Sizer.spacing = 6;
   this.green_Sizer.add( this.greenLabel );
   this.green_Sizer.add( this.greenEdit );
   this.green_Sizer.addStretch();
   this.green_Sizer.add( this.greenLightCount );
   this.green_Sizer.add( this.greenFlatEdit );
   this.green_Sizer.add( this.greenFlatCount );
   this.green_Sizer.add( this.greenCheckBox );
   ///////////////////////////////////////////////
   this.blue_Sizer = new HorizontalSizer;
   this.blue_Sizer.spacing = 6;
   this.blue_Sizer.add( this.blueLabel );
   this.blue_Sizer.add( this.blueEdit );
   this.blue_Sizer.add( this.blueLightCount );
   this.blue_Sizer.add( this.blueFlatEdit );
   this.blue_Sizer.addStretch();
   this.blue_Sizer.add( this.blueFlatCount );
   this.blue_Sizer.add( this.blueCheckBox );
   ///////////////////////////////////////////////
   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "OK";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      //////////////////////////////////////
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

   /////////////////////////////////////////

   this.sizer = new VerticalSizer;
   this.sizer.margin = 6;
   this.sizer.spacing = 6;

   this.sizer.add( this.helpLabel );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.fileDialogHorizontalSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.red_Sizer );
   this.sizer.add( this.green_Sizer );
   this.sizer.add( this.blue_Sizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
integrationAutomation.prototype = new Dialog


let dialog = new integrationAutomation();

dialog.execute();
