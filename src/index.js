var core = require('@actions/core');
var settings = require('./settings');
var os = require('os');
var path = require('path');

function run() {
  try {
    // open default template
    var templateXml = settings.getSettingsTemplate();

    // update from action input
    settings.update(templateXml);

    // format to xml
    var formattedXml = settings.formatSettings(templateXml);

    // get custom output path
    var settingsPath = this.getSettingsPath();

    // write template to filepath
    settings.writeSettings(settingsPath, formattedXml);

  } catch (error) {
    core.setFailed(error.message);
  }
}

function getSettingsPath() {
  var outputPath = core.getInput('output_path');
  if (outputPath != null && outputPath.trim() != '') {
    return path.join(outputPath);
  }

  return path.join(os.homedir(), '.m2', 'settings.xml');
}

function writeSettings(settingsPath, templateXml) {
  if (!fs.existsSync(path.dirname(settingsPath))) {
      core.info("creating directory for settings.xml: " + settingsPath);
      fs.mkdirSync(path.dirname(settingsPath));
  }
  
  core.info("writing settings.xml to path: " + settingsPath)
  fs.writeFileSync(settingsPath, formattedXml);
}

run();

module.exports = {
  run
}