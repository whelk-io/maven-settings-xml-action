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

  if (!outputFileInput) {
    return getDefaultSettingsPath();
  }

  // resolve env variables in path
  if (outputFileInput.trim() != '') {
    return outputFileInput.trim().replace(/\$([A-Z_]+[A-Z0-9_]*)|\${([A-Z0-9_]*)}/ig, (_, a, b) => process.env[a || b])
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

  core.info("writing settings.xml to path: " + path.resolve(settingsPath));
  fs.writeFileSync(settingsPath, formattedXml);
}

run();

module.exports = {
  run,
  getSettingsPath,
  getDefaultSettingsPath,
  writeSettings
}