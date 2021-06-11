var core = require('@actions/core');
var settings = require('./settings');
var os = require('os');
var path = require('path');
var fs = require('fs');

function run() {
  try {
    // open default template
    var templateXml = settings.getSettingsTemplate();

    // update from action input
    settings.update(templateXml);

    // format to xml
    var formattedXml = settings.formatSettings(templateXml);

    // get custom output path
    var settingsPath = getSettingsPath();
 
    // write template to filepath
    writeSettings(settingsPath, formattedXml);

  } catch (error) {
    core.setFailed(error.message);
  }
}

function getSettingsPath() {
  var outputFileInput = core.getInput('output_file');
  console.log(outputFileInput); // TODO remove
  
  if (!outputFileInput) {
    return getDefaultSettingsPath();
  }

  if (outputFileInput.trim() != '') {
    return path.join(outputFileInput.trim());
  }

  return getDefaultSettingsPath();
}

function getDefaultSettingsPath() { 
  return path.join(os.homedir(), '.m2', 'settings.xml');
}

function writeSettings(settingsPath, formattedXml) {
  if (!fs.existsSync(path.dirname(settingsPath))) {
      core.info("creating directory for settings.xml: " + settingsPath);
      fs.mkdirSync(path.dirname(settingsPath));
  }

  core.info("writing settings.xml to path: " + settingsPath)
  fs.writeFileSync(settingsPath, formattedXml);
}

run();

module.exports = {
  run,
  getSettingsPath,
  getDefaultSettingsPath,
  writeSettings
}