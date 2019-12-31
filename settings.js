const core = require('@actions/core');
const path = require('path');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

function getSettingsTemplate() {
    core.info("opening settings template");
    const templatePath = path.join(__dirname, 'settings.xml');
    const template = fs.readFileSync(templatePath).toString();
    return new DOMParser().parseFromString(template, 'text/xml');
}

function writeSettings(settingsPath, templateXml) {
    if (!fs.existsSync(path.dirname(settingsPath))) {
        core.info("creating ~/.m2 directory");
        fs.mkdirSync(path.dirname(settingsPath));
    }

    core.info("writing settings.xml to path: " + settingsPath)
    const settingStr = new XMLSerializer().serializeToString(templateXml);
    fs.writeFileSync(settingsPath, settingStr);
}

function updateServers(templateXml) {

    const servers = core.getInput('servers');
    core.info("servers " + servers); // TODO

    if (!servers) {
        return;
    }

    const serversXml = template.getElementsByTagName('servers')[0];

    JSON.parse(servers).forEach((server) => {
        const serverXml = template.createElement('server');
        for (const key in server) {
            const keyXml = template.createElement(key);
            keyXml.textContent = server[key];
            serverXml.appendChild(keyXml);
        }
        serversXml.appendChild(serverXml);
    });

}

module.exports = {
    getSettingsTemplate,
    writeSettings,
    updateServers
}