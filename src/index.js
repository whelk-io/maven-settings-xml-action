const core = require('@actions/core');
const settings = require('./settings');
const os = require('os');
const path = require('path');

try {
  const templateXml = settings.getSettingsTemplate();

  const settingsPath = path.join(os.homedir(), '.m2', 'settings.xml');
  settings.updateServers(templateXml);
  settings.updateRepositories(templateXml);
  settings.writeSettings(settingsPath, templateXml);

} catch (error) {
  core.setFailed(error.message);
}
