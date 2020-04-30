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
let filterProcessDictionary      = {};
filterProcessDictionary["red"]   = {};
filterProcessDictionary["green"] = {};
filterProcessDictionary["blue"]  = {};
filterProcessDictionary["lum"]   = {};
filterProcessDictionary["ha"]    = {};
filterProcessDictionary["oiii"]  = {};
filterProcessDictionary["sii"]   = {};

//MasterFlatCalibration
filterProcessDictionary['red']['MasterFlatCalibration']   = "R_MasterFlatCalibration";
filterProcessDictionary['green']['MasterFlatCalibration'] = "G_MasterFlatCalibration";
filterProcessDictionary['blue']['MasterFlatCalibration']  = "B_MasterFlatCalibration";
filterProcessDictionary['lum']['MasterFlatCalibration']   = "L_MasterFlatCalibration";
filterProcessDictionary['ha']['MasterFlatCalibration']    = "HA_MasterFlatCalibration";
filterProcessDictionary['oiii']['MasterFlatCalibration']  = "OIII_MasterFlatCalibration";
filterProcessDictionary['sii']['MasterFlatCalibration']   = "SII_MasterFlatCalibration";
//MasterFlatIntegration
filterProcessDictionary['red']['MasterFlatIntegration']   = "R_MasterFlatIntegration";
filterProcessDictionary['green']['MasterFlatIntegration'] = "G_MasterFlatIntegration";
filterProcessDictionary['blue']['MasterFlatIntegration']  = "B_MasterFlatIntegration";
filterProcessDictionary['lum']['MasterFlatIntegration']   = "L_MasterFlatIntegration";
filterProcessDictionary['ha']['MasterFlatIntegration']    = "HA_MasterFlatIntegration";
filterProcessDictionary['oiii']['MasterFlatIntegration']  = "OIII_MasterFlatIntegration";
filterProcessDictionary['sii']['MasterFlatIntegration']   = "SII_MasterFlatIntegration";
//Calibrate Light
filterProcessDictionary['red']['Calibration']             = "CalibrateRED";
filterProcessDictionary['green']['Calibration']           = "CalibrateGREEN";
filterProcessDictionary['blue']['Calibration']            = "CalibrateBLUE";
filterProcessDictionary['lum']['Calibration']             = "CalibrateLUM";
filterProcessDictionary['ha']['Calibration']              = "CalibrateHA";
filterProcessDictionary['oiii']['Calibration']            = "CalibrateOIII";
filterProcessDictionary['sii']['Calibration']             = "CalibrateSII";
//Cosmetic Correction
filterProcessDictionary['red']['CosmeticCorrection']      = "CosmeticCorrectionRED";
filterProcessDictionary['green']['CosmeticCorrection']    = "CosmeticCorrectionGREEN";
filterProcessDictionary['blue']['CosmeticCorrection']     = "CosmeticCorrectionBLUE";
filterProcessDictionary['lum']['CosmeticCorrection']      = "CosmeticCorrectionLUM";
filterProcessDictionary['ha']['CosmeticCorrection']       = "CosmeticCorrectionHA";
filterProcessDictionary['oiii']['CosmeticCorrection']     = "CosmeticCorrectionOIII";
filterProcessDictionary['sii']['CosmeticCorrection']      = "CosmeticCorrectionSII";
//Integration
filterProcessDictionary['red']['Integration']             = "REDIntegration";
filterProcessDictionary['green']['Integration']           = "GREENIntegration";
filterProcessDictionary['blue']['Integration']            = "BLUEIntegration";
filterProcessDictionary['lum']['Integration']             = "LUMIntegration";
filterProcessDictionary['ha']['Integration']              = "HAIntegration";
filterProcessDictionary['oiii']['Integration']            = "OIIIIntegration";
filterProcessDictionary['sii']['Integration']             = "SIIIntegration";

//////////////////////////////////////
let lightFiles = {};
lightFiles['red']   = []
lightFiles['green'] = []
lightFiles['blue']  = []
lightFiles['lum']   = []
lightFiles['ha']    = []
lightFiles['oiii']  = []
lightFiles['siii']  = []

//////////////////////////////////////
let flatFiles = {};
flatFiles['red']   = []
flatFiles['green'] = []
flatFiles['blue']  = []
flatFiles['lum']   = []
flatFiles['ha']    = []
flatFiles['oiii']  = []
flatFiles['siii']  = []
//////////////////////////////////////
//List of the filters, so can cycle through
let filterList = ['red' , 'green','blue', 'lum', 'ha', 'oiii', 'sii'];
//////////////////////////////////////
//Keep track of checkBoxs
let filterStatus = [];
filterStatus['red']   = false;
filterStatus['green'] = false;
filterStatus['blue']  = false;
filterStatus['lum']   = false;
filterStatus['ha']    = false;
filterStatus['oiii']  = false;
filterStatus['sii']   = false;

