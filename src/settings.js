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

            // convert all json content as xml
            var value = objectToXml(serverInput[key]);
            var xmlValue = new DOMParser().parseFromString(value, 'text/xml');

            // append new xml to current node
            keyXml.appendChild(xmlValue);
            serverXml.appendChild(keyXml);
        }
        serversXml.appendChild(serverXml);
    });

}

function updateMirrors(templateXml) {
    var mirrorsInput = core.getInput('mirrors');

    if (!mirrorsInput) {
        return;
    }

    var mirrorsXml = templateXml.getElementsByTagName('mirrors')[0];

    JSON.parse(mirrorsInput).forEach((mirrorInput) => {
        var mirrorXml = templateXml.createElement('mirror');
        for (var key in mirrorInput) {
            var keyXml = templateXml.createElement(key);
            keyXml.textContent = mirrorInput[key];
            mirrorXml.appendChild(keyXml);
        }
        mirrorsXml.appendChild(mirrorXml);
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
            var child = repositoryInput[key];
            if (child === Object(child)) {
                var childXml = templateXml.createElement(key);
                for (var childKey in child) {
                    if (Object.prototype.hasOwnProperty.call(child, childKey)) {
                        var childElement = templateXml.createElement(childKey);
                        childElement.textContent = child[childKey];
                        childXml.appendChild(childElement);
                    }
                }
                repositoryXml.appendChild(childXml);
            } else {
                keyXml.textContent = repositoryInput[key];
                repositoryXml.appendChild(keyXml);
            }
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
            var child = pluginRepositoryInput[key];
            if (child === Object(child)) {
                var childXml = templateXml.createElement(key);
                for (var childKey in child) {
                    if (Object.prototype.hasOwnProperty.call(child, childKey)) {
                        var childElement = templateXml.createElement(childKey);
                        childElement.textContent = child[childKey];
                        childXml.appendChild(childElement);
                    }
                }
                pluginRepositoryXml.appendChild(childXml);
            } else {
                keyXml.textContent = pluginRepositoryInput[key];
                pluginRepositoryXml.appendChild(keyXml);
            }
        }
        pluginRepositoriesXml.appendChild(pluginRepositoryXml);
    });
}

function updateProfiles(templateXml) {
    var profilesInput = core.getInput('profiles');

    if (!profilesInput) {
        return;
    }

    var profilesXml =
        templateXml.getElementsByTagName('profiles')[0];

    JSON.parse(profilesInput).forEach((profileInput) => {
        var profileXml = templateXml.createElement('profile');
        for (var key in profileInput) {
            var keyXml = templateXml.createElement(key);
            var child = profileInput[key];
            if (child === Object(child)) {
                var childXml = templateXml.createElement(key);
                for (var childKey in child) {
                    if (Object.prototype.hasOwnProperty.call(child, childKey)) {
                        var childElement = templateXml.createElement(childKey);
                        childElement.textContent = child[childKey];
                        childXml.appendChild(childElement);
                    }
                }
                profileXml.appendChild(childXml);
            } else {
                keyXml.textContent = profileInput[key];
                profileXml.appendChild(keyXml);
            }
        }
        profilesXml.appendChild(profileXml);
    });
}

function updatePluginGroups(templateXml) {
    var pluginGroupsInput = core.getInput('plugin_groups');

    if (!pluginGroupsInput) {
        return;
    }

    var pluginGroupsXml = templateXml.getElementsByTagName('pluginGroups')[0];

    JSON.parse(pluginGroupsInput).forEach((pluginGroupInput) => {
        var pluginGroupXml = templateXml.createElement('pluginGroup');
        pluginGroupXml.textContent = pluginGroupInput;
        pluginGroupsXml.appendChild(pluginGroupXml);
    });

}

function objectToXml(obj) {
    var xml = '';
    for (var prop in obj) {
        xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += "<" + prop + ">";
                xml += objectToXml(new Object(obj[prop][array]));
                xml += "</" + prop + ">";
            }
        } else if (typeof obj[prop] == "object") {
            xml += objectToXml(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}

module.exports = {
    getSettingsTemplate,
    writeSettings,
    updateServers,
    updateMirrors,
    updateRepositories,
    updatePluginRepositories,
    updateProfiles,
    updatePluginGroups,
    objectToXml
}