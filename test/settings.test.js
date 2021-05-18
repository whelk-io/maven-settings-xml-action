var assert = require('assert');
var process = require('process');
var settings = require('../src/settings')
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;

describe('run settings.js', function () {

    describe('#updateServers', function () {
        it('<server/> should be not be changed when input.server is missing', function () {
            // given input
            process.env['INPUT_SERVERS'] = '';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers/></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('#updateServers', function () {
        it('<server/> should be appended with <server> when input.server is present', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar" }]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers><server><id>foo</id><username>fu</username><password>bar</password></server></servers></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('#updateServers', function () {
        it('<server/> should be appended with <server><configuration> when extended configuration is provided', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar", "configuration": { "httpConfiguration": { "all" : { "usePreemptive": "true" }}}}]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers><server><id>foo</id><username>fu</username><password>bar</password><configuration><httpConfiguration><all><usePreemptive>true</usePreemptive></all></httpConfiguration></configuration></server></servers></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('#updateServers', function () {
        it('<server/> should be appended with <server> and include all maven server properties', function () {
            // given input
            process.env['INPUT_SERVERS'] = '[{ "id": "foo", "username": "fu", "password": "bar", "privateKey": "${user.home}/.ssh/id_dsa", "passphrase": "some_passphrase", "filePermissions": "664", "directoryPermissions": "775" }]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><servers/></settings>");

            // when
            settings.updateServers(xml);

            // then
            var expectedXml = '<settings><servers><server><id>foo</id><username>fu</username><password>bar</password><privateKey>${user.home}/.ssh/id_dsa</privateKey><passphrase>some_passphrase</passphrase><filePermissions>664</filePermissions><directoryPermissions>775</directoryPermissions></server></servers></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_SERVERS'] = '';
        });
    });

    describe('#updateMirrors', function () {
        it('<mirrors/> should be appended with <mirror> when input.mirror is present', function () {
            // given input
            process.env['INPUT_MIRRORS'] = '[{ "id": "nexus", "mirrorOf": "!my-org-snapshots,*", "url": "http://redacted/nexus/content/groups/public" }]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><mirrors/></settings>");

            // when
            settings.updateMirrors(xml);

            // then
            var expectedXml = '<settings><mirrors><mirror><id>nexus</id><mirrorOf>!my-org-snapshots,*</mirrorOf><url>http://redacted/nexus/content/groups/public</url></mirror></mirrors></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_MIRRORS'] = '';
        });
    });

    describe('#doNotUpdateRepositories', function () {
        it('<repositories> should not be changed when input.repositories is missing', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "url": "http://foo.bar" }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/><pluginRepositories/></profile></profiles></settings>");

            // when
            settings.updateRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories><repository><id>foo</id><url>http://foo.bar</url></repository></repositories><pluginRepositories/></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

    describe('#updateRepositories', function () {
        it('<repositories> should be appended with <repository> when input.repositories is present', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "foo", "name": "foo", "url": "http://foo.bar", "releases": { "enabled": "true" }, "snapshots": { "enabled": "true" } }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/><pluginRepositories/></profile></profiles></settings>");

            // when
            settings.updateRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories><repository><id>foo</id><name>foo</name><url>http://foo.bar</url><releases><enabled>true</enabled></releases><snapshots><enabled>true</enabled></snapshots></repository></repositories><pluginRepositories/></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_REPOSITORIES'] = '';
        });
    });

    describe('#updatePluginRepositories', function () {
        it('<pluginRepositories> should be appended with <pluginRepository> when input.pluginRepositories is present', function () {
            // given input
            process.env['INPUT_PLUGIN_REPOSITORIES'] = '[{ "id": "foo.plugin", "name": "foo.plugin", "url": "http://foo.bar.plugin", "releases": { "enabled": "true" }, "snapshots": { "enabled": "true" } }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/><pluginRepositories/></profile></profiles></settings>");

            // when
            settings.updatePluginRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories/><pluginRepositories><pluginRepository><id>foo.plugin</id><name>foo.plugin</name><url>http://foo.bar.plugin</url><releases><enabled>true</enabled></releases><snapshots><enabled>true</enabled></snapshots></pluginRepository></pluginRepositories></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_PLUGIN_REPOSITORIES'] = '';
        });
    });

    describe('#updateProfiles', function () {
        it('<profiles> should be appended with <profile> when input.profiles is present', function () {
            // given input
            process.env['INPUT_PROFILES'] = '[{ "id": "foo.profile", "name": "foo.profile", "url": "http://foo.bar.profile", "properties": { "foo": "property-1", "bar": "property-2"} }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/></profile></profiles></settings>");

            // when
            settings.updateProfiles(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories/></profile><profile><id>foo.profile</id><name>foo.profile</name><url>http://foo.bar.profile</url><properties><foo>property-1</foo><bar>property-2</bar></properties></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_PROFILES'] = '';
        });
    });

    describe('#updateRepositoriesWithSnapshots', function () {
        it('<repositories> should build with snapshots, when provided', function () {
            // given input
            process.env['INPUT_REPOSITORIES'] = '[{ "id": "maven-internal", "url": "https://maven.aaaaa.aa", "name": "maven-internal", "snapshots": {"enabled": "true"} }]';

            // and default settings
            var xml = new DOMParser().parseFromString(
                "<settings><profiles><profile><id>github</id><repositories/></profile></profiles></settings>");

            // when
            settings.updateRepositories(xml);

            // then
            var expectedXml = '<settings><profiles><profile><id>github</id><repositories><repository><id>maven-internal</id><url>https://maven.aaaaa.aa</url><name>maven-internal</name><snapshots><enabled>true</enabled></snapshots></repository></repositories></profile></profiles></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);
        });
    });

    describe('#updatePluginGroups', function () {
        it('<pluginGroups/> should be appended with <pluginGroup> when input.pluginGroups is present', function () {
            // given input
            process.env['INPUT_PLUGIN_GROUPS'] = '[ "some.plugin.group.id" ]';

            // and default settings
            var xml = new DOMParser().parseFromString("<settings><pluginGroups/></settings>");

            // when
            settings.updatePluginGroups(xml);

            // then
            var expectedXml = '<settings><pluginGroups><pluginGroup>some.plugin.group.id</pluginGroup></pluginGroups></settings>';
            assert.equal(new XMLSerializer().serializeToString(xml), expectedXml);

            process.env['INPUT_PLUGIN_GROUPS'] = '';
        });
    });

});