let processesToRun = [];
processesToRun['MasterFlatCalibration']   = true;
processesToRun['MasterFlatIntegration']   = true;
processesToRun['LightCalibration']        = true;
processesToRun['LightCosmeticCorrection'] = true;
processesToRun['LightRegistration']       = true;
processesToRun['LightLocalNormalisation'] = true;
processesToRun['LightIntegration']        = true;

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
      let directoryDialog = new GetDirectoryDialog;
      directoryDialog.caption = "Select Raw Output Directory";
      directoryDialog.initialPath = "/Volumes/NASmounts/familyCloudPublic/Shared Pictures/Star Gazing/2020/";

      if ( directoryDialog.execute() )
      {
         let dir = directoryDialog.directory;
         if(dir.charAt(dir.length-1) != '/')
            dir += "/";
         this.dialog.fileDialogEdit.text = dir;

         let redLightSearchPath   = directoryDialog.directory +"/*" + this.dialog.redEdit.text   + ".fit";
         let greenLightSearchPath = directoryDialog.directory +"/*" + this.dialog.greenEdit.text + ".fit";
         let blueLightSearchPath  = directoryDialog.directory +"/*" + this.dialog.blueEdit.text  + ".fit";
         let lumLightSearchPath   = directoryDialog.directory +"/*" + this.dialog.lumEdit.text   + ".fit";
         let HaLightSearchPath    = directoryDialog.directory +"/*" + this.dialog.HaEdit.text    + ".fit";
         let OiiiLightSearchPath  = directoryDialog.directory +"/*" + this.dialog.OiiiEdit.text  + ".fit";
         let SiiLightSearchPath   = directoryDialog.directory +"/*" + this.dialog.SiiEdit.text   + ".fit";

         let redFlatSearchPath   = directoryDialog.directory +"/*" + this.dialog.redFlatEdit.text   + ".fit";
         let greenFlatSearchPath = directoryDialog.directory +"/*" + this.dialog.greenFlatEdit.text + ".fit";
         let blueFlatSearchPath  = directoryDialog.directory +"/*" + this.dialog.blueFlatEdit.text  + ".fit";
         let lumFlatSearchPath   = directoryDialog.directory +"/*" + this.dialog.lumFlatEdit.text   + ".fit";
         let HaFlatSearchPath    = directoryDialog.directory +"/*" + this.dialog.HaFlatEdit.text    + ".fit";
         let OiiiFlatSearchPath  = directoryDialog.directory +"/*" + this.dialog.OiiiFlatEdit.text  + ".fit";
         let SiiFlatSearchPath   = directoryDialog.directory +"/*" + this.dialog.SiiFlatEdit.text   + ".fit";

         lightFiles['red']    = searchDirectory( redLightSearchPath,false);
         lightFiles['green']  = searchDirectory( greenLightSearchPath,false);
         lightFiles['blue']   = searchDirectory( blueLightSearchPath,false);
         lightFiles['lum']    = searchDirectory( lumLightSearchPath,false);
         lightFiles['ha']     = searchDirectory( HaLightSearchPath,false);
         lightFiles['oiii']   = searchDirectory( OiiiLightSearchPath,false);
         lightFiles['sii']    = searchDirectory( SiiLightSearchPath,false);

         flatFiles['red']     = searchDirectory( redFlatSearchPath,false);
         flatFiles['green']   = searchDirectory( greenFlatSearchPath,false);
         flatFiles['blue']    = searchDirectory( blueFlatSearchPath,false);
         flatFiles['lum']     = searchDirectory( lumFlatSearchPath,false);
         flatFiles['ha']      = searchDirectory( HaFlatSearchPath,false);
         flatFiles['oiii']    = searchDirectory( OiiiFlatSearchPath,false);
         flatFiles['sii']     = searchDirectory( SiiFlatSearchPath,false);

         this.dialog.redLightCount.text    = (lightFiles['red'].length).toString();
         this.dialog.greenLightCount.text  = (lightFiles['green'].length).toString();
         this.dialog.blueLightCount.text   = (lightFiles['blue'].length).toString();
         this.dialog.lumLightCount.text    = (lightFiles['lum'].length).toString();
         this.dialog.HaLightCount.text     = (lightFiles['ha'].length).toString();
         this.dialog.OiiiLightCount.text   = (lightFiles['oiii'].length).toString();
         this.dialog.SiiLightCount.text    = (lightFiles['sii'].length).toString();

         this.dialog.redFlatCount.text     = (flatFiles['red'].length).toString();
         this.dialog.greenFlatCount.text   = (flatFiles['green'].length).toString();
         this.dialog.blueFlatCount.text    = (flatFiles['blue'].length).toString();
         this.dialog.lumFlatCount.text     = (flatFiles['lum'].length).toString();
         this.dialog.HaFlatCount.text      = (flatFiles['ha'].length).toString();
         this.dialog.OiiiFlatCount.text    = (flatFiles['oiii'].length).toString();
         this.dialog.SiiFlatCount.text     = (flatFiles['sii'].length).toString();


         //////////////////////////////////////
      }
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

   /////////////////////////////////////////
   this.lumLabel = new Label( this );
   this.lumLabel.text = "Lum Filter Data:";
   this.lumLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.lumLabel.width = 100;

   this.lumEdit = new Edit( this );
   this.lumEdit.text = format( "_L" );
   this.lumEdit.maxWidth = 80;

   this.lumFlatEdit = new Edit( this );
   this.lumFlatEdit.text = format( "_L_FLAT" );
   this.lumFlatEdit.maxWidth = 80;

   this.lumLightCount = new Edit( this );
   this.lumLightCount.text = format( "0" );
   this.lumLightCount.maxWidth = 80;

   this.lumFlatCount = new Edit( this );
   this.lumFlatCount.text = format( "0" );
   this.lumFlatCount.maxWidth = 80;

   this.lumCheckBox = new CheckBox (this );
   this.lumCheckBox.onClick = function()
   {
      if (this.dialog.lumCheckBox.checked)
      {
         filterStatus['lum'] = true;
      } else {
         filterStatus['lum'] = false;
      }
   }

   /////////////////////////////////////////
   this.HaLabel = new Label( this );
   this.HaLabel.text = "Ha Filter Data:";
   this.HaLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.HaLabel.width = 100;

   this.HaEdit = new Edit( this );
   this.HaEdit.text = format( "_HA" );
   this.HaEdit.maxWidth = 80;

   this.HaFlatEdit = new Edit( this );
   this.HaFlatEdit.text = format( "_HA_FLAT" );
   this.HaFlatEdit.maxWidth = 80;

   this.HaLightCount = new Edit( this );
   this.HaLightCount.text = format( "0" );
   this.HaLightCount.maxWidth = 80;

   this.HaFlatCount = new Edit( this );
   this.HaFlatCount.text = format( "0" );
   this.HaFlatCount.maxWidth = 80;

   this.HaCheckBox = new CheckBox (this );
   this.HaCheckBox.onClick = function()
   {
      if (this.dialog.HaCheckBox.checked)
      {
         filterStatus['ha'] = true;
      } else {
         filterStatus['ha'] = false;
      }
   }
   /////////////////////////////////////////
   this.OiiiLabel = new Label( this );
   this.OiiiLabel.text = "Oiii Filter Data:";
   this.OiiiLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.OiiiLabel.width = 100;

   this.OiiiEdit = new Edit( this );
   this.OiiiEdit.text = format( "_OIII" );
   this.OiiiEdit.maxWidth = 80;

   this.OiiiFlatEdit = new Edit( this );
   this.OiiiFlatEdit.text = format( "_OIII_FLAT" );
   this.OiiiFlatEdit.maxWidth = 80;

   this.OiiiLightCount = new Edit( this );
   this.OiiiLightCount.text = format( "0" );
   this.OiiiLightCount.maxWidth = 80;

   this.OiiiFlatCount = new Edit( this );
   this.OiiiFlatCount.text = format( "0" );
   this.OiiiFlatCount.maxWidth = 80;

   this.OiiiCheckBox = new CheckBox (this );
   this.OiiiCheckBox.onClick = function()
   {
      if (this.dialog.OiiiCheckBox.checked)
      {
         filterStatus['oiii'] = true;
      } else {
         filterStatus['oiii'] = false;
      }
   }
   /////////////////////////////////////////
   this.SiiLabel = new Label( this );
   this.SiiLabel.text = "Sii Filter Data:";
   this.SiiLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.SiiLabel.width = 100;

   this.SiiEdit = new Edit( this );
   this.SiiEdit.text = format( "_SII" );
   this.SiiEdit.maxWidth = 80;

   this.SiiFlatEdit = new Edit( this );
   this.SiiFlatEdit.text = format( "_SII_FLAT" );
   this.SiiFlatEdit.maxWidth = 80;

   this.SiiLightCount = new Edit( this );
   this.SiiLightCount.text = format( "0" );
   this.SiiLightCount.maxWidth = 80;

   this.SiiFlatCount = new Edit( this );
   this.SiiFlatCount.text = format( "0" );
   this.SiiFlatCount.maxWidth = 80;

   this.SiiCheckBox = new CheckBox (this );
   this.SiiCheckBox.onClick = function()
   {
      if (this.dialog.SiiCheckBox.checked)
      {
         filterStatus['sii'] = true;
      } else {
         filterStatus['sii'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.channelLabelSizer = new VerticalSizer;
   this.channelLabelSizer.margin = 6;
   this.channelLabelSizer.spacing = 6;
   this.channelLabelSizer.add( this.redLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.greenLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.blueLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.lumLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.HaLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.OiiiLabel );
   this.channelLabelSizer.addSpacing( 4 );
   this.channelLabelSizer.add( this.SiiLabel );
   this.channelLabelSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelEditSizer = new VerticalSizer;
   this.channelEditSizer.margin = 6;
   this.channelEditSizer.spacing = 6;
   this.channelEditSizer.add( this.redEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.greenEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.blueEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.lumEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.HaEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.OiiiEdit );
   this.channelEditSizer.addSpacing( 4 );
   this.channelEditSizer.add( this.SiiEdit );
   this.channelEditSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelFlatEditSizer = new VerticalSizer;
   this.channelFlatEditSizer.margin = 6;
   this.channelFlatEditSizer.spacing = 6;
   this.channelFlatEditSizer.add( this.redFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.greenFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.blueFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.lumFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.HaFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.OiiiFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   this.channelFlatEditSizer.add( this.SiiFlatEdit );
   this.channelFlatEditSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelCheckBoxSizer = new VerticalSizer;
   this.channelCheckBoxSizer.margin = 6;
   this.channelCheckBoxSizer.spacing = 6;
   this.channelCheckBoxSizer.add( this.redCheckBox ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.greenCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.blueCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.lumCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.HaCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.OiiiCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   this.channelCheckBoxSizer.add( this.SiiCheckBox  ,200);
   this.channelCheckBoxSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelLightCountSizer = new VerticalSizer;
   this.channelLightCountSizer.margin = 6;
   this.channelLightCountSizer.spacing = 6;
   this.channelLightCountSizer.add( this.redLightCount ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.greenLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.blueLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.lumLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.HaLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.OiiiLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   this.channelLightCountSizer.add( this.SiiLightCount  ,200);
   this.channelLightCountSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelFlatCountSizer = new VerticalSizer;
   this.channelFlatCountSizer.margin = 6;
   this.channelFlatCountSizer.spacing = 6;
   this.channelFlatCountSizer.add( this.redFlatCount ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.greenFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.blueFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.lumFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.HaFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.OiiiFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   this.channelFlatCountSizer.add( this.SiiFlatCount  ,200);
   this.channelFlatCountSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.channelSizer = new HorizontalSizer;
   this.channelSizer.spacing = 5;
   this.channelSizer.add( this.channelLabelSizer );
   this.channelSizer.spacing = 10;
   this.channelSizer.add( this.channelEditSizer );
   this.channelSizer.spacing = 5;
   this.channelSizer.add( this.channelLightCountSizer );
   this.channelSizer.spacing = 5;
   this.channelSizer.add( this.channelFlatEditSizer );
   this.channelSizer.spacing = 5;
   this.channelSizer.add( this.channelFlatCountSizer );
   this.channelSizer.spacing = 5;
   this.channelSizer.add( this.channelCheckBoxSizer );
   this.channelSizer.addStretch();
   ///////////////////////////////////////////////
   this.MasterFlatCalibrationLabel = new Label( this );
   this.MasterFlatCalibrationLabel.text = "Master Flat Calibration Phase:";
   this.MasterFlatCalibrationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.MasterFlatCalibrationLabel.width = 100;
   this.MasterFlatCalibrationCheckBox = new CheckBox (this );
   this.MasterFlatCalibrationCheckBox.checked =  true ;
      this.MasterFlatCalibrationCheckBox.onClick = function()
   {
      if (this.dialog.MasterFlatCalibrationCheckBox.checked)
      {
         processesToRun['MasterFlatCalibration'] = true;
      } else {
         processesToRun['MasterFlatCalibration'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.MasterFlatIntegrationLabel = new Label( this );
   this.MasterFlatIntegrationLabel.text = "Master Flat Integration Phase:";
   this.MasterFlatIntegrationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.MasterFlatIntegrationLabel.width = 100;
   this.MasterFlatIntegrationCheckBox = new CheckBox (this );
   this.MasterFlatIntegrationCheckBox.checked =  true ;
   this.MasterFlatIntegrationCheckBox.onClick = function()
   {
      if (this.dialog.MasterFlatIntegrationCheckBox.checked)
      {
         processesToRun['MasterFlatIntegration'] = true;
      } else {
         processesToRun['MasterFlatIntegration'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.LightCalibrationLabel = new Label( this );
   this.LightCalibrationLabel.text = "Light Calibration Phase:";
   this.LightCalibrationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.LightCalibrationLabel.width = 100;
   this.LightCalibrationCheckBox = new CheckBox (this );
   this.LightCalibrationCheckBox.checked =  true ;
   this.LightCalibrationCheckBox.onClick = function()
   {
      if (this.dialog.LightCalibrationCheckBox.checked)
      {
         processesToRun['LightCalibration'] = true;
      } else {
         processesToRun['LightCalibration'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.LightCosmeticCorrectionLabel = new Label( this );
   this.LightCosmeticCorrectionLabel.text = "Light Cosmetic Correction Phase:";
   this.LightCosmeticCorrectionLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.LightCosmeticCorrectionLabel.width = 100;
   this.LightCosmeticCorrectionCheckBox = new CheckBox (this );
   this.LightCosmeticCorrectionCheckBox.checked =  true ;
   this.LightCosmeticCorrectionCheckBox.onClick = function()
   {
      if (this.dialog.LightCosmeticCorrectionCheckBox.checked)
      {
         processesToRun['LightCosmeticCorrection'] = true;
      } else {
         processesToRun['LightCosmeticCorrection'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.LightRegistrationLabel = new Label( this );
   this.LightRegistrationLabel.text = "Light Registration Phase:";
   this.LightRegistrationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.LightRegistrationLabel.width = 100;
   this.LightRegistrationCheckBox = new CheckBox (this );
   this.LightRegistrationCheckBox.checked =  true ;
   this.LightRegistrationCheckBox.onClick = function()
   {
      if (this.dialog.LightRegistrationCheckBox.checked)
      {
         processesToRun['LightRegistration'] = true;
      } else {
         processesToRun['LightRegistration'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.LightLocalNormalisationLabel = new Label( this );
   this.LightLocalNormalisationLabel.text = "Light Local-Normalisation Phase:";
   this.LightLocalNormalisationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.LightLocalNormalisationLabel.width = 100;
   this.LightLocalNormalisationCheckBox = new CheckBox (this );
   this.LightLocalNormalisationCheckBox.checked =  true ;
   this.LightLocalNormalisationCheckBox.onClick = function()
   {
      if (this.dialog.LightLocalNormalisationCheckBox.checked)
      {
         processesToRun['LightLocalNormalisation'] = true;
      } else {
         processesToRun['LightLocalNormalisation'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.LightIntegrationLabel = new Label( this );
   this.LightIntegrationLabel.text = "Light Integration Phase:";
   this.LightIntegrationLabel.textAlignment = TextAlign_Right|TextAlign_VertCenter;
   this.LightIntegrationLabel.width = 100;
   this.LightIntegrationCheckBox = new CheckBox (this );
   this.LightIntegrationCheckBox.checked =  true ;
   this.LightIntegrationCheckBox.onClick = function()
   {
      if (this.dialog.LightIntegrationCheckBox.checked)
      {
         processesToRun['LightIntegration'] = true;
      } else {
         processesToRun['LightIntegration'] = false;
      }
   }
   ///////////////////////////////////////////////
   this.processesToRunLabelSizer = new VerticalSizer;
   this.processesToRunLabelSizer.margin = 6;
   this.processesToRunLabelSizer.spacing = 6;
   this.processesToRunLabelSizer.add( this.MasterFlatCalibrationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.MasterFlatIntegrationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.LightCalibrationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.LightCosmeticCorrectionLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.LightRegistrationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.LightLocalNormalisationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   this.processesToRunLabelSizer.add( this.LightIntegrationLabel );
   this.processesToRunLabelSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.processesToRunCheckBoxSizer = new VerticalSizer;
   this.processesToRunCheckBoxSizer.margin = 6;
   this.processesToRunCheckBoxSizer.spacing = 6;
   this.processesToRunCheckBoxSizer.add( this.MasterFlatCalibrationCheckBox ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.MasterFlatIntegrationCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.LightCalibrationCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.LightCosmeticCorrectionCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.LightRegistrationCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.LightLocalNormalisationCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   this.processesToRunCheckBoxSizer.add( this.LightIntegrationCheckBox  ,200);
   this.processesToRunCheckBoxSizer.addSpacing( 4 );
   ///////////////////////////////////////////////
   this.processesToRunSizer = new HorizontalSizer;
   this.processesToRunSizer.spacing = 5;
   this.processesToRunSizer.add( this.processesToRunLabelSizer );
   this.processesToRunSizer.spacing = 10;
   this.processesToRunSizer.add( this.processesToRunCheckBoxSizer );
   this.processesToRunSizer.spacing = 5;
   this.processesToRunSizer.addStretch();
   ///////////////////////////////////////////////
   this.ok_Button = new PushButton( this );
   this.ok_Button.text = "OK";
   this.ok_Button.icon = this.scaledResource( ":/icons/ok.png" );
   this.ok_Button.onClick = function()
   {
      //////////////////////////////////////
      let filterCount = filterList.length;
      //////////////////////////////////////
      //MasterFlatCalibration
      if (processesToRun['MasterFlatCalibration']) {
         console.writeln("========================================");
         console.writeln("INFO: Started Master Flat Calibration...");
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((flatFiles[filterName]).length) +" FLAT files found....");
                  //////////////////////
                  //Retrieve process Name
                  let processName = filterProcessDictionary[filterName]['MasterFlatCalibration'];

                  let thisProcessInstance = ProcessInstance.fromIcon( processName );
                  if ( thisProcessInstance == null )
                     throw new Error( "No such process icon: ");
                  if ( !(thisProcessInstance instanceof ImageCalibration) )
                     throw new Error( "The specified icon is not an instance of ImageCalibration: " );
                  //////////////////////
                  //Change the Variable
                  let newTargetFrames = [];
                  let flatCount = 0
                  for(flatCount = 0 ; flatCount < (flatFiles[filterName]).length;flatCount++) {
                     let thisTargetFrame = [true , flatFiles[filterName][flatCount]];
                     newTargetFrames.push(thisTargetFrame);
                  }
                  //console.writeln("    OLD TARGETS \"" + thisProcessInstance.targetFrames + "\"....");
                  //console.writeln("    NEW TARGETS \"" + newTargetFrames + "\"....");
                  thisProcessInstance.targetFrames = newTargetFrames;
                  //////////////////////
                  thisProcessInstance.writeIcon(processName);
                  //let methods = getInstanceMethods(thisProcessInstance);
                  //console.writeln("thisProcessInstance METHODS:" + methods);
                  //thisProcessInstance.launch();

                  thisProcessInstance.executeGlobal();
               } else {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has NO files found....");
               }
            } else {
                console.writeln("  INFO: Filter \"" + filterName + "\" was not selected....");
            }
         }
      }
      //////////////////////////////////////
      //MasterFlatIntegration
      if (processesToRun['MasterFlatIntegration']) {
         console.writeln("========================================");
         console.writeln("INFO: Started Master Flat Integration...");
         let MasterFlatFiles = [];
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((flatFiles[filterName]).length) +" FLAT files found....");
                  //////////////////////
                  //Retrieve process Name
                  let processName = filterProcessDictionary[filterName]['MasterFlatIntegration'];

                  let thisProcessInstance = ProcessInstance.fromIcon( processName );
                  if ( thisProcessInstance == null )
                     throw new Error( "No such process icon: ");
                  if ( !(thisProcessInstance instanceof ImageIntegration) )
                     throw new Error( "The specified icon is not an instance of ImageIntegration: " );
                  //////////////////////
                  //Change the Variable
                  let newImages = [];
                  let flatCount = 0
                  for(flatCount = 0 ; flatCount < (flatFiles[filterName]).length;flatCount++) {
                     let thisTargetImage = flatFiles[filterName][flatCount];
                     //Change .fit to _c.fit
                     thisTargetImage = thisTargetImage.replace('.fit', '_c.fit');
                     let thisTargetFrame = [true , thisTargetImage,"",""];
                     newImages.push(thisTargetFrame);
                  }
                  //console.writeln("    OLD TARGETS \"" + thisProcessInstance.images + "\"....");
                  //console.writeln("    NEW TARGETS \"" + newImages + "\"....");
                  thisProcessInstance.images = newImages;
                  //////////////////////
                  thisProcessInstance.writeIcon(processName);
                  //let methods = getInstanceMethods(thisProcessInstance);
                  //console.writeln("thisProcessInstance METHODS:" + methods);
                  //thisProcessInstance.launch();

                  thisProcessInstance.executeGlobal();
                  ///////////////////////
                  //The Integrate process wil create 3 images : reject high/low and integration
                  //
                  //We need to close the rejects and rename the integration
                  let windowCount;
                  let allWindows = ImageWindow.windows;
                  let numberWindows = allWindows.length;
                  for(windowCount=(numberWindows - 1); windowCount >= 0 ; windowCount--) {
                     let view = allWindows[windowCount].mainView;
                     //console.writeln("ID: " + view.id);
                     //console.writeln("ISNEW: " + (allWindows[windowCount]).isNew);
                     if(view.id  != 'integration') {
                        (allWindows[windowCount]).forceClose();
                     } else {
                        let newViewName = filterName +"MasterFlat";
                        view.id = newViewName;
                        /////////////////////
                        //Now Save the file.
                        //Make this the Active Window
                        let strDir = this.dialog.fileDialogEdit.text;
                        let filePath = strDir + view.id + ".xisf";
                        console.writeln("  INFO: Writing MasterFlat \"" + view.id + "\" to " + filePath + " ....");
                        allWindows[windowCount].saveAs( filePath, false, false, false, false);
                        (allWindows[windowCount]).forceClose();
                        //
                        MasterFlatFiles.push(filePath);
                     }
                  }
               } else {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has NO files found....");
               }
            } else {
                console.writeln("  INFO: Filter \"" + filterName + "\" was not selected....");
            }
          }
          /////////////////////////////////////
          //Now read in the Master Flat Files
          let numberMasterFlatFiles = MasterFlatFiles.length ;
          for(let masterFlatFileCount = 0 ; masterFlatFileCount < numberMasterFlatFiles ; masterFlatFileCount++) {
            let thisMasterFlatFile = MasterFlatFiles[masterFlatFileCount];
            //Now read back in this image
            let imageWindows=ImageWindow.open(thisMasterFlatFile);
            if ( imageWindows.length < 1 )
               throw new Error( "Unable to open file: " + thisMasterFlatFile );
            if ( imageWindows.length > 1 )
               throw new Error( "Multi-image files are not supported by this script: " + thisMasterFlatFile );
            let imageWindow=imageWindows[0]
            //Display the Image.
            imageWindow.show();
            imageWindow.zoomToFit();
          }
      }
      //////////////////////////////////////
      if ( processesToRun['LightCalibration'] ) {
         console.writeln("========================================");
         console.writeln("INFO: Started Light Calibration...");
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((lightFiles[filterName]).length) +" LIGHT files found....");
                  //////////////////////
                  //Retrieve process Name
                  let processName = filterProcessDictionary[filterName]['Calibration'];

                  let thisProcessInstance = ProcessInstance.fromIcon( processName );
                  if ( thisProcessInstance == null )
                     throw new Error( "No such process icon: ");
                  if ( !(thisProcessInstance instanceof ImageCalibration) )
                     throw new Error( "The specified icon is not an instance of ImageCalibration: " );
                  //////////////////////
                  //Change the targetFrames Variable
                  let newTargetFrames = [];
                  let lightCount = 0
                  for(lightCount = 0 ; lightCount < (lightFiles[filterName]).length;lightCount++) {
                     let thisTargetFrame = [true , lightFiles[filterName][lightCount]];
                     newTargetFrames.push(thisTargetFrame);
                  }
                  //console.writeln("    OLD TARGETS \"" + thisProcessInstance.targetFrames + "\"....");
                  //console.writeln("    NEW TARGETS \"" + newTargetFrames + "\"....");
                  thisProcessInstance.targetFrames = newTargetFrames;
                  //////////////////////
                  //Change the masterFlatPath Variable
                  let thisMasterFlat = this.dialog.fileDialogEdit.text + filterName +"MasterFlat" + ".xisf";
                  thisProcessInstance.masterFlatPath = thisMasterFlat;
                  //////////////////////
                  //Change the P.outputDirectory Variable
                  thisProcessInstance.outputDirectory = this.dialog.fileDialogEdit.text;
                  //////////////////////
                  thisProcessInstance.writeIcon(processName);
                  //let methods = getInstanceMethods(thisProcessInstance);
                  //console.writeln("thisProcessInstance METHODS:" + methods);
                  //thisProcessInstance.launch();

                  thisProcessInstance.executeGlobal();
               } else {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has NO files found....");
               }
            } else {
                console.writeln("  INFO: Filter \"" + filterName + "\" was not selected....");
            }
         }
      }
      //////////////////////////////////////
      if ( processesToRun['LightCosmeticCorrection'] ) {
         console.writeln("========================================");
         console.writeln("INFO: Started Light Cosmetic Correction...");
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((lightFiles[filterName]).length) +" LIGHT files found....");
                  //////////////////////
                  //Retrieve process Name
                  let processName = filterProcessDictionary[filterName]['CosmeticCorrection'];

                  let thisProcessInstance = ProcessInstance.fromIcon( processName );
                  if ( thisProcessInstance == null )
                     throw new Error( "No such process icon: ");
                  if ( !(thisProcessInstance instanceof CosmeticCorrection) )
                     throw new Error( "The specified icon is not an instance of CosmeticCorrection: " );
                  //////////////////////
                  //Change the targetFrames Variable
                  let newTargetFrames = [];
                  for(let lightCount = 0 ; lightCount < (lightFiles[filterName]).length;lightCount++) {
                     let thisTargetImage = lightFiles[filterName][lightCount];
                     thisTargetImage = thisTargetImage.replace('.fit', '_c.fit');
                     let thisTargetFrame = [true , thisTargetImage];
                     //Change .fit to _c.fit
                     newTargetFrames.push(thisTargetFrame);
                  }
                  //console.writeln("    OLD TARGETS \"" + thisProcessInstance.targetFrames + "\"....");
                  //console.writeln("    NEW TARGETS \"" + newTargetFrames + "\"....");
                  thisProcessInstance.targetFrames = newTargetFrames;
                  //////////////////////
                  //Change the P.outputDirectory Variable
                  thisProcessInstance.outputDir = this.dialog.fileDialogEdit.text;
                  //////////////////////
                  thisProcessInstance.writeIcon(processName);
                  //let methods = getInstanceMethods(thisProcessInstance);
                  //console.writeln("thisProcessInstance METHODS:" + methods);
                  //thisProcessInstance.launch();

                  thisProcessInstance.executeGlobal();
               } else {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has NO files found....");
               }
            } else {
                console.writeln("  INFO: Filter \"" + filterName + "\" was not selected....");
            }
         }
      }
      //////////////////////////////////////
      if ( processesToRun['LightRegistration']) {
         console.writeln("========================================");
         console.writeln("INFO: Started Light Registration...");
         //////////////////////
         //Retrieve process Name
         let processName = 'Registration';

         let thisProcessInstance = ProcessInstance.fromIcon( processName );
         if ( thisProcessInstance == null )
            throw new Error( "No such process icon: ");
         if ( !(thisProcessInstance instanceof StarAlignment) )
            throw new Error( "The specified icon is not an instance of StarAlignment: " );
         //////////////////////
         //Change the targetFrames Variable
         let newTargetFrames = [];
         let possibleReferenceImages = [];
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((lightFiles[filterName]).length) +" LIGHT files found....");
                  for(let lightCount = 0 ; lightCount < (lightFiles[filterName]).length;lightCount++) {
                     let thisTargetImage = lightFiles[filterName][lightCount];
                     thisTargetImage = thisTargetImage.replace('.fit', '_c_cc.fit');
                     let thisTargetFrame = [true,true , thisTargetImage];
                     //Change .fit to __c.fit
                     newTargetFrames.push(thisTargetFrame);
                     //Reference Images from lum or Ha only
                     if ( (filterName == 'ha') || (filterName == 'lum')) {
                        possibleReferenceImages.push(thisTargetImage);
                     }
                  }
               }
            }
         }
         //////////////////////
         //Change the P.outputDirectory Variable
         thisProcessInstance.outputDirectory = this.dialog.fileDialogEdit.text;
         //////////////////////
         //Change the P.targets Variable
         thisProcessInstance.targets = newTargetFrames;
         //////////////////////
         //Change the P.referenceImage Variable
         //Should have all ha and lum images so randomly pick one.
         if (possibleReferenceImages.length == 0) {
            let strText = 'ERROR: No Luminance of Ha imaged from which to choose reference..';
            (new MessageBox(
               strText,
               '',
               StdIcon_Error,
               StdButton_Ok
            )).execute
         }
         thisReferenceImage = possibleReferenceImages[Math.floor(Math.random() * possibleReferenceImages.length)];

         thisProcessInstance.referenceImage = thisReferenceImage;
         thisProcessInstance.referenceIsFile = true;
         //////////////////////
         thisProcessInstance.writeIcon(processName);
         //let methods = getInstanceMethods(thisProcessInstance);
         //console.writeln("thisProcessInstance METHODS:" + methods);
         //thisProcessInstance.launch();

         thisProcessInstance.executeGlobal();

      }
      //////////////////////////////////////
      if ( processesToRun['LightLocalNormalisation'] ) {
         console.writeln("========================================");
         console.writeln("INFO: Started Light Local Normalisation ...");
         //////////////////////
         //Retrieve process Name
         let processName = 'LocalNormalisation';

         let thisProcessInstance = ProcessInstance.fromIcon( processName );
         if ( thisProcessInstance == null )
            throw new Error( "No such process icon: ");
         if ( !(thisProcessInstance instanceof LocalNormalization) )
            throw new Error( "The specified icon is not an instance of LocalNormalization: " );
         //////////////////////
         //Change the targetFrames Variable
         let newTargetFrames = [];
         let possibleReferenceImages = [];
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((flatFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((lightFiles[filterName]).length) +" LIGHT files found....");
                  for(let lightCount = 0 ; lightCount < (lightFiles[filterName]).length;lightCount++) {
                     let thisTargetImage = lightFiles[filterName][lightCount];
                     thisTargetImage = thisTargetImage.replace('.fit', '_c_cc_r.fit');
                     let thisTargetFrame = [true , thisTargetImage];
                     newTargetFrames.push(thisTargetFrame);
                     //Reference Images from lum or Ha only
                     if ( (filterName == 'ha') || (filterName == 'lum')) {
                        possibleReferenceImages.push(thisTargetImage);
                     }
                  }
               }
            }
         }
         //////////////////////
         //Change the P.outputDirectory Variable
         thisProcessInstance.outputDirectory = this.dialog.fileDialogEdit.text;
         //////////////////////
         //Change the P.targets Variable
         thisProcessInstance.targetItems = newTargetFrames;
         //////////////////////
         //Change the P.referenceImage Variable
         //Should have all ha and lum images so randomly pick one.
         if (possibleReferenceImages.length == 0) {
            let strText = 'ERROR: No Luminance of Ha imaged from which to choose reference..';
            (new MessageBox(
               strText,
               '',
               StdIcon_Error,
               StdButton_Ok
            )).execute
         }
         thisReferenceImage = possibleReferenceImages[Math.floor(Math.random() * possibleReferenceImages.length)];
         thisProcessInstance.referencePathOrViewId = thisReferenceImage;
         thisProcessInstance.referenceIsView = false;
         //////////////////////
         thisProcessInstance.writeIcon(processName);
         //let methods = getInstanceMethods(thisProcessInstance);
         //console.writeln("thisProcessInstance METHODS:" + methods);
         //thisProcessInstance.launch();

         thisProcessInstance.executeGlobal();

       }
      //////////////////////////////////////
      if ( processesToRun['LightIntegration'] ) {
         console.writeln("========================================");
         console.writeln("INFO: Started Light Integration...");

         let IntegrationtFiles = [];
         for(var count = 0 ; count < filterCount ; count++) {
            let filterName = filterList[count];
            if (filterStatus[filterName]) {
               console.writeln("  INFO: Filter \"" + filterName + "\" has been selected....");
               if ( ((lightFiles[filterName]).length) > 0) {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has "+ ((lightFiles[filterName]).length) +" FLAT files found....");
                  //////////////////////
                  //Retrieve process Name
                  let processName = filterProcessDictionary[filterName]['Integration'];

                  let thisProcessInstance = ProcessInstance.fromIcon( processName );
                  if ( thisProcessInstance == null )
                     throw new Error( "No such process icon: ");
                  if ( !(thisProcessInstance instanceof ImageIntegration) )
                     throw new Error( "The specified icon is not an instance of ImageIntegration: " );
                  //////////////////////
                  //Change the Variable
                  let newImages = [];
                  let lightCount = 0
                  for(lightCount = 0 ; lightCount < (lightFiles[filterName]).length;lightCount++) {
                     let thisTargetImage   = lightFiles[filterName][lightCount];
                     let thisTargetDrizzle = lightFiles[filterName][lightCount];
                     let thisTargetNormal  = lightFiles[filterName][lightCount];
                     //Change .fit to _c_cc_r.fit
                     thisTargetImage   = thisTargetImage.replace('.fit', '_c_cc_r.fit');
                     thisTargetDrizzle = thisTargetImage.replace('.fit', '_c_cc_r.xdrz');
                     thisTargetNormal  = thisTargetImage.replace('.fit', '_c_cc_r.xnml');
                     let thisTargetFrame = [true , thisTargetImage,thisTargetDrizzle,thisTargetNormal];
                     newImages.push(thisTargetFrame);
                  }
                  //console.writeln("    OLD TARGETS \"" + thisProcessInstance.images + "\"....");
                  //console.writeln("    NEW TARGETS \"" + newImages + "\"....");
                  thisProcessInstance.images = newImages;
                  //////////////////////
                  thisProcessInstance.writeIcon(processName);
                  //let methods = getInstanceMethods(thisProcessInstance);
                  //console.writeln("thisProcessInstance METHODS:" + methods);
                  //thisProcessInstance.launch();

                  thisProcessInstance.executeGlobal();
                  ///////////////////////
                  //The Integrate process will create 3 images : reject high/low and integration
                  //
                  //We need to close the rejects and rename the integration
                  let windowCount;
                  let allWindows = ImageWindow.windows;
                  let numberWindows = allWindows.length;
                  for(windowCount=(numberWindows - 1); windowCount >= 0 ; windowCount--) {
                     let view = allWindows[windowCount].mainView;
                     //console.writeln("ID: " + view.id);
                     //console.writeln("ISNEW: " + (allWindows[windowCount]).isNew);
                     if(view.id  != 'integration') {
                        (allWindows[windowCount]).forceClose();
                     } else {
                        let newViewName = filterName +"Integration";
                        view.id = newViewName;
                        /////////////////////
                        //Now Save the file.
                        //Make this the Active Window
                        let strDir = this.dialog.fileDialogEdit.text;
                        let filePath = strDir + view.id + ".xisf";
                        console.writeln("  INFO: Writing Integration \"" + view.id + "\" to " + filePath + " ....");
                        allWindows[windowCount].saveAs( filePath, false, false, false, false);
                        (allWindows[windowCount]).forceClose();
                        //
                        IntegrationtFiles.push(filePath);
                     }
                  }
               } else {
                  console.writeln("    INFO: Filter \"" + filterName + "\" has NO files found....");
               }
            } else {
                console.writeln("  INFO: Filter \"" + filterName + "\" was not selected....");
            }
          }
          /////////////////////////////////////
          //Now read in the Integration Files
          let numberIntegrationtFiles = IntegrationtFiles.length ;
          for(let integrationFileCount = 0 ; integrationFileCount < numberIntegrationtFiles ; integrationFileCount++) {
            let thisIntegrationFile = IntegrationtFiles[integrationFileCount];
            //Now read back in this image
            let imageWindows=ImageWindow.open(thisIntegrationFile);
            if ( imageWindows.length < 1 )
               throw new Error( "Unable to open file: " + thisIntegrationFile );
            if ( imageWindows.length > 1 )
               throw new Error( "Multi-image files are not supported by this script: " + thisIntegrationFile );
            let imageWindow=imageWindows[0]
            //Display the Image.
            imageWindow.show();
            imageWindow.zoomToFit();
          }
      }
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
   this.sizer.add(this.channelSizer) ;
   //this.sizer.add( this.redHorizontalSizer );
   //this.sizer.add( this.greenHorizontalSizer );
   //this.sizer.add( this.blueHorizontalSizer );
   //this.sizer.add( this.lumHorizontalSizer );
   //this.sizer.add( this.HaHorizontalSizer );
   //this.sizer.add( this.OiiiHorizontalSizer );
   //this.sizer.add( this.SiiHorizontalSizer );
   this.sizer.addSpacing( 4 );
   this.sizer.add(this.processesToRunSizer) ;
   this.sizer.addSpacing( 4 );
   this.sizer.add( this.buttons_Sizer );

   this.windowTitle = TITLE + " Script";
   this.adjustToContents();
   this.setFixedSize();


}
integrationAutomation.prototype = new Dialog


let dialog = new integrationAutomation();

dialog.execute();
