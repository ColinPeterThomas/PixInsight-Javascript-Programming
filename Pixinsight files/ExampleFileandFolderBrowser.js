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

#define VERSION "0.1"
#define TITLE   "File and Folder Example"



function FileandFolderDialog()
{
   this.__base__ = Dialog
   this.__base__();

   /////////////////////////////////////////
   //Folder Browser
   this.folderDialogLabel = new Label( this );
   this.folderDialogLabel.text = "Directory :";
   this.folderDialogLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;

   this.folderDialogEdit = new Edit(this);
   this.folderDialogEdit.readOnly = true;
   this.folderDialogEdit.style = FrameStyle_Box;
   this.folderDialogEdit.setMinWidth(450);

   let ttStr = "Find Directory."
   this.folderDialogEdit.toolTip = ttStr;
   this.folderDialogEdit.text    = "/";

   this.folderDialogEditButton = new ToolButton(this);
   this.folderDialogEditButton.icon = this.folderDialogEditButton.scaledResource( ":/browser/select.png" );
   this.folderDialogEditButton.toolTip = ttStr;

   this.folderDialogEditButton.onClick = function()
   {
      let directoryDialog = new GetDirectoryDialog;
      directoryDialog.caption = "Select Directory";
      directoryDialog.initialPath = "/";

      if ( directoryDialog.execute() )
      {
         let dir = directoryDialog.directory;
         if(dir.charAt(dir.length-1) != '/')
            dir += "/";
         this.dialog.folderDialogEdit.text = dir;
      }
   }

   this.folderDialogHorizontalSizer = new HorizontalSizer;
   this.folderDialogHorizontalSizer.spacing = 4;
   this.folderDialogHorizontalSizer.add( this.folderDialogLabel );
   this.folderDialogHorizontalSizer.add( this.folderDialogEdit );
   this.folderDialogHorizontalSizer.add( this.folderDialogEditButton);

   /////////////////////////////////////////
   //File Browser
   this.fileDialogLabel = new Label( this );
   this.fileDialogLabel.text = "File :";
   this.fileDialogLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;

   this.fileDialogEdit = new Edit(this);
   this.fileDialogEdit.readOnly = true;
   this.fileDialogEdit.style = FrameStyle_Box;
   this.fileDialogEdit.setMinWidth(450);

   let ffStr = "Find File."
   this.fileDialogEdit.toolTip = ffStr;
   this.fileDialogEdit.text    = "/";

   this.fileDialogEditButton = new ToolButton(this);
   this.fileDialogEditButton.icon = this.folderDialogEditButton.scaledResource( ":/browser/select.png" );
   this.fileDialogEditButton.toolTip = ttStr;


   this.fileDialogEditButton.onClick = function()
   {
      let fileDialog = new OpenFileDialog;
      if ( fileDialog.execute() )
      {
         let thisFile = fileDialog.fileName;
         this.dialog.fileDialogEdit.text = thisFile;
      }
   }

   this.fileDialogHorizontalSizer = new HorizontalSizer;
   this.fileDialogHorizontalSizer.spacing = 4;
   this.fileDialogHorizontalSizer.add( this.fileDialogLabel );
   this.fileDialogHorizontalSizer.add( this.fileDialogEdit );
   this.fileDialogHorizontalSizer.add( this.fileDialogEditButton);
   /////////////////////////////////////////

   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "OK";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      this.dialog.ok();
   };

   this.cancel_Button = new PushButton( this );
   this.cancel_Button.text = "Report";
   this.cancel_Button.icon = this.scaledResource( ":/icons/write.png" );
   this.cancel_Button.onClick = function()
   {
      console.writeln("INFO: Current Directory value: " + this.dialog.folderDialogEdit.text);
      console.writeln("INFO: Current File value: " + this.dialog.fileDialogEdit.text);
      let msgStr = "<p>INFO: Current Directory value " +this.dialog.folderDialogEdit.text + "</p>" +
                   "<p>INFO: Current file value " +this.dialog.fileDialogEdit.text + "</p>";
      let msg = new MessageBox(msgStr, TITLE, StdButton_Cancel);
      msg.execute();

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

   this.sizer.add( this.folderDialogHorizontalSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.fileDialogHorizontalSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();

}
FileandFolderDialog.prototype = new Dialog


dialog = new FileandFolderDialog();

dialog.execute();
