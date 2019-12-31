const path = require('path');
const fs = require('fs');
const XMLSerializer = require('xmldom').XMLSerializer;
const DOMParser = require('xmldom').DOMParser;

function getSettingsTemplate() {
    console.log("opening settings template");
    const templatePath = path.join(__dirname, 'settings.xml');
    const template = fs.readFileSync(templatePath).toString();
    return new DOMParser().parseFromString(template, 'text/xml');
}

function writeSettings(settingsPath, templateXml) {
    if (!fs.existsSync(path.dirname(settingsPath))) {
        console.log("creating .m2 directory");
        fs.mkdirSync(path.dirname(settingsPath));
    }

    console.log("writing m2 to path: " + settingsPath)
    const settingStr = new XMLSerializer().serializeToString(templateXml);
    fs.writeFileSync(settingsPath, settingStr);
}