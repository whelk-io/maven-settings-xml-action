var core = require('@actions/core');
var path = require('path');
var fs = require('fs');
var DOMParser = require('@xmldom/xmldom').DOMParser;
var XMLSerializer = require('@xmldom/xmldom').XMLSerializer;
var format = require('xml-formatter');

function getSettingsTemplate() {
    return getTemplate('../template', 'settings.xml');
}

function getDefaultRepositoryTemplate() {
    return getTemplate('../template', 'default-repository.xml');
}

function getDefaultActiveProfileTemplate() {
    return getTemplate('../template', 'default-active-profile.xml');
}

function getTemplate(filepath, filename) {
    var templatePath = path.join(__dirname, filepath, filename);
    var template = fs.readFileSync(templatePath).toString();
    return new DOMParser().parseFromString(template, 'text/xml');
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

function update(templateXml) {
    this.updateActiveProfiles(templateXml);
    this.updateServers(templateXml);
    this.updateMirrors(templateXml);
    this.updateRepositories(templateXml);
    this.updatePluginRepositories(templateXml);
    this.updateProfiles(templateXml)
    this.updatePluginGroups(templateXml)
    this.updateProxies(templateXml)
}

function updateActiveProfiles(templateXml) {

    var activeProfilesInput = core.getInput('active_profiles');

    if (!activeProfilesInput) {
        applyDefaultActiveProfile(templateXml);
        return;
    }

    var activeProfiles = JSON.parse(activeProfilesInput);

    if (activeProfiles.length == 0) {
        applyDefaultActiveProfile(templateXml);
        return;
    }

    // apply custom repostories
    activeProfiles.forEach((activeProfileInput) => {
        var activeProfileXml = templateXml.createElement("activeProfile");
        activeProfileXml.textContent = activeProfileInput;
        templateXml
            .getElementsByTagName('activeProfiles')[0]
            .appendChild(activeProfileXml);
    });

}

function applyDefaultActiveProfile(templateXml) {
    var defaultActiveProfile = getDefaultActiveProfileTemplate();

    templateXml
        .getElementsByTagName('activeProfiles')[0]
        .appendChild(defaultActiveProfile);
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
        applyDefaultRepository(templateXml);
        return;
    }

    var repositories = JSON.parse(repositoriesInput);

    if (repositories.length == 0) {
        applyDefaultRepository(templateXml);
        return;
    }

    // apply custom repostories
    repositories.forEach((repositoryInput) => {
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
        templateXml
            .getElementsByTagName('profiles')[0]
            .getElementsByTagName('repositories')[0]
            .appendChild(repositoryXml);
    });
}

function applyDefaultRepository(templateXml) {
    var defaultRepositoryTemplate = getDefaultRepositoryTemplate();

    templateXml
        .getElementsByTagName('profiles')[0]
        .getElementsByTagName('repositories')[0]
        .appendChild(defaultRepositoryTemplate);
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

function updateProxies(templateXml) {
    var proxiesInput = core.getInput('proxies');

    if (!proxiesInput) {
        return;
    }

    var proxiesXml = templateXml.getElementsByTagName('proxies')[0];

    JSON.parse(proxiesInput).forEach((proxyInput) => {
        var proxyXml = templateXml.createElement('proxy');
        for (var key in proxyInput) {
            var keyXml = templateXml.createElement(key);

            // convert all json content as xml
            var value = objectToXml(proxyInput[key]);
            var xmlValue = new DOMParser().parseFromString(value, 'text/xml');

            // append new xml to current node
            keyXml.appendChild(xmlValue);
            proxyXml.appendChild(keyXml);
        }
        proxiesXml.appendChild(proxyXml);
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
    getTemplate,
    formatSettings,
    update,
    updateActiveProfiles,
    updateServers,
    updateMirrors,
    updateRepositories,
    updatePluginRepositories,
    updateProfiles,
    updatePluginGroups,
    updateProxies
}
