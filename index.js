const core = require('@actions/core');
const github = require('@actions/github');
const settings = require('./settings');
const fs = require('fs');
const os = require('os');
const path = require('path');

try {
  // `who-to-greet` input defined in action metadata file
  //const nameToGreet = core.getInput('who-to-greet');
  //console.log(`Hello ${nameToGreet}!`);
  ///const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

  /////////
  const settingsTemplate = settings.getSettingsTemplate();

  const settingsPath = path.join(os.homedir(), '.m2', 'settings.xml');
  settings.writeSettings(settingsPath, templateXml);

} catch (error) {
  core.setFailed(error.message);
}