var core = require('@actions/core');
var path = require('path');
var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

function getSettingsTemplate() {
    core.info("opening settings template");
    var templatePath = path.join(__dirname, '../template', 'settings.xml');
    var template = fs.readFileSync(templatePath).toString();
    return new DOMParser().parseFromString(template, 'text/xml');
}

function writeSettings(settingsPath, templateXml) {
    if (!fs.existsSync(path.dirname(settingsPath))) {
        core.info("creating ~/.m2 directory");
        fs.mkdirSync(path.dirname(settingsPath));
    }

    core.info("writing settings.xml to path: " + settingsPath)
    var settingStr = new XMLSerializer().serializeToString(templateXml);
    fs.writeFileSync(settingsPath, settingStr);
}

function updateServers(templateXml) {
    var serversInput = core.getInput('servers');

    if (!serversInput) {
        return;
    }

    var serversXml = templateXml.getElementsByTagName('servers')[0];

    JSON.parse(serversInput).forEach((serverInput) => {
        var serverXml = templateXml.createElement('server');
        for (var key in serverInput) {
            var keyXml = templateXml.createElement(key);
            keyXml.textContent = serverInput[key];
            serverXml.appendChild(keyXml);
        }
        serversXml.appendChild(serverXml);
    });

}

function updateRepositories(templateXml) {
    var repositoriesInput = core.getInput('repositories');

    if (!repositoriesInput) {
        return;
    }

    var repositoriesXml = 
        templateXml.getElementsByTagName('profiles')[0]
                   .getElementsByTagName('repositories')[0];

    JSON.parse(repositoriesInput).forEach((repositoryInput) => {
        var repositoryXml = templateXml.createElement('repository');
        for (var key in repositoryInput) {
            var keyXml = templateXml.createElement(key);
            keyXml.textContent = repositoryInput[key];
            repositoryXml.appendChild(keyXml);
        }
        repositoriesXml.appendChild(repositoryXml);
    });
}

function updatePluginRepositories(templateXml) {
    var pluginRepositoriesInput = core.getInput('plugin_repositories');

    if (!pluginRepositoriesInput) {
        return;
    }

    var pluginRepositoriesXml = 
        templateXml.getElementsByTagName('profiles')[0]
                   .getElementsByTagName('pluginRepositories')[0];

    JSON.parse(pluginRepositoriesInput).forEach((pluginRepositoryInput) => {
        var pluginRepositoryXml = templateXml.createElement('pluginRepository');
        for (var key in pluginRepositoryInput) {
            var keyXml = templateXml.createElement(key);
            keyXml.textContent = pluginRepositoryInput[key];
            pluginRepositoryXml.appendChild(keyXml);
        }
        pluginRepositoriesXml.appendChild(pluginRepositoryXml);
    });
}

module.exports = {
    getSettingsTemplate,
    writeSettings,
    updateServers,
    updateRepositories,
    updatePluginRepositories
}