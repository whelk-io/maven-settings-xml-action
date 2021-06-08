var core = require('@actions/core');
var settings = require('./settings');
var os = require('os');
var path = require('path');
var fs = require('fs');
var XMLSerializer = require('xmldom').XMLSerializer;

function run() {
  try {
    // open default template
    var templateXml = settings.getSettingsTemplate();

    // update from action input
    settings.update(templateXml);

    // format to xml
    var formattedXml = formatSettings(templateXml);

    // get custom output path
    var settingsPath = getSettingsPath();

    // write template to filepath
    writeSettings(settingsPath, formattedXml);

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

function formatSettings(templateXml) {
  var settingStr = new XMLSerializer().serializeToString(templateXml);

  // format xml to standard format
  return format(settingStr, {
      indentation: '  ',
      collapsetent: true,
      lineSeparator: '\n'
  });
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
  writeSettings,
  formatSettings
}